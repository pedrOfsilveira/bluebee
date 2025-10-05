<script setup>
import { defineProps } from 'vue';
defineProps({
  title: {
    type: String,
    default: 'Clique aqui'
  }
});
</script>

<template>
  <button class="big-btn">{{ title }}</button>
</template>

<style lang="scss">
.big-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5c6bc0 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(63, 81, 181, 0.3);
  position: relative;
  overflow: hidden;
}

.big-btn:active {
  transform: translateY(-1px);
}
</style>