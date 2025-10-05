import { defineStore } from "pinia";
import { ref } from "vue";
import { uid } from "quasar";

export const useStoreChallenges = defineStore("challenges", () => {
  /* state */

  const challenges = ref([
    {
      id: uid(),
      title: "Desafio 1",
      desc: "Complete seu perfil para ganhar pontos",
      icon: "person",
    },
    {
      id: uid(),
      title: "Desafio 2",
      desc: "Conecte sua conta bancária",
      icon: "account_balance",
    },
    {
      id: uid(),
      title: "Desafio 3",
      desc: "Invista em seu primeiro ativo",
      icon: "trending_up",
    },
    {
      id: uid(),
      title: "Desafio 4",
      desc: "Compartilhe o app com um amigo",
      icon: "share",
    },
  ]);

  /* getters */

  /* actions */

  return {
    challenges,
  };
});
