<script setup>
import BlueHeader from 'src/components/BlueHeader.vue';
import AssetsSection from 'src/components/wallet/AssetsSection.vue';
import { useStoreAssets } from 'src/stores/storeAssets';
import { onUnmounted, ref } from 'vue';

const tab = ref('todos'),
      search = ref('')

const handleSearch = (val) => {
  storeAssets.searchAssets(val)
}

onUnmounted( () => {
  storeAssets.searchAssets('')
})

const storeAssets = useStoreAssets();
import { useStoreTutorial } from 'src/stores/storeTutorial';
import { onMounted } from 'vue';

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor('explore'), 600);
});
</script>

<template>
  <BlueHeader>
    <div class="flex text-h5 text-weight-bolder items-center q-mb-lg">
      <q-icon name="fas fa-compass" class="q-mr-sm" />
      Explorar Ativos
    </div>
    <q-input
      id="explore-search"
      @update:model-value="handleSearch"
      v-model="search"
      class="search-input"
      outlined placeholder="Buscar por nome ou ticker..."
    >
       <template v-slot:prepend>
      <q-icon name="fas fa-search"/>
    </template>
    </q-input>
    <q-tabs
    no-caps
    active-color="primary"
    indicator-color="transparent"
    class="text-grey-8 subtabs q-mt-md"
    active-bg-color="accent"
    v-model="tab"
  >
    <q-tab name="todos" label="Todos" class="subtab" />
    <q-tab name="Ação" label="Ações" class="subtab" />
    <q-tab name="Fundo Imobiliário" label="FIIs" class="subtab" />
    <q-tab name="ETF" label="ETFs" class="subtab" />
    <q-tab name="Criptomoeda" label="Cripto" class="subtab" />
  </q-tabs>
  </BlueHeader>

  <div class="q-mb-lg"></div>

  <AssetsSection :filter="tab" :assets="storeAssets.assets"/>

</template>

<style lang="scss">

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
</style>
