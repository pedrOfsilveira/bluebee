<script setup>
import { computed } from 'vue';
import BlueHeader from 'src/components/BlueHeader.vue';
import LogoutButton from 'src/components/profile/LogoutButton.vue';
import StatList from 'src/components/profile/StatList.vue';
import AccountSettings from 'src/components/profile/AccountSettings.vue';
import SectionTitle from 'src/components/SectionTitle.vue';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreUserChallenges } from 'src/stores/storeUserChallenges';
import { useStoreHistory } from 'src/stores/storeHistory'
import { useStoreTutorial } from 'src/stores/storeTutorial'
import { onMounted } from 'vue'

const storeAuth = useStoreAuth()
const storeUserChallenges = useStoreUserChallenges()
const storeHistory = useStoreHistory()

const investorProfileColor = computed(() => {
  const p = (storeAuth.userDetails.investor_profile || '').toLowerCase()
  if (p.includes('conserv')) return 'secondary'
  if (p.includes('moder')) return 'warning'
  if (p.includes('arroj')) return 'negative'
  return 'primary'
})

const tutorial = useStoreTutorial()
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor('profile'), 600)
})
</script>

<template>
  <BlueHeader>
    <div class="profile-pic-container">
      <div class="profile-pic"></div>
    </div>

    <div class="profile-name">{{ storeAuth.userDetails.nome }}</div>

    <div class="profile-level">
      <q-icon name="fas fa-star" size="16px" class="q-mr-2" />
      {{ storeAuth.userDetails.nivel }} - Investidor Junior
    </div>

    <div class="profile-stats-container">
      <div class="profile-stats-header">
        <div class="text-subtitle1 text-weight-bold">Visão Geral</div>
        <q-badge v-if="storeAuth.userDetails.investor_profile" class="profile-badge">
          <q-icon name="fas fa-circle" :color="investorProfileColor" size="8px" class="q-mr-sm" />
          {{ storeAuth.userDetails.investor_profile }}
        </q-badge>
      </div>
      <div class="profile-stats">

        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="fas fa-medal" size="20px" class="q-mr-sm" />
            <div class="stat-value">{{ storeUserChallenges.challenges.length }}</div>
          </div>
          <div class="stat-label">Conquistas</div>
        </div>
        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="fas fa-fire" size="20px" class="q-mr-sm" />
            <div class="stat-value">{{ storeHistory.strike }}</div>
          </div>
          <div class="stat-label">Sequência</div>
        </div>
        <div class="stat-item" style="flex:2">
          <div class="flex items-center justify-center">
            <q-icon name="fas fa-star" size="20px" class="q-mr-sm" />
            <div class="stat-value">{{ storeAuth.userDetails.experiencia }}</div>
          </div>
          <div class="stat-label">Experiência</div>
        </div>
      </div>
    </div>
  </BlueHeader>
  <div class="section q-mt-lg">
    <SectionTitle title="Relatório de Progresso" icon="fas fa-square-poll-vertical" />
    <StatList />
  </div>
  <div class="section q-mt-lg pad">
    <q-expansion-item id="account-settings" expand-separator dense header-class="settings-header" expand-icon-class="text-grey-6">
      <template v-slot:header>
        <div class="row full-width items-center no-wrap">
          <div class="settings-icon q-mr-md">
            <q-icon name="fas fa-user-gear" size="xs" color="white" />
          </div>
          <div class="col text-weight-bold text-grey-9 text-body1 text-left">
            Configurações da Conta
          </div>
        </div>
      </template>
      <q-card flat>
        <q-card-section class="q-pa-none">
          <AccountSettings />
        </q-card-section>
      </q-card>
    </q-expansion-item>
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
  background-image: url('https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png');
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


.profile-stats-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 16px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  box-shadow: none;
}

.settings-header {
  padding: 15px;
}

.pad .q-item {
  padding: 0 !important;
}

.settings-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5c6bc0 100%);
}
</style>
