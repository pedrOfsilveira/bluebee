<script setup>
import { computed } from "vue";
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const categoryMap = {
  attention: { icon: 'lightbulb', messageClass: 'attention-item' },
  suggestion: { icon: 'check_circle', messageClass: 'suggestion-item' },
};

const categoryInfo = computed(() => {
  return categoryMap[props.category] || categoryMap.suggestion;
});

const { icon: iconName, messageClass: messageClassName } = categoryInfo.value;

</script>

<template>
  <div :class="['list-item', messageClassName]">
    <q-icon :name="iconName" class="list-icon" />
    <span class="list-text"> <slot/> </span>
  </div>
</template>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: flex-start;
  /* Alinha ícone com a primeira linha de texto */
  margin-bottom: 15px;
  /* Mais espaço */
  padding: 18px;
  /* Mais padding */
  border-radius: 12px;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.list-icon {
  font-size: 20px;
  /* Maior */
  margin-right: 15px;
  margin-top: 2px;
  /* Alinhamento vertical fino */
  width: 24px;
  /* Largura fixa para alinhamento */
  text-align: center;
}

.list-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: $text-dark;
  font-weight: 500;
}

.suggestion-item {
  background-color: rgba(46, 204, 113, 0.08);
  /* Verde mais suave */
  border-left: 5px solid $positive;
}

.suggestion-item .list-icon {
  color: $positive;
}

.attention-item {
  /* Renomeado de error-item */
  background-color: rgba(243, 156, 18, 0.08);
  /* Laranja mais suave */
  border-left: 5px solid $accent;
}

.attention-item .list-icon {
  color: $accent;
}

</style>
