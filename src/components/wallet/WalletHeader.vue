<script setup></script>

<template>
  <div class="home-top-container">
    <div class="text-subtitle1 text-weight-regular">Total Investido</div>
    <div class="text-h4 text-weight-bolder q-mt-sm">R$ 5.247,89</div>
    <div>
      <q-badge
        align="middle"
        label="+ R$245,12 (4,9%)"
        class="q-mt-sm q-pa-sm text-weight-bold text-caption positive-bg"
        text-color="positive"
        id="badge"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(63, 81, 181, 0.4);
  padding: 30px 20px 40px;
  background: linear-gradient(
    135deg,
    $secondary 0%,
    $primary 70%,
    #5c6bc0 100%
  );
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}
</style>
