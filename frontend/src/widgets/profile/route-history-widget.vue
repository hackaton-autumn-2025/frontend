<script setup lang="ts">
import {ref, computed} from 'vue';
import useFetchRouteHistory from "@/features/route-history/model/use-route-history";
const {routeHistory} = useFetchRouteHistory();
const itemsPerPage = ref(10);

const headers = ref([
  {text: 'Транспорт', key: 'transport_mode', sortable: true},
  {text: 'Адрес', key: 'address', sortable: true},
  {text: 'Количество точек', key: 'points_count', sortable: false},
  {text: 'Уровень трафика', key: 'traffic_level', sortable: true},
  {text: 'Время старта', key: 'start_time', sortable: true},
]);

const serverItems = computed(() => {
  if (!routeHistory.value) return [];

  return routeHistory.value.map(route => ({
    transport_mode: route.transport_mode,
    points_count: route.routes_point.length,
    traffic_level: route.traffic_level,
    start_time: route.start_time,
  }));
});

const totalItems = computed(() => serverItems.value.length);
const loading = computed(() => !routeHistory.value);
</script>

<template>
  <v-card class="mt-3 pa-6 max-w-900 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-left mb-4 pa-0 inter-bold">История маршрутов</v-card-title>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="address"
        @update:options="(options) => { itemsPerPage = options.itemsPerPage }"
        class="elevation-1"
    />
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 1rem;
}
</style>