<script setup>
import BlueHeader from 'src/components/BlueHeader.vue';
import AssetsSection from 'src/components/wallet/AssetsSection.vue';
import { useStoreAssets } from 'src/stores/storeAssets';
import { ref } from 'vue';
const tab = ref('todos');

const testAssets = ref([
  {
    name: "PETR4",
    type: "Ações",
    amount: "R$ 1.245,32",
    change: "+2,3%",
    category: "stocks",
  },
  {
    name: "BBAS3",
    type: "Ações",
    amount: "R$ 2.500,00",
    change: "-1,2%",
    category: "stocks",
  },
  {
    name: "XPTO11",
    type: "FII",
    amount: "R$ 3.100,75",
    change: "+0,5%",
    category: "fii",
  },
  {
    name: "Tesouro Selic",
    type: "Renda Fixa",
    amount: "R$ 5.000,00",
    change: "+0,1%",
    category: "fixed",
  },
  {
    name: "Bitcoin",
    type: "Criptomoeda",
    amount: "R$ 10.000,00",
    change: "+3,8%",
    category: "crypto",
  },
]);

const storeAssets = useStoreAssets();

</script>

<template>
  <BlueHeader>
    <div class="flex text-h5 text-weight-bolder items-center q-mb-lg">
      <q-icon name="explore" class="q-mr-sm" />
      Explorar Ativos
    </div>
    <q-input class="search-input" outlined placeholder="Buscar por nome ou ticker...">
       <template v-slot:prepend>
      <q-icon name="search" />
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
    <q-tab name="etf" label="ETFs" class="subtab" />
    <q-tab name="fixed" label="Renda Fixa" class="subtab" />
    <q-tab name="crypto" label="Cripto" class="subtab" />
  </q-tabs>
  </BlueHeader>

  <div class="q-mb-lg"></div>

  <!-- <AssetsSection :filter="tab" :assets="testAssets"/> -->
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
