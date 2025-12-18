<script setup>
import ChallengeCard from "./ChallengeCard.vue";
import SectionTitle from "../SectionTitle.vue";
import { useStoreChallenges } from "src/stores/storeChallenges";
import { computed, onMounted } from "vue";
import { useStoreUserChallenges } from "src/stores/storeUserChallenges";

const storeChallenges = useStoreChallenges();
const storeUserChallenges = useStoreUserChallenges();
const challenges = storeChallenges.challenges;

const completedIds = computed(() => {
  const list = storeUserChallenges.challenges || [];
  return new Set(list.map((c) => c?.desafios?.id).filter(Boolean));
});

const viewChallenges = computed(() => {
  return (challenges || []).map((ch) => ({
    ...ch,
    completed: completedIds.value.has(ch.id),
  }));
});

const limitedChallenges = computed(() => viewChallenges.value.slice(0, 5));

onMounted(() => {
  storeChallenges.loadChallenges();
  storeUserChallenges.loadUserChallenges();
});
</script>

<template>
  <div class="section" id="challenge-section">
    <SectionTitle
      title="Meus Desafios Ativos"
      icon="fas fa-rocket"
      :seeAll="true"
      to="/challenges"
      bb
    />
    <div class="challenges-container">
      <ChallengeCard
        v-for="(challenge, index) in limitedChallenges"
        :key="index"
        :challenge="challenge"
        :completed="challenge.completed"
      />
    </div>
  </div>
</template>
