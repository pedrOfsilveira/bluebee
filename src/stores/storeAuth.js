import { defineStore } from "pinia";
import { reactive } from "vue";
import { useRouter } from 'vue-router'
import { useShowErrorMessage } from 'src/use/useShowErrorMessage'
import supabase from "src/config/supabase";

export const useStoreAuth = defineStore("auth", () => {
  /* state */


  const userDetailsDefault = {
    id: null,
    email: null

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
          router.push('/')
        }
      }
      else if (event === 'SIGNED_OUT') {
        Object.assign(userDetails, userDetailsDefault)
        router.replace('/auth')
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

  return {
    userDetails,

    init,
    registerUser,
    loginUser,
    logoutUser
  };
});
