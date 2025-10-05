<script setup>
import AuthHeader from 'src/components/auth/AuthHeader.vue';
import AuthInput from 'src/components/auth/AuthInput.vue';
import BigButton from 'src/components/BigButton.vue';
</script>

<template>
  <div class="login-container">
   <AuthHeader title="Bem-vindo ao Blue Bee" subtitle="Aprenda a investir de forma simples e gamificada"/>

    <div class="login-form">
      
      <AuthInput label="Email" type="email" icon="email" class="q-mb-lg"/>
      <AuthInput label="Senha" type="password" icon="key" class="q-mb-md" />
      <div class="options">
        <div class="forgot-password">
          <a href="#">Esqueceu sua senha?</a>
        </div>
      </div>

      <BigButton title="Entrar" class="q-mb-lg"/>
      
      <div class="signup-link">
        Não tem uma conta? <a @click="$router.push('/register')">Cadastre-se</a>
      </div>
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
