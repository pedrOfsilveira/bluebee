<script setup>
import { ref, onMounted } from "vue";
import { useStoreNews } from "src/stores/storeNews";
import NewsCard from "./NewsCard.vue";
import SectionTitle from "../SectionTitle.vue";

const storeNews = useStoreNews();
const dialogVisible = ref(false);
const selectedNews = ref(null);

const showNewsDetails = (news) => {
  selectedNews.value = news;
  dialogVisible.value = true;
};

onMounted(() => {
  if (!storeNews.newsState.noticias.length) {
    storeNews.fetchNoticias(5);
  }
});
</script>

<template>
  <div class="section" id="news-section">
    <SectionTitle title="Notícias de Mercado" icon="fas fa-newspaper" bb />

    <div class="news-container">
      <div
        v-if="storeNews.newsState.loading"
        class="flex justify-center full-width"
      >
        <q-spinner color="secondary" size="3em" :thickness="5" />
      </div>

      <NewsCard
        v-for="(news, index) in storeNews.newsState.noticias"
        :key="index"
        :news="news"
        @click="showNewsDetails(news)"
      />
    </div>

    <q-dialog v-model="dialogVisible">
      <q-card
        v-if="selectedNews"
        class="my-card no-scrollbar"
        style="width: 100%; max-width: 500px"
      >
        <q-img :src="selectedNews.imageUrl" />

        <q-card-section>
          <div class="row no-wrap items-center q-mt-md">
            <SectionTitle :title="selectedNews.title" />
          </div>
          <div class="text-caption text-grey q-mb-sm">
            <q-icon name="fas fa-calendar-day" />
            {{ selectedNews.pubDateFormatted }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body1">
            {{ selectedNews.textContent }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="grey" label="Fechar" />
          <q-btn
            class="my-btn"
            label="Ler notícia completa"
            icon-right="fas fa-arrow-up-right-from-square"
            :href="selectedNews.url"
            target="_blank"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
.news-container {
  display: flex;
  overflow-x: auto;
  gap: 18px;
  padding: 5px 2px 15px 0px;
  scrollbar-width: none;
}

.news-card {
  border: 1px solid #e8ecf4;
  min-width: 240px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.news-image {
  height: 120px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
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

.my-card {
  background-color: $bg-light;

  &::-webkit-scrollbar {
    display: none;
  }

  .q-card__actions {
    padding: 10px;

    .q-btn {
      text-transform: none;
      font-weight: bold;
    }
  }
}

.my-btn {
  background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5c6bc0 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.q-dialog__inner > div {
  border-radius: 16px !important;
}
</style>
