<script setup lang="ts">
import {computed} from 'vue'
import logo from "@/shared/assets/logo.svg";
import LoginForm from "@/features/auth/ui/login-form.vue";

const sheetClasses = computed(() => ({
  'w-100': true,
  'max-w-500': true,
  'min-h-400': true,
}))
</script>

<template>
  <v-container
      class="login-container pa-0 d-flex flex-column align-center justify-center"
      fluid
  >
    <v-sheet
        class="form-container d-flex flex-column align-center pa-6"
        elevation="0"
        :class="sheetClasses"
    >
      <img :src="logo" alt="Center Invest Logo" class="logo" />

      <v-row
          align="center"
          justify="center"
          class="login-row mt-4"
          cols="12"
      >
        <v-col
            cols="12"
            sm="10"
            md="6"
            lg="4"
        >
          <LoginForm />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--v-theme-surface-variant);
}

.form-container {
  background-color: var(--v-theme-surface-variant);
}

.login-row {
  width: 100%;
}

.login-card {
  background-color: var(--v-theme-surface);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  }
}

// Адаптивные отступы для формы
.login-card > * {
  margin-bottom: 1rem;
}

.login-card > *:last-child {
  margin-bottom: 0;
}
</style>
