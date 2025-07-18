<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>To-Do List</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>