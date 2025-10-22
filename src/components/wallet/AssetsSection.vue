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
    required: false,
    default: () => [],
  },
  filter: {
    type: String,
    default: 'all'
  },
});

console.log(props.assets)
const filteredAssets = computed(() => {
  // const allAssets = storeAssets.assets;
  const allAssets = props.assets // teste
  if (props.filter === 'all') {
    return allAssets;
  }

  return allAssets.filter(asset => asset.category === props.filter);
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
