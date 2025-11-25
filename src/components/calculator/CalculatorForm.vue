<script setup lang="js">
import AuthInput from "src/components/auth/AuthInput.vue";
import CalculatorResults from 'src/components/calculator/CalculatorResults.vue';

import vSelectAll from "src/directives/directiveSelectAll.js";

import { useCompoundInterest } from "src/composables/useCompoundInterest.js";

const {
  calculatorForm,
  options,
  model,
  showResults,
  finalAmount,
  totalInvested,
  totalInterest,
  percentGain,
  isAnnualReturnDisabled,
  calculateCompoundInterest,
  resetCalculator,
} = useCompoundInterest();


const formatCurrency = (fieldName) => {
  let value = calculatorForm[fieldName];
  if (value === null || value === "") {
    calculatorForm[fieldName] = null;
    return;
  }
  const valueString = String(value).replace(",", ".");
  const numberValue = parseFloat(valueString);

  if (!isNaN(numberValue)) {
    calculatorForm[fieldName] = numberValue.toFixed(2);
  } else {
    calculatorForm[fieldName] = null;
  }
};

</script>
<template>
  <q-form
    class="stat-section"
    @submit="calculateCompoundInterest"
    @reset="resetCalculator"
  >
    <AuthInput
      class="q-mb-lg"
      type="text"
      inputmode="decimal"
      v-model="calculatorForm.initialValue"
      @blur="formatCurrency('initialValue')"
      label="Valor Inicial (R$)"
      appendIcon
      icon="fas fa-landmark"
      v-select-all
    />
    <AuthInput
      class="q-mb-lg"
      type="text"
      inputmode="decimal"
      v-model="calculatorForm.monthlyContribution"
      @blur="formatCurrency('monthlyContribution')"
      label="Aporte Mensal (R$)"
      appendIcon
      icon="fas fa-piggy-bank"
      v-select-all
    />
    <AuthInput
      class="q-mb-lg"
      type="number"
      inputmode="decimal"
      v-model.number="calculatorForm.periodYears"
      label="Periodo (Anos)"
      appendIcon
      icon="fas fa-calendar-days"
      v-select-all
    />
    <AuthInput
      class="q-mb-lg"
      type="number"
      inputmode="decimal"
      v-model.number="calculatorForm.annualReturn"
      label="Rentabilidade Anual Estimada (%)"
      appendIcon
      icon="fas fa-money-bills"
      :disable="isAnnualReturnDisabled"
      v-select-all
    />
    <q-select
      class="login-input q-mb-md"
      outlined
      v-model="model"
      :options="options"
      option-label="label"
      label="Ou indexador base"
    />
    <div class="flexy">
      <q-btn
        class="bradius"
        padding="md"
        icon="fas fa-trash-can"
        type="reset"
        color="grey"
      />
      <q-btn label="Calcular" type="submit" class="simulate-btn" />
    </div>
  </q-form>

  <CalculatorResults
    v-if="showResults"
    :total-invested="totalInvested"
    :final-amount="finalAmount"
    :total-interest="totalInterest"
    :period-years="calculatorForm.periodYears"
    :percent-gain="percentGain"
  />
  <div class="mb"></div>
</template>

<style lang="scss" scoped>


.bb {
  border-bottom: 2px solid #e8ecf4;
  margin-bottom: 18px;
}

.bradius {
  border-radius: 16px !important;
}

.flexy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.stat-section {
  background-color: $bg-card;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  padding: 18px;
  border: 1px solid #e8ecf4;
}

.simulate-btn {
  width: 70%;
  padding: 18px;
  background: linear-gradient(135deg, $accent, #ffa000);
  color: $secondary;
  border: none;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.simulate-btn:hover {
  background: linear-gradient(135deg, #ffd54f, $accent);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(255, 193, 7, 0.5);
}

</style>
