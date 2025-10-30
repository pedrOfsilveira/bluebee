<script setup>
import SectionTitle from "../SectionTitle.vue";
import { ref, computed } from "vue";
import AssetCard from "./AssetCard.vue";
import AssetDetailDialog from "src/components/AssetDetailDialog.vue";

const props = defineProps({
  assets: {
    type: Array,
    required: true,
  },
  filter: {
    type: String,
    default: "todos",
  },
});

console.log(props.assets);
const filteredAssets = computed(() => {
  // const allAssets = storeAssets.assets;
  const allAssets = props.assets; // teste
  if (props.filter === "todos") {
    return allAssets;
  }

  return allAssets.filter((asset) => asset.tipo === props.filter);
});

const isDialogVisible = ref(false);
const selectedAsset = ref(null);

const showAssetDetails = (asset) => {
  selectedAsset.value = asset;
  isDialogVisible.value = true;
};
</script>

<template>
  <div class="section text-body2 text-weight-regular">
    <SectionTitle title="Ativos" />
    <div class="assets-list">
      <AssetCard
        v-for="asset in filteredAssets"
        :asset="asset"
        @open-details="showAssetDetails"
      />
    </div>
  </div>

  <div class="mb"></div>

  <AssetDetailDialog
      v-model="isDialogVisible"
      :asset="selectedAsset"
  />
</template>

<style lang="scss" scoped></style>
