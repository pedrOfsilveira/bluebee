import { defineStore } from "pinia";
import { driver } from "driver.js";
import "driver.js/dist/driver.css"; // Importa o CSS padrão
import { useStoreAuth } from "./storeAuth"; // Para dar XP no final (opcional)

export const useStoreTutorial = defineStore("tutorial", () => {

  // Configuração dos passos
  const driverObj = driver({
    showProgress: true,
    nextBtnText: 'Próximo',
    prevBtnText: 'Anterior',
    doneBtnText: 'Entendi!',
    steps: [
      {
        element: '#saldo-box',
        popover: {
          title: 'Seu Patrimônio',
          description: 'Aqui você acompanha quanto dinheiro você tem para investir.'
        }
      },
      {
        element: '#acoes-rapidas',
        popover: {
          title: 'Ações Rápidas',
          description: 'Acesse o simulador, notícias e quiz rapidamente por aqui.'
        }
      },
      {
        element: '#challenge-section', // Lembra de por esse ID no ChallengeSection.vue
        popover: {
          title: 'Desafios',
          description: 'Complete missões diárias para ganhar XP e subir de nível!'
        }
      },
      // Adicione passos para a barra de navegação inferior se quiser (tab-bar)
    ],
    onDestroyStarted: () => {
      // Quando o tutorial termina ou é pulado
      finishTutorial()
    }
  });

  const startTutorial = () => {
    // Verifica se já viu o tutorial (salvo no LocalStorage do navegador)
    const hasSeen = localStorage.getItem('bluebee_tutorial_seen');

    if (!hasSeen) {
      driverObj.drive();
    }
  };

  const forceTutorial = () => {
    driverObj.drive(); // Para chamar via botão "Ajuda" no perfil
  };

  const finishTutorial = () => {
    localStorage.setItem('bluebee_tutorial_seen', 'true');
    // BÔNUS: Você pode dar XP aqui se quiser
    // const auth = useStoreAuth();
    // auth.addExperience(50);
  };

  return {
    startTutorial,
    forceTutorial
  };
});
