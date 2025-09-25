<template>
  <q-page>
    <div class="home-top-container">
      <div class="header-top">
        <div class="greeting text-h6">Olá, Investidor! 👋</div>
      </div>
      <div class="balance-info">
        <div class="label text-subtitle1">Saldo Conta</div>
        <div class="balance text-h5 text-weight-bolder">R$ 2500,00</div>
      </div>
      <div class="chart-placeholder q-mt-md">
        <div>
          <div class="label text-caption">Seu Patrimônio Atual</div>
          <div class="balance text-h5">R$ 5247.89</div>
        </div>
        <div class="change positive q-my-lg q-px-sm"><i class="fas fa-arrow-up"></i> + R$ 245,12 (4,9%)</div>
      </div>
    </div>

    <!-- <div class="quick-actions">
      <button class="action-btn" href="telaCarteira.html">
        <div class="action-icon"><i class="fas fa-wallet"></i></div>
        <span>Carteira</span>
      </button>
      <button class="action-btn" onclick="navigateTo('explorar')">
        <div class="action-icon"><i class="fas fa-search-dollar"></i></div>
        <span>Explorar</span>
      </button>
      <button class="action-btn" onclick="navigateTo('simulador')">
        <div class="action-icon"><i class="fas fa-calculator"></i></div>
        <span>Simular</span>
      </button>
      <button class="action-btn" onclick="navigateTo('desafios')">
        <div class="action-icon"><i class="fas fa-star"></i></div>
        <span>Desafios</span>
      </button>
    </div> -->

  </q-page>
</template>

<style scoped lang="scss">
.q-page {
  background-color: $bg-light;
}

header {
  background: linear-gradient(135deg, $secondary 0%, $primary 70%, #5c6bc0 100%);
  /* Mais padding inferior */
  position: relative;
  animation: fadeInDownHeader 0.8s ease-out;
}

.home-top-container {

  width: 100%;
  color: white;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(63, 81, 181, 0.4);
  padding: 30px 20px 40px;
  background: linear-gradient(135deg, $secondary 0%, $primary 70%, #5c6bc0 100%);
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* Aumentado */
}

.label {
  opacity: 0.85;
}

// .balance-info .label {
//   font-size: 14px;
//   opacity: 0.85;
//   margin-bottom: 8px;
//   font-weight: 400;
// }

// .balance-info .balance {
//   font-size: 34px;
//   /* Maior */
//   font-weight: 800;
//   /* Mais peso */
//   margin-bottom: 10px;
//   filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15));
// }

// .greeting {
//   font-size: 18px;
//   font-weight: 500;
// }

// .notification-bell {
//   font-size: 22px;
//   cursor: pointer;
//   position: relative;
//   padding: 8px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 50%;
//   transition: all 0.3s ease;
// }

// .notification-bell:hover {
//   background: rgba(255, 255, 255, 0.2);
//   transform: scale(1.1);
// }

// .notification-bell .badge {
//   /* Badge de notificação */
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   width: 8px;
//   height: 8px;
//   background-color: var(--negative-color);
//   border-radius: 50%;
//   border: 1px solid white;
// }


.chart-placeholder {
  height: 140px;
  background: $card-opacity;
  backdrop-filter: blur(8px);
  border-radius: 18px;

  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  color: #1a237e;
  font-size: 28px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.oi {

  /* justify-content: center; */
  padding: 20px;
  /* color: rgba(255, 255, 255, 0.85); */
  color: #1a237e;
  font-size: 28px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

// .chart-placeholder i {
//   font-size: 30px;
//   margin-bottom: 10px;
//   opacity: 0.7;
// }

.chart-placeholder .label {
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 8px;
  font-weight: 400;
}

.chart-placeholder .balance {
  // font-size: 28px;
  /* Maior */
  font-weight: 800;
  /* Mais peso */
  margin-bottom: 10px;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15));
}

.chart-placeholder .change {
  font-size: 14px;
  // margin: 20px 0;
  // padding: 4px 10px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  /* Ajustado */
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  // margin-left: auto;
  /* empurra para a direita */
  // min-width: 10px;
  /* opcional, para não ficar muito pequeno */
  justify-content: flex-end;
  font-weight: 600;
}

.chart-placeholder .change i {
  font-size: 16px;
  /* ícone menor */
  margin-right: 4px;
  margin-top: 8px;
}

.change.positive {
  color: rgb(76, 175, 79);
  background-color: #c8e6c9;
  /* color: #c8e6c9; */
  /* background-color: rgba(76, 175, 80, 0.25); */
}

.change.negative {
  color: #ffcdd2;
  background-color: rgba(244, 67, 54, 0.25);
}

// .quick-actions {
//   display: grid;
//   /* Usando grid para 4 colunas */
//   grid-template-columns: repeat(4, 1fr);
//   gap: 12px;
//   /* Espaço entre botões */
//   background-color: var(--card-bg);
//   margin: -30px 20px 25px;
//   /* Sobreposição elegante */
//   padding: 20px;
//   /* Padding interno */
//   border-radius: 20px;
//   box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
//   animation: fadeInUpQuickActions 0.7s ease-out 0.3s forwards;
//   opacity: 0;
// }

// @keyframes fadeInUpQuickActions {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }

//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }


// .action-btn {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: none;
//   border: none;
//   color: var(--text-light);
//   cursor: pointer;
//   text-align: center;
//   font-size: 12px;
//   font-weight: 500;
//   transition: transform 0.3s ease, color 0.3s ease;
// }

// .action-icon {
//   width: 50px;
//   /* Maior */
//   height: 50px;
//   background: linear-gradient(145deg, #eef2f9, #f8f9fd);
//   /* Gradiente sutil */
//   border-radius: 16px;
//   /* Mais quadrado-arredondado */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 10px;
//   font-size: 22px;
//   color: var(--primary-color);
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
// }

// .action-btn:hover {
//   color: var(--primary-color);
//   transform: translateY(-3px);
// }

// .action-btn:hover .action-icon {
//   background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
//   color: white;
//   transform: scale(1.1) rotate(5deg);
//   box-shadow: 0 8px 20px rgba(63, 81, 181, 0.25);
// }</style>
