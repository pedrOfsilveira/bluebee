<script setup>
import HomeHeader from "src/components/home/HomeHeader.vue";
import SectionTitle from "src/components/SectionTitle.vue";
import DiversificationChart from "src/components/wallet/DiversificationChart.vue";
import History from "src/components/wallet/History.vue";
import MyAssetsSection from "src/components/wallet/MyAssetsSection.vue";
import { useStoreUserAssets } from "src/stores/storeUserAssets";
import { ref, computed, onMounted } from "vue";
import { useStoreTutorial } from "src/stores/storeTutorial";
const tab = ref("ativos");

const storeUserAssets = useStoreUserAssets();

const normalizeType = (t) => {
  const s = (t || "").toString().toLowerCase();
  if (s.includes("fundo") || s === "fii") return "fii";
  if (s.includes("cripto") || s === "crypto") return "crypto";

  if (s.includes("renda fixa") || s.includes("fixa") || s.includes("tesouro"))
    return "etf";
  if (s.includes("etf")) return "etf";
  if (
    s.includes("ação") ||
    s.includes("acoes") ||
    s.includes("ações") ||
    s.includes("acao") ||
    s.includes("stock")
  )
    return "stocks";
  return "stocks";
};

const percentages = computed(() => {
  const acc = { stocks: 0, fii: 0, etf: 0, crypto: 0 };
  const list = storeUserAssets.assets || [];
  let total = 0;
  list.forEach((a) => {
    const tipo = a?.tipo || a?.ativos?.tipo;
    const key = normalizeType(tipo);
    const qty =
      typeof a?.quantidade === "number" && a.quantidade > 0 ? a.quantidade : 1;
    if (acc[key] === undefined) acc[key] = 0;
    acc[key] += qty;
    total += qty;
  });
  if (total === 0) return acc;
  const pct = {
    stocks: Math.round((acc.stocks / total) * 100),
    fii: Math.round((acc.fii / total) * 100),
    etf: Math.round((acc.etf / total) * 100),
    crypto: Math.round((acc.crypto / total) * 100),
  };

  const sum = pct.stocks + pct.fii + pct.etf + pct.crypto;
  if (sum !== 100) {
    const entries = Object.entries(pct);
    entries.sort((a, b) => b[1] - a[1]);
    const [largestKey] = entries[0];
    pct[largestKey] += 100 - sum;
  }
  return pct;
});

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor("wallet"), 600);
});
</script>

<template>
  <HomeHeader />

  <DiversificationChart :percentages="percentages" />

  <q-tabs
    no-caps
    active-color="primary"
    indicator-color="transparent"
    class="text-grey-8 tabs"
    active-bg-color="blue-1"
    v-model="tab"
  >
    <q-tab name="ativos" icon="fas fa-landmark" label="Ativos" class="tab" />
    <q-tab
      name="history"
      icon="fas fa-clock-rotate-left"
      label="Histórico"
      class="tab"
      id="wallet-tabs"
    />
  </q-tabs>

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="ativos">
      <MyAssetsSection :assets="storeUserAssets.assets" />
    </q-tab-panel>

    <q-tab-panel name="history">
      <div class="q-pa-md">
        <SectionTitle title="Histórico" />
        <div class="text-body2 text-weight-regular q-mt-sm">
          <History />
        </div>
        <div class="mb"></div>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<style scoped lang="scss">
.tabs {
  border: 1px solid #e8ecf4;
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  margin: 0 20px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 6px;
}

.tab {
  padding: 12px 16px;
  text-align: center;
  flex: 1;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.q-tab-panel,
.q-tab-panels {
  background-color: transparent;
}
</style>
