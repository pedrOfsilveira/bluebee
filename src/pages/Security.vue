<script setup>
import { ref, computed } from 'vue';
import BlueHeader from 'src/components/BlueHeader.vue';
import { useSecurityStore } from 'src/stores/storeSecurity';

const store = useSecurityStore();
const search = ref('');

// Normalização para busca
const normalizeText = (text) => text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

// Filtro
const filteredScams = computed(() => {
  const query = normalizeText(search.value);
  if (!query) return store.scams;

  return store.scams.filter(item =>
    normalizeText(item.title).includes(query) ||
    normalizeText(item.description).includes(query)
  );
});

// Cores baseadas na gravidade
const getScamStyle = (severity) => {
  if (severity === 'high') {
    return { bg: 'linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)', icon: 'fas fa-exclamation-triangle' };
  }
  return { bg: 'linear-gradient(135deg, #FFB74D 0%, #F57C00 100%)', icon: 'fas fa-shield-alt' };
};
import { useStoreTutorial } from 'src/stores/storeTutorial';
import { onMounted } from 'vue';

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor('security'), 600);
});
</script>

<template>
  <q-page class="bg-grey-1">

    <BlueHeader>
      <div class="flex text-h5 text-weight-bolder items-center q-mb-lg">
        <q-icon name="fas fa-shield-alt" class="q-mr-sm" />
        Guia Anti-Golpe
      </div>

      <q-input
        id="security-search"
        v-model="search"
        class="search-input"
        outlined
        placeholder="Pesquisar golpe..."
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-search"/>
        </template>
        <template v-slot:append v-if="search">
          <q-icon name="close" @click="search = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </BlueHeader>
    <div class="section q-mt-lg">

      <div v-if="filteredScams.length > 0">
        <div class="scams-container">

          <q-expansion-item
            v-for="scam in filteredScams"
            :key="scam.id"
            group="security"
            class="security-card q-mb-md"
            header-class="security-header"
            expand-icon-class="text-grey-6"
          >
            <template v-slot:header>
              <div class="row full-width items-center no-wrap">

                <div
                  class="term-icon q-mr-md"
                  :style="{ background: getScamStyle(scam.severity).bg }"
                >
                  <q-icon :name="scam.icon" size="xs" color="white" />
                </div>

                <div class="col text-weight-bold text-grey-9 text-body1 text-left">
                  {{ scam.title }}
                </div>
              </div>
            </template>

            <q-card>
              <q-card-section class="text-grey-7 q-pt-none q-pb-md q-px-md text-body2">
                <q-separator class="q-mb-md" />

                <div class="text-weight-bold q-mb-xs">{{ scam.description }}</div>

                <p class="q-mb-md">{{ scam.content }}</p>

                <div class="bg-red-1 q-pa-sm rounded-borders flex items-start">
                  <q-icon name="fas fa-exclamation-circle" color="negative" class="q-mt-xs q-mr-sm" size="xs" />
                  <span class="text-caption text-grey-9 text-weight-medium col">
                    Prevenção: {{ scam.tip }}
                  </span>
                </div>

              </q-card-section>
            </q-card>
          </q-expansion-item>

        </div>
      </div>

      <div v-else class="flex flex-center column q-pa-xl text-grey-5">
        <q-icon name="fas fa-shield-virus" size="3rem" class="q-mb-md" />
        <div class="text-center">Nenhum golpe encontrado.</div>
      </div>

    </div>

    <div class="mb" style="height: 80px;"></div>
  </q-page>
</template>

<style lang="scss">
/* --- Estilos Globais (Input) --- */
.search-input {
  width: 100%;
}

.search-input .q-field__control {
  border-radius: 10rem;
  width: 100%;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fd 100%);
}

.search-input {
  &.q-field--focused {
    .q-field__control {
      box-shadow: 0 0 0 3px rgba(91, 158, 240, 0.2),
        0 4px 15px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
  }
  .q-field__control {
    transition: all 0.3s ease-in-out;
  }
}
.q-field--focused .q-field__prepend .q-icon {
  color: $primary;
}

/* --- Estilos do Card --- */

.security-card {
  border: 1px solid #e8ecf4;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.security-header {
  padding: 15px;
}

.term-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}
</style>
