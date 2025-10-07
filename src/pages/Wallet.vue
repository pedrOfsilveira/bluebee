<template>
  <div class="home-top-container">
    <div class="text-subtitle1 text-weight-regular">Total Investido</div>
    <div class="text-h4 text-weight-bolder q-mt-sm">R$ 5.247,89</div>
    <q-badge
      transparent
      align="middle"
      label="+ R$245,12 (4,9%)"
      class="q-mt-sm q-pa-sm text-weight-bold text-caption positive-bg"
      text-color="positive"
      id="badge"
    />
  </div>

  <q-tabs
    no-caps
    active-color="primary"
    indicator-color="transparent"
    class="text-grey-8 tabs"
    active-bg-color="blue-1"
    v-model="tab"
  >
    <q-tab
      name="ativos"
      icon="account_balance"
      label="Ativos"
      class="tab"
    />
    <q-tab
      name="alarms"
      icon="currency_exchange"
      label="Histórico"
      class="tab"
    />
  </q-tabs>

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="ativos">
      <div class="section">
        <SectionTitle title="Ativos"/>
        <div class="text-body2 text-weight-regular q-mt-sm">
          Aqui você verá todos os seus ativos financeiros.
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="alarms">
      <div class="q-pa-md">
        <SectionTitle title="Histórico"/>
        <div class="text-body2 text-weight-regular q-mt-sm">
          Aqui você verá o histórico de suas transações.
        </div>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<style scoped lang="scss">
.home-top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  margin: 20px;
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
</style>

<script setup>
import SectionTitle from "src/components/SectionTitle.vue";
import { ref } from "vue";
const tab = ref("mails");

/*
<div class="flex w-full h-4 rounded-full overflow-hidden">
  <div class="bg-blue-500 w-[40%]"></div>
  <div class="bg-green-500 w-[20%]"></div>
  <div class="bg-yellow-400 w-[30%]"></div>
  <div class="bg-purple-500 w-[10%]"></div>
</div>
*/
</script>
