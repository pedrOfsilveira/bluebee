import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { Notify } from 'quasar'
import { useStoreHistory } from "./storeHistory";
import { useStoreUserAssets } from "./storeUserAssets";

let userChallengesChannel

export const useStoreUserChallenges = defineStore("userChallenges", () => {
  /* state */

  const challenges = ref([])

  const storeAuth = useStoreAuth()
  const storeUserAssets = useStoreUserAssets()
  //const storeHistory = useStoreHistory()

  const challengesLoaded = ref(false)

  const challengeVisual = ref({
    "Fundo Imobiliário": [
      {id: 1, quantidade: 10, dinheiro: 100, experiencia: 100},
      {id: 2, quantidade: 50, dinheiro: 650, experiencia: 650},
      {id: 3, quantidade: 150, dinheiro: 2000, experiencia: 2000}
    ],
    "Ação": [
      {id: 4, quantidade: 10, dinheiro: 100, experiencia: 100},
      {id: 5, quantidade: 50, dinheiro: 650, experiencia: 650},
      {id: 6, quantidade: 150, dinheiro: 2000, experiencia: 2000}
    ],
    "Criptomoeda": [
      {id: 7, quantidade: 10, dinheiro: 200, experiencia: 200},
      {id: 8, quantidade: 50, dinheiro: 1300, experiencia: 1300},
      {id: 9, quantidade: 150, dinheiro: 4000, experiencia: 4000}
    ],
    "ETF": [
      {id: 10, quantidade: 10, dinheiro: 150, experiencia: 150},
      {id: 11, quantidade: 50, dinheiro: 975, experiencia: 975},
      {id: 12, quantidade: 150, dinheiro: 3000, experiencia: 3000}
    ]
  })

  /* getters */


  /* actions */

  const loadUserChallenges = async () => {
    challengesLoaded.value = false

    let { data, error } = await supabase
      .from('perfil_desafios')
      .select(`
        created_at,
        perfil_id,
        desafios (*)
      `)
      .eq('perfil_id', storeAuth.userDetails.id)

    if (error) useShowErrorMessage(error.message)
    if (data) {
      challenges.value = data
      challengesLoaded.value = true
      subscribeChallenges()
    }
  }

  const subscribeChallenges = () => {
    const storeAuth = useStoreAuth()

    userChallengesChannel = supabase.channel('userChallenges-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'perfil_desafios',
          filter: `perfil_id=eq.${ storeAuth.userDetails.id }`
        },
        async (payload) => {
          // Reload to ensure we have nested "desafios" populated
          await loadUserChallenges()
        }
      )
      .subscribe()
  }

  const unsubscribeChallenges = () => {
    supabase.removeChannel(userChallengesChannel)
  }

  const clearUserChallenges = () => {
    challenges.value = []
  }

  //teste
  const verifyChallenge = async () => {
    // utiliza a contagem por tipo para verificar se algum desafio foi cumprido
    const result = beginnerChallenge(storeUserAssets.assets)
    const completedTypes = Object.keys(result).filter(t => result[t] >= 10)

    if (completedTypes.length > 0) {
      completedTypes.forEach(type => {
        challengeVisual.value[type].forEach(async challenge => {
          if (challenge.quantidade <= result[type]) {
            await addUserChallenge(challenge)
          }
        })
      })
    }

    return {
      counts: result,
      completedTypes,
      isAnyCompleted: completedTypes.length > 0
    }
  }

  const beginnerCounts = ref({})

  const beginnerChallenge = userAssets => {
    // conta a quantidade de ativos por tipo
    const counts = {}

    if (!Array.isArray(userAssets)) {
      beginnerCounts.value = counts
      return counts
    }

    userAssets.forEach(entry => {
      const ativos = entry?.ativos ?? {}
      const tipo = (ativos?.tipo ?? '').toString().trim()
      const quantidade = Number(entry?.quantidade ?? 1)

      if (!tipo) return

      counts[tipo] = (counts[tipo] ?? 0) + (isNaN(quantidade) ? 0 : quantidade)
    })

    beginnerCounts.value = counts
    return counts
  }

  const addUserChallenge = async desafio => {
    if (!await hasUserChallenge(desafio.id)) {
      const newUserChallenge = {
        perfil_id: storeAuth.userDetails.id,
        desafio_id: desafio.id
      }

      const { data, error } = await supabase
      .from('perfil_desafios')
      .insert([newUserChallenge])
      .select()

      if (error) {
        useShowErrorMessage(error.message)
        return null
      }

      Notify.create({
        type: 'positive',
        message: 'Você completou um desafio!',
        position: "top"
      })
      // atualiza cache local
      await loadUserChallenges()
      storeAuth.updateReward(desafio)
      return data?.[0] ?? null
    }
  }

  const hasUserChallenge = async desafio_id => {
    const { data, error } = await supabase
      .from('perfil_desafios')
      .select("*")
      .eq('perfil_id', storeAuth.userDetails.id)
      .eq('desafio_id', desafio_id)

    if (error) useShowErrorMessage(error.message)

    return data.length > 0
  }
  //fim teste

  // helpers

  const getChallengeIndexByIds = (perfil_id, desafio_id) => {
    let findedChallenge = challenges.value.findIndex(challenge => {
      return storeAuth.userDetails.id === perfil_id && challenge.desafios.id === desafio_id
    })
    return findedChallenge
  }

  return {
    challenges,

    loadUserChallenges,
    unsubscribeChallenges,
    clearUserChallenges,

    // challenge helpers
    verifyChallenge,
    beginnerChallenge,
    beginnerCounts
  };
});
