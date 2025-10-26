<script setup lang="ts">
interface CongresionBlockProps {
  averageCongestion: number
}

const {averageCongestion} = defineProps<CongresionBlockProps>()
const blockColor = Number(averageCongestion) >= 4
    ? 'red'
    : Number(averageCongestion) >= 2
        ? 'orange'
        : 'green'
</script>

<template>
  <div class="btn-outline">
    <h4 style="margin: 0 0 8px 0;">Загруженность дорог</h4>
    <div style="display: flex; align-items: center; gap: 10px;">
      <div
          :style="{ fontSize: '20px', fontWeight: 'bold', color: blockColor }"
      >
        {{ averageCongestion }}/5
      </div>
    </div>
    <div style="margin-top: 8px; font-size: 12px; color: #666;">
      <div>🟢 Легкая (1-2)</div>
      <div>🟠 Средняя (3)</div>
      <div>🔴 Высокая (4-5)</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-outline {
  background: white;
  padding: 10px;
  border-radius: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 2px solid #333;
  font-family: Arial, sans-serif;
}
</style>
