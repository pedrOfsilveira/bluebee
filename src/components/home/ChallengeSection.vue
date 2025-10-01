<script setup>
import ChallengeCard from './ChallengeCard.vue';
import SectionTitle from './SectionTitle.vue';

const challenges = [
  {
    title: "Desafio 1",
    desc: "Complete seu perfil para ganhar pontos",
    icon: "person",
  },
  {
    title: "Desafio 2",
    desc: "Conecte sua conta bancária",
    icon: "account_balance",
  },
  {
    title: "Desafio 3",
    desc: "Invista em seu primeiro ativo",
    icon: "trending_up",
  },
  {
    title: "Desafio 4",
    desc: "Compartilhe o app com um amigo",
    icon: "share",
  },
];
</script>

<template>
  <div class="section">
    <SectionTitle title="Seus Desafios Ativos" icon="rocket" seeAll />
    <div class="challenges-container">
      <ChallengeCard v-for="(challenge, index) in challenges" :key="index" :challenge="challenge" />
    </div>
  </div>
</template>
