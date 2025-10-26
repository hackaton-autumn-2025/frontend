<template>
  <v-card class="pa-6 max-w-400 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-center mb-4">Регистрация</v-card-title>
    <v-form @submit.prevent="onRegister" v-model="isValid" class="px-2">
      <v-text-field
          v-model="form.name"
          label="Email"
          :rules="[rules.required, rules.email]"
          type="email"
          variant="outlined"
          class="mb-3 auth-text-field"
      />
      <v-text-field
          v-model="form.password"
          label="Пароль"
          :rules="[rules.required]"
          type="password"
          variant="outlined"
          class="mb-4 auth-text-field"
      />
      <v-btn
          type="submit"
          color="#3AAA35"
          class="btn-filled w-100"
          block
          :disabled="!isValid || loading"
          :loading="loading"
      >
        Зарегистрироваться
      </v-btn>
    </v-form>
    <v-divider class="my-4"/>
    <v-sheet class="text-center">
      Уже есть аккаунт?
      <router-link to="/login" class="text-primary text-decoration-none">Войти</router-link>
    </v-sheet>
  </v-card>
</template>

<script setup>
import useRegister from '@/features/auth/model/use-register.ts'

const {
  form,
  rules,
  isValid,
  onRegister,
  loading,
} = useRegister();
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  background: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}

.v-card-title {
  color: #003366;
  font-weight: bold;
}

.v-btn {
  background-color: #003366;
  color: #ffffff;

  &:hover {
    background-color: #002244;
  }
}

.v-divider {
  background-color: #003366;
}

.text-center {
  color: #003366;
}

.text-primary {
  color: #0099cc;
}
</style>