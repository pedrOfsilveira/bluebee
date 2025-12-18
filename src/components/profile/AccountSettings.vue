<script setup>
import { ref, computed } from "vue";
import { useStoreAuth } from "src/stores/storeAuth";
import { useStoreInvestorProfile } from "src/stores/storeInvestorProfile";
import { useRouter } from "vue-router";
import AuthInput from "src/components/auth/AuthInput.vue";
import BigButton from "src/components/BigButton.vue";
import { useQuasar } from "quasar";

const storeAuth = useStoreAuth();
const investor = useStoreInvestorProfile();
const router = useRouter();
const $q = useQuasar();

const nome = ref(storeAuth.userDetails.nome || "");
const genero = ref(storeAuth.userDetails.genero || "");
const savingProfile = ref(false);

const canSaveProfile = computed(() => nome.value?.trim().length > 0);

const onSaveProfile = async () => {
  savingProfile.value = true;
  const { ok, message } = await storeAuth.updateProfile({
    nome: nome.value,
    genero: genero.value || undefined,
  });
  savingProfile.value = false;
  if (ok) {
    $q.notify({ type: "positive", message: "Perfil atualizado com sucesso." });
  } else if (message) {
    $q.notify({ type: "negative", message });
  }
};

const newEmail = ref(storeAuth.userDetails.email || "");
const savingEmail = ref(false);
const onSaveEmail = async () => {
  if (!newEmail.value || !newEmail.value.includes("@")) {
    $q.notify({ type: "warning", message: "Informe um e-mail válido." });
    return;
  }
  savingEmail.value = true;
  const { ok, message } = await storeAuth.updateEmail(newEmail.value);
  savingEmail.value = false;
  if (ok) {
    $q.notify({
      type: "positive",
      message:
        "E-mail atualizado. Verifique sua caixa de entrada para confirmar.",
    });
  } else if (message) {
    $q.notify({ type: "negative", message });
  }
};

const pwd1 = ref("");
const pwd2 = ref("");
const savingPwd = ref(false);

const onSavePassword = async () => {
  if (!pwd1.value || pwd1.value.length < 6) {
    $q.notify({
      type: "warning",
      message: "A senha deve ter pelo menos 6 caracteres.",
    });
    return;
  }
  if (pwd1.value !== pwd2.value) {
    $q.notify({ type: "warning", message: "As senhas não coincidem." });
    return;
  }
  savingPwd.value = true;
  const { ok, message } = await storeAuth.updatePassword(pwd1.value);
  savingPwd.value = false;
  if (ok) {
    $q.notify({ type: "positive", message: "Senha atualizada com sucesso." });
    pwd1.value = "";
    pwd2.value = "";
  } else if (message) {
    $q.notify({ type: "negative", message });
  }
};

const onRedoInvestorProfile = () => {
  investor.restartQuiz();
  router.push("/investprofile");
};
</script>

<template>
  <div class="q-gutter-md">
    <div class="login-form">
      <div class="text-subtitle1 text-weight-bold q-mb-md">Dados Pessoais</div>

      <AuthInput
        v-model="nome"
        label="Nome"
        type="text"
        icon="person"
        class="q-mb-lg"
      />

      <div class="auth-toggle">
        <q-btn-toggle
          v-model="genero"
          flat
          class="q-mb-lg"
          name="gender"
          toggle-color="primary"
          :options="[
            { value: 'masculino', icon: 'male' },
            { value: 'feminino', icon: 'female' },
            { value: 'outro', label: 'Outro' },
          ]"
        />
      </div>

      <BigButton
        :disable="!canSaveProfile || savingProfile"
        :title="savingProfile ? 'Salvando...' : 'Salvar dados pessoais'"
        @click="onSaveProfile"
      />
    </div>

    <div class="login-form">
      <div class="text-subtitle1 text-weight-bold q-mb-md">E-mail</div>

      <AuthInput
        v-model="newEmail"
        type="email"
        label="Novo e-mail"
        icon="email"
        class="q-mb-lg"
      />
      <BigButton
        :disable="savingEmail"
        :title="savingEmail ? 'Atualizando...' : 'Atualizar e-mail'"
        @click="onSaveEmail"
      />
    </div>

    <div class="login-form">
      <div class="text-subtitle1 text-weight-bold q-mb-md">Senha</div>

      <AuthInput
        v-model="pwd1"
        type="password"
        label="Nova senha"
        icon="key"
        class="q-mb-lg"
      />
      <AuthInput
        v-model="pwd2"
        type="password"
        label="Confirmar nova senha"
        icon="check_circle"
        class="q-mb-lg"
      />
      <BigButton
        :disable="savingPwd"
        :title="savingPwd ? 'Atualizando...' : 'Atualizar senha'"
        @click="onSavePassword"
      />
    </div>

    <div class="login-form">
      <div class="text-subtitle1 text-weight-bold q-mb-md">
        Perfil do Investidor
      </div>
      <BigButton
        :title="'Refazer Teste de Perfil'"
        @click="onRedoInvestorProfile"
      />
    </div>
  </div>
</template>

<style scoped></style>
