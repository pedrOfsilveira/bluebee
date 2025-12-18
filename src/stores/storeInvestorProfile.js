import { defineStore } from "pinia";
import { ref, computed } from "vue";
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { useShowErrorMessage } from "src/use/useShowErrorMessage";

export const useStoreInvestorProfile = defineStore("investorProfile", () => {
  // Estado
  const currentStep = ref(0); // Index baseado em 0 (igual ao outro quiz)
  const showResult = ref(false);
  const userPoints = ref([]); // Array para guardar os pontos de cada resposta

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

  // Ações
  const submitAnswer = (option) => {
    // Salva os pontos da resposta escolhida
    userPoints.value.push(option.points);

    if (currentStep.value < questions.value.length - 1) {
      currentStep.value++;
    } else {
      showResult.value = true;
    }
  };

  const prevQuestion = () => {
    if (currentStep.value > 0) {
      userPoints.value.pop(); // Remove a pontuação da última pergunta
      currentStep.value--;
    }
  };

  const restartQuiz = () => {
    currentStep.value = 0;
    showResult.value = false;
    userPoints.value = [];
  };

  // Cálculos
  const totalScore = computed(() => userPoints.value.reduce((a, b) => a + b, 0));

  // Pontuação máxima possível (3 pontos * numero de questões)
  const maxScore = computed(() => questions.value.length * 3);

  const resultProfile = computed(() => {
    const score = totalScore.value;

    if (score <= 7) {
      return {
        title: "Conservador",
        msg: "Você prioriza a segurança. Prefira exposição a FIIs e ETFs amplos, além de ações de empresas consolidadas (blue chips).",
        icon: "fas fa-shield-alt",
        color: "secondary",
        route: "/explore"
      };
    }
    else if (score <= 11) {
      return {
        title: "Moderado",
        msg: "Você aceita correr alguns riscos, mas ainda preza por estabilidade. Carteira ideal: FIIs e ETFs, com uma parcela em Ações.",
        icon: "fas fa-balance-scale",
        color: "warning",
        route: "/explore"
      };
    }
    else {
      return {
        title: "Agressivo",
        msg: "Você entende o mercado e aceita oscilações em busca de alta rentabilidade no longo prazo. Carteira ideal: Ações, FIIs, Cripto e ETFs.",
        icon: "fas fa-rocket",
        color: "negative", // Vermelho/Roxo
        route: "/explore"
      };
    }
  });

  // Persist result to Supabase perfil table and sync auth store
  const saveResult = async () => {
    try {
      const auth = useStoreAuth()
      const userId = auth.userDetails.id
      if (!userId) {
        useShowErrorMessage('Usuário não autenticado.')
        return { ok: false }
      }

      const title = resultProfile.value?.title
      if (!title) {
        useShowErrorMessage('Resultado do perfil não encontrado.')
        return { ok: false }
      }

      // Use 'perfil_investidor' as the canonical column
      let { error } = await supabase
        .from('perfil')
        .update({ perfil_investidor: title })
        .eq('id', userId)

      if (error) {
        // If column missing, try alternative 'investor_profile'
        if (error.code === '42703') {
          const fallback = await supabase
            .from('perfil')
            .update({ investor_profile: title })
            .eq('id', userId)
          if (fallback.error) {
            useShowErrorMessage(fallback.error.message)
            return { ok: false, message: fallback.error.message }
          }
        } else {
          useShowErrorMessage(error.message)
          return { ok: false, message: error.message }
        }
      }

      auth.userDetails.investor_profile = title
      return { ok: true }
    } catch (e) {
      useShowErrorMessage(e.message || 'Erro ao salvar perfil do investidor')
      return { ok: false, message: e.message }
    }
  }

  return {
    questions,
    currentStep,
    showResult,
    userPoints,
    submitAnswer,
    prevQuestion,
    restartQuiz,
    totalScore,
    maxScore,
    resultProfile,
    saveResult
  };
});
