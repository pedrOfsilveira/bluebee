import { defineStore } from "pinia";
import { ref } from "vue";
import { uid } from "quasar";

export const useStoreAuth = defineStore("auth", () => {
  /* state */

  const usuarios = ref([
    {
      id: uid(),
      nome: "Roberto",
      senha: "teste123",
      nascimento: "01/01/2001",
      // genero: "masculino",
      email: "roberto@gamil.com",
    },
    {
      id: uid(),
      nome: "Joana",
      senha: "teste123",
      nascimento: "02/02/2002",
      // genero: "feminino",
      email: "joana@gamil.com",
    },
    {
      id: uid(),
      nome: "João",
      senha: "teste123",
      nascimento: "03/03/2003",
      // genero: "masculino",
      email: "joao@gamil.com",
    },
    {
      id: uid(),
      nome: "Maria",
      senha: "teste123",
      nascimento: "04/04/2004",
      // genero: "feminino",
      email: "maria@gamil.com",
    },
  ]);

  /* getters */



  /* actions */

  return {
    usuarios,
  };
});
