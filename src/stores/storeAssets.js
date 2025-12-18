import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from "src/use/useShowErrorMessage";
import supabase from "src/config/supabase";

export const useStoreAssets = defineStore("assets", () => {
  const assets = ref([]);

  const assetsLoaded = ref(false);

  let interval = 0;

  const loadAssets = async () => {
    assetsLoaded.value = false;

    let { data, error } = await supabase
      .from("ativos")
      .select("*")
      .order("nome", { ascending: true });

    if (error) useShowErrorMessage(error.message);
    if (data) {
      assets.value = data;
      assetsLoaded.value = true;
    }
  };

  const clearAssets = () => {
    assets.value = [];
  };

  const searchAssets = async (search) => {
    let { data, error } = await supabase
      .from("ativos")
      .select("*")
      .ilike("nome", `%${search}%`)
      .order("nome", { ascending: true });

    if (error) useShowErrorMessage(error.message);
    if (data) {
      assets.value = data;
    }
  };

  const randomNumber = (min, max) => {
    return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));
  };

  const returnPrice = async (asset) => {
    let searchData = await searchRegister(asset.id);

    if (searchData.length >= 1) {
      let unixOld = Math.floor(searchData[0].unix_id / 24);
      let unixNew = Math.floor(Date.now() / 1000 / 24);
      if (unixOld < unixNew) {
        const { error, data } = await supabase
          .from("ativo_registro")
          .update({
            unix_id: Math.floor(Date.now() / 1000),
            preco_atual: randomNumber(asset.valor_min, asset.valor_max),
          })
          .eq("ativo_id", asset.id)
          .select();

        if (error) useShowErrorMessage(error.message);
        if (data) return data;
      } else {
        return searchData;
      }
    } else {
      const { error, data } = await supabase
        .from("ativo_registro")
        .insert({
          ativo_id: asset.id,
          unix_id: Math.floor(Date.now() / 1000),
          preco_atual: randomNumber(asset.valor_min, asset.valor_max),
        })
        .select();
      if (error) useShowErrorMessage(error.message);
      if (data) return data;
    }
  };

  const searchRegister = async (asset_id) => {
    let { data, error } = await supabase
      .from("ativo_registro")
      .select("*")
      .eq("ativo_id", asset_id);

    if (error) useShowErrorMessage(error.message);
    if (data) return data;
  };

  return {
    assets,

    loadAssets,
    clearAssets,
    searchAssets,
    returnPrice,
  };
});
