<script setup lang="ts">
import {ref, computed} from "vue";
import WorkingHoursWidget from "@/widgets/profile/working-hours-widget.vue";
import PersonalInfoWidget from "@/widgets/profile/personal-info-widget.vue";
import RouteHistoryWidget from "@/widgets/profile/route-history-widget.vue";
import useCurrentUser from "@/entities/user/model/use-current-user";
import type {CurrentUser} from "@/entities/user/types/interfaces";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access_token");
const cookieUser = ref<CurrentUser | null>(null);

const cookieData = Cookies.get("user");
if (cookieData) {
  try {
    cookieUser.value = JSON.parse(cookieData);
  } catch (e) {
    console.warn("Ошибка парсинга cookie user:", e);
  }
}

let currentUser: any = ref(null);
let loading = ref(false);
let error = ref(null);

if (accessToken) {
  const query = useCurrentUser();
  currentUser = query.data;
  loading = query.isPending;
  error = query.error;
}

// вычисляем итогового пользователя
const user = computed<CurrentUser | null>(() => {
  if (accessToken && !error.value && currentUser.value) return currentUser.value;
  return cookieUser.value;
});
</script>

<template>
  <h1 class="mt-15 mb-5 text-left">Профиль</h1>

  <v-row v-if="!loading && user" cols="12">
    <v-col cols="12" sm="12" md="6" lg="5">
      <PersonalInfoWidget :current-user="user"/>
      <WorkingHoursWidget :current-user="user"/>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="7">
      <RouteHistoryWidget/>
    </v-col>
  </v-row>

  <div v-else class="text-center py-10">
    <v-progress-circular indeterminate color="primary" size="50"/>
    <p class="mt-3">Загрузка профиля...</p>
  </div>
</template>
