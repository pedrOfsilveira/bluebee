<template>
  <q-page>
    <div class="home-top-container">
      <div class="greeting text-h6">Olá, Investidor! 👋</div>
      <div class="balance-info q-mb-sm">
        <div class="label text-subtitle2 text-weight-regular">Saldo Conta</div>
        <div class="balance text-h5 text-weight-bolder">R$ 2500,00</div>
      </div>
      <div class="chart-placeholder flex">
        <div>
          <div class="text-subtitle2">Seu Patrimônio Atual</div>
          <div class="text-h4 text-weight-bolder balance">R$ 5247.89</div>
          <!-- <div class="text-caption bg-light-green-3 q-pa-sm ">+ R$ 245,12 (4,9%)</div> -->
          <q-badge
            transparent
            align="middle"
            label="+ R$245,12 (4,9%)"
            class="q-pa-sm text-weight-bold positive-bg"
            text-color="positive"
          />
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <button class="action-btn">
        <q-btn
          flat
          padding="md"
          icon="explore"
          text-color="primary"
          class="q-mb-sm"
        />
        <span>Explorar</span>
      </button>
      <button class="action-btn">
        <q-btn
          flat
          padding="md"
          icon="calculate"
          text-color="primary"
          class="q-mb-sm"
        />
        <span>Simular</span>
      </button>
      <button class="action-btn">
        <q-btn
          flat
          padding="md"
          icon="star"
          text-color="primary"
          class="q-mb-sm"
        />
        <span>Desafios</span>
      </button>
    </div>

    <div class="content-sections-wrapper">
      <div class="section">
        <div class="section-title">
          <span>
            Notícias
            do Mercado
          </span>
          <a>Ver tudo</a>
        </div>
        <div>
          <div>
            <img
              src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg"
              alt="Notícia 1"
              class="news-image"
            />
            <div>
              <div>
                Impacto da Selic nos investimentos de Renda Fixa e Variável
              </div>
              <div>Valor Investe • 5 min leitura</div>
            </div>
          </div>
          <div>
            <img
              src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg"
              alt="Notícia 2"
              class="news-image"
            />
            <div class="news-content">
              <div class="news-title">
                Bitcoin e Ethereum: Novas perspectivas para o mercado cripto em
                2025
              </div>
              <div class="news-source">CoinTelegraph • 8 min leitura</div>
            </div>
          </div>
          <div class="news-card" onclick="navigateTo('noticia3')">
            <img
              src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg"
              alt="Notícia 3"
              class="news-image"
            />
            <div class="news-content">
              <div class="news-title">
                Fundos Imobiliários (FIIs): O que esperar para o próximo
                semestre?
              </div>
              <div class="news-source">InfoMoney • 3 min leitura</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
// fundo da página
.q-page {
  background-color: $bg-light;
}

// "header"/parte azul da página
header {
  background: linear-gradient(
    135deg,
    $secondary 0%,
    $primary 70%,
    #5c6bc0 100%
  );
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
  background: linear-gradient(
    135deg,
    $secondary 0%,
    $primary 70%,
    #5c6bc0 100%
  );
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}

.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.label {
  opacity: 0.85;
}

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

.quick-actions {
  // background-color: $card-opacity;
  background-color: white;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  margin: -30px 20px 25px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: $text-light;
  transition: transform 0.3s ease, color 0.3s ease;
}

.action-btn .q-btn {
  background: linear-gradient(145deg, #eef2f9, #f8f9fd);
  border-radius: 16px;
}

// .chart-placeholder .balance {
//   // font-size: 28px;
//   /* Maior */
//   font-weight: 800;
//   /* Mais peso */
//   margin-bottom: 10px;
//
// }

.chart-placeholder .balance {
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15));
}

.positive-bg {
  background-color: $bg-positive;
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
</style>
