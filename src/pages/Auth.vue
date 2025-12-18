<script setup>
import AuthHeader from "src/components/auth/AuthHeader.vue";
import AuthInput from "src/components/auth/AuthInput.vue";
import BigButton from "src/components/BigButton.vue";
import { ref, reactive } from "vue";
import { useStoreAuth } from "src/stores/storeAuth";
import { useQuasar } from "quasar";

const $q = useQuasar();

const storeAuth = useStoreAuth();

const register = ref(false);

const switchRegister = () => {
  register.value = !register.value;
};

const credentialsLogin = reactive({
  email: "",
  password: "",
});

const credentialsRegister = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  birth: "",
  gender: "",
});

const credentialsVerify = (credentials) => {
  let verify = true;
  for (var i in credentials) {
    if (credentials[i] === "") verify = false;
  }
  return verify;
};

const credentialsPasswordVerify = (credentials) => {
  let verify = true;
  if (credentials.passwordConfirm) {
    if (credentials.passwordConfirm !== credentials.password) {
      verify = false;
    }
  }
  return verify;
};

const submitForm = (credencials) => {
  if (!credentialsVerify(credencials)) {
    $q.dialog({
      title: "Erro",
      message: "Por favor preencha todas as lacunas",
    });
  } else if (!credentialsPasswordVerify(credencials)) {
    $q.dialog({
      title: "Erro",
      message:
        "Certifique-se de que os campos senha e confirmar senha estão iguais",
    });
  } else {
    formSubmitSuccess();
  }
};

const formSubmitSuccess = () => {
  if (register.value) {
    storeAuth.registerUser(credentialsRegister);
  } else {
    storeAuth.loginUser(credentialsLogin);
  }
};
</script>

<template>
  <AuthHeader
    title="Bem-vindo ao Blue Bee"
    subtitle="Aprenda a investir de forma simples e gamificada"
  />
  <div class="login-container">
    <div class="login-form" v-if="!register">
      <AuthInput
        v-model="credentialsLogin.email"
        label="Email"
        type="email"
        icon="email"
        class="q-mb-lg"
      />
      <AuthInput
        v-model="credentialsLogin.password"
        label="Senha"
        type="password"
        icon="key"
        class="q-mb-md"
      />

      <BigButton
        @click="submitForm(credentialsLogin)"
        title="Entrar"
        class="q-mb-lg"
      />

      <div class="signup-link">
        Não tem uma conta?
        <a @click="switchRegister">
          {{ register ? "Faça login" : "Cadastre-se" }}</a
        >
      </div>
    </div>
    <div class="login-form" v-if="register">
      <AuthInput
        v-model="credentialsRegister.name"
        label="Nome"
        type="text"
        icon="person"
        class="q-mb-lg"
      />

      <AuthInput
        v-model="credentialsRegister.birth"
        label="Data de Nascimento"
        type="date"
        icon="calendar_today"
        class="q-mb-lg"
      />
      <q-btn-toggle
        v-model="credentialsRegister.gender"
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
      <AuthInput
        v-model="credentialsRegister.email"
        label="Email"
        type="email"
        icon="email"
        class="q-mb-lg"
      />
      <AuthInput
        v-model="credentialsRegister.password"
        label="Senha"
        type="password"
        icon="key"
        class="q-mb-lg"
      />
      <AuthInput
        v-model="credentialsRegister.passwordConfirm"
        label="Confirmar Senha"
        type="password"
        icon="check_circle"
        class="q-mb-md"
      />
      <BigButton
        @click="submitForm(credentialsRegister)"
        title="Cadastrar"
        class="q-mb-lg"
      />

      <div class="signup-link">
        Já tem uma conta?
        <a @click="switchRegister">
          {{ register ? "Faça login" : "Cadastre-se" }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-btn[aria-pressed="true"] {
  box-shadow:
    0 0 0 3px rgba(91, 158, 240, 0.2),
    0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
  border: $primary 2px solid !important;
}

.q-btn-group {
  width: 100%;
  justify-content: space-between !important;
}

.q-btn-group .q-btn {
  border-radius: 16px !important;
  width: 32% !important;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fd 100%);
  border: 1px solid rgba(0, 0, 0, 0.24);
  height: 56px !important;
  transition: all 0.3s ease-in-out;
  color: rgba(0, 0, 0, 0.54);
}

.login-container {
  overflow: hidden;
}

.login-form {
  padding: 40px 30px 35px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.remember-me:hover {
  transform: translateX(2px);
}

.remember-me input {
  margin-right: 10px;
  accent-color: $primary;
  transform: scale(1.1);
}

.remember-me label {
  cursor: pointer;
  font-weight: 500;
  color: #555;
}

.forgot-password a {
  color: $primary;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.login-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5c6bc0 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(63, 81, 181, 0.3);
  position: relative;
  overflow: hidden;
}

.login-btn:active {
  transform: translateY(-1px);
}
.signup-link {
  text-align: center;
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}

.signup-link a {
  color: $primary;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
}
</style>
