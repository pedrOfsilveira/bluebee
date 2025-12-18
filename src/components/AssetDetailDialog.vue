<script setup>
import { defineProps, defineEmits, computed, reactive, watch } from "vue";
import BlueHeader from "./BlueHeader.vue";
import SectionTitle from "./SectionTitle.vue";
import AssetCard from "./wallet/AssetCard.vue";
import StatCard from "./profile/StatCard.vue";
import AssetHeader from "./AssetHeader.vue";
import AssetDetailsContent from "./AssetDetailsContent.vue";
import { useStoreUserAssets } from "src/stores/storeUserAssets";

import { useCurrencify } from "src/use/useCurrencify";
import { useStoreHistory } from "src/stores/storeHistory";
import { valueOrDefault } from "chart.js/helpers";
import { useQuasar } from "quasar";
import { useStoreAuth } from "src/stores/storeAuth";

const storeUserAssets = useStoreUserAssets();
const storeHistory = useStoreHistory();
const $q = useQuasar();
const auth = useStoreAuth();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  asset: {
    type: Object,
    default: () => null,
  },

  register: {
    type: Object,
    default: () => null,
  },
});

const transactionDetailsDefault = {
  quantidade: 1,
  compra_venda: true,
  valor_total: 0,
};

const transactionDetails = reactive({
  ...transactionDetailsDefault,
});

const emit = defineEmits(["update:modelValue"]);

const showDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

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
  const userAsset = storeUserAssets.assets.find(
    (a) => a.ativos?.id === assetId,
  );
  return userAsset ? userAsset.quantidade : 0;
});

const totalPrice = computed(() => {
  return props.register[0]
    ? (props.register[0].preco_atual * transactionDetails.quantidade).toFixed(2)
    : 0;
});

const compatibilityStatus = computed(() => {
  const profile = (auth.userDetails?.investor_profile || "").toLowerCase();
  const risk = (props.asset?.risco || "").toString();
  const isLow = risk === "Baixo";
  const isMid = risk === "Médio";
  const isHigh = risk === "Alto";

  if (!profile) return { text: "Defina seu perfil", color: "grey-7" };

  if (profile.includes("conserv")) {
    if (isLow) return { text: "Compatível", color: "positive" };
    if (isMid) return { text: "Atenção (médio)", color: "warning" };
    if (isHigh) return { text: "Não compatível", color: "negative" };
  }
  if (profile.includes("moder")) {
    if (isLow || isMid) return { text: "Compatível", color: "positive" };
    if (isHigh) return { text: "Atenção (alto)", color: "warning" };
  }
  return { text: "Compatível", color: "positive" };
});

const compatIconClass = computed(() => {
  switch (compatibilityStatus.value.color) {
    case "positive":
      return "fas fa-check-circle";
    case "warning":
      return "fas fa-exclamation-triangle";
    case "negative":
      return "fas fa-times-circle";
    default:
      return "fas fa-user-shield";
  }
});

// Watch for dialog open to ensure data is fresh
watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal) {
      // Reload user assets when dialog opens to get fresh data
      await storeUserAssets.loadUserAssets();
    }
  },
);

// Funções placeholder
const handleBuy = async () => {
  $q.dialog({
    class: "confirm-transaction-dialog",
    title: "Confirmar Compra",
    message: `
      <div class="confirm-message">
        <div class="msg-line">Comprar <strong>${transactionDetails.quantidade}</strong> de <strong>${assetName.value}</strong></div>
        <div class="msg-total">Total: <strong>R$ ${totalPrice.value.replace(".", ",")}</strong></div>
        <div class="compat-row">
          <span class="compat-badge ${compatibilityStatus.value.color}">
            <i class="${compatIconClass.value}"></i>
            ${compatibilityStatus.value.text} com seu perfil
          </span>
        </div>
      </div>
    `,
    html: true,
    cancel: {
      label: "Cancelar",
      color: "grey-7",
      flat: true,
      class: "cancel-btn",
    },
    ok: {
      label: "Confirmar",
      color: "positive",
      unelevated: true,
      class: "confirm-btn",
      style: "border-radius: 8px",
    },
    persistent: true,
    style: "max-width: 380px; width: 80vw;",
  }).onOk(async () => {
    transactionDetails.valor_total = -(
      props.register[0].preco_atual * transactionDetails.quantidade
    );
    await storeUserAssets.buyAsset(props.asset, transactionDetails);
    await storeHistory.addHistory(props.asset, transactionDetails);
    await storeHistory.loadHistory();
    await storeUserAssets.loadUserAssets();
    Object.assign(transactionDetails, transactionDetailsDefault);
  });
};

const handleSell = async () => {
  if (userAssetQuantity.value === 0) {
    $q.notify({
      type: "negative",
      message: `Você não possui ${assetName.value}`,
      position: "top",
    });
    return;
  }

  if (transactionDetails.quantidade > userAssetQuantity.value) {
    $q.notify({
      type: "negative",
      message: `Você só possui ${userAssetQuantity.value} ${assetName.value}`,
      position: "top",
    });
    return;
  }

  transactionDetails.compra_venda = false;
  transactionDetails.valor_total =
    props.register[0].preco_atual * transactionDetails.quantidade;
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

        <AssetDetailsContent :asset="props.asset" :register="props.register" />
      </q-card-section>

      <q-separator />

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
            @blur="
              () => {
                if (
                  !transactionDetails.quantidade ||
                  transactionDetails.quantidade < 1
                )
                  transactionDetails.quantidade = 1;
              }
            "
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
.asset-dialog-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: $bg-light;
  height: 80%;
  transform: translateY(-25px);
}

.asset-dialog-header {
  padding: 0;
  .text-h6 {
    color: $primary;
    font-weight: 600;
  }
}

.asset-dialog-body {
  min-height: 200px;

  p {
    font-size: 1rem;
    color: #333;
  }
}

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

.quantity-display {
  display: none;
}

.quantity-input {
  width: 64px;
  min-width: 64px;
  flex: 0 0 auto;
}

.quantity-input :deep(.q-field__control) {
  background: linear-gradient(
    135deg,
    rgba(66, 165, 245, 0.1),
    rgba(66, 165, 245, 0.05)
  );
  border-radius: 16px;
  border: 2px solid rgba(66, 165, 245, 0.2);
  padding: 0;
  min-height: 64px;
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

.quantity-input :deep(input[type="number"]) {
  appearance: textfield;
  -moz-appearance: textfield;
}
.quantity-input :deep(input[type="number"]::-webkit-outer-spin-button),
.quantity-input :deep(input[type="number"]::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

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

    & .q-btn.confirm-btn {
      border-radius: 8px !important;
    }
  }

  .compat-row {
    margin-top: 8px;
  }

  .compat-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
  .compat-badge.positive {
    background: linear-gradient(135deg, rgba($positive, 0.9), $positive);
  }
  .compat-badge.warning {
    background: linear-gradient(135deg, #ffe082, $warning);
    color: #1a1a1a;
  }
  .compat-badge.negative {
    background: linear-gradient(135deg, #ef5350, $negative);
  }
  .compat-badge.grey-7 {
    background: #9e9e9e;
  }
  .compat-badge i {
    font-size: 14px;
  }
}
</style>
