<script setup>
defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="news-card">
    <img v-if="news.imageUrl" :src="news.imageUrl" :alt="news.title" class="news-image" />

    <div class="news-content">
      <div class="news-title">
        {{ news.title }}
      </div>

      <div class="news-source">
        {{ news.pubDateFormatted }}
      </div>
    </div>
  </div>
</template>
