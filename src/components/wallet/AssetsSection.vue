<script setup>
import SectionTitle from "../SectionTitle.vue";
import { defineProps } from "vue";
import AssetCard from "./AssetCard.vue";

defineProps({
  assets: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<template>
  <div class="section text-body2 text-weight-regular q-mt-sm">
    <SectionTitle title="Ativos" />
    <div class="assets-list">
     <AssetCard v-for="asset in assets" :asset="asset"/>
    </div>
  </div>

  <div class="mb"></div>
</template>

<style lang="scss" scoped>

</style>
