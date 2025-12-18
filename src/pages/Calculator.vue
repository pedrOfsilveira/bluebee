<template>
  <BlueHeader>
    <div class="flex text-h5 text-weight-bolder items-center q-">
      <q-icon name="fas fa-calculator" class="q-mr-sm" />
      Simulação
    </div>
  </BlueHeader>
  <div class="q-mb-lg"></div>
  <div class="section">
    <SectionTitle title="Calculadora de Investimentos" icon="calculate" />
    <CalculatorForm />
  </div>
</template>

<script setup>
import BlueHeader from "src/components/BlueHeader.vue";
import CalculatorForm from "src/components/calculator/CalculatorForm.vue";
import SectionTitle from "src/components/SectionTitle.vue";
import { useStoreTutorial } from "src/stores/storeTutorial";
import { onMounted } from "vue";

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor("calculator"), 600);
});
</script>
