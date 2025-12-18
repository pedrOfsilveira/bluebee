<script setup>
import { ref, computed } from 'vue';
import BlueHeader from 'src/components/BlueHeader.vue';
import { useGlossaryStore } from 'src/stores/storeGlossary';

const store = useGlossaryStore();
const search = ref('');
const tab = ref('todos'); // Controla a categoria selecionada

// --- 1. Estilização dos Ícones (Mantido para visual dos cards) ---
const getTermStyle = (type) => {
  const styles = {
    stock:   { icon: 'fas fa-chart-line',         bg: 'linear-gradient(135deg, #5C6BC0 0%, #3949AB 100%)' },
    fixed:   { icon: 'fas fa-seedling',           bg: 'linear-gradient(135deg, #66BB6A 0%, #2E7D32 100%)' },
    fund:    { icon: 'fas fa-building',           bg: 'linear-gradient(135deg, #FFA726 0%, #EF6C00 100%)' },
    economy: { icon: 'fas fa-globe-americas',     bg: 'linear-gradient(135deg, #78909C 0%, #455A64 100%)' },
    trade:   { icon: 'fas fa-bolt',               bg: 'linear-gradient(135deg, #EF5350 0%, #C62828 100%)' },
    tax:     { icon: 'fas fa-file-invoice-dollar',bg: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)' },
    concept: { icon: 'fas fa-book-open',          bg: 'linear-gradient(135deg, #26C6DA 0%, #0097A7 100%)' }
  };
  return styles[type] || styles.concept;
};

// --- 2. Normalização de Texto ---
const normalizeText = (text) => {
  return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

// --- 3. Filtragem Inteligente (Categoria + Busca) ---
const groupedTerms = computed(() => {
  const query = normalizeText(search.value);

  // Passo A: Filtrar por Categoria (Tab)
  let filtered = store.terms;

  if (tab.value !== 'todos') {
    filtered = filtered.filter(term => term.type === tab.value);
  }

  // Passo B: Filtrar por Texto da Busca (se houver)
  if (query) {
    filtered = filtered.filter(term => {
      return normalizeText(term.title).includes(query) ||
             normalizeText(term.description).includes(query);
    });
  }

  // Passo C: Ordenar A-Z
  filtered.sort((a, b) => a.title.localeCompare(b.title));

  // Passo D: Agrupar por Letra
  return filtered.reduce((groups, term) => {
    const letter = term.title.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
    return groups;
  }, {});
});

const hasResults = computed(() => Object.keys(groupedTerms.value).length > 0);
import { useStoreTutorial } from 'src/stores/storeTutorial';
import { onMounted } from 'vue';

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor('glossary'), 600);
});
</script>

<template>
  <q-page class="bg-grey-1">

    <BlueHeader id="glossary-search">
      <div class="flex text-h5 text-weight-bolder items-center q-mb-lg">
        <q-icon name="fas fa-book" class="q-mr-sm" />
        Glossário Financeiro
      </div>

      <q-input
        v-model="search"
        class="search-input"
        outlined
        placeholder="Buscar termo ou definição..."
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-search"/>
        </template>
        <template v-slot:append v-if="search">
          <q-icon name="close" @click="search = ''" class="cursor-pointer" />
        </template>
      </q-input>

      <q-tabs
        v-model="tab"
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-8 subtabs q-mt-md"
        active-bg-color="accent"
      >
        <q-tab name="todos" label="Todos" class="subtab" />
        <q-tab name="stock" label="Ações" class="subtab" />
        <q-tab name="fixed" label="Renda Fixa" class="subtab" />
        <q-tab name="fund" label="Fundos/FIIs" class="subtab" />
        <q-tab name="economy" label="Economia" class="subtab" />
        <q-tab name="tax" label="Impostos" class="subtab" />
        <q-tab name="trade" label="Trade" class="subtab" />
        <q-tab name="concept" label="Conceitos" class="subtab" />
      </q-tabs>
    </BlueHeader>

    <div class="q-mb-lg"></div>

    <div class="q-px-md" style="margin-top: -10px;">

      <div v-if="hasResults">
        <div v-for="(groupTerms, letter) in groupedTerms" :key="letter" class="q-mb-lg">

          <div class="letter-header q-mb-sm text-primary">
            {{ letter }}
          </div>

          <div class="terms-container">
            <q-expansion-item
              v-for="term in groupTerms"
              :key="term.id"
              group="glossary"
              class="glossary-card q-mb-md"
              header-class="glossary-header"
              expand-icon-class="text-grey-6"
            >
              <template v-slot:header>
                <div class="row full-width items-center">

                  <div
                    class="term-icon q-mr-md"
                    :style="{ background: getTermStyle(term.type).bg }"
                  >
                    <q-icon
                      :name="getTermStyle(term.type).icon"
                      size="xs"
                      color="white"
                    />
                  </div>

                  <div class="col text-weight-bold text-grey-9 text-body1">
                    {{ term.title }}
                  </div>
                </div>
              </template>

              <q-card>
                <q-card-section class="text-grey-7 q-pt-none q-pb-md q-px-md text-body2">
                  <q-separator class="q-mb-md" />
                  {{ term.description }}

                  <div class="q-mt-sm text-caption text-grey-5 flex items-center">
                    <q-icon :name="getTermStyle(term.type).icon" class="q-mr-xs" />
                    Categoria: {{ tab === 'todos' ? term.type.toUpperCase() : tab.toUpperCase() }}
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-center column q-pa-xl text-grey-5">
        <q-icon name="fas fa-search-minus" size="3rem" class="q-mb-md" />
        <div class="text-center">
          Nenhum termo encontrado em
          <strong>{{ tab === 'todos' ? 'todas as categorias' : tab }}</strong>
          para "{{ search }}"
        </div>
      </div>

    </div>

    <div class="mb" style="height: 80px;"></div>
  </q-page>
</template>

<style lang="scss">
/* --- Estilos copiados EXATAMENTE de ExploreAssets.vue --- */

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

  /* Opcional: Adiciona uma transição suave para o efeito */
  .q-field__control {
    transition: all 0.3s ease-in-out;
  }
}
.q-field--focused {
  .q-field__prepend .q-icon {
    color: $primary;
  }
}

.subtabs {
  max-width: 100%;
}

.subtab {
  background: rgba(255, 255, 255, 0.15);
  /* Mais sutil */
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.subtabs .q-tabs__content {
  gap: 8px;
}

/* --- Estilos Específicos dos Cards do Glossário --- */

.glossary-card {
  border: 1px solid #e8ecf4;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glossary-header {
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
}

.letter-header {
  font-size: 1.2rem;
  font-weight: 800;
  padding-left: 10px;
  opacity: 0.6;
}
</style>
