<script setup>
import { computed, ref } from 'vue';
import BlueHeader from "src/components/BlueHeader.vue";
import { useStoreInvestorProfile } from "src/stores/storeInvestorProfile";
import { useRouter } from 'vue-router';

const store = useStoreInvestorProfile();
const router = useRouter();

// Controle da direção da animação
const transitionName = ref('q-transition--slide-left');

// Dados computados para a view
const currentQuestion = computed(() => store.questions[store.currentStep]);
const progress = computed(() => (store.currentStep + 1) / store.questions.length);

// Ação de selecionar (avança)
const selectOption = (option) => {
  transitionName.value = 'q-transition--slide-left';
  store.submitAnswer(option);
};

// Ação de Swipe (voltar)
const handleSwipe = ({ direction }) => {
  if (direction === 'right') {
    if (store.currentStep > 0) {
      transitionName.value = 'q-transition--slide-right';
      store.prevQuestion();
    }
  }
};
</script>

<template>
  <q-page>

    <BlueHeader>
      <div class="flex justify-between items-center q-mb-md">
        <div class="text-h5 text-weight-bolder flex items-center">
          <q-icon name="fas fa-balance-scale" class="q-mr-sm" />
          Perfil Investidor
        </div>

        <div v-if="!store.showResult" class="text-subtitle2 q-ml-md text-white bg-white-20 q-px-sm q-py-xs rounded-borders">
          {{ store.currentStep + 1 }} / {{ store.questions.length }}
        </div>
      </div>

      <q-linear-progress
        v-if="!store.showResult"
        :value="progress"
        color="secondary"
        track-color="blue-grey-3"
        class="q-mb-sm rounded-borders"
        size="8px"
      />
    </BlueHeader>

    <div class="section" style="margin-top: -30px;">

      <div
        v-if="!store.showResult"
        v-touch-swipe.mouse.right="handleSwipe"
        style="min-height: 400px"
      >
        <transition :name="transitionName" mode="out-in">
          <div :key="store.currentStep">

            <q-card class="quiz-card q-mb-lg">
              <q-card-section class="text-center q-py-lg">
                <div class="text-h6 text-grey-9 text-weight-bold">
                  {{ currentQuestion.text }}
                </div>
              </q-card-section>
            </q-card>

            <div class="options-container">
              <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                class="option-btn"
                @click="selectOption(option)"
              >
                {{ option.label }}
              </button>
            </div>

            <div v-if="store.currentStep > 0" class="text-center q-mt-md text-caption text-grey-5">
              <q-icon name="fas fa-chevron-left" /> Deslize para voltar
            </div>

          </div>
        </transition>
      </div>

      <div v-else class="results-container text-center">

        <q-card class="quiz-card q-mb-md q-pa-lg">
          <div class="text-h6 text-grey-7 q-mb-md">Seu Perfil é</div>

          <div class="profile-icon-wrapper q-mb-md">
            <q-avatar
              size="100px"
              :color="store.resultProfile.color"
              text-color="white"
            >
              <q-icon :name="store.resultProfile.icon" size="50px" />
            </q-avatar>
          </div>

          <div class="text-h4 text-weight-bolder text-primary q-mb-xs">
            {{ store.resultProfile.title }}
          </div>
        </q-card>

        <div class="text-left text-subtitle1 text-weight-bold text-grey-8 q-mb-sm q-pl-xs">
          O que isso significa?
        </div>

        <q-card class="quiz-card feedback-card q-mb-lg" :style="{ borderLeftColor: `var(--q-${store.resultProfile.color})` }">
          <q-card-section>
            <div class="text-body1 text-grey-8 text-justify" style="line-height: 1.6;">
              {{ store.resultProfile.msg }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              label="Ir para o Dashboard"
              icon-right="fas fa-arrow-right"
              @click="(async () => { await store.saveResult?.(); router.push('/'); store.restartQuiz(); })()"
            />
          </q-card-actions>
        </q-card>

        <q-btn
          outline
          color="primary"
          label="Refazer Teste"
          class="full-width q-mb-lg q-pa-md rounded-borders"
          @click="store.restartQuiz()"
        />

      </div>

    <div class="mb"></div>
    </div>

  </q-page>
</template>

<style lang="scss" scoped>
/* Glassmorphism no header */
.bg-white-20 {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.quiz-card {
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  background: white;
}

/* Botões de Opção */
.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 18px 20px;
  text-align: left;
  font-size: 16px;
  color: #424242;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.option-btn:active {
  transform: scale(0.98);
  background-color: #f5f5f5;
  border-color: var(--q-primary);
}

/* Borda colorida no card de feedback baseada no perfil */
.feedback-card {
  border-left: 5px solid;
}
</style>
