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

  // strike atual (dias consecutivos)
  const strike = ref(1)

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
      // atualiza strike sempre que carregar histórico
      try {
        strike.value = computeStrike()
      } catch (err) {
        console.error('computeStrike failed', err)
        strike.value = 1
      }
    }
  }

  const clearHistory = () => {
    history.value = []
  }

  const searchHistory = async (search) => {
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
    else {
      strike.value = computeStrike()
    }
  }

  const computeStrike = () => {
    // retorna número de dias consecutivos iniciando em hoje
    // regra: se não houver registro hoje, o strike é 1

    if (!Array.isArray(history.value) || history.value.length === 0) return 1

    const toDateKey = (input) => {
      const date = (input instanceof Date) ? input : new Date(input)
      if (isNaN(date)) return null
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    }

    const set = new Set()
    for (const rec of history.value) {
      const created = rec?.created_at ?? rec?.createdAt ?? rec?.date ?? rec
      const key = toDateKey(created)
      if (key) set.add(key)
    }

    const todayKey = toDateKey(new Date())
    // se não houver registro hoje, por regra, retorna 1
    if (!set.has(todayKey)) return 1

    let count = 0
    const cursor = new Date()
    // conta enquanto houver registro em dias consecutivos
    while (true) {
      const k = toDateKey(cursor)
      if (!k) break
      if (set.has(k)) {
        count += 1
        cursor.setDate(cursor.getDate() - 1)
      } else break
    }

    return count
  }

  return {
    history,

    loadHistory,
    clearHistory,
    searchHistory,
    addHistory,

    // strike helper
    computeStrike,
    strike
  };
});
