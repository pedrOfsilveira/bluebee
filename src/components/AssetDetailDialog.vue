<script setup>
import { defineProps, defineEmits, computed, reactive, watch } from "vue";
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
import { useQuasar } from "quasar";

const storeUserAssets = useStoreUserAssets()
const storeHistory = useStoreHistory()
const $q = useQuasar()

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

// Get the quantity the user has of this asset - depends on storeUserAssets.assets
const userAssetQuantity = computed(() => {
  if (!props.asset) return 0;
  const assetId = props.asset.id || props.asset.ativo_id;
  const userAsset = storeUserAssets.assets.find(a => a.ativos?.id === assetId);
  return userAsset ? userAsset.quantidade : 0;
});

const totalPrice = computed(() => {
  return props.register[0] ? (props.register[0].preco_atual * transactionDetails.quantidade).toFixed(2) : 0;
});

// Watch for dialog open to ensure data is fresh
watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    // Reload user assets when dialog opens to get fresh data
    await storeUserAssets.loadUserAssets();
  }
});

// Funções placeholder
const handleBuy = async () => {
  $q.dialog({
    class: 'confirm-transaction-dialog',
    title: 'Confirmar Compra',
    message: `
      <div class="confirm-message">
        <div class="msg-line">Comprar <strong>${transactionDetails.quantidade}</strong> de <strong>${assetName.value}</strong></div>
        <div class="msg-total">Total: <strong>R$ ${totalPrice.value.replace('.', ',')}</strong></div>
      </div>
    `,
    html: true,
    cancel: { label: 'Cancelar', color: 'grey-7', flat: true, class: 'cancel-btn' },
    ok: { label: 'Confirmar', color: 'positive', unelevated: true, class: 'confirm-btn', style: 'border-radius: 8px' },
    persistent: true,
    style: 'max-width: 380px; width: 80vw;'
  }).onOk(async () => {
    transactionDetails.valor_total = -(props.register[0].preco_atual*transactionDetails.quantidade);
    await storeUserAssets.buyAsset(props.asset, transactionDetails);
    await storeHistory.addHistory(props.asset,transactionDetails);
    await storeHistory.loadHistory();
    await storeUserAssets.loadUserAssets();
    Object.assign(transactionDetails, transactionDetailsDefault);
  })
};

const handleSell = async () => {
  if (userAssetQuantity.value === 0) {
    $q.notify({
      type: 'negative',
      message: `Você não possui ${assetName.value}`,
      position: 'top'
    });
    return;
  }

  if (transactionDetails.quantidade > userAssetQuantity.value) {
    $q.notify({
      type: 'negative',
      message: `Você só possui ${userAssetQuantity.value} ${assetName.value}`,
      position: 'top'
    });
    return;
  }

  transactionDetails.compra_venda = false;
  transactionDetails.valor_total = props.register[0].preco_atual*transactionDetails.quantidade;
  await storeUserAssets.sellAsset(props.asset, transactionDetails);
  await storeHistory.loadHistory();
  await storeUserAssets.loadUserAssets();
  Object.assign(transactionDetails, transactionDetailsDefault);
};

const decreaseQuantity = () => {
  if (transactionDetails.quantidade > 1) {
    transactionDetails.quantidade--;
  }
};

const increaseQuantity = () => {
  transactionDetails.quantidade++;
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
        <q-card-section class="column items-center q-pa-lg q-pt-xl">
          <div class="flex items-center quantity-control q-mb-md">
            <q-btn
              flat
              dense
              round
              icon="fas fa-chevron-left"
              @click="decreaseQuantity"
              class="quantity-btn"
            />
            <q-input
              v-model.number="transactionDetails.quantidade"
              type="number"
              min="1"
              step="1"
              inputmode="numeric"
              hide-bottom-space
              borderless
              dense
              class="quantity-input"
              @blur="() => { if (!transactionDetails.quantidade || transactionDetails.quantidade < 1) transactionDetails.quantidade = 1 }"
            />
            <q-btn
              flat
              dense
              round
              icon="fas fa-chevron-right"
              @click="increaseQuantity"
              class="quantity-btn"
            />
          </div>
          <div class="text-center">
            <div class="text-subtitle2 text-grey-7">Você possui:</div>
            <div class="text-h6 text-primary">{{ userAssetQuantity }}</div>
          </div>
        </q-card-section>

      <!-- BOTÕES DE COMPRA E DE VENDA, BOA SORTE ! -->
      <q-card-actions align="around" class="asset-dialog-actions q-pa-md">
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
          class="action-btn buy-btn"
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
  gap: 12px;
  flex-wrap: wrap;
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

.quantity-control {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-btn {
  color: $primary;
  font-size: 20px;

  &:hover {
    background-color: rgba(66, 165, 245, 0.1);
  }
}

.quantity-display { display: none; }

/* Square, centered, editable input matching the aesthetic */
.quantity-input {
  width: 64px;
  min-width: 64px;
  flex: 0 0 auto;
}

.quantity-input :deep(.q-field__control) {
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.1), rgba(66, 165, 245, 0.05));
  border-radius: 16px;
  border: 2px solid rgba(66, 165, 245, 0.2);
  padding: 0;
  min-height: 64px; /* square height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-input :deep(.q-field__native) {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: $primary;
  padding: 0;
  width: 100%;
}

.quantity-input :deep(.q-field__control-container) {
  display: flex;
  align-items: center;
}
/* Remove browser spinners for clean look */
.quantity-input :deep(input[type='number']) {
  -moz-appearance: textfield;
}
.quantity-input :deep(input[type='number']::-webkit-outer-spin-button),
.quantity-input :deep(input[type='number']::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Dialog plugin styles need deep selector since they mount outside */
:deep(.confirm-transaction-dialog) {
  .q-card {
    border-radius: 14px;
    background: $bg-light;
  }

  .q-dialog__title {
    color: $primary;
    font-weight: 700;
  }

  .q-dialog__message {
    text-align: center;
    padding: 8px 4px 0;
  }

  .confirm-message .msg-line {
    font-size: 0.95rem;
    color: $text-dark;
    margin-bottom: 6px;
  }

  .confirm-message .msg-total {
    font-size: 1.05rem;
    color: $primary;
    font-weight: 700;
  }

  .q-card__actions {
    justify-content: center;
    gap: 10px;
    padding: 8px 12px 14px;
    & .q-btn {
      border-radius: 8px !important;
    }
    /* Explicit class ensures we override theme-specific variants */
    & .q-btn.confirm-btn {
      border-radius: 8px !important;
    }
  }


}

</style>
