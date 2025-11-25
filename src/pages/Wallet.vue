<script setup>
import HomeHeader from 'src/components/home/HomeHeader.vue';
import SectionTitle from "src/components/SectionTitle.vue";
import DiversificationChart from "src/components/wallet/DiversificationChart.vue";
import History from 'src/components/wallet/History.vue';
import MyAssetsSection from 'src/components/wallet/MyAssetsSection.vue';
import { useStoreUserAssets } from "src/stores/storeUserAssets";
import { ref } from "vue";
const tab = ref("ativos");

const storeUserAssets = useStoreUserAssets()

const percentages = ref({
  stocks: 15,
  fii: 45,
  fixed: 15,
  crypto: 25,
});

// const assets = ref([
//   {
//     name: "PETR4",
//     type: "Ações",
//     amount: "R$ 1.245,32",
//     change: "+2,3%",
//     category: "stocks",
//   },
//   {
//     name: "BBAS3",
//     type: "Ações",
//     amount: "R$ 2.500,00",
//     change: "-1,2%",
//     category: "stocks",
//   },
//   {
//     name: "XPTO11",
//     type: "FII",
//     amount: "R$ 3.100,75",
//     change: "+0,5%",
//     category: "fii",
//   },
//   {
//     name: "Tesouro Selic",
//     type: "Renda Fixa",
//     amount: "R$ 5.000,00",
//     change: "+0,1%",
//     category: "fixed",
//   },
//   {
//     name: "Bitcoin",
//     type: "Criptomoeda",
//     amount: "R$ 10.000,00",
//     change: "+3,8%",
//     category: "crypto",
//   },
// ]);


</script>

<template>
  <HomeHeader/>

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
    />
  </q-tabs>

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="ativos">
      <MyAssetsSection :assets="storeUserAssets.assets"/>
    </q-tab-panel>

    <q-tab-panel name="a">
      <div class="q-pa-md">
        <SectionTitle title="Histórico" />
        <div class="text-body2 text-weight-regular q-mt-sm">
          <History/>
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
