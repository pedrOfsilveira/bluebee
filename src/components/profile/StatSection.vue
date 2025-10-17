<template>
  <div class="stat-section">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.stat-section {
  background-color: $bg-card;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  padding: 18px;
  border: 1px solid #e8ecf4;
}
</style>
