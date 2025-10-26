<template>
  <div ref="mapContainer" class="map-container">
    <div v-if="mapStatus === 'empty'" class="map-loading-overlay">
      <v-progress-circular indeterminate color="primary" size="50"/>
      <h2 class="mt-2">Оптимизация маршрута и загрузка карты...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMap} from "@/features/map/model/useMap";

const {
  mapContainer,
  mapStatus
} = useMap();
</script>

<style scoped>
.map-container {
  background: white;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.map-loading-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
