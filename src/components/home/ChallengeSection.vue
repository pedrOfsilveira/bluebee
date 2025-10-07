<script setup>
import ChallengeCard from './ChallengeCard.vue';
import SectionTitle from '../SectionTitle.vue';
import { useStoreChallenges } from 'src/stores/storeChallenges';

const storeChallenges = useStoreChallenges();
const challenges = storeChallenges.challenges;
</script>

<template>
  <div class="section">
    <SectionTitle title="Seus Desafios Ativos" icon="rocket" seeAll />
    <div class="challenges-container">
      <ChallengeCard v-for="(challenge, index) in challenges" :key="index" :challenge="challenge" />
    </div>
  </div>
</template>
