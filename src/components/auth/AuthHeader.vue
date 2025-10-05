<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Insira um título'
  },
  subtitle: {
    type: String,
    default: 'Insira um subtítulo'
  }
});
</script>


<template>
   <div class="login-header">
      <q-icon name="hive" size="xl" class="q-mb-md" color="accent" />
      <span class="text-h5 text-weight-bolder">{{ title }}</span>
      <span class="text-subtitle1 text-weight-light"
      >{{ subtitle }}</span
      >
    </div>
</template>

<style scoped lang="scss">
.login-header {
  align-items: center;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5c6bc0 100%);
  color: white;
  padding: 40px 25px 35px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  box-shadow: 0 12px 35px rgba(63, 81, 181, 0.4);
}

.logo {
  font-size: 50px;
  margin-bottom: 15px;
  animation: bounce 2s ease-in-out infinite;
  display: inline-block;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
  position: relative;
  z-index: 2;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}

.login-header p {
  opacity: 0.9;
  font-size: 15px;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

</style>