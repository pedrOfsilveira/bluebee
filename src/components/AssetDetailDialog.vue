<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import BlueHeader from './BlueHeader.vue'
import SectionTitle from './SectionTitle.vue'
import AssetCard from './wallet/AssetCard.vue'
import StatCard from './profile/StatCard.vue'
// Importe o que mais precisar (ex: useCurrencify)
// import { useCurrencify } from "src/use/useCurrencify";

const props = defineProps({
  // modelValue é o padrão para o v-model (controla se o dialog está aberto)
  modelValue: {
    type: Boolean,
    default: false
  },
  // O ativo que foi clicado
  asset: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['update:modelValue']) // Necessário para o v-model

const showDialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// Computada para pegar o nome, já que a estrutura do seu prop é complexa
const assetName = computed(() => {
  if (!props.asset) return ''
  return props.asset.nome || (props.asset.ativos && props.asset.ativos.nome)
})

const assetType = computed(() => {
  if (!props.asset) return ''
  return props.asset.tipo || (props.asset.ativos && props.asset.ativos.tipo)
})

// Funções placeholder
const handleBuy = () => {
  console.log('Comprando:', assetName.value)
  // Lógica de compra aqui
}

const handleSell = () => {
  console.log('Vendendo:', assetName.value)
  // Lógica de venda aqui
}

</script>

<template>
  <q-dialog v-model="showDialog" content-class="asset-dialog-container">

    <q-card
      class="asset-dialog-card"
      style="width: 700px; max-width: 80vw;"
    >

      <q-card-section class="asset-dialog-header row items-center q-pb-none">
        <BlueHeader>
          <AssetCard :asset="asset" class="full-width flex my-asset"/>
        </BlueHeader>
        <!-- <q-btn icon="close" flat round dense v-close-popup /> -->
      </q-card-section>


      <q-card-section v-if="asset" class="asset-dialog-body q-mt-lg">
        <SectionTitle title="Detalhes do Ativo" bb/>
        <p>Aqui você pode ver mais detalhes sobre o ativo <strong>{{ assetName }}</strong> do tipo <strong>{{ assetType }}</strong>.</p>
        <div class="useful-grid">
          <StatCard
            title="Quantidade"
            :value="asset ? (asset.quantidade || 0) : 0"
            icon="inventory_2"
            color="blue"
          />
        </div>
        <StatCard
          title="Valor Atual"
          :value="asset ? (asset.ativos ? asset.ativos.valor_min : 0) : 0"
          icon="attach_money"
          color="green"
        />
        <StatCard
          title="Valor Máximo"
          :value="asset ? (asset.ativos ? asset.ativos.valor_max : 0) : 0"
          icon="trending_up"
          color="teal"
        />

      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="asset-dialog-actions q-pa-md">
        <q-btn label="Vender" color="negative" @click="handleSell" />
        <q-btn label="Comprar" color="positive" @click="handleBuy" class="q-ml-sm"/>

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>

/* Estiliza o Card principal */
.asset-dialog-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: $bg-light;
}

.asset-dialog-card .q-card__section {
  padding-top: 0;
}

/* Estiliza o Cabeçalho */
.asset-dialog-header {
  padding: 0;
  .text-h6 {
    color: $primary; // Usando uma variável de cor do Quasar
    font-weight: 600;
  }
}

/* Estiliza o Corpo */
.asset-dialog-body {
  min-height: 200px; // Exemplo de altura mínima

  p {
    font-size: 1rem;
    color: #333;
  }
}

/* Estiliza o Rodapé de Ações */
.asset-dialog-actions {
  background-color: #f1f3f6;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.my-asset {
  margin-bottom: 0 !important;
}
</style>
