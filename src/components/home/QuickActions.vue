<script setup>
// LEMBRAR DE TIRAR TUDO ISSO E O @CLICK DO BOTAO
import { useStoreAuth } from "src/stores/storeAuth";

const storeAuth = useStoreAuth()
// ATE AQUI
</script>

<template>
  <div class="quick-actions">
    <button class="action-btn">
      <q-btn
        to="/explore"
        flat
        padding="md"
        icon="fas fa-compass"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Explorar</span>
    </button>
    <button class="action-btn">
      <q-btn
        to="/glossary"
        flat
        padding="md"
        icon="fas fa-book"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Glossário</span>
    </button>
    <button class="action-btn">
      <q-btn
        to="/calculator"
        flat
        padding="md"
        icon="fas fa-calculator"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Simular</span>
    </button>
    <button class="action-btn">
      <q-btn
      to="/investprofile"
        flat
        padding="md"
        icon="fas fa-rocket"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Desafios</span>
    </button>
    <button class="action-btn">
      <q-btn
      to="/security"
        flat
        padding="md"
        icon="fas fa-shield-alt"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Anti-Golpe</span>
    </button>
    <button class="action-btn">
      <q-btn
      to="/quiz"
        flat
        padding="md"
        icon="fas fa-puzzle-piece"
        text-color="primary"
        class="q-mb-sm"
      />
      <span>Quiz</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.quick-actions {
   border: 1px solid #e8ecf4;
  // background-color: $card-opacity;
  background-color: white;
  backdrop-filter: blur(8px);
  // border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  margin: -30px 20px 25px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: $text-light;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: $text-light;
  transition: transform 0.3s ease, color 0.3s ease;
}

.action-btn .q-btn {
 border: 1px solid #e8ecf4;
  background: linear-gradient(145deg, #eef2f9, #f8f9fd);
  border-radius: 16px;
}
</style>
