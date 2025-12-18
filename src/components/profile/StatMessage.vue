<script setup>
import { computed } from "vue";
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const categoryMap = {
  attention: { icon: "fas fa-lightbulb", messageClass: "attention-item" },
  suggestion: { icon: "fas fa-circle-check", messageClass: "suggestion-item" },
};

const categoryInfo = computed(() => {
  return categoryMap[props.category] || categoryMap.suggestion;
});

const { icon: iconName, messageClass: messageClassName } = categoryInfo.value;
</script>

<template>
  <div :class="['list-item', messageClassName]">
    <q-icon :name="iconName" class="list-icon" />
    <span class="list-text"> <slot /> </span>
  </div>
</template>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;

  padding: 18px;

  border-radius: 12px;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.list-icon {
  font-size: 20px;

  margin-right: 15px;
  margin-top: 2px;

  width: 24px;

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

  border-left: 5px solid $positive;
}

.suggestion-item .list-icon {
  color: $positive;
}

.attention-item {
  background-color: rgba(243, 156, 18, 0.08);

  border-left: 5px solid $accent;
}

.attention-item .list-icon {
  color: $accent;
}
</style>
