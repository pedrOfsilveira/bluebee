<script setup>
import NewsCard from './NewsCard.vue';
import SectionTitle from '../SectionTitle.vue';
import { useStoreNews } from 'src/stores/storeNews';

const storeNews = useStoreNews();
const newsList = storeNews.news;

</script>


<template>
  <div class="section">
    <SectionTitle title="Notícias de Mercado" icon="newspaper" seeAll />

    <div class="news-container">
      <NewsCard v-for="(news, index) in newsList" :key="news.id" :news="news" />
    </div>

  </div>
</template>

<style lang="scss">
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
</style>
