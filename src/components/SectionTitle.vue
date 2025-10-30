<script setup>
import { color } from 'chart.js/helpers';


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
    default: 'secondary',
  },
  seeAll: {
    type: Boolean,
    default: false,
  },
  bb: {
    type: Boolean,
    default: false,
  }
});

</script>

<template>
  <div class="section-title" :class="`text-${textColor} ${bb ? 'bb' : ''}` ">
    <span class="text-weight-bolder text-h6 flex items-center">
      <q-icon v-if="icon" :name="icon" size="sm" class="q-mr-sm" />
      {{ title }}
    </span>
    <a v-if="seeAll" class="text-weight-bold">Ver tudo</a>
  </div>
</template>


<style scoped lang="scss">
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;;
}
</style>
