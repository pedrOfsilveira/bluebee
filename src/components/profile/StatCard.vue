<script setup>
import SectionTitle from 'src/components/SectionTitle.vue';
</script>

<template>
  <div class="stat-section">
    <SectionTitle title="Estatísticas de Uso" icon="bar_chart" />
    <div class="stats-grid">
      <div class="stat-card">
        <q-icon name="timer" class="stat-icon" />
        <div class="stat-value" data-target="18">18h</div>
        <div class="stat-label">Tempo de Uso</div>
      </div>
      <div class="stat-card">
        <q-icon name="workspace_premium" class="stat-icon" />
        <div class="stat-value" data-target="7">15</div>
        <div class="stat-label">Desafios Concluídos</div>
      </div>
    </div>
  </div>
  <div class="stat-section">
    <SectionTitle title="Sugestões e Atenções" icon="error" />
    <div class="list-item attention-item">
      <q-icon name="lightbulb" class="list-icon" />
      <span class="list-text">Investir mais em <strong>Renda Fixa</strong> para equilibrar a carteira</span>
    </div>
    <div class="list-item attention-item">
      <q-icon name="lightbulb" class="list-icon" />
      <span class="list-text">Diversifique mais a sua carteira aplique em <strong>Cripto e ETF</strong>.</span>
    </div>
  </div>

  <div class="mb"></div>
</template>

<style lang="scss" scoped>
.stat-section {
  background-color: $bg-card;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  padding: 18px;
  border: 1px solid #e8ecf4;
}


.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  /* Responsivo */
  gap: 18px;
  /* Mais espaço */
  margin-bottom: 10px;
  /* Ajustado */

}

.stat-card {
  background: linear-gradient(145deg, #eef2f9, #f8f9fd);
  padding: 20px 15px;
  /* Padding ajustado */
  border-radius: 16px;
  /* Mais arredondado */
  text-align: center;
 border: 1px solid #e8ecf4;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 28px;
  /* Maior */
  color: $primary;

  opacity: 0.8;
}

.stat-value {
  font-size: 24px;
  /* Maior */
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 13px;
  color: $text-light;
  font-weight: 500;
}

.list-item {
  display: flex;
  align-items: flex-start;
  /* Alinha ícone com a primeira linha de texto */
  margin-bottom: 15px;
  /* Mais espaço */
  padding: 18px;
  /* Mais padding */
  border-radius: 12px;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.list-icon {
  font-size: 20px;
  /* Maior */
  margin-right: 15px;
  margin-top: 2px;
  /* Alinhamento vertical fino */
  width: 24px;
  /* Largura fixa para alinhamento */
  text-align: center;
}

.list-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: $text-dark;
  font-weight: 500;
}

.suggestion-item {
  background-color: rgba(46, 204, 113, 0.08);
  /* Verde mais suave */
  border-left: 5px solid $positive;
}

.suggestion-item .list-icon {
  color: $positive;
}

.attention-item {
  /* Renomeado de error-item */
  background-color: rgba(243, 156, 18, 0.08);
  /* Laranja mais suave */
  border-left: 5px solid $accent;
}

.attention-item .list-icon {
  color: $accent;
}
</style>
