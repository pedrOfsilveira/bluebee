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

  // Interval management
  const clearIntervals = () => {
    if (intervalOf4) {
      clearInterval(intervalOf4)
      intervalOf4 = 0
    }
    if (intervalOf12) {
      clearInterval(intervalOf12)
      intervalOf12 = 0
    }
  }

  // teste
  const filterByTime = (assets) => {
    // Prevent stacking multiple intervals on repeated loads/updates
    clearIntervals()

    let assetsOf4 = []
    let assetsOf12 = []
    assets.forEach(asset => {
      asset.ativos.tempo == 4 ? assetsOf4.push(asset) : assetsOf12.push(asset)
    })
    if (assetsOf4.length > 0) {
      intervalOf4 = setInterval(() => {dividend(assetsOf4)}, 4000)
    }
    if (assetsOf12.length > 0) {
      intervalOf12 = setInterval(() => {dividend(assetsOf12)}, 12000)
    }
  }

  const dividend = async (assets) => {
    let dividendTotal = 0;
    assets.forEach(asset => { //foreach que puxa cada ativo que vem do intervalo do loadUserAssets para colocar os dividendos
      let assetDividend = asset.ativos.dividendos ? asset.ativos.dividendos*asset.quantidade : 0
      dividendTotal += assetDividend;
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
      // After loading assets, verify if any challenge thresholds are met
      try { await storeUserChallenges.verifyChallenge() } catch {}
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
        async () => {
          // Reload to keep nested "ativos" hydrated and recalculate challenges
          await loadUserAssets()
          try { await storeUserChallenges.verifyChallenge() } catch {}
        }
      )
      .subscribe()
  }

  const unsubscribeAssets = () => {
    supabase.removeChannel(userAssetsChannel)
    // Ensure timers are cleared when unsubscribing from updates
    clearIntervals()
  }

  const clearUserAssets = () => {
    assets.value = []
    // Stop any running dividend timers
    clearIntervals()
  }

  const buyAsset = async (buyAssetForm, transactionForm) => {
    let searchData = await searchAsset(buyAssetForm.id);
    let returnIfCanBuy = await storeAuth.updateBalance(transactionForm.valor_total)

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
  }

  const sellAsset = async (sellAssetForm, transactionForm) => {
    let searchData = await searchAsset(sellAssetForm.id);

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
    sellAsset,
    // Expose for components to clear on unmount if needed
    clearIntervals
  };
});
