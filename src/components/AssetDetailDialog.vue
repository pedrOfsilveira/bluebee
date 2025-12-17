<script setup>
import { defineProps, defineEmits, computed, reactive } from "vue";
import BlueHeader from "./BlueHeader.vue";
import SectionTitle from "./SectionTitle.vue";
import AssetCard from "./wallet/AssetCard.vue";
import StatCard from "./profile/StatCard.vue";
import AssetHeader from "./AssetHeader.vue";
import AssetChart from "./AssetChart.vue";
import AssetDetailsContent from "./AssetDetailsContent.vue";
import { useStoreUserAssets } from "src/stores/storeUserAssets";
// Importe o que mais precisar (ex: useCurrencify)
import { useCurrencify } from "src/use/useCurrencify";
import { useStoreHistory } from "src/stores/storeHistory";
import { valueOrDefault } from "chart.js/helpers";

const storeUserAssets = useStoreUserAssets()
const storeHistory = useStoreHistory()

const props = defineProps({
  // modelValue é o padrão para o v-model (controla se o dialog está aberto)
  modelValue: {
    type: Boolean,
    default: false,
  },
  // O ativo que foi clicado
  asset: {
    type: Object,
    default: () => null,
  },
  //teste
  register: {
    type: Object,
    default: () => null,
  }
});

// tem que trocar isso depois

const transactionDetailsDefault = {
  quantidade: 1,
  compra_venda: true,
  valor_total: 0
}

const transactionDetails = reactive({
  ...transactionDetailsDefault
})

const emit = defineEmits(["update:modelValue"]); // Necessário para o v-model

const showDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// Computada para pegar o nome, já que a estrutura do seu prop é complexa
const assetName = computed(() => {
  if (!props.asset) return "";
  return props.asset.nome || (props.asset.ativos && props.asset.ativos.nome);
});

const assetType = computed(() => {
  if (!props.asset) return "";
  return props.asset.tipo || (props.asset.ativos && props.asset.ativos.tipo);
});

// Funções placeholder
const handleBuy = async () => {
  transactionDetails.valor_total = -(props.register[0].preco_atual*transactionDetails.quantidade);
  await storeUserAssets.buyAsset(props.asset, transactionDetails);
  await storeHistory.addHistory(props.asset,transactionDetails);
  Object.assign(transactionDetails, transactionDetailsDefault);
};

const handleSell = async () => {
  transactionDetails.compra_venda = false;
  transactionDetails.valor_total = props.register[0].preco_atual*transactionDetails.quantidade;
  await storeUserAssets.sellAsset(props.asset, transactionDetails);
  Object.assign(transactionDetails, transactionDetailsDefault);
};
</script>

<template>
  <q-dialog v-model="showDialog" content-class="asset-dialog-container">
    <q-card class="asset-dialog-card">
      <q-card-section class="asset-dialog-header row items-center q-pb-none">
        <AssetHeader :asset="props.asset" :register="props.register" />
      </q-card-section>

      <q-card-section v-if="asset" class="asset-dialog-body q-mt-lg">
        <SectionTitle title="Detalhes do Ativo" bb />
        <p>
          Aqui você pode ver mais detalhes sobre o ativo
          <strong>{{ assetName }}</strong> do tipo
          <strong>{{ assetType }}</strong
          >.
        </p>

        <!-- esse gráfico não funciona ainda, mas nao quero me prender mto nele, entao a gente ve dps como vamos fazer -->
        <AssetChart />

        <AssetDetailsContent :asset="props.asset" :register="props.register"/>
      </q-card-section>

      <q-separator />

        <!-- mudar esse input e o separator que eu coloquei em baixo -->
        <q-input v-model.number="transactionDetails.quantidade" type="number" label="Quantidade"/>

      <q-separator />

      <!-- BOTÕES DE COMPRA E DE VENDA, BOA SORTE ! -->
      <q-card-actions align="right" class="asset-dialog-actions q-pa-md">
        <q-btn
          class="action-btn sell-btn"
          icon="fas fa-arrow-circle-down"
          label="Vender"
          color="negative"
          size="sm"
          @click="handleSell"
        />
        <q-btn
          size="md"
          icon="fas fa-arrow-circle-up"
          label="Comprar"
          color="positive"
          @click="handleBuy"
          class="q-ml-sm action-btn buy-btn"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
/* Estiliza o Card principal */
.asset-dialog-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: $bg-light;
  height: 80%;
  transform: translateY(-25px);
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f6;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.my-asset {
  margin-bottom: 0 !important;
}

.action-btn {
  border-radius: 16px;
  font-size: 0.75rem !important;
  display: flex;
  align-items: center;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.buy-btn {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
}

.sell-btn {
  background: linear-gradient(135deg, #f44336, #e53935);
}
</style>
