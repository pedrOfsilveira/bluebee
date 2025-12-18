<script setup>
import { useCurrencify } from 'src/use/useCurrencify';
import { useStoreAuth } from 'src/stores/storeAuth';
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useStoreUserAssets } from "src/stores/storeUserAssets";
import { useStoreAssets } from "src/stores/storeAssets";

const storeAuth = useStoreAuth();

const storeUserAssets = useStoreUserAssets();
const storeAssets = useStoreAssets();
const patrimonio = ref(null);

onMounted(async () => {
  const loadedStore = await loadStore(storeUserAssets)
  if (loadedStore.length >= 1) {
    const totals = await Promise.all(
      loadedStore.map(async asset => {
        const register = await storeAssets.returnPrice(asset.ativos)
        const price = register?.[0]?.preco_atual || 0
        const qty = Number(asset.quantidade) || 0
        return price * qty
      })
    )
    const sum = totals.reduce((a,b) => a + b, 0)
    patrimonio.value = Number(sum.toFixed(2))
  } else {
    patrimonio.value = 0
  }
})

onUnmounted(() => {
  // Ensure dividend timers do not keep running across route changes
  storeUserAssets.clearIntervals()
})

const loadStore = async store => {
  if (store.assets.length >= 1) {
    return store.assets
  }
  else {
    await store.loadUserAssets();
    return store.assets
  }
}

const formattedSaldo = computed(() => {
  const saldo = (storeAuth.userDetails && storeAuth.userDetails.saldo != null) ? storeAuth.userDetails.saldo : 0;
  return useCurrencify(saldo);
});

</script>

<template>
  <div class="home-top-container">
    <div class="greeting text-h6">Olá, {{ storeAuth.userDetails.nome }}! 👋</div>
    <div class="balance-info q-mb-sm" id="saldo-box">
      <div class="label text-subtitle2 text-weight-regular">Saldo Conta</div>
      <div class="balance text-h5 text-weight-bolder">{{ formattedSaldo }}</div>
    </div>
    <div class="chart-placeholder flex" id="patrimonio-box">
      <div>
        <div class="text-subtitle2">Seu Patrimônio Atual</div>
        <div v-if="patrimonio !== null" class="text-h4 text-weight-bolder balance">R$ {{ patrimonio.toFixed(2).replace('.', ',') }}</div>
        <q-skeleton v-else type="text" class="text-h4 balance" width="180px" />
        <q-badge

          align="middle"
          label="+ R$245,12 (4,9%)"
          class="q-pa-sm text-weight-bold positive-bg"
          text-color="positive"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// "header"/parte azul da página
header {
  background: linear-gradient(
    135deg,
    $secondary 0%,
    $primary 70%,
    #5c6bc0 100%
  );
  /* Mais padding inferior */
  position: relative;
  animation: fadeInDownHeader 0.8s ease-out;
}

.home-top-container {
  width: 100%;
  color: white;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(63, 81, 181, 0.4);
  padding: 30px 20px 40px;
  background: linear-gradient(
    135deg,
    $secondary 0%,
    $primary 70%,
    #5c6bc0 100%
  );
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}

.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.label {
  opacity: 0.85;
}

.chart-placeholder {
  height: 140px;
  background: $card-opacity;
  backdrop-filter: blur(8px);
  border-radius: 18px;

  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  color: #1a237e;
  font-size: 28px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.chart-placeholder .balance {
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15));
}
</style>
