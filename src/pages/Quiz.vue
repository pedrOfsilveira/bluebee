<script setup>
import { computed, ref } from 'vue'; // Importar REF é importante
import BlueHeader from 'src/components/BlueHeader.vue';
import { useQuizStore } from 'src/stores/storeQuiz';
import { useRouter } from 'vue-router';
import { useStoreTutorial } from 'src/stores/storeTutorial';
import { onMounted } from 'vue';

const store = useQuizStore();
const router = useRouter();

// Controle da direção da animação
const transitionName = ref('q-transition--slide-left');

const currentQuestion = computed(() => store.questions[store.currentQuestionIndex]);
const progress = computed(() => (store.currentQuestionIndex + 1) / store.questions.length);

const selectOption = (index) => {
  transitionName.value = 'q-transition--slide-left'; // Animação de ir pra frente
  store.submitAnswer(index);
};

// --- LÓGICA DO SWIPE (Voltar) ---
const handleSwipe = ({ direction }) => {
  if (direction === 'right') { // Arrastou para direita (quer voltar)
    if (store.currentQuestionIndex > 0) {
      transitionName.value = 'q-transition--slide-right'; // Animação de voltar
      store.prevQuestion();
    }
  }
};

const tutorial = useStoreTutorial();
onMounted(() => {
  setTimeout(() => tutorial.startTutorialFor('quiz'), 600);
});
</script>

<template>
  <q-page>

    <BlueHeader>
      <div class="flex justify-between items-center q-mb-md">
        <div class="text-h5 text-weight-bolder flex items-center">
          <q-icon name="fas fa-brain" class="q-mr-sm" />
          Quiz Bluebee
        </div>
        <div v-if="!store.showResult" class="text-subtitle2 q-ml-md text-white bg-white-20 q-px-sm q-py-xs rounded-borders">
          {{ store.currentQuestionIndex + 1 }} / {{ store.questions.length }}
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
          <div :key="store.currentQuestionIndex">

            <q-card class="quiz-card q-mb-lg">
              <q-card-section class="text-center q-py-lg">
                <div class="text-h6 text-grey-9 text-weight-bold">
                  {{ currentQuestion.text }}
                </div>
              </q-card-section>
            </q-card>

            <div class="options-container" id="quiz-options">
              <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                class="option-btn"
                @click="selectOption(index)"
              >
                {{ option }}
              </button>
            </div>

            <div v-if="store.currentQuestionIndex > 0" class="text-center q-mt-md text-caption text-grey-5">
              <q-icon name="fas fa-chevron-left" /> Deslize para voltar
            </div>

          </div>
        </transition>
      </div>

      <div v-else class="results-container text-center">

        <q-card class="quiz-card q-mb-md q-pa-lg">
          <div class="text-h6 text-grey-7 q-mb-md">Sua Pontuação</div>

          <q-circular-progress
            show-value
            font-size="28px"
            :value="(store.score / store.questions.length) * 100"
            size="120px"
            :thickness="0.2"
            color="primary"
            track-color="grey-3"
            class="q-mb-md text-weight-bold text-primary"
          >
            {{ store.score }}/{{ store.questions.length }}
          </q-circular-progress>

          <div class="text-body1 text-grey-8">
            {{ store.score === store.questions.length ? 'Perfeito!' : 'Bom trabalho!' }}
          </div>
        </q-card>

        <div class="text-left text-subtitle1 text-weight-bold text-grey-8 q-mb-sm q-pl-xs">
          Análise de Desempenho
        </div>

        <q-card
          class="quiz-card feedback-card q-mb-lg"
          :style="{ borderLeftColor: (store.feedback && store.feedback.color) === 'positive' ? '#21BA45' : '#F2C037' }"
        >
          <q-card-section class="row items-center no-wrap">
            <div class="col-auto q-mr-md">
              <q-avatar :color="store.feedback.color" text-color="white" :icon="store.feedback.icon" />
            </div>
            <div class="col">
              <div class="text-weight-bold">{{ store.feedback.title }}</div>
              <div class="text-caption text-grey-8">{{ store.feedback.msg }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              :label="store.feedback.action"
              icon-right="fas fa-arrow-right"
              @click="router.push(store.feedback.route); store.restartQuiz()"
            />
          </q-card-actions>
        </q-card>

        <q-btn
          outline
          color="primary"
          label="Refazer Quiz"
          class="full-width q-mb-md q-pa-md rounded-borders"
          @click="store.restartQuiz()"
        />

      </div>

    <div class="mb"></div>
    </div>

  </q-page>
</template>

<style lang="scss" scoped>
/* Estilo Glassmorphism para o contador */
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
  padding: 16px 20px;
  text-align: left;
  font-size: 15px;
  color: #424242;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.option-btn:active {
  transform: scale(0.98);
  background-color: #f5f5f5;
}

/* Feedback Card Destaque */
.feedback-card {
  border-left: 5px solid;
}
</style>
