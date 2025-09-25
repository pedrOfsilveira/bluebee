<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="floating-footer">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" active-bg-color="blue-1"
        style="border-radius: 25px">
        <q-route-tab to="/" name="home" icon="home" label="Início" />
        <q-route-tab to="/wallet" name="wallet" icon="wallet" label="Carteira" />
        <q-route-tab to="/profile" name="profile" icon="person" label="Perfil" />
      </q-tabs>
    </div>
  </q-layout>
</template>

<script setup>
// Usei QRouteTab para que a navegação funcione automaticamente com as rotas.
// Não se esqueça de definir suas rotas no arquivo /router/routes.js
</script>

<style scoped>
.floating-footer {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  width: 90%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);

  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px;
}

.q-tab--active {
  border-radius: 17px;
}
</style>
