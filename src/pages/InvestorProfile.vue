<script setup>
import BigButton from "src/components/BigButton.vue";
import BlueHeader from "src/components/BlueHeader.vue";
import { useStoreInvestorProfile } from "src/stores/storeInvestorProfile";
import { computed } from "vue";

const store = useStoreInvestorProfile();

const currentAnswer = computed({
  get: () => store.answers[store.currentQuestion.id],
  set: (val) => store.setAnswer(val),
});

const finalizarQuiz = () => {
  if (!store.isCompleted) return; // Segurança extra
  const resultado = store.calculateProfile();
  alert(`Seu perfil é: ${resultado}`);
};
</script>

<template>
  <BlueHeader>
    <div class="flex text-h5 text-weight-bolder items-center q-">
      <q-icon name="fas fa-scale-unbalanced" class="q-mr-sm" />
      Perfil Investidor
    </div>
  </BlueHeader>

  <div class="section q-mt-lg">
    <div class="flex justify-center q-mb-md">
      <q-pagination
        v-model="store.currentStep"
        :max="store.totalQuestions"
        input
        color="primary"
      />
    </div>

    <div class="question">
      <div class="text-h6 text-weight-medium text-secondary q-mb-md bb">
        {{ store.currentStep }}. {{ store.currentQuestion.text }}
      </div>
    </div>

    <q-btn-toggle
      v-model="currentAnswer"
      flat
      class="q-mb-lg"
      name="quiz_options"
      toggle-color="primary"
      no-caps
      :options="store.currentQuestion.options"
    />

    <div v-if="store.currentStep === store.totalQuestions" class="q-mt-md">
      <BigButton
        title="Finalizar Quiz"
        @click="finalizarQuiz"
        :disable="!store.isCompleted"
      />

      <div v-if="!store.isCompleted" class="text-caption text-center text-grey">
        Responda todas as perguntas para finalizar.
      </div>
    </div>
  </div>
  <div class="mb"></div>
</template>

<style lang="scss">
.q-btn-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & .q-btn {
    width: 100% !important;
  }
}

.question {
  border: 1px solid #e8ecf4;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.q-pagination__content {
  & .q-btn__content {
    font-size: 1.4rem;
  }
}
</style>
