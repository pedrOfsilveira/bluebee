<script setup>
import AuthInput from "../auth/AuthInput.vue";
import { reactive, ref, watch, computed } from "vue";
import vSelectAll from "src/directives/directiveSelectAll.js";
import StatSection from "../profile/StatSection.vue";
import SectionTitle from "../SectionTitle.vue";
import StatCard from "../profile/StatCard.vue";

const options = ref([
  "Nenhum (usar rentabilidade acima)",
  "CDI (11,25$ a.a.)",
  "Poupança (6,17% a.a.)",
  "Tesouro Selic (10,75% a.a.)",
  "Tesouro IPCA (9,50% a.a. + IPCA)",
]);
const model = ref(options.value[0]);

const calculatorForm = reactive({
  initialValue: null,
  monthlyContribution: null,
  periodYears: null,
  annualReturn: null,
});

const showResults = ref(false);
const finalAmount = ref(0);
const totalInvested = ref(0);
const totalInterest = ref(0);
const ipcaWarning = ref(false);

const formatBRL = (value) => {
  if (value === null || isNaN(value)) return "R$ 0,00";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

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

const isAnnualReturnDisabled = computed(() => {
  return model.value !== options.value[0];
});

watch(model, (newValue) => {
  ipcaWarning.value = false;
  if (newValue === options.value[0]) {
    calculatorForm.annualReturn = null;
  } else {
    if (newValue.includes("IPCA")) {
      ipcaWarning.value = true;
    }

    const regex = /(\d+,\d+)/;
    const match = newValue.match(regex);
    if (match && match[1]) {
      const percentageValue = parseFloat(match[1].replace(",", "."));
      calculatorForm.annualReturn = percentageValue;
    } else {
      calculatorForm.annualReturn = null;
    }
  }
});

const calculateCompoundInterest = () => {
  const initial = parseFloat(calculatorForm.initialValue) || 0;
  const monthly = parseFloat(calculatorForm.monthlyContribution) || 0;
  const years = calculatorForm.periodYears || 0;
  const annualRate = calculatorForm.annualReturn || 0;

  if (years === 0 || annualRate === 0) {
    const invested = initial + monthly * years * 12;
    totalInvested.value = invested;
    totalInterest.value = 0;
    finalAmount.value = invested;
    showResults.value = true;
    return;
  }
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = years * 12;

  const fvInitial = initial * Math.pow(1 + monthlyRate, totalMonths);

  const fvMonthly =
    monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

  const total = fvInitial + fvMonthly;
  const invested = initial + monthly * totalMonths;
  const interest = total - invested;

  finalAmount.value = total;
  totalInvested.value = invested;
  totalInterest.value = interest;
  showResults.value = true;
};

const resetCalculator = () => {
  calculatorForm.initialValue = null;
  calculatorForm.monthlyContribution = null;
  calculatorForm.periodYears = null;
  calculatorForm.annualReturn = null;

  model.value = options.value[0];

  showResults.value = false;
  ipcaWarning.value = false;
  finalAmount.value = 0;
  totalInvested.value = 0;
  totalInterest.value = 0;
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
      icon="account_balance"
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
      icon="savings"
      v-select-all
    />
    <AuthInput
      class="q-mb-lg"
      type="number"
      inputmode="decimal"
      v-model.number="calculatorForm.periodYears"
      label="Periodo (Anos)"
      appendIcon
      icon="calendar_month"
      v-select-all
    />
    <AuthInput
      class="q-mb-lg"
      type="number"
      inputmode="decimal"
      v-model.number="calculatorForm.annualReturn"
      label="Rentabilidade Anual Estimada (%)"
      appendIcon
      icon="payments"
      :disable="isAnnualReturnDisabled"
      v-select-all
    />
    <q-select
      class="login-input q-mb-md"
      outlined
      v-model="model"
      :options="options"
      label="Ou indexador base"
    />
    <div class="flexy">
      <q-btn
        class="bradius"
        padding="md"
        icon="delete"
        type="reset"
        color="grey"
      />
      <q-btn label="Calcular" type="submit" class="simulate-btn" />
    </div>
  </q-form>

  <StatSection v-if="showResults">
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
    </div>
  </StatSection>
  <div class="mb"></div>
</template>

<style lang="scss" scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  /* Responsivo */
  gap: 18px;
  /* Mais espaço */
  margin-bottom: 10px;
  /* Ajustado */
}

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

.results-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;

  span {
    color: #555;
  }
}
</style>
