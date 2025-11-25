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
      icon: "fas fa-user",
    },
    {
      id: uid(),
      title: "Desafio 2",
      desc: "Conecte sua conta bancária",
      icon: "fas fa-landmark",
    },
    {
      id: uid(),
      title: "Desafio 3",
      desc: "Invista em seu primeiro ativo",
      icon: "fas fa-arrow-trend-up",
    },
    {
      id: uid(),
      title: "Desafio 4",
      desc: "Compartilhe o app com um amigo",
      icon: "fas fa-share-nodes",
    },
  ]);

  /* getters */

  /* actions */

  return {
    challenges,
  };
});
