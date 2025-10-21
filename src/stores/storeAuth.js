import { defineStore } from "pinia";
import { reactive } from "vue";
import { useRouter } from 'vue-router';
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAssets } from "./storeAssets";

export const useStoreAuth = defineStore("auth", () => {
  /* state */

  const storeAssets = useStoreAssets()

  const userDetailsDefault = {
    id: null,
    email: null,
    nome: null,
    nivel: null,
    experiencia: null,
    genero: null
  }

  const userDetails = reactive({
    ...userDetailsDefault
  })

  /* getters */



  /* actions */

  const init = () => {
    const router = useRouter()

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (session) {
          userDetails.id = session.user.id
          userDetails.email = session.user.email
          loadUserDetails()
          router.push('/')
          storeAssets.loadAssets()
        }
      }
      else if (event === 'SIGNED_OUT') {
        Object.assign(userDetails, userDetailsDefault)
        router.replace('/auth')
        storeAssets.unsubscribeAssets()
        storeAssets.clearAssets()
      }
    })
  }

  const registerUser = async ({ email, password, name, birth, gender }) => {
    let { error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) useShowErrorMessage(authError.message)

    const userId = authData.user.id

    let { error: perfError } = await supabase
      .from('perfil')
      .update({
        nome: name,
        nascimento: birth,
        genero: gender,
        email
      })
      .eq('id', userId)

    if (perfError) useShowErrorMessage(perfError.message)
  }

  const loginUser = async ({ email, password }) => {
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) useShowErrorMessage(error.message)
  }

  const logoutUser = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) useShowErrorMessage(error.message)
  }

  const loadUserDetails = async () => {
    let { data, error } = await supabase
      .from('perfil')
      .select("*")
      .eq('id', userDetails.id)
    if (error) useShowErrorMessage(error.message)
    if (data) {
      console.log(data[0])
      userDetails.nome = data[0].nome
      userDetails.nivel = data[0].nivel
      userDetails.experiencia = data[0].experiencia
      userDetails.genero = data[0].genero
    }
  }

  return {
    userDetails,

    init,
    registerUser,
    loginUser,
    logoutUser
  };
});
