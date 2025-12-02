<script setup>
import BlueHeader from "src/components/BlueHeader.vue";
import AssetCard from './wallet/AssetCard.vue';
import { useCurrencify } from "src/use/useCurrencify";
import { usePercentageCalculator } from "src/use/usePercentageCalculator";

const props = defineProps({
  asset: {
    type: Object,
    default: () => null,
  },
});

let precoMedio = (props.asset.valor_min+props.asset.valor_max)/2;
</script>

<template>
  <BlueHeader>
    <div class="header-top-row">
      <q-btn
        flat
        round
        icon="fa-solid fa-arrow-left"
        class="back-btn"
        size="sm"
        v-close-popup
      />

      <!-- botão de favorito ainda nao funciona -->
      <q-btn flat round icon="fa-regular fa-star" class="back-btn" size="sm" />

    </div>

      <AssetCard :asset="asset" class="my-asset" />

    <div class="asset-price-info">

      <!-- TROCAR PARA O PREÇO DE VDD -->

      <div class="current-price">{{ useCurrencify(props.asset.valor_atual) }}</div>

      <div class="price-change change-positive">
        <q-icon name="fas fa-caret-up"/> {{ usePercentageCalculator(precoMedio,props.asset.valor_atual).toFixed(2) }}%
      </div>

    </div>
  </BlueHeader>
</template>

<style lang="scss" scoped>
.my-asset {
  width: 100%;
  max-width: 500px;
}


.header-top-row {
  margin-top: -15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.back-btn,
.fav-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 18px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:hover,
.fav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.fav-btn.active {
  color: #ffc107;
  background: rgba(255, 193, 7, 0.2);
  border-color: #ffc107;
}


.asset-price-info {
  text-align: center;
}

.current-price {
  font-size: 32px;
  /* Aumentado */
  font-weight: 700;
  margin-bottom: 5px;
}

.price-change {
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.change-positive {
  color: #a5d6a7;
}

/* Verde mais claro */
.change-negative {
  color: #ef9a9a;
}
</style>
