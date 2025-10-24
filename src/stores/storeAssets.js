import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
//import { useStoreAuth } from "./storeAuth";

//let assetsChannel

export const useStoreAssets = defineStore("assets", () => {
  /* state */

  const assets = ref([])

  //const storeAuth = useStoreAuth()

  const assetsLoaded = ref(false)

  /* getters */



  /* actions */

  const loadAssets = async () => {
    assetsLoaded.value = false

    let { data, error } = await supabase
      .from('ativos')
      .select('*')
      .order('nome', {ascending: true})

    if (error) useShowErrorMessage(error.message)
    if (data) {
      assets.value = data
      assetsLoaded.value = true
    }
  }

  const clearAssets = () => {
    assets.value = []
  }

  return {
    assets,

    loadAssets,
    clearAssets
  };
});
