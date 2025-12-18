<script setup>
import HomeHeader from "src/components/home/HomeHeader.vue";
import QuickActions from "src/components/home/QuickActions.vue";
import NewsSection from "src/components/home/NewsSection.vue";
import ChallengeSection from "src/components/home/ChallengeSection.vue";
import { useStoreTutorial } from "src/stores/storeTutorial";
import { onMounted } from "vue";

const storeTutorial = useStoreTutorial();

onMounted(() => {
  setTimeout(() => {
    storeTutorial.startTutorialFor("home");
  }, 600);
});
</script>

<template>
  <q-page>
    <HomeHeader />

    <QuickActions />

    <div class="sections">
      <NewsSection />
      <ChallengeSection />
    </div>

    <div class="mb" />
  </q-page>
</template>
