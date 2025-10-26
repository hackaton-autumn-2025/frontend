<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import {router} from "@/app/router";
import logo from '@/shared/assets/logo.svg'

const user = {name: "Никита"};
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const goToProfile = async () => {
  await router.push("/profile");
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header :class="['app-header', { 'app-header--scrolled': isScrolled }]">
    <v-sheet class="header-content">
      <v-sheet class="logo">
        <img :src="logo" alt="Logo" class="logo-img" />
      </v-sheet>

      <v-sheet class="desktop-menu d-flex ga-6 align-center">
        <router-link to="/demo" class="link">Демо</router-link>
        <router-link to="/analytics" class="link">Аналитика</router-link>
        <router-link to="/dashboard" class="link">Построить маршрут</router-link>
        <v-btn class="user-pill" @click="goToProfile">
          <v-sheet class="user-name inter-bold">{{ user.name }}</v-sheet>
          <v-icon icon="mdi-account-circle" class="user-icon"/>
        </v-btn>
      </v-sheet>

      <v-btn icon class="mobile-menu-btn" @click="toggleMobileMenu">
        <v-icon icon="mdi-menu" />
      </v-btn>

      <v-sheet v-if="isMobileMenuOpen" class="mobile-menu-dropdown d-flex flex-column ga-3">
        <router-link to="/demo" class="link" @click="isMobileMenuOpen = false">Демо</router-link>
        <router-link to="/analytics" class="link" @click="isMobileMenuOpen = false">Аналитика</router-link>
        <router-link to="/dashboard" class="link" @click="isMobileMenuOpen = false">Построить маршрут</router-link>
        <v-btn class="user-pill" @click="goToProfile">
          <v-sheet class="user-name inter-bold">{{ user.name }}</v-sheet>
          <v-icon icon="mdi-account-circle" class="user-icon"/>
        </v-btn>
      </v-sheet>
    </v-sheet>
  </header>
</template>


<style scoped lang="scss">
@use './header.module.scss';
</style>
