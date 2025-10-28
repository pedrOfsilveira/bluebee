<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="stat-card">
    <q-icon :name="icon" class="stat-icon" />
    <div class="stat-value" data-target="18">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.stat-card {
  overflow-wrap: break-word; /* Quebra palavras longas */
  word-break: break-word;
  text-wrap: wrap;
  min-width: 120px;
  background: linear-gradient(145deg, #eef2f9, #f8f9fd);
  padding: 20px 15px;
  /* Padding ajustado */
  border-radius: 16px;
  /* Mais arredondado */
  text-align: center;
  border: 1px solid #e8ecf4;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 28px;
  /* Maior */
  color: $primary;

  opacity: 0.8;
}

.stat-value {
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 20px;
  /* Maior */
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 5px;
}

.stat-label {
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 13px;
  color: $text-light;
  font-weight: 500;
}
</style>
