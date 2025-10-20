import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";

let assetsChannel

export const useStoreAssets = defineStore("assets", () => {
  /* state */

  const assets = ref([])

  const storeAuth = useStoreAuth()

  const assetsLoaded = ref(false)

  /* getters */



  /* actions */

  const loadAssets = async () => {
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

    assetsChannel = supabase.channel('assets-channel')
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
    supabase.removeChannel(assetsChannel)
  }

  const clearAssets = () => {
    assets.value = []
  }

  return {
    assets,

    loadAssets,
    unsubscribeAssets,
    clearAssets
  };
});
