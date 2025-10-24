<script setup>
import { defineProps, computed } from "vue";
import { useStoreUserAssets } from "src/stores/storeUserAssets";
import { useCurrencify } from "src/use/useCurrencify";

const storeUserAssets = useStoreUserAssets()

// const props = defineProps({
//   asset: {
//     type: Object,
//     required: true, // É uma boa prática tornar a prop principal requerida
//     default: () => ({
//       name: "Ativo Genérico",
//       amount: "R$ 0,00",
//       change: "+0,0%",
//       category: "stocks",
//     }),
//   },
// });

const props = defineProps({
  asset: {
    type: Object,
    required: true
  },
});

const categoryMap = {
  'Ações': { label: 'Ações', iconClass: 'icon-stocks', emoji: '📈' },
  'Fundo Imobiliário': { label: 'FIIs', iconClass: 'icon-fii', emoji: '🏢' },
  fixed: { label: 'Renda Fixa', iconClass: 'icon-fixed', emoji: '🔒' },
  crypto: { label: 'Cripto', iconClass: 'icon-crypto', emoji: '₿' },
};

const categoryInfo = computed(() => {
  return props.asset.tipo
          ? categoryMap[props.asset.tipo] || categoryMap['Ações']
          : categoryMap[props.asset.ativos.tipo] || categoryMap['Ações'];
});

// const changeClass = computed(() => {
//   console.log(props.asset)
//   return props.asset.change.trim().startsWith('+') ? 'change-positive' : 'change-negative';
// });

</script>

<template>
  <div class="asset-card">
    <div class="asset-icon" :class="categoryInfo.iconClass">{{ categoryInfo.emoji }}</div>
    <div v-if="asset.nome" class="asset-info">
      <div class="asset-name">{{ asset.nome }}</div>
      <div class="asset-type">{{ asset.tipo }}</div>
    </div>
    <div v-else class="asset-info">
      <div class="asset-name" >{{ asset.ativos.nome }}</div>
      <div class="asset-type" >{{ asset.ativos.tipo }}</div>
    </div>
    <div class="asset-value">
      <!-- <div class="asset-amount">{{ useCurrencify(asset.quantidade * asset.ativos.valor_min) }}</div> -->
      <!-- <div class="asset-change" :class="changeClass">{{ asset.ativos.valor_max - asset.ativos.valor_min }}</div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.asset-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e8ecf4;
  position: relative;
  overflow: hidden;
}

.asset-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  transition: left 0.5s ease;
}

.asset-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.asset-card:hover::before {
  left: 100%;
}

.asset-icon {
   border-radius: 18px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 22px;
  color: white;

  transition: all 0.3s ease;
}

.icon-stocks {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
}

.icon-fii {
  background: linear-gradient(135deg, #66bb6a, #43a047);
}

.icon-fixed {
  background: linear-gradient(135deg, #ffc107, #ff8f00);
}

.icon-crypto {
  background: linear-gradient(135deg, #ab47bc, #8e24aa);
}

.asset-info {
  flex: 1;
}

.asset-name {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 16px;
  color: #1a237e;
}

.asset-type {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.asset-value {
  text-align: right;
}

.asset-amount {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 14px;
  color: #1a237e;
}

.asset-change {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
}

.change-positive {
  color: #43a047;
  background: rgba(76, 175, 80, 0.1);
}

.change-negative {
  color: #e53935;
  background: rgba(244, 67, 54, 0.1);
}
</style>
