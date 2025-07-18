<template>
  <v-app>
    <v-app-bar v-if="authStore.isAuthenticated" color="primary">
      <v-spacer></v-spacer>
      <v-btn @click="authStore.logout" color="error">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>