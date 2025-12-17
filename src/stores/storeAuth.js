import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAssets } from "./storeAssets";
import { useStoreUserAssets } from "./storeUserAssets";
import { useStoreHistory } from "./storeHistory";

export const useStoreAuth = defineStore("auth", () => {
  /* state */

  const storeAssets = useStoreAssets()
  const storeUserAssets = useStoreUserAssets()
  const storeHistory = useStoreHistory()

  const userDetailsDefault = {
    id: null,
    email: null,
    nome: null,
    nivel: null,
    experiencia: null,
    genero: null,
    saldo: null,
    investor_profile: null
  }

  const userDetails = reactive({
    ...userDetailsDefault
  })

  // auth/profile hydration status
  const hydrated = ref(false)

  /* getters */



  /* actions */

  const init = () => {
    const router = useRouter()

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (session) {
          userDetails.id = session.user.id
          userDetails.email = session.user.email
          await loadUserDetails()

          const needsInvestorProfile = !userDetails.investor_profile

          if (needsInvestorProfile && router.currentRoute.value.path !== '/investprofile') {
            router.push('/investprofile')
          } else if (!needsInvestorProfile && router.currentRoute.value.path === '/auth') {
            router.push('/')
          }

          storeAssets.loadAssets()
          storeUserAssets.loadUserAssets()
          storeHistory.loadHistory()

          hydrated.value = true
        }
      } else if (event === 'SIGNED_OUT') {
        Object.assign(userDetails, userDetailsDefault)
        router.replace('/auth')
        storeUserAssets.unsubscribeAssets()
        storeUserAssets.clearUserAssets()
        storeAssets.clearAssets()
        storeHistory.clearHistory()
        hydrated.value = true
      }
    })
  }

  // Ensure we have session + perfil loaded before route guards run
  const ensureHydrated = async () => {
    if (hydrated.value) return
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      userDetails.id = session.user.id
      userDetails.email = session.user.email
      await loadUserDetails()
    }
    hydrated.value = true
  }

  const registerUser = async ({ email, password, name, birth, gender }) => {
    let { data: authData, error: authError } = await supabase.auth.signUp({
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

    const router = useRouter()
    router.push('/investprofile')
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
      userDetails.nome = data[0].nome
      userDetails.nivel = data[0].nivel
      userDetails.experiencia = data[0].experiencia
      userDetails.genero = data[0].genero
      userDetails.saldo = data[0].saldo
      userDetails.investor_profile = data[0].investor_profile || data[0].perfil_investidor || null
    }
  }

  const updateEmail = async (newEmail) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      })
      if (error) {
        useShowErrorMessage(error.message)
        return { ok: false, message: error.message }
      }

      const { error: perfError } = await supabase
        .from('perfil')
        .update({ email: newEmail })
        .eq('id', userDetails.id)
      if (perfError) {
        useShowErrorMessage(perfError.message)
        return { ok: false, message: perfError.message }
      }

      userDetails.email = newEmail
      return { ok: true, data }
    } catch (e) {
      useShowErrorMessage(e.message || 'Erro ao atualizar e-mail')
      return { ok: false, message: e.message }
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) {
        useShowErrorMessage(error.message)
        return { ok: false, message: error.message }
      }
      return { ok: true, data }
    } catch (e) {
      useShowErrorMessage(e.message || 'Erro ao atualizar senha')
      return { ok: false, message: e.message }
    }
  }

  const updateProfile = async ({ nome, genero, nascimento }) => {
    try {
      const payload = {}
      if (nome !== undefined) payload.nome = nome
      if (genero !== undefined) payload.genero = genero
      if (nascimento !== undefined) payload.nascimento = nascimento

      const { error } = await supabase
        .from('perfil')
        .update(payload)
        .eq('id', userDetails.id)
      if (error) {
        useShowErrorMessage(error.message)
        return { ok: false, message: error.message }
      }

      if (nome !== undefined) userDetails.nome = nome
      if (genero !== undefined) userDetails.genero = genero
      return { ok: true }
    } catch (e) {
      useShowErrorMessage(e.message || 'Erro ao atualizar perfil')
      return { ok: false, message: e.message }
    }
  }

  return {
    userDetails,
    hydrated,

    init,
    ensureHydrated,
    registerUser,
    loginUser,
    logoutUser,
    updateEmail,
    updatePassword,
    updateProfile
  };
});
