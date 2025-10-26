<script setup lang="ts">
import Map from "@/entities/map/ui/map.vue";
import PointHistoryWidget from "@/widgets/point/ui/point-history-widget.vue";
import AddRoutePointWidget from "@/widgets/point/ui/add-route-point-widget.vue";
</script>

<template>
  <h1 class="mt-16 mb-7 text-left">Какой сегодня путь?</h1>
  <Map/>
  <v-row cols="12" class="top">
    <v-col cols="12" md="4" lg="5">
      <AddRoutePointWidget />
    </v-col>
    <v-col cols="12" md="8" lg="7">
      <PointHistoryWidget />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.top {
  margin-top: -7px;
}
</style>