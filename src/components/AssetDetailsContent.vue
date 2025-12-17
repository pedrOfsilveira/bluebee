<script setup>
import { defineProps, ref, computed, onMounted } from "vue";
import { useColorRisk, useColorPercentage } from "src/use/useColor";
import { useCurrencify } from "src/use/useCurrencify";
import { usePercentageCalculator } from "src/use/usePercentageCalculator";
import { useStoreAssets } from "src/stores/storeAssets";

const storeAssets = useStoreAssets();

const props = defineProps({
  asset: {
    type: Object,
    default: () => null,
  },
  //teste
  register: {
    type: Object,
    default: () => null,
  },
});

// preco medio como computed (seguro contra props nulas)
const precoMedio = computed(() => {
  const min = Number(props.asset?.valor_min ?? 0);
  const max = Number(props.asset?.valor_max ?? 0);
  return (min + max) / 2;
});

const precoAtual = props.register[0].preco_atual // nao posso fazer assim, isso aqui é teste
</script>

<template>
  <div class="asset-details-content q-mt-lg">
    <div class="section-title">Estatísticas Chave</div>

    <!-- dá pra tirar varios desse ou trocar por coisas mais didaticas -->
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Risco do Ativo</div>
        <!-- cor antiga = #f57c00 -->
        <div class="info-value" :style="useColorRisk(props.asset.risco)">{{ props.asset.risco }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Preço Atual</div>
        <div class="info-value">{{ useCurrencify(precoAtual) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Preço Médio</div>
        <div class="info-value">{{ useCurrencify(precoMedio) }}</div>
      </div>
      <!-- talvez nao precise desse aqui, e sim so no header -->
      <div class="info-item">
        <div class="info-label">Alocação</div>
        <div class="info-value"
          :style="useColorPercentage(usePercentageCalculator(precoMedio,precoAtual))"
        >
          {{ usePercentageCalculator(precoMedio,precoAtual).toFixed(2) }}%
        </div>
      </div>

      <!-- seção para ativos do perfil -->
      <!-- <div class="info-item">
        <div class="info-label">Valor Aplicado</div>
        <div class="info-value">R$ 600,61</div>
      </div>

      <div class="info-item">
        <div class="info-label">Rentabilidade</div>
        <div class="info-value" style="color: #71F588">20,12%</div>
      </div>

      <div class="info-item">
        <div class="info-label">Valor Final</div>
        <div class="info-value">R$ 729,61</div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.asset-details-content {
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 18px;
  color: #1a237e;
  padding-bottom: 8px;
  border-bottom: 2px solid #eef2f9;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  /* Responsivo */
  gap: 15px;
  margin-bottom: 25px;
}

.info-item {
  background-color: #f8f9fd;
  /* Fundo mais suave */
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e8ecf4;
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

.info-label {
  font-size: 13px;
  color: #6b7280;
  /* Cinza mais escuro */
  margin-bottom: 8px;
  font-weight: 500;
}

.info-value {
  font-weight: 600;
  font-size: 15px;
  color: #3f51b5;
  /* Cor de destaque */
}

.about-section {
  margin-bottom: 25px;
}

.about-text {
  font-size: 14px;
  line-height: 1.7;
  color: #444;
}




</style>
