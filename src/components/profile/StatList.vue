<script setup>
import SectionTitle from "src/components/SectionTitle.vue";
import StatSection from "./StatSection.vue";
import StatCard from "./StatCard.vue";
import StatMessage from "./StatMessage.vue";
</script>

<template>
  <StatSection>
    <SectionTitle class="bb" title="Estatísticas de Uso" icon="bar_chart" />
    <div class="stats-grid">
      <StatCard
        icon="timer"
        value="18h"
        label="Tempo de Uso"
      />
      <StatCard
        icon="workspace_premium"
        value="15"
        label="Desafios Concluídos"
      />
    </div>
  </StatSection>

  <StatSection>

    <SectionTitle class="bb" title="Sugestões e Atenções" icon="error" />
    <StatMessage category="attention">
      Investir mais em <strong>Renda Fixa</strong> para equilibrar a carteira
    </StatMessage>

    <StatMessage category="attention">
      Diversifique mais a sua carteira aplique em
      <strong>Cripto e ETF</strong>.
    </StatMessage>

  </StatSection>

  <StatSection>
    <SectionTitle class="bb" title="Conquistas Recentes" icon="emoji_events" />

    <StatMessage category="suggestion">
      Parabéns pelo seu desempenho em FIIs! Continue explorando novos fundos.
    </StatMessage>

    <StatMessage category="suggestion">
      Você está perto de desbloquear o desafio "Mestre da Diversificação"!
    </StatMessage>

  </StatSection>

  <StatSection>
    <SectionTitle class="bb" title="Medalhas" icon="workspace_premium" seeAll/>
    <div class="stats-medal-grid">
      <StatCard
        icon="emoji_events"
        label="Rei do Mercado"
      />
      <StatCard
        icon="emoji_events"
        label="Guru dos Investimentos"
      />
      <StatCard
        icon="emoji_events"
        label="Imobilista"
      />
    </div>
  </StatSection>
</template>

<style lang="scss" scoped>


.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  /* Responsivo */
  gap: 18px;
  /* Mais espaço */
  margin-bottom: 10px;
  /* Ajustado */
}

.stats-medal-grid {
  display: flex;
  overflow-x: auto;
  gap: 18px;
  padding: 5px 2px 15px 0px;
  scrollbar-width: none;
}

</style>
