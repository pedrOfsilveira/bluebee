import { reactive, ref, watch, computed } from "vue";

export function useCompoundInterest() {
  // STATE

  const options = ref([
    {
      label: "Nenhum (usar rentabilidade acima)",
      value: null,
      isIPCA: false,
    },
    {
      label: "CDI (11,25% a.a.)",
      value: 11.25,
      isIPCA: false,
    },
    {
      label: "Poupança (6,17% a.a.)",
      value: 6.17,
      isIPCA: false,
    },
    {
      label: "Tesouro Selic (10,75% a.a.)",
      value: 10.75,
      isIPCA: false,
    },
    {
      label: "Tesouro IPCA (9,50% a.a. + IPCA)",
      value: 9.5,
      isIPCA: true,
    },
  ]);

  // O 'model' continua pegando o primeiro item, só que agora é um objeto
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
  const percentGain = ref('0');

  // COMPUTED

  const isAnnualReturnDisabled = computed(() => {
    return model.value !== options.value[0];
  });

  // WATCHERS

  watch(model, (selectedOption) => {
    if (selectedOption) {
      calculatorForm.annualReturn = selectedOption.value;

      ipcaWarning.value = selectedOption.isIPCA;
    } else {
      calculatorForm.annualReturn = null;
      ipcaWarning.value = false;
    }
  });

  // METHODS

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
      percentGain.value = '0';
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

    let gainPercentage = 0;
    if (invested > 0) {
      gainPercentage = (interest / invested) * 100;
    }

    finalAmount.value = total;
    totalInvested.value = invested;
    totalInterest.value = interest;
    showResults.value = true;
    percentGain.value = gainPercentage.toFixed(2);
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
    percentGain.value = 0;
  };

  // RETURN
  return {
    // STATE
    calculatorForm,
    options,
    model,
    showResults,
    finalAmount,
    totalInvested,
    totalInterest,
    ipcaWarning,
    percentGain,

    // COMPUTED
    isAnnualReturnDisabled,

    // METHODS
    calculateCompoundInterest,
    resetCalculator,
  };
}
