<script setup lang="ts">
import {CurrentUser} from "@/entities/user/types/interfaces";

interface PersonalInfoWidgetProps {
  currentUser: CurrentUser | null;
}

const { currentUser } = defineProps<PersonalInfoWidgetProps>();
</script>

<template>
  <v-card class="mt-3 pa-6 max-w-600 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-left mb-4 pa-0 inter-bold">Персональная информация</v-card-title>
    <v-list lines="one" class="py-0">
      <v-list-item
          title="Ваше имя"
          :subtitle="currentUser ? currentUser?.name : `Не указано`"
          class="pa-0"
      ></v-list-item>
      <v-list-item
          title="Предпочитаемый способ передвижения"
          subtitle="Автомобиль"
          class="pa-0 pt-2"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 1rem;
}
</style>