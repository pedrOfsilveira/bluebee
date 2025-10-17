<script setup>
import { ref } from "vue";
const tab = ref();
</script>

<template>
  <q-tabs
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
    <q-tab name="dividend" label="Dividendos" class="subtab" />
  </q-tabs>

  <div class="history-list">
    <div class="date-divider">Hoje, 29 de Maio</div>
    <div class="transaction-card" data-type="buy">
      <div class="transaction-icon buy">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-title">Compra de HGLG11</div>
        <div class="transaction-date">14:30:15</div>
      </div>
      <div class="transaction-value value-negative">- R$ 985,47</div>
    </div>

    <div class="date-divider">20 de Maio</div>
    <div class="transaction-card" data-type="dividend">
      <div class="transaction-icon dividend">
        <i class="fas fa-hand-holding-usd"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-title">Dividendo de PETR4</div>
        <div class="transaction-date">10:00:00</div>
      </div>
      <div class="transaction-value value-dividend">+ R$ 55,20</div>
    </div>

    <div class="date-divider">15 de Maio</div>
    <div class="transaction-card" data-type="sell">
      <div class="transaction-icon sell">
        <i class="fas fa-money-bill-wave"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-title">Venda de MGLU3</div>
        <div class="transaction-date">11:15:30</div>
      </div>
      <div class="transaction-value value-positive">+ R$ 350,00</div>
    </div>

    <div class="date-divider">10 de Maio</div>
    <div class="transaction-card" data-type="buy">
      <div class="transaction-icon buy">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-title">Compra de PETR4</div>
        <div class="transaction-date">16:05:00</div>
      </div>
      <div class="transaction-value value-negative">- R$ 1.245,32</div>
    </div>
    <div class="transaction-card" data-type="dividend">
      <div class="transaction-icon dividend">
        <i class="fas fa-hand-holding-usd"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-title">JCP de ITSA4</div>
        <div class="transaction-date">09:30:00</div>
      </div>
      <div class="transaction-value value-dividend">+ R$ 32,80</div>
    </div>
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
            /* Mais peso */
            margin: 25px 0 15px;
            font-size: 14px;
            text-transform: uppercase;
            /* Opcional: para dar mais destaque */
            padding-bottom: 5px;
            border-bottom: 1px solid var(--border-color);
            animation: fadeInElement 0.5s ease-out forwards;
            opacity: 0;
        }

        .transaction-card {
            border: 1px solid #e8ecf4;
            background-color: $bg-card;
            border-radius: 18px;
            /* Mais arredondado */
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            padding: 18px 20px;
            /* Padding aumentado */
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            border-left: 5px solid transparent;
            /* Borda lateral para tipo de transação */
            animation: fadeInElement 0.5s ease-out forwards;
            opacity: 0;
        }

        /* Animação escalonada para os cards */
        .transaction-card:nth-of-type(1) {
            animation-delay: 0.3s;
        }

        .transaction-card:nth-of-type(2) {
            animation-delay: 0.4s;
        }

        .transaction-card:nth-of-type(3) {
            animation-delay: 0.5s;
        }

        .transaction-card:nth-of-type(4) {
            animation-delay: 0.6s;
        }

        @keyframes fadeInElement {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .transaction-card:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }

        .transaction-icon {
            width: 48px;
            /* Aumentado */
            height: 48px;
            border-radius: 14px;
            /* Mais quadrado-arredondado */
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
</style>
