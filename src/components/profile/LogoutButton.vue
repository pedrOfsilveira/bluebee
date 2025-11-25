<script setup>
import { useStoreAuth } from 'src/stores/storeAuth';

const storeAuth = useStoreAuth();
</script>

<template>
  <div class="logout-btn" @click="storeAuth.logoutUser">
    <q-icon name="fas fa-door-open" class="text-weight-bold" />
    Sair da Conta
  </div>
</template>

<style lang="scss" scoped>
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #e53935;
  padding: 18px 20px;
  background: white;
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(229, 57, 53, 0.2);
}

.logout-btn:hover {
  background-color: #ffebee;
  color: $negative;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 35px rgba(244, 67, 54, 0.25);
}
</style>
