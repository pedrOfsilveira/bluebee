<script setup>
import { computed, onMounted } from 'vue';
import BlueHeader from 'src/components/BlueHeader.vue';
import ChallengeCard from 'src/components/home/ChallengeCard.vue';
import { useStoreChallenges } from 'src/stores/storeChallenges';
import { useStoreUserChallenges } from 'src/stores/storeUserChallenges';

const storeChallenges = useStoreChallenges();
const storeUserChallenges = useStoreUserChallenges();
const challenges = storeChallenges.challenges;

onMounted(() => {
  storeChallenges.loadChallenges();
  storeUserChallenges.loadUserChallenges();
});

const completedIds = computed(() => {
  const list = storeUserChallenges.challenges || [];
  return new Set(list.map(c => c?.desafios?.id).filter(Boolean));
});

const viewChallenges = computed(() => {
  return (challenges || []).map(ch => ({
    ...ch,
    completed: completedIds.value.has(ch.id)
  }));
});
</script>

<template>
  <q-page class="bg-grey-1">
    <BlueHeader>
      <div class="flex justify-center text-center text-h5 text-weight-bolder items-center">
        <q-icon name="fas fa-rocket" class="q-mr-sm" />
        Desafios
      </div>
      <!-- No search bar here -->
    </BlueHeader>

    <div class="section q-mt-lg">
      <div v-if="(viewChallenges || []).length > 0">
        <div class="challenges-container">
          <ChallengeCard
            v-for="challenge in viewChallenges"
            :key="challenge.id"
            :challenge="challenge"
            :completed="challenge.completed"
          />
        </div>
      </div>

      <div v-else class="flex flex-center column q-pa-xl text-grey-5">
        <q-icon name="fas fa-flag-checkered" size="3rem" class="q-mb-md" />
        <div class="text-center">Nenhum desafio disponível.</div>
      </div>
    </div>

    <div class="mb" style="height: 80px;"></div>
  </q-page>
</template>

<style lang="scss">
/* No extra styles: reuses ChallengeCard component styling */
</style>
