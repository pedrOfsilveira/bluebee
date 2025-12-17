import { defineStore } from "pinia";
import { ref } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { GoTrueAdminApi } from "@supabase/supabase-js";

export const useStoreHistory = defineStore("history", () => {
  /* state */

  const history = ref([])

  const storeAuth = useStoreAuth()

  const historyLoaded = ref(false)

  /* getters */



  /* actions */

  const loadHistory = async () => {
    historyLoaded.value = false

    let { data, error } = await supabase
      .from('historico')
      .select('*')
      .eq('perfil_id', storeAuth.userDetails.id)
      .order('created_at', {ascending: false})

    if (error) useShowErrorMessage(error.message)
    if (data) {
      history.value = data
      historyLoaded.value = true
    }
  }

  const clearHistory = () => {
    history.value = []
  }

  const searchHistory = async (search) => {
    console.log(search)
    let { data, error } = await supabase
      .from('historico')
      .select('*')
      .ilike('compra_venda', `%${search}%`)
      .order('created_at', {ascending: true})

      if (error) useShowErrorMessage(error.message)
      if (data) {
        history.value = data
      }
  }

  const addHistory = async (addAssetForm, transactionForm) => {
    const newHistory = Object.assign({}, {
      perfil_id: storeAuth.userDetails.id,
      ativo_id: addAssetForm.id,
      quantidade: transactionForm.quantidade,
      compra_venda: transactionForm.compra_venda,
      valor_total: transactionForm.valor_total
    })

    const { error } = await supabase
      .from('historico')
      .insert([
        newHistory,
      ])
      .select()

    if (error) useShowErrorMessage(error.message)
  }

  return {
    history,

    loadHistory,
    clearHistory,
    searchHistory,
    addHistory
  };
});
