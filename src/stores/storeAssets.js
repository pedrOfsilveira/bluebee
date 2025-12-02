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

  let interval = 0;

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
      setPriceAssets(assets.value)
    }
  }

  const clearAssets = () => {
    assets.value = []
  }

  const searchAssets = async (search) => {
    console.log(search)
    let { data, error } = await supabase
      .from('ativos')
      .select('*')
      .ilike('nome', `%${search}%`)
      .order('nome', {ascending: true})

      if (error) useShowErrorMessage(error.message)
      if (data) {
        assets.value = data
      }
  }

  const randomNumber = (min, max) => {
    return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2))
  }

  // funcao que seta o valor atual após carregar todos os ativos
  const setPriceAssets = (assets) => {
    assets.forEach(asset => {
      asset.valor_atual = randomNumber(asset.valor_min, asset.valor_max)
    });
    interval = setInterval(() => {reloadPriceAssets(assets)}, 24000)
  }

  // funcao que sera chamada pelo setInterval com uma array de todos os objetos para mudar o valor atual de cada um de tanto em tanto tempo
  const reloadPriceAssets = (assets) => {
    assets.forEach(asset => {
      asset.valor_atual = randomNumber(asset.valor_min, asset.valor_max)
    });
  }

  return {
    assets,

    loadAssets,
    clearAssets,
    searchAssets
  };
});
