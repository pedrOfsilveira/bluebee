<script setup>
import { useCurrencify } from 'src/use/useCurrencify';
import { useStoreAuth } from 'src/stores/storeAuth';
import { onMounted, computed, ref } from 'vue';
import { useStoreUserAssets } from "src/stores/storeUserAssets";
import { useStoreAssets } from "src/stores/storeAssets";
import { usePercentageCalculator } from 'src/use/usePercentageCalculator';
import { useColorPercentage } from 'src/use/useColor';

const storeAuth = useStoreAuth();

const storeUserAssets = useStoreUserAssets();
const storeAssets = useStoreAssets();
const patrimonio = ref(null);
const flutuacao = ref(null);
const real_float = ref(null);

onMounted(async () => {
  const loadedStore = await loadStore(storeUserAssets)
  if (loadedStore.length >= 1) {
    const totals = await Promise.all(
      loadedStore.map(async asset => {
        const register = await storeAssets.returnPrice(asset.ativos)
        const price = register?.[0]?.preco_atual || 0
        const qty = Number(asset.quantidade) || 0
        const middle_price = (asset.ativos.valor_max+asset.ativos.valor_min)/2
        const real_float = (price-middle_price)
        return {preco_total: price * qty, real_float: real_float}
      })
    )
    let sum = 0;
    let sum_float = 0;
    totals.forEach(price => {
      sum += price.preco_total
      sum_float += price.real_float
    })
    let sum_per = usePercentageCalculator(sum-sum_float, sum)
    patrimonio.value = Number(sum.toFixed(2))
    flutuacao.value = Number(sum_per.toFixed(2))
    real_float.value = Number(sum_float.toFixed(2))
  } else {
    patrimonio.value = 0
    flutuacao.value = 0
    real_float.value = 0
  }
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

const formattedRealFloat = computed(() => {
  if (real_float.value === null || isNaN(real_float.value)) return null;
  const absVal = Math.abs(Number(real_float.value));
  return useCurrencify(absVal);
});

const badgeColor = computed(() => {
  if (flutuacao.value === null || isNaN(flutuacao.value)) return 'grey-7';
  if (flutuacao.value > 0) return 'positive';
  if (flutuacao.value < 0) return 'negative';
  return 'grey-7';
});

const badgeTextColor = computed(() => {
  // Ensure readable text contrast against background
  return badgeColor.value === 'grey-7' ? 'dark' : 'white';
});

const badgeLabel = computed(() => {
  if (formattedRealFloat.value === null || flutuacao.value === null || isNaN(flutuacao.value)) return null;
  const sign = real_float.value > 0 ? '+' : real_float.value < 0 ? '-' : '';
  const perc = Number(flutuacao.value).toFixed(2);
  return `${sign ? sign + ' ' : ''}${formattedRealFloat.value} (${perc}%)`;
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
          v-if="badgeLabel"
          align="middle"
          :label="badgeLabel"
          class="q-pa-sm text-weight-bold"
          :color="badgeColor"
          :text-color="badgeTextColor"
        />
        <q-skeleton v-else type="text" width="120px" />
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
