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
          <q-badge transparent align="middle" label="+ R$245,12 (4,9%)" class="q-pa-sm text-weight-bold positive-bg"
            text-color="positive" />
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <button class="action-btn">
        <q-btn flat padding="md" icon="explore" text-color="primary" class="q-mb-sm" />
        <span>Explorar</span>
      </button>
      <button class="action-btn">
        <q-btn flat padding="md" icon="calculate" text-color="primary" class="q-mb-sm" />
        <span>Simular</span>
      </button>
      <button class="action-btn">
        <q-btn flat padding="md" icon="star" text-color="primary" class="q-mb-sm" />
        <span>Desafios</span>
      </button>
    </div>

    <div class="content-sections-wrapper">
      <div class="section">
        <div class="section-title">
          <span class="text-weight-bolder ">
            <q-icon name="comment" size="sm" class="q-mr-sm" />
            Notícias
            do Mercado
          </span>
          <a class="text-weight-bold">Ver tudo</a>
        </div>
        <div class="news-container">
          <div class="news-card">
            <img src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg" alt="Notícia 1"
              class="news-image" />
            <div class="news-content">
              <div class="news-title">
                Impacto da Selic nos investimentos de Renda Fixa e Variável
              </div>
              <div class="news-source">Valor Investe • 5 min leitura</div>
            </div>
          </div>
          <div class="news-card">
            <img src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg" alt="Notícia 2"
              class="news-image" />
            <div class="news-content">
              <div class="news-title">
                Bitcoin e Ethereum: Novas perspectivas para o mercado cripto em
                2025
              </div>
              <div class="news-source">CoinTelegraph • 8 min leitura</div>
            </div>
          </div>
          <div class="news-card">
            <img src="https://harus.ind.br/wp-content/uploads/2023/02/5-praias-brasileiras.jpg" alt="Notícia 3"
              class="news-image" />
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
      <div class="section">
        <div class="section-title">
          <span class="text-weight-bolder">
            <q-icon name="rocket_launch" size="sm" class="q-mr-sm" />
            Seus Desafios Ativos</span>
          <a class="text-weight-bold">Ver todos</a>
        </div>
        <div class="challenges-container">
          <div class="challenge-card">
            <div class="challenge-icon"><q-icon name="house" color="secondary" /></div>
            <div class="challenge-info">
              <div class="challenge-title">Primeiro Mergulho em FIIs</div>
              <div class="challenge-desc">Compre a primeira cota de qualquer Fundo Imobiliário!</div>
            </div>
          </div>
          <div class="challenge-card">
            <div class="challenge-icon"><q-icon name="lightbulb" color="secondary" /></div>
            <div class="challenge-info">
              <div class="challenge-title">Mestre em Ações</div>
              <div class="challenge-desc">Compre 20 cotas de qualquer Ação!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb" />
  </q-page>
</template>

<style scoped lang="scss">
// fundo da página
.q-page {
  background-color: $bg-light;
}

// "header"/parte azul da página
header {
  background: linear-gradient(135deg,
      $secondary 0%,
      $primary 70%,
      #5c6bc0 100%);
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
  background: linear-gradient(135deg,
      $secondary 0%,
      $primary 70%,
      #5c6bc0 100%);
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


.chart-placeholder .balance {
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15));
}

.positive-bg {
  background-color: $bg-positive;
}


.section {
  padding: 0 20px 25px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $secondary;
}

.news-image {
  height: 120px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-container {
  display: flex;
  overflow-x: auto;
  gap: 18px;
  padding: 5px 2px 15px 2px;
  scrollbar-width: none;
}

.news-card {
  min-width: 240px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.news-title {
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.45;
  color: $text-dark;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-content {
  padding: 15px;
}

.news-source {
  font-size: 12px;
  color: $text-light;
  font-weight: 500;
}

.challenge-card {
  background-color: var(--card-bg);
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.challenge-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffecb3, $accent);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 24px;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
  transition: all 0.3s ease;
}

.challenge-info {
  flex: 1;
}

.challenge-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: $secondary;
}

.challenge-desc {
  font-size: 13px;
  color: $text-light;
  line-height: 1.5;
}

.mb {
  margin-bottom: 100px;
}
</style>
