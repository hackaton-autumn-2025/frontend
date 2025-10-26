<template>
  <v-card class="mt-3 pa-6 max-w-900 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-left mb-4 pa-0 inter-bold">
      История добавленных точек
    </v-card-title>
    <v-data-table-server
        :headers="headers"
        :items="paginatedItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="address"
        @click:row="onRowClick"
        v-model:items-per-page="options.itemsPerPage"
        @update:options="(newOptions) => options = newOptions"
        class="elevation-1"
    >
      <template #item.level="{ item }">
        <v-chip :color="item.level === 'VIP' ? 'green' : 'grey'" text-color="white" size="small">
          {{ item.level }}
        </v-chip>
      </template>

      <template #item.transport="{ item }">
        <v-chip :color="item.transport === 'Автобус' ? 'blue' : 'orange'" text-color="white" size="small">
          {{ item.transport }}
        </v-chip>
      </template>

      <template #no-data>
        <v-alert variant="text" class="transparent-alert">
          Нет добавленных точек. Добавьте первую точку маршрута.
        </v-alert>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import usePointHistory from "@/widgets/point/model/use-point-history";
import {useRoutePointStore} from "@/entities/route/store/route-point-store";

const routePointStore = useRoutePointStore();

const onRowClick = (row: any) => {
  routePointStore.setSelectedPoint({
    address: row.address,
    start_time: row.start_time,
    latitude: row.latitude,
    longitude: row.longitude,
    work_start: row.work_start,
    work_end: row.work_end,
    lunch_start: row.lunch_start,
    lunch_end: row.lunch_end,
    transport_mode: row.transport,
    priority: row.level,
    time_to_stop: row.time_to_stop
  });
}

const {
  headers,
  totalItems,
  loading,
  options,
  paginatedItems
} = usePointHistory()
</script>

<style scoped>
.v-card {
  border-radius: 1rem;
}

.v-data-table {
  border-radius: 0.75rem;
}

.transparent-alert {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
