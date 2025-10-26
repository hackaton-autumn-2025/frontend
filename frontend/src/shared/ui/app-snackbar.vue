<template>
  <v-snackbar
      v-model="store.show"
      :color="store.color"
      location="bottom right"
      timeout="3000"
  >
    {{ store.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/shared/store/notification-store'

const store = useNotificationStore()
</script>