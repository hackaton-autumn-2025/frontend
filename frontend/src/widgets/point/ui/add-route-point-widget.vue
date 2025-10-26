<script setup lang="ts">
import AddRoutePointForm from "@/features/point/ui/add-route-point-form.vue";
</script>

<template>
  <v-card class="mt-3 pa-6 max-w-600 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-left mb-4 pa-0 inter-bold">Добавление точки маршрута</v-card-title>
    <AddRoutePointForm />
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 1rem;
}
</style>