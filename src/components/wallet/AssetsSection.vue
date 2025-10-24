<script setup>
import SectionTitle from "../SectionTitle.vue";
import { defineProps } from "vue";
import AssetCard from "./AssetCard.vue";
import { useStoreAssets } from "src/stores/storeAssets";
import { computed } from 'vue';

const storeAssets = useStoreAssets()

const props = defineProps({
  assets: {
    type: Array,
    required: true
  },
  filter: {
    type: String,
    default: 'todos'
  },
});

console.log(props.assets)
const filteredAssets = computed(() => {
  // const allAssets = storeAssets.assets;
  const allAssets = props.assets // teste
  if (props.filter === 'todos') {
    return allAssets;
  }

  return allAssets.filter(asset => asset.tipo === props.filter);
});
</script>

<template>
  <div class="section text-body2 text-weight-regular">
    <SectionTitle title="Ativos" />
    <div class="assets-list">
      <AssetCard v-for="asset in filteredAssets" :asset="asset" />
    </div>
  </div>

  <div class="mb"></div>
</template>

<style lang="scss" scoped></style>
