<template>
  <div class="home-top-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.home-top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(63, 81, 181, 0.4);
  padding: 30px 20px 40px;
  background: linear-gradient(135deg,
      $secondary 0%,
      $primary 70%,
      #5c6bc0 100%);
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}
</style>
