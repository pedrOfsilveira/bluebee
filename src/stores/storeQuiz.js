import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStoreQuiz = defineStore("quiz", () => {
  const currentStep = ref(1);
  const answers = ref({});

  const questions = ref([
    {
      id: 1,
      text: "Como você classificaria seu nível de conhecimento sobre investimentos?",
      options: [
        { label: 'Não tenho conhecimento', value: 'baixa', points: 1 },
        { label: 'Conhecimento básico', value: 'media', points: 2 },
        { label: 'Tenho boa experiência', value: 'alta', points: 3 },
      ]
    },
    {
      id: 2,
      text: "Por quanto tempo você pretende deixar seu dinheiro investido?",
      options: [
        { label: 'Menos de 1 ano', value: 'curto', points: 1 },
        { label: 'De 1 a 5 anos', value: 'medio', points: 2 },
        { label: 'Mais de 5 anos', value: 'longo', points: 3 },
      ]
    },
    {
      id: 3,
      text: "Como você reage a quedas no valor dos seus investimentos?",
      options: [
        { label: 'Vendo tudo imediatamente', value: 'medo', points: 1 },
        { label: 'Aguardo um pouco preocupado', value: 'cautela', points: 2 },
        { label: 'Vejo como oportunidade de compra', value: 'oportunidade', points: 3 },
      ]
    },
    {
      id: 4,
      text: "Qual é o seu principal objetivo?",
      options: [
        { label: 'Preservar meu patrimônio', value: 'seguranca', points: 1 },
        { label: 'Crescer patrimônio com algum risco', value: 'crescimento', points: 2 },
        { label: 'Apostar alto para ganhar muito', value: 'agressivo', points: 3 },
      ]
    },
    {
      id: 5,
      text: "Qual porcentagem da sua renda você poupa mensalmente?",
      options: [
        { label: 'Menos de 10%', value: 'pouco', points: 1 },
        { label: 'Entre 10% e 30%', value: 'razoavel', points: 2 },
        { label: 'Mais de 30%', value: 'muito', points: 3 },
      ]
    }
  ]);

  const currentQuestion = computed(() => {
    return questions.value[currentStep.value - 1];
  });

  const totalQuestions = computed(() => questions.value.length);

  const isCompleted = computed(() => {
    return questions.value.every(q => !!answers.value[q.id]);
  });

  const missingCount = computed(() => {
    return questions.value.filter(q => !answers.value[q.id]).length;
  });

  const setAnswer = (value) => {
    const qId = currentQuestion.value.id;
    answers.value[qId] = value;
  };

  const clearQuiz = () => {
    answers.value = {};
    currentStep.value = 1;
  };

  const calculateProfile = () => {
    let score = 0;

    questions.value.forEach(q => {
      const selectedValue = answers.value[q.id];
      const option = q.options.find(opt => opt.value === selectedValue);
      if (option) score += option.points;
    });

    if (score <= 7) return "Conservador";
    if (score <= 11) return "Moderado";
    return "Arrojado";
  };

  return {
    currentStep,
    answers,
    questions,
    currentQuestion,
    totalQuestions,
    isCompleted,
    missingCount,
    setAnswer,
    clearQuiz,
    calculateProfile
  };
});
