<script setup>
import SectionTitle from "../SectionTitle.vue";
import { defineProps } from "vue";
import AssetCard from "./AssetCard.vue";
import { useStoreAssets } from "src/stores/storeAssets";

const storeAssets = useStoreAssets()

defineProps({
  assets: {
    type: Array,
    required: false,
    default: () => [],
  },
});

</script>

<template>
  <div class="section text-body2 text-weight-regular">
    <SectionTitle title="Meus Ativos" />
    <div class="assets-list">
     <AssetCard v-for="asset in assets" :asset="asset"/>
    </div>
  </div>

  <div class="mb"></div>
</template>

<style lang="scss" scoped>

</style>
