<script setup lang="ts">
import {useUserAuthenticated} from "@/features/auth/model/use-user-authenticated";
useUserAuthenticated()
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss">

</style>