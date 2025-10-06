<script setup>
import AuthHeader from 'src/components/auth/AuthHeader.vue';
import AuthInput from 'src/components/auth/AuthInput.vue';
import BigButton from 'src/components/BigButton.vue';
</script>

<template>
   <AuthHeader title="Bem-vindo ao Blue Bee" subtitle="Aprenda a investir de forma simples e gamificada"/>

    <div class="login-form">
      <AuthInput label="Nome" type="text" icon="person" class="q-mb-lg"/>
      
      <AuthInput label="Data de Nascimento" type="date" icon="calendar_today" class="q-mb-lg" />
      <AuthInput label="Email" type="email" icon="email" class="q-mb-lg"/>
      <AuthInput label="Senha" type="password" icon="key" class="q-mb-lg" />
      <AuthInput label="Confirmar Senha" type="password" icon="check_circle" class="q-mb-md" />
      <div class="options">
        <div class="forgot-password">
          <a href="#">Esqueceu sua senha?</a>
        </div>
      </div>

      <BigButton title="Cadastrar" class="q-mb-lg"/>
  
      <div class="signup-link">
        Já tem uma conta? <a @click="$router.push('/login')">Faça login</a>
      </div>
    </div>
</template>

<style lang="scss">

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
