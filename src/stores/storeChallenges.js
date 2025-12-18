import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "src/config/supabase";
import { useShowErrorMessage } from "src/use/useShowErrorMessage";

export const useStoreChallenges = defineStore("challenges", () => {
  const challenges = ref([]);

  const challengesLoaded = ref(false);

  const loadChallenges = async () => {
    challengesLoaded.value = false;

    let { data, error } = await supabase.from("desafios").select("*");

    if (error) useShowErrorMessage(error.message);
    if (data) {
      challenges.value = data.map((row) => ({
        ...row,
        title: row.nome ?? row.title ?? "",
        desc: row.descricao ?? row.desc ?? "",
        icon: row.icon ?? row.icone ?? "fas fa-flag-checkered",
      }));
      challengesLoaded.value = true;
    }
  };

  const clearChallenges = () => {
    challenges.value = [];
  };

  return {
    challenges,

    loadChallenges,
    clearChallenges,
  };
});
