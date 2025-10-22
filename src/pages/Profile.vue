<script setup>
import BlueHeader from 'src/components/BlueHeader.vue';
import LogoutButton from 'src/components/profile/LogoutButton.vue';
import StatList from 'src/components/profile/StatList.vue';
import SectionTitle from 'src/components/SectionTitle.vue';
import { useStoreAuth } from 'src/stores/storeAuth';

const storeAuth = useStoreAuth()
</script>

<template>
  <BlueHeader>
    <div class="profile-pic-container">
      <div class="profile-pic"></div>
    </div>

    <div class="profile-name">{{ storeAuth.userDetails.nome }}</div>

    <div class="profile-level">
      <q-icon name="star" size="16px" class="q-mr-2" />
      {{ storeAuth.userDetails.nivel }} - Investidor Junior
    </div>

    <div class="profile-stats-container">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">Visão Geral</div>
      <div class="profile-stats">

        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="workspace_premium" size="20px" class="q-mr-1" />
            <div class="stat-value">15</div>
          </div>
          <div class="stat-label">Conquistas</div>
        </div>
        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="local_fire_department" size="20px" class="q-mr-1" />
            <div class="stat-value">15</div>
          </div>
          <div class="stat-label">Sequência</div>
        </div>
        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="star" size="20px" class="q-mr-1" />
            <div class="stat-value">{{ storeAuth.userDetails.experiencia }}</div>
          </div>
          <div class="stat-label">Experiência</div>
        </div>
      </div>
    </div>
  </BlueHeader>
  <div class="section q-mt-lg">
    <SectionTitle title="Relatório de Progresso" icon="analytics" />
    <StatList />
  </div>
  <div class="section">
    <LogoutButton/>
  </div>
  <div class="mb"></div>

</template>

<style lang="scss">
.profile-pic-container {
  position: relative;
  margin: 0 auto 15px;
  width: 100px;
  height: 100px;
  z-index: 2;
}

.profile-pic {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #81d4fa, #4fc3f7);
  border: 5px solid white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGGufBrBQeeKIcHbmY_hUgSjS7BcuYbVdtQ&s');
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.25));
}

.profile-level {
  background: linear-gradient(135deg, #ffc107, #ffa000);
  color: #3f51b5;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.45);
}

.profile-stats-container {
  display: flex;
  flex-direction: column;

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(10px);
  padding: 15px 20px;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.15);
  width: 100%;
}

.profile-stats {
  display: flex;
}


.stat-item {
  padding: 0 10px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-item:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.stat-value {
  font-size: 22px;
  font-weight: 700;

  position: relative;
}

.abc {
  font-size: 22px;
  font-weight: 700;
  position: relative;
}

.stat-label {
  font-size: 13px;
  opacity: 0.85;
  font-weight: 500;
}
</style>
