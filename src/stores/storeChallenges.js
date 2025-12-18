import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "src/config/supabase";

export const useStoreChallenges = defineStore("challenges", () => {
  /* state */

  const challenges = ref([])
  // const challenges = ref([
  //   {
  //     id: uid(),
  //     title: "Desafio 1",
  //     desc: "Complete seu perfil para ganhar pontos",
  //     icon: "fas fa-user",
  //   },
  //   {
  //     id: uid(),
  //     title: "Desafio 2",
  //     desc: "Conecte sua conta bancária",
  //     icon: "fas fa-landmark",
  //   },
  //   {
  //     id: uid(),
  //     title: "Desafio 3",
  //     desc: "Invista em seu primeiro ativo",
  //     icon: "fas fa-arrow-trend-up",
  //   },
  //   {
  //     id: uid(),
  //     title: "Desafio 4",
  //     desc: "Compartilhe o app com um amigo",
  //     icon: "fas fa-share-nodes",
  //   },
  // ]);

  const challengesLoaded = ref(false)

  /* getters */

  /* actions */

  const loadChallenges = async () => {
    challengesLoaded.value = false

    let { data, error } = await supabase
      .from('desafios')
      .select('*')

    if (error) useShowErrorMessage(error.message)
    if (data) {
      challenges.value = data
      challengesLoaded.value = true
    }
  }

  const clearChallenges = () => {
    challenges.value = []
  }

  // const searchAssets = async (search) => {
  //   console.log(search)
  //   let { data, error } = await supabase
  //     .from('ativos')
  //     .select('*')
  //     .ilike('nome', `%${search}%`)
  //     .order('nome', {ascending: true})

  //     if (error) useShowErrorMessage(error.message)
  //     if (data) {
  //       assets.value = data
  //       //setPriceAssets(assets.value)
  //     }
  // }

  return {
    challenges,

    loadChallenges,
    clearChallenges
  };
});
