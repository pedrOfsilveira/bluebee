<script setup>
import { color } from "chart.js/helpers";
import { RouterLink } from "vue-router";

defineProps({
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "secondary",
  },
  seeAll: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "",
  },
  bb: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="section-title" :class="`text-${textColor} ${bb ? 'bb' : ''}`">
    <span class="text-weight-bolder text-h6 flex items-center">
      <q-icon v-if="icon" :name="icon" size="sm" class="q-mr-sm" />
      {{ title }}
    </span>
    <RouterLink v-if="seeAll && to" :to="to" class="text-weight-bold"
      >Ver tudo</RouterLink
    >
    <a v-else-if="seeAll" class="text-weight-bold">Ver tudo</a>
  </div>
</template>

<style scoped lang="scss">
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title a {
  text-decoration: none;
  color: $primary;
}

.section-title a:visited {
  color: $primary;
}
</style>
