<script setup>
import SectionTitle from "../SectionTitle.vue";
import { defineProps, ref } from "vue";
import AssetCard from "./AssetCard.vue";
import AssetDetailDialog from "src/components/AssetDetailDialog.vue";
import { useStoreUserAssets } from "src/stores/storeUserAssets";

const storeUserAssets = useStoreUserAssets();

const props = defineProps({
  assets: {
    type: Array,
    required: false,
  },
});

const isDialogVisible = ref(false);
const selectedAsset = ref(null);
const selectedRegister = ref(null);

const showAssetDetails = (asset, register) => {
  selectedAsset.value = asset;
  selectedRegister.value = register;
  isDialogVisible.value = true;
};
</script>

<template>
  <div class="section text-body2 text-weight-regular">
    <SectionTitle title="Meus Ativos" />
    <div class="assets-list" id="wallet-assets-list">
      <AssetCard
        v-for="asset in props.assets"
        :asset="asset"
        @open-details="showAssetDetails"
      />
    </div>
  </div>

  <div class="mb"></div>

  <AssetDetailDialog
    v-model="isDialogVisible"
    :asset="selectedAsset"
    :register="selectedRegister"
  />
</template>

<style lang="scss" scoped></style>
