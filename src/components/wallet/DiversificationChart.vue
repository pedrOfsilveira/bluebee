<script setup>
import { defineProps } from 'vue';

defineProps({
  percentages: {
    type: Object,
    required: true,
    default: () => ({
      stocks: 0,
      fii: 0,
      fixed: 0,
      crypto: 0,
    }),
  },
});

</script>

<template>
  <div class="section q-mt-md">
    <SectionTitle title="Diversificação" icon="data_usage" />
    <div class="diversification">
      <div class="diversification-chart">
        <div
          class="bar bar-stocks"
          :style="{ width: percentages.stocks + '%' }"
        ></div>
        <div
          class="bar bar-fii"
          :style="{ width: percentages.fii + '%' }"
        ></div>
        <div
          class="bar bar-fixed"
          :style="{ width: percentages.fixed + '%' }"
        ></div>
        <div
          class="bar bar-crypto"
          :style="{ width: percentages.fixed + '%' }"
        ></div>
      </div>
      <div class="diversification-legend">
        <div class="legend-item">
          <span
            class="legend-dot"
            style="background: linear-gradient(135deg, #42a5f5, #1e88e5)"
          ></span>
          Ações ({{ percentages.stocks }}%)
        </div>
        <div class="legend-item">
          <span
            class="legend-dot"
            style="background: linear-gradient(135deg, #66bb6a, #43a047)"
          ></span>
          FIIs ({{ percentages.fii }}%)
        </div>
        <div class="legend-item">
          <span
            class="legend-dot"
            style="background: linear-gradient(135deg, #ffee58, #fbc02d)"
          ></span>
          Renda Fixa ({{ percentages.fixed }}%)
        </div>
        <div class="legend-item">
          <span
            class="legend-dot"
            style="background: linear-gradient(135deg, #ab47bc, #8e24aa)"
          ></span>
          Cripto ({{ percentages.crypto }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diversification {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.diversification:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.diversification-chart {
  display: flex;
  height: 14px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bar {
  height: 100%;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.bar-stocks {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
}

.bar-fii {
  background: linear-gradient(135deg, #66bb6a, #43a047);
}

.bar-fixed {
  background: linear-gradient(135deg, #ffee58, #fbc02d);
}

.bar-crypto {
  background: linear-gradient(135deg, #ab47bc, #8e24aa);
}

.diversification-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  font-weight: 500;
}

.legend-item {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.legend-item:hover {
  transform: translateX(3px);
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
