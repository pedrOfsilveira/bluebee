import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { Notify } from 'quasar'
import { useStoreHistory } from "./storeHistory";
import { useStoreUserChallenges } from "./storeUserChallenges";

let userAssetsChannel

export const useStoreUserAssets = defineStore("userAssets", () => {
  /* state */

  const assets = ref([])

  const storeAuth = useStoreAuth()
  const storeHistory = useStoreHistory()
  const storeUserChallenges = useStoreUserChallenges()

  const assetsLoaded = ref(false)

  let intervalOf4 = 0;
  let intervalOf12 = 0;
  /* getters */



  /* actions */

  // teste
  const filterByTime = (assets) => {
    let assetsOf4 = []
    let assetsOf12 = []
    assets.forEach(asset => {
      asset.ativos.tempo == 4 ? assetsOf4.push(asset) : assetsOf12.push(asset)
    })
    intervalOf4 = setInterval(() => {dividend(assetsOf4)}, 4000)
    intervalOf12 = setInterval(() => {dividend(assetsOf12)}, 12000)
  }

  const dividend = async (assets) => {
    console.log("assets", assets)
    let dividendTotal = 0;
    assets.forEach(asset => { //foreach que puxa cada ativo que vem do intervalo do loadUserAssets para colocar os dividendos
      let assetDividend = asset.ativos.dividendos ? asset.ativos.dividendos*asset.quantidade : 0
      dividendTotal += assetDividend;
      console.log("aaa "+dividendTotal, "bbb "+assetDividend)
    })
    await storeAuth.updateBalance(dividendTotal);
  }
  //

  const loadUserAssets = async () => {
    assetsLoaded.value = false

    let { data, error } = await supabase
      .from('perfil_ativos')
      .select(`
        quantidade,
        ativos (*)
      `)
      .eq('perfil_id', storeAuth.userDetails.id)

    if (error) useShowErrorMessage(error.message)
    if (data) {
      assets.value = data
      assetsLoaded.value = true
      subscribeAssets()
      filterByTime(assets.value) //filtra pelo tempo de cada ativo, dividindo em arrays
    }
  }

  const subscribeAssets = () => {
    const storeAuth = useStoreAuth()

    userAssetsChannel = supabase.channel('userAssets-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'perfil_ativos',
          filter: `perfil_id=eq.${ storeAuth.userDetails.id }`
        },
        (payload) => {
          console.log(payload)
          if (payload.eventType === 'INSERT') {
            console.log("aa")
            assets.value.push(payload.new)
          }
          if (payload.eventType === 'DELETE') {
            const index = getAssetIndexByIds(payload.old.perfil_id, payload.old.ativo_id)
            assets.value.splice(index, 1)
          }
          if (payload.eventType === 'UPDATE') {
            const index = getAssetIndexByIds(payload.old.perfil_id, payload.old.ativo_id)
            assets.value[index].quantidade = payload.new.quantidade
          }
        }
      )
      .subscribe()
  }

  const unsubscribeAssets = () => {
    supabase.removeChannel(userAssetsChannel)
  }

  const clearUserAssets = () => {
    assets.value = []
  }

  const buyAsset = async (buyAssetForm, transactionForm) => {
    let searchData = await searchAsset(buyAssetForm.id);
    let returnIfCanBuy = await storeAuth.updateBalance(transactionForm.valor_total)
    console.log("can buy", returnIfCanBuy)

    if (searchData.length >= 1 && returnIfCanBuy) {
      const { error } = await supabase
        .from('perfil_ativos')
        .update({
          quantidade: searchData[0].quantidade+transactionForm.quantidade, //podemos mudar isso caso a gente coloque como definir uma quantidade
        })
        .eq('perfil_id', storeAuth.userDetails.id)
        .eq('ativo_id', buyAssetForm.id)
        .select()

      if (error) useShowErrorMessage(error.message)
    }
    else if (returnIfCanBuy) {
      const newAsset = Object.assign({}, {
        perfil_id: storeAuth.userDetails.id,
        ativo_id: buyAssetForm.id,
        quantidade: transactionForm.quantidade,
      })

      const { error } = await supabase
        .from('perfil_ativos')
        .insert([
          newAsset,
        ])
        .select()

      if (error) useShowErrorMessage(error.message)
      else {
        Notify.create({
          type: "positive",
          message: 'Ativo Adicionado!',
          position: 'top'
        })
      }
    }
    console.log("buy form", buyAssetForm)
    console.log("quantidade", transactionForm.quantidade)
    console.log("valor_total", transactionForm.valor_total)
    console.log("teste_desafio", await storeUserChallenges.verifyChallenge())
  }

  const sellAsset = async (sellAssetForm, transactionForm) => {
    let searchData = await searchAsset(sellAssetForm.id);
    console.log(searchData[0])
    console.log(searchData[0].quantidade)

    if (searchData[0].quantidade >= transactionForm.quantidade) {
      if (searchData[0].quantidade == transactionForm.quantidade) {
        const { error } = await supabase
          .from('perfil_ativos')
          .delete()
          .eq('perfil_id', storeAuth.userDetails.id)
          .eq('ativo_id', sellAssetForm.id)

        if (error) useShowErrorMessage(error.message)
        else {
          Notify.create({
            type: "negative",
            message: 'Ativo Removido!',
            position: 'top'
          })

          await storeHistory.addHistory(sellAssetForm, transactionForm)
        }
      }
      else {
        const { error } = await supabase
          .from('perfil_ativos')
          .update({
            quantidade: searchData[0].quantidade-transactionForm.quantidade, //podemos mudar isso caso a gente coloque como definir uma quantidade
          })
          .eq('perfil_id', storeAuth.userDetails.id)
          .eq('ativo_id', sellAssetForm.id)
          .select()

        if (error) useShowErrorMessage(error.message)
        else await storeHistory.addHistory(sellAssetForm, transactionForm)
      }
      await storeAuth.updateBalance(transactionForm.valor_total)
    }
    else useShowErrorMessage("Você não possui essa quantidade de ativos.")

    console.log("sell form", sellAssetForm)
    console.log("transaction form", transactionForm)
  }

  // helpers

  const searchAsset = async asset_id => {
    let { data, error } = await supabase
      .from('perfil_ativos')
      .select("quantidade")
      .eq('perfil_id', storeAuth.userDetails.id)
      .eq('ativo_id', asset_id)

    if (error) useShowErrorMessage(error.message)
    if (data) return data
  }

  const getAssetIndexByIds = (perfil_id, ativo_id) => {
    let findedAsset = assets.value.findIndex(asset => {
      return storeAuth.userDetails.id === perfil_id && asset.ativos.id === ativo_id
    })
    return findedAsset
  }

  return {
    assets,

    loadUserAssets,
    unsubscribeAssets,
    clearUserAssets,
    buyAsset,
    sellAsset
  };
});
