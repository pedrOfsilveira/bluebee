import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { Notify } from 'quasar'
import { useStoreHistory } from "./storeHistory";

let userChallengesChannel

export const useStoreUserChallenges = defineStore("userChallenges", () => {
  /* state */

  const challenges = ref([])

  const storeAuth = useStoreAuth()
  //const storeHistory = useStoreHistory()

  const challengesLoaded = ref(false)

  /* getters */



  /* actions */

  const loadUserChallenges = async () => {
    challengesLoaded.value = false
    console.log("finded Challenge", getChallengeIndexByIds())

    let { data, error } = await supabase
      .from('perfil_desafios')
      .select('*')
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
          table: 'perfil_ativos',
          filter: `perfil_id=eq.${ storeAuth.userDetails.id }`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            challenges.value.push(payload.new)
          }
          if (payload.eventType === 'DELETE') {
            const index = getChallengeIndexByIds(payload.old.perfil_id, payload.old.desafio_id)
            challenges.value.splice(index, 1)
          }
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

  const verifyChallenge = userAssets => {

  }

  // helpers

  const verifyIfCompleted = desafio_id => {
    let teste = challenges.value.forEach(challenge => {
      return storeAuth.userDetails.id === perfil_id && challenge.desafios.id === desafio_id
    })
  }

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
  };
});
