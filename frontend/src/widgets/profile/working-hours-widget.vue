<script setup lang="ts">
import WorkingHoursForm from "@/features/profile/ui/working-hours-form.vue";
import {CurrentUser} from "@/entities/user/types/interfaces";

interface WorkingHoursWidgetProps {
  currentUser: CurrentUser | null;
}

const { currentUser } = defineProps<WorkingHoursWidgetProps>();
</script>

<template>
  <v-card class="mt-6 pa-6 max-w-600 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-left mb-4 pa-0 inter-bold">Ваш график обеда и рабочего дня</v-card-title>
    <WorkingHoursForm :current-user="currentUser ?? {} as CurrentUser" />
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 1rem;
}
</style>