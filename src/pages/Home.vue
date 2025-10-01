<script setup>
import HomeHeader from "src/components/home/HomeHeader.vue"
import QuickActions from "src/components/home/QuickActions.vue"
import NewsSection from 'src/components/home/NewsSection.vue';
import ChallengeSection from 'src/components/home/ChallengeSection.vue';
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
