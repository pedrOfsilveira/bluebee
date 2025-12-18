<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useStoreAuth } from "./stores/storeAuth";

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>
