import { defineStore } from "pinia";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useStoreTutorial = defineStore("tutorial", () => {
  const stepsByRoute = {
    home: [
      {
        element: "#saldo-box",
        popover: {
          title: "Seu Saldo",
          description:
            "Aqui você acompanha quanto dinheiro você tem para investir.",
        },
      },
      {
        element: "#patrimonio-box",
        popover: {
          title: "Seu Patrimônio",
          description:
            "Aqui você acompanha quanto dinheiro tem investido e suas flutuações.",
        },
      },
      {
        element: "#acoes-rapidas",
        popover: {
          title: "Ações Rápidas",
          description:
            "Acesse os ativos, simulador, desafios e outras sessões por aqui.",
        },
      },
      {
        element: "#news-section",
        popover: {
          title: "Notícias",
          description:
            "Fique por dentro das notícias mais recentes do mercado, clique para mais detalhes!",
        },
      },
      {
        element: "#challenge-section",
        popover: {
          title: "Desafios",
          description: "Complete desafios para ganhar XP e subir de nível!",
        },
      },
      {
        element: "#bottom-nav-tabs",
        popover: {
          title: "Navegação",
          description: "Use estas abas para acessar Início, Carteira e Perfil.",
        },
      },
    ],
    wallet: [
      {
        element: "#diversification-section",
        popover: {
          title: "Diversificação",
          description: "Distribuição da sua carteira por classes de ativos.",
        },
      },
      {
        element: "#wallet-assets-list",
        popover: {
          title: "Meus Ativos",
          description:
            "Lista de ativos que você possui. Toque para ver detalhes.",
        },
      },
      {
        element: "#wallet-tabs",
        popover: {
          title: "Clique aqui",
          description:
            "Escolha entre ver seus ativos da carteira e ver o histórico de transações.",
        },
      },
      {
        element: "#wallet-filter",
        popover: {
          title: "Filtre como quiser",
          description: "Filtre por compras ou vendas registradas.",
        },
      },
      {
        element: "#wallet-history",
        popover: {
          title: "Histórico",
          description:
            "Acompanhe o registro de suas transações com data e hora.",
        },
      },
    ],
    calculator: [
      {
        element: "#calculator-form",
        popover: {
          title: "Simulador",
          description:
            "Informe valores para simular juros compostos e aportes.",
        },
      },
      {
        element: "#simulation-results",
        popover: {
          title: "Resultados",
          description:
            "Veja o total investido, valor final estimado, rendimento e compartilhe com seus amigos.",
        },
      },
    ],
    explore: [
      {
        element: "#explore-search",
        popover: {
          title: "Explorar Ativos",
          description: "Pesquise por nome ou ticker e filtre por categoria.",
        },
      },
      {
        element: ".assets-list",
        popover: {
          title: "Lista de Ativos",
          description:
            "Toque em um ativo para ver mais informações e detalhes.",
        },
      },
    ],
    glossary: [
      {
        element: "#glossary-search",
        popover: {
          title: "Busca no Glossário",
          description: "Pesquise termos e definições financeiras.",
        },
      },
      {
        element: ".terms-container",
        popover: {
          title: "Termos",
          description: "Abra um termo para ler a explicação e exemplos.",
        },
      },
    ],
    security: [
      {
        element: "#security-search",
        popover: {
          title: "Anti-Golpe",
          description: "Pesquise golpes e como se prevenir.",
        },
      },
      {
        element: ".scams-container",
        popover: {
          title: "Casos e Dicas",
          description: "Leia os detalhes e a dica de prevenção de cada caso.",
        },
      },
    ],
    profile: [
      {
        element: "#informacoes",
        popover: {
          title: "Informações",
          description: "Veja seu nome, nível e título.",
        },
      },
      {
        element: ".profile-stats-container",
        popover: {
          title: "Visão Geral",
          description:
            "Acompanhe conquistas, sequência, experiência e seu perfil de investidor.",
        },
      },
      {
        element: "#estatistica",
        popover: {
          title: "Estatísticas de Uso",
          description: "Veja seu tempo de uso e os desafios concluídos.",
        },
      },
      {
        element: "#se-cuida",
        popover: {
          title: "Fique de Olho",
          description: "Receba avisos sobre os seus investimentos.",
        },
      },
      {
        element: "#sugestoes",
        popover: {
          title: "Sugestões",
          description: "Visualize sugestões para melhorar seus conhecimentos.",
        },
      },
      {
        element: "#medalhas",
        popover: {
          title: "Medalhas",
          description:
            "Acesse a sua lista de medalhas recebidas pelos desafios concluídos.",
        },
      },
      {
        element: "#account-settings",
        popover: {
          title: "Configurações",
          description:
            "Acesse e edite suas preferências e informações de conta.",
        },
      },
      {
        element: "#logout-btn",
        popover: {
          title: "Sair da Conta",
          description: "Use aqui para encerrar a sessão com segurança.",
        },
      },
    ],
    quiz: [
      {
        element: "#quiz-options",
        popover: {
          title: "Responder",
          description:
            "Escolha a opção correta. Deslize para voltar se precisar.",
        },
      },
      {
        element: "#quiz-info",
        popover: {
          title: "Resultado",
          description: "Ao finalizar, veja sua pontuação e recomendações.",
        },
      },
    ],
  };

  const startTutorialFor = (routeName) => {
    const key = `bluebee_tutorial_seen_${routeName}`;
    const hasSeen = localStorage.getItem(key);
    const steps = stepsByRoute[routeName] || [];
    if (!hasSeen && steps.length) {
      const d = driver({
        showProgress: true,
        nextBtnText: "Próximo",
        prevBtnText: "Anterior",
        doneBtnText: "Entendi!",
        allowClose: true,
        steps,
        onDestroyed: () => {
          localStorage.setItem(key, "true");
        },
      });
      d.drive();
    }
  };

  const forceTutorialFor = (routeName) => {
    const steps = stepsByRoute[routeName] || [];
    if (steps.length) {
      const d = driver({
        showProgress: true,
        nextBtnText: "Próximo",
        prevBtnText: "Anterior",
        doneBtnText: "Entendi!",
        allowClose: true,
        steps,
      });
      d.drive();
    }
  };

  return {
    startTutorialFor,
    forceTutorialFor,
  };
});
