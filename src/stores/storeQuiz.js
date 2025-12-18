import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useQuizStore = defineStore("quiz", () => {
  const currentQuestionIndex = ref(0);
  const score = ref(0);
  const showResult = ref(false);
  const userAnswers = ref([]);
  const lastFeedback = ref(null);

  const allQuestions = [
    {
      id: 1,
      category: "security",
      text: "Você recebe um SMS: 'Compra aprovada de R$ 2.900. Ligue 0800-123 para cancelar'. O que fazer?",
      options: [
        "Ligo imediatamente para o 0800 do SMS.",
        "Ignoro o SMS e consulto o app do meu banco.",
        "Clico no link para falar com o atendente.",
        "Faço um Pix para estornar a compra.",
      ],
      correct: 1,
    },
    {
      id: 2,
      category: "security",
      text: "Um conhecido pede dinheiro urgente no WhatsApp dizendo que trocou de número. Qual a ação segura?",
      options: [
        "Transferir logo para ajudar.",
        "Pedir uma foto do cartão de crédito dele.",
        "Ligar por voz ou vídeo para o número antigo ou novo para confirmar a identidade.",
        "Mandar o comprovante antes de transferir.",
      ],
      correct: 2,
    },
    {
      id: 3,
      category: "security",
      text: "O que é o 'Golpe do Motoboy'?",
      options: [
        "Um entregador que cobra taxa extra.",
        "Alguém finge ser do banco para buscar seu cartão 'clonado' em casa.",
        "Um motoboy que rouba sua comida.",
        "Uma taxa falsa do iFood.",
      ],
      correct: 1,
    },
    {
      id: 4,
      category: "security",
      text: "Em promessas de 'Urubu do Pix' ou tabelas de multiplicação, o que é verdade?",
      options: [
        "É possível ganhar se entrar no começo.",
        "É sempre golpe. Não existe retorno garantido de 100% imediato.",
        "Funciona se for valor baixo.",
        "É um sistema do Banco Central.",
      ],
      correct: 1,
    },
    {
      id: 5,
      category: "security",
      text: "O banco ligou pedindo para você instalar um aplicativo de 'suporte' (TeamViewer/AnyDesk) para varrer vírus. Você:",
      options: [
        "Instala para proteger a conta.",
        "Passa a senha para o gerente.",
        "Desliga. Bancos nunca pedem para instalar apps de acesso remoto.",
        "Pede o CPF do atendente.",
      ],
      correct: 2,
    },
    {
      id: 6,
      category: "security",
      text: "Para se proteger de clonagem no WhatsApp, qual recurso é essencial?",
      options: [
        "Colocar uma foto de perfil escura.",
        "Ativar a Confirmação em Duas Etapas (PIN).",
        "Não usar foto de perfil.",
        "Apagar as conversas todo dia.",
      ],
      correct: 1,
    },
    {
      id: 7,
      category: "security",
      text: "Ao receber um boleto de condomínio ou luz por e-mail, o que conferir antes de pagar?",
      options: [
        "Apenas o valor.",
        "Se o código de barras é legível.",
        "Os dados do Beneficiário (Nome e CNPJ) na tela de confirmação do banco.",
        "A data de vencimento.",
      ],
      correct: 2,
    },
    {
      id: 8,
      category: "security",
      text: "Uma loja no Instagram vende iPhone pela metade do preço, mas só aceita Pix antecipado. É seguro?",
      options: [
        "Sim, é promoção de queima de estoque.",
        "Provavelmente é golpe ou perfil hackeado.",
        "Sim, se tiver muitos seguidores é confiável.",
        "Só se for boleto.",
      ],
      correct: 1,
    },
    {
      id: 9,
      category: "security",
      text: "O que caracteriza uma Pirâmide Financeira?",
      options: [
        "Venda de produtos cosméticos.",
        "Foco principal em recrutar novas pessoas em vez de vender um produto real.",
        "Investimento na Bolsa de Valores.",
        "Marketing Multinível legalizado.",
      ],
      correct: 1,
    },
    {
      id: 10,
      category: "security",
      text: "Um site de leilão de carros oferece veículos muito baratos. Como saber se é falso?",
      options: [
        "O site não termina em '.br'.",
        "O site tem fotos bonitas.",
        "O site aceita cartão de crédito.",
        "O site tem chat online.",
      ],
      correct: 0,
    },
    {
      id: 11,
      category: "security",
      text: "Ofertaram um empréstimo para você, mas exigem uma 'taxa de cartório' antecipada para liberar. Isso é:",
      options: [
        "Procedimento padrão.",
        "Exigência do Banco Central.",
        "Golpe. Nenhuma instituição cobra taxa antecipada para liberar empréstimo.",
        "Seguro obrigatório.",
      ],
      correct: 2,
    },
    {
      id: 12,
      category: "security",
      text: "Você perdeu o cartão de crédito. Qual a primeira atitude?",
      options: [
        "Postar no Facebook.",
        "Bloquear o cartão no app do banco imediatamente.",
        "Esperar alguém devolver.",
        "Cancelar a conta corrente.",
      ],
      correct: 1,
    },
    {
      id: 13,
      category: "security",
      text: "Qual é a senha mais segura para aplicativos financeiros?",
      options: [
        "123456",
        "Sua data de nascimento",
        "Uma combinação aleatória e única, diferente das redes sociais.",
        "O nome do seu cachorro.",
      ],
      correct: 2,
    },
    {
      id: 14,
      category: "security",
      text: "O que é Phishing?",
      options: [
        "Um vírus que trava o celular.",
        "Técnica de enganar usuários com links/sites falsos para roubar dados.",
        "Um tipo de peixe.",
        "Um investimento de alto risco.",
      ],
      correct: 1,
    },
    {
      id: 15,
      category: "security",
      text: "Ao usar Wi-Fi público (shopping, aeroporto), você deve:",
      options: [
        "Acessar sua conta bancária normalmente.",
        "Evitar acessar apps financeiros ou usar uma VPN.",
        "Fazer compras online.",
        "Atualizar seus dados cadastrais.",
      ],
      correct: 1,
    },
    {
      id: 16,
      category: "security",
      text: "O entregador diz que a máquina quebrou o visor e pede para passar o cartão novamente. O que fazer?",
      options: [
        "Passar, pois a comida vai esfriar.",
        "Verificar o valor no app do banco na hora ou não aceitar passar.",
        "Dar o cartão na mão dele.",
        "Pagar em dinheiro sem recibo.",
      ],
      correct: 1,
    },
    {
      id: 17,
      category: "security",
      text: "Recebeu uma oferta de emprego, mas precisa pagar um 'curso de treinamento' para começar. O que é isso?",
      options: [
        "Processo seletivo rigoroso.",
        "Investimento na carreira.",
        "Golpe do Emprego.",
        "Teste de aptidão.",
      ],
      correct: 2,
    },

    {
      id: 18,
      category: "glossary",
      text: "O que é a Taxa Selic?",
      options: [
        "Taxa de juros do cheque especial.",
        "Taxa básica de juros da economia brasileira, definida pelo Copom.",
        "Imposto sobre lucros.",
        "Taxa de administração de fundos.",
      ],
      correct: 1,
    },
    {
      id: 19,
      category: "glossary",
      text: "O que significa Liquidez?",
      options: [
        "A facilidade e velocidade de transformar um ativo em dinheiro.",
        "O lucro de uma empresa.",
        "A água das hidrelétricas.",
        "Dívida de curto prazo.",
      ],
      correct: 0,
    },
    {
      id: 20,
      category: "glossary",
      text: "O que é o IPCA?",
      options: [
        "Um índice de ações.",
        "O índice oficial de inflação do Brasil.",
        "Um imposto sobre carros.",
        "Instituto de Pesquisa Avançada.",
      ],
      correct: 1,
    },
    {
      id: 21,
      category: "glossary",
      text: "O que são Dividendos?",
      options: [
        "Juros pagos ao banco.",
        "Parcela do lucro das empresas distribuída aos acionistas.",
        "Multa por atraso.",
        "Taxa de corretagem.",
      ],
      correct: 1,
    },
    {
      id: 22,
      category: "glossary",
      text: "O que significa a sigla CDB?",
      options: [
        "Crédito Direto Bancário.",
        "Certificado de Depósito Bancário (Empréstimo para o banco).",
        "Clube de Desconto Brasil.",
        "Conta de Depósito Brasileiro.",
      ],
      correct: 1,
    },
    {
      id: 23,
      category: "glossary",
      text: "O que é o FGC (Fundo Garantidor de Créditos)?",
      options: [
        "Um imposto do governo.",
        "Garantia de até R$ 250 mil por CPF caso o banco quebre.",
        "Fundo de Garantia do Trabalhador.",
        "Fundo de Grandes Catástrofes.",
      ],
      correct: 1,
    },
    {
      id: 24,
      category: "glossary",
      text: "O que caracteriza um investimento de Renda Fixa?",
      options: [
        "Risco muito alto e retorno incerto.",
        "Regras de remuneração definidas no momento da aplicação.",
        "Sempre perde para a inflação.",
        "Só pode sacar depois de 10 anos.",
      ],
      correct: 1,
    },
    {
      id: 25,
      category: "glossary",
      text: "O que é Volatilidade?",
      options: [
        "A intensidade das oscilações de preço de um ativo.",
        "A certeza do lucro.",
        "O volume de dinheiro impresso.",
        "Um tipo de ação.",
      ],
      correct: 0,
    },
    {
      id: 26,
      category: "glossary",
      text: "O que é um FII (Fundo Imobiliário)?",
      options: [
        "Empréstimo para comprar casa própria.",
        "Fundo que investe em imóveis ou papéis do setor imobiliário.",
        "Imposto sobre Imóveis.",
        "Financiamento Estudantil.",
      ],
      correct: 1,
    },
    {
      id: 27,
      category: "glossary",
      text: "O que significa 'Day Trade'?",
      options: [
        "Investir para a aposentadoria.",
        "Comprar e vender o mesmo ativo no mesmo dia.",
        "Trocar de investimento todo mês.",
        "Investir apenas de dia.",
      ],
      correct: 1,
    },
    {
      id: 28,
      category: "glossary",
      text: "O que é o CDI?",
      options: [
        "Certificado de Depósito Interbancário (taxa referência da Renda Fixa).",
        "Clube de Investimento.",
        "Crédito de Imposto.",
        "Comissão de Valores Imobiliários.",
      ],
      correct: 0,
    },
    {
      id: 29,
      category: "glossary",
      text: "O que são Blue Chips?",
      options: [
        "Fichas de cassino.",
        "Ações de empresas grandes, consolidadas e com alta liquidez.",
        "Empresas iniciantes de tecnologia.",
        "Ações baratas que valem centavos.",
      ],
      correct: 1,
    },
    {
      id: 30,
      category: "glossary",
      text: "O que é Reserva de Emergência?",
      options: [
        "Dinheiro para viajar.",
        "Dinheiro guardado para imprevistos (3 a 6 meses de gastos).",
        "Limite do cartão de crédito.",
        "Dinheiro investido na Bolsa.",
      ],
      correct: 1,
    },
    {
      id: 31,
      category: "glossary",
      text: "O que é Alavancagem?",
      options: [
        "Usar dinheiro emprestado para tentar aumentar o retorno (aumentando o risco).",
        "Investir com pouco dinheiro.",
        "Levantar a economia.",
        "Operar apenas com capital próprio.",
      ],
      correct: 0,
    },
    {
      id: 32,
      category: "glossary",
      text: "O que é Bear Market?",
      options: [
        "Mercado em alta otimista.",
        "Mercado em tendência de baixa e pessimismo.",
        "Mercado de venda de animais.",
        "Mercado estável.",
      ],
      correct: 1,
    },
    {
      id: 33,
      category: "glossary",
      text: "O que é a B3?",
      options: [
        "O Banco Central.",
        "A Bolsa de Valores do Brasil.",
        "Um banco digital.",
        "Um imposto.",
      ],
      correct: 1,
    },
    {
      id: 34,
      category: "glossary",
      text: "O que significa IPO?",
      options: [
        "Imposto Predial Obrigatório.",
        "Oferta Pública Inicial (estreia de uma empresa na bolsa).",
        "Índice de Preços Otimizados.",
        "Instituto de Pesquisa Online.",
      ],
      correct: 1,
    },

    {
      id: 35,
      category: "investment",
      text: "Qual a melhor estratégia para diminuir riscos nos investimentos?",
      options: [
        "Investir tudo na ação que mais subiu ontem.",
        "Diversificação (ter ativos diferentes).",
        "Deixar tudo na Poupança.",
        "Seguir dicas de influenciadores cegamente.",
      ],
      correct: 1,
    },
    {
      id: 36,
      category: "investment",
      text: "Por que a Poupança atualmente não é considerada um bom investimento?",
      options: [
        "Porque o banco pode roubar.",
        "Porque frequentemente rende abaixo da inflação, perdendo poder de compra.",
        "Porque cobra Imposto de Renda.",
        "Porque tem risco alto.",
      ],
      correct: 1,
    },
    {
      id: 37,
      category: "investment",
      text: "Qual destes ativos é considerado o mais seguro do Brasil (Risco Soberano)?",
      options: [
        "Ações da Vale.",
        "Tesouro Selic (Título Público Federal).",
        "CDB de banco pequeno.",
        "Debêntures.",
      ],
      correct: 1,
    },
    {
      id: 38,
      category: "investment",
      text: "Se você precisa do dinheiro daqui a 2 meses, onde deve investir?",
      options: [
        "Em Ações.",
        "Em Bitcoin.",
        "Em Renda Fixa com liquidez diária (Ex: Tesouro Selic ou CDB).",
        "Em Imóveis.",
      ],
      correct: 2,
    },
    {
      id: 39,
      category: "investment",
      text: "Qual o efeito dos Juros Compostos no longo prazo?",
      options: [
        "Eles somam juros apenas sobre o valor inicial.",
        "Eles rendem juros sobre juros, criando um efeito 'bola de neve' positivo.",
        "Eles diminuem seu patrimônio.",
        "Eles são irrelevantes.",
      ],
      correct: 1,
    },
    {
      id: 40,
      category: "investment",
      text: "O que significa 'custo de oportunidade'?",
      options: [
        "O custo de abrir uma conta.",
        "O que você deixa de ganhar ao escolher uma opção em vez de outra.",
        "A taxa da corretora.",
        "O preço de uma ação barata.",
      ],
      correct: 1,
    },
    {
      id: 41,
      category: "investment",
      text: "Ao comprar uma Ação, você se torna:",
      options: [
        "Credor da empresa.",
        "Sócio da empresa.",
        "Funcionário da empresa.",
        "Cliente da empresa.",
      ],
      correct: 1,
    },
    {
      id: 42,
      category: "investment",
      text: "Qual investimento é isento de Imposto de Renda para Pessoa Física?",
      options: [
        "CDB.",
        "Tesouro Direto.",
        "LCI e LCA.",
        "Criptomoedas (qualquer valor).",
      ],
      correct: 2,
    },
    {
      id: 43,
      category: "investment",
      text: "Qual a relação entre Risco e Retorno?",
      options: [
        "Quanto maior o risco, maior o potencial de retorno exigido.",
        "Quanto maior o risco, menor o retorno.",
        "Não existe relação.",
        "Alto risco garante alto retorno.",
      ],
      correct: 0,
    },
    {
      id: 44,
      category: "investment",
      text: "O que é um Perfil Conservador?",
      options: [
        "Investidor que aceita perder dinheiro para ganhar muito.",
        "Investidor que prioriza segurança e preservação do patrimônio.",
        "Investidor que não gosta de bancos.",
        "Investidor que só opera Dólar.",
      ],
      correct: 1,
    },
    {
      id: 45,
      category: "investment",
      text: "Em um investimento Pós-fixado atrelado ao CDI (100% do CDI), se a Selic subir:",
      options: [
        "O rendimento do seu investimento aumenta.",
        "O rendimento diminui.",
        "O rendimento fica igual.",
        "Você perde dinheiro.",
      ],
      correct: 0,
    },
    {
      id: 46,
      category: "investment",
      text: "O que é 'Efeito Manada'?",
      options: [
        "Comprar gado.",
        "Seguir a maioria dos investidores sem fazer análise própria (geralmente comprando na alta e vendendo na baixa).",
        "Investir em grupo.",
        "Diversificar a carteira.",
      ],
      correct: 1,
    },
    {
      id: 47,
      category: "investment",
      text: "Qual a vantagem de investir em ETFs (Ex: BOVA11) em vez de ações individuais?",
      options: [
        "Garantia de lucro.",
        "Diversificação instantânea com baixo custo (compra a cesta toda).",
        "Isenção total de impostos.",
        "Recebimento mensal de dividendos garantido.",
      ],
      correct: 1,
    },
    {
      id: 48,
      category: "investment",
      text: "Dinheiro guardado 'debaixo do colchão' é seguro?",
      options: [
        "Sim, ninguém mexe.",
        "Não, pois perde valor para a inflação e corre risco físico (roubo/perda).",
        "Sim, é a melhor opção.",
        "Não, o governo pode confiscar.",
      ],
      correct: 1,
    },
    {
      id: 49,
      category: "investment",
      text: "O que é um investimento Prefixado?",
      options: [
        "Aquele que você sabe a taxa exata de juros no momento da compra (Ex: 12% ao ano).",
        "Aquele que segue a inflação.",
        "Aquele que varia com a Bolsa.",
        "Aquele que não rende nada.",
      ],
      correct: 0,
    },
    {
      id: 50,
      category: "investment",
      text: "Qual a regra de ouro para começar a investir?",
      options: [
        "Pegar empréstimo para investir.",
        "Gastar menos do que ganha e investir a diferença com constância.",
        "Tentar acertar a 'ação do momento'.",
        "Começar só quando for rico.",
      ],
      correct: 1,
    },
  ];

  const questions = ref([...allQuestions]);

  function submitAnswer(optionIndex) {
    const currentQ = questions.value[currentQuestionIndex.value];

    userAnswers.value.push({
      categoryId: currentQ.category,
      isCorrect: optionIndex === currentQ.correct,
    });

    if (optionIndex === currentQ.correct) {
      score.value++;
    }

    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      showResult.value = true;
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      const lastAnswer = userAnswers.value.pop();

      if (lastAnswer && lastAnswer.isCorrect) {
        score.value--;
      }

      currentQuestionIndex.value--;
    }
  }

  function restartQuiz() {
    currentQuestionIndex.value = 0;
    score.value = 0;
    showResult.value = false;
    userAnswers.value = [];

    questions.value = allQuestions.sort(() => Math.random() - 0.5).slice(0, 6);
  }

  if (questions.value.length === 50) {
    restartQuiz();
  }

  const feedback = computed(() => {
    if (!showResult.value || userAnswers.value.length === 0) return null;
    const stats = {
      security: {
        total: 0,
        wrong: 0,
        name: "Segurança Digital",
        route: "/security",
        icon: "fas fa-shield-alt",
      },
      glossary: {
        total: 0,
        wrong: 0,
        name: "Termos Técnicos",
        route: "/glossary",
        icon: "fas fa-book",
      },
      investment: {
        total: 0,
        wrong: 0,
        name: "Conceitos de Investimento",
        route: "/explore",
        icon: "fas fa-chart-line",
      },
    };

    userAnswers.value.forEach((ans) => {
      if (stats[ans.categoryId]) {
        stats[ans.categoryId].total++;
        if (!ans.isCorrect) stats[ans.categoryId].wrong++;
      }
    });

    let worstCategory = null;
    let maxErrorRate = -1;

    Object.keys(stats).forEach((key) => {
      const s = stats[key];
      if (s.total > 0) {
        const errorRate = s.wrong / s.total;
        if (errorRate > maxErrorRate) {
          maxErrorRate = errorRate;
          worstCategory = s;
        }
      }
    });

    if (!worstCategory || maxErrorRate === 0) {
      return {
        title: "Você é um Mestre! 🏆",
        msg: "Você gabaritou esta rodada! Seu conhecimento está afiado.",
        action: "Explorar mais",
        route: "/explore",
        icon: "fas fa-trophy",
        color: "positive",
      };
    } else {
      return {
        title: `Atenção em ${worstCategory.name} ⚠️`,
        msg: `Você errou algumas de ${worstCategory.name}. Que tal revisar?`,
        action: `Ir para ${worstCategory.name}`,
        route: worstCategory.route,
        icon: worstCategory.icon,
        color: "warning",
      };
    }
  });

  // Persist the latest feedback result so other pages (e.g., Profile) can reflect
  // quiz outcomes even after navigating away or restarting the quiz.
  watch(
    () => feedback.value,
    (val) => {
      if (showResult.value && val) {
        lastFeedback.value = val;
      }
    },
    { immediate: false }
  );

  return {
    questions,
    currentQuestionIndex,
    score,
    showResult,
    submitAnswer,
    prevQuestion,
    restartQuiz,
    feedback,
    lastFeedback,
  };
});
