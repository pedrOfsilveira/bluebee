<script setup>

defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  seeAll: {
    type: Boolean,
    default: false,
  }
});

</script>

<template>
  <div class="section-title q-pa-sm">
    <span class="text-weight-bolder ">
      <q-icon :name="icon" size="sm" class="q-mr-sm" />
      {{ title }}
    </span>
    <a v-if="seeAll" class="text-weight-bold">Ver tudo</a>
  </div>
</template>


<style scoped lang="scss">
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $secondary;
}
</style>
