<script setup>
import { ref, computed } from "vue";
import { useStoreHistory } from "src/stores/storeHistory";
import { useStoreAssets } from "src/stores/storeAssets";
import { useReturnObjectDate } from "src/use/useReturnObjectDate";

const tab = ref("all");
const storeHistory = useStoreHistory();
const storeAssets = useStoreAssets();

const filteredHistory = computed(() => {
  if (!tab.value || tab.value === "all") {
    return storeHistory.history;
  }
  return storeHistory.history.filter((transaction) => {
    const type = getTransactionType(transaction.compra_venda);
    return type === tab.value;
  });
});

const groupedHistory = computed(() => {
  const groups = {};
  filteredHistory.value.forEach((transaction) => {
    const dateKey = useReturnObjectDate(new Date(transaction.created_at)).data;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });
  return groups;
});

const getTransactionType = (compra_venda) => {
  if (typeof compra_venda === "boolean") {
    return compra_venda ? "buy" : "sell";
  }
  return compra_venda;
};

const getTransactionIcon = (compra_venda) => {
  const type = getTransactionType(compra_venda);
  switch (type) {
    case "buy":
      return "fas fa-shopping-cart";
    case "sell":
      return "fas fa-money-bill-wave";
    case "dividend":
      return "fas fa-hand-holding-usd";
    default:
      return "fas fa-exchange-alt";
  }
};

const getTransactionLabel = (compra_venda) => {
  const type = getTransactionType(compra_venda);
  switch (type) {
    case "buy":
      return "Compra";
    case "sell":
      return "Venda";
    case "dividend":
      return "Dividendo";
    default:
      return type;
  }
};

const getAssetName = (transaction) => {
  const asset = storeAssets.assets.find((a) => a.id === transaction.ativo_id);
  return asset ? asset.nome : `Ativo ${transaction.ativo_id}`;
};
</script>

<template>
  <q-tabs
    id="wallet-filter"
    no-caps
    active-color="primary"
    indicator-color="transparent"
    class="text-grey-8 subtabs"
    active-bg-color="blue-1"
    v-model="tab"
  >
    <q-tab name="all" label="Todos" class="subtab" />
    <q-tab name="buy" label="Compras" class="subtab" />
    <q-tab name="sell" label="Vendas" class="subtab" />
  </q-tabs>

  <div class="history-list" id="wallet-history">
    <template v-if="filteredHistory.length === 0">
      <div class="empty-message">Nenhuma transação encontrada</div>
    </template>
    <template v-else>
      <template v-for="(transactions, date) in groupedHistory" :key="date">
        <div class="date-divider">{{ date }}</div>
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="transaction-card"
          :data-type="transaction.compra_venda"
        >
          <div
            class="transaction-icon"
            :class="getTransactionType(transaction.compra_venda)"
          >
            <i :class="getTransactionIcon(transaction.compra_venda)"></i>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">
              {{ getTransactionLabel(transaction.compra_venda) }} de
              {{ getAssetName(transaction) }}
            </div>
            <div class="transaction-date">
              {{ useReturnObjectDate(new Date(transaction.created_at)).tempo }}
            </div>
          </div>
          <div
            class="transaction-value"
            :class="{
              'value-negative':
                getTransactionType(transaction.compra_venda) === 'buy',
              'value-positive':
                getTransactionType(transaction.compra_venda) === 'sell',
              'value-dividend':
                getTransactionType(transaction.compra_venda) === 'dividend',
            }"
          >
            {{
              getTransactionType(transaction.compra_venda) === "buy"
                ? "- R$ "
                : "+ R$ "
            }}
            {{ Math.abs(transaction.valor_total).toFixed(2).replace(".", ",") }}
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.subtabs {
  border: 1px solid #e8ecf4;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 6px;
}

.subtab {
  font-weight: 600;
  color: #666;
  border-radius: 12px;
}
.q-tab-panel,
.q-tab-panels {
  background-color: transparent;
}

.date-divider {
  color: $text-light;
  font-weight: 600;
  margin: 25px 0 15px;
  font-size: 14px;
  text-transform: uppercase;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--border-color);
}

.transaction-card {
  border: 1px solid #e8ecf4;
  background-color: $bg-card;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 18px 20px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 5px solid transparent;
}

.transaction-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  font-size: 20px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.buy {
  background: linear-gradient(135deg, $positive, #5cb85c);
  border-left-color: $positive;
}

.sell {
  background: linear-gradient(135deg, $negative, #d9534f);
  border-left-color: $negative;
}

.dividend {
  background: linear-gradient(135deg, $accent, #f0ad4e);
  border-left-color: $accent;
}

.transaction-info {
  flex: 1;
}

.transaction-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 16px;
  color: $text-dark;
}

.transaction-date {
  font-size: 13px;
  color: $text-light;
}

.transaction-value {
  text-align: right;
  font-weight: 700;
  font-size: 16px;
}

.value-positive {
  color: $positive;
}

.value-negative {
  color: $negative;
}

.value-dividend {
  color: $accent;
}

.empty-message {
  text-align: center;
  padding: 40px 20px;
  color: $text-light;
  font-size: 16px;
}
</style>
