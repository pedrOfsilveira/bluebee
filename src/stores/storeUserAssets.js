import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";

let userAssetsChannel

export const useStoreUserAssets = defineStore("userAssets", () => {
  /* state */

  const assets = ref([])

  const storeAuth = useStoreAuth()

  const assetsLoaded = ref(false)

  /* getters */



  /* actions */

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
          if (payload.eventType === 'INSERT') {
            assets.value.push(payload.new)
          }
          if (payload.eventType === 'DELETE') {
            const index = getEntryIndexById(payload.old.id)
            assets.value.splice(index, 1)
          }
          if (payload.eventType === 'UPDATE') {
            const index = getEntryIndexById(payload.old.id)
            Object.assign(assets.value[index], payload.new)
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

  return {
    assets,

    loadUserAssets,
    unsubscribeAssets,
    clearUserAssets
  };
});
