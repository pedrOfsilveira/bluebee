<script setup>
import StatSection from "src/components/profile/StatSection.vue";
import SectionTitle from "src/components/SectionTitle.vue";
import StatCard from "src/components/profile/StatCard.vue";

import { useShareAsImage } from "src/composables/useShareAsImage.js";

import { formatBRL } from 'src/utils/formatters.js';

defineProps({
  totalInvested: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  totalInterest: {
    type: Number,
    required: true,
  },
  periodYears: {
    type: Number,
    default: 0,
  },
  percentGain: {
    type: String,
    default: "0",
  },
});

const { shareLoading, shareElementAsImage } = useShareAsImage();

const resultsElementId = "simulation-results";
</script>

<template>
  <StatSection :id="resultsElementId" class="results-section-with-share">
    <SectionTitle
      class="bb"
      title="Resultado da Simulação"
      icon="trending_up"
    />
    <div class="stats-grid">
      <StatCard
        icon="account_balance_wallet"
        :value="formatBRL(totalInvested)"
        label="Total Investido"
      />
      <StatCard
        icon="attach_money"
        :value="formatBRL(finalAmount)"
        label="Valor Final Estimado"
      />
      <StatCard
        icon="trending_up"
        :value="formatBRL(totalInterest)"
        label="Ganho Estimado"
      />
      <div class="dois">
        <StatCard
          icon="calendar_month"
          :value="periodYears ? periodYears + ' anos' : '0 anos'"
          label="Período de Investimento"
        />
        <StatCard
          icon="percent"
          :value="percentGain ? percentGain + '%' : '0%'"
          label="Ganho Percentual Estimado"
        />
      </div>
    </div>

    <q-btn
      data-html2canvas-ignore="true"
      class="bottom-right-share-btn"
      round
      flat
      padding="md"
      icon="share"
      @click="shareElementAsImage(resultsElementId)"
      :loading="shareLoading"
    />
  </StatSection>
</template>

<style lang="scss" scoped>
.dois {
  display: flex;
  gap: 16px;

  > * {
    flex: 1 !important;
    min-width: 0 !important;
  }
}

.stats-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 10px;
}

.bb {
  border-bottom: 2px solid #e8ecf4;
  margin-bottom: 18px;
}

.results-section-with-share {
  position: relative;
  overflow: hidden;
  background-color: $bg-card;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  padding: 18px;
  border: 1px solid #e8ecf4;
}

.bottom-right-share-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  background: linear-gradient(135deg, $accent, #ffa000);
  color: $secondary;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.6);
  transition: all 0.3s ease-in-out;
}

.bottom-right-share-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.8);
}
</style>
