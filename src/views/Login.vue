<template>
  <v-card class="mx-auto pa-6" elevation="8">
    <v-card-title class="text-h5 text-center mb-4">Login</v-card-title>
    <v-form @submit.prevent="handleLogin">
      <v-text-field
          v-model="username"
          label="Username"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          required
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          required
      ></v-text-field>
      <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
      <v-btn :loading="loading" type="submit" block color="primary" size="large">Login</v-btn>
    </v-form>
    <div class="text-center mt-6">
      Belum punya akun? <router-link to="/auth/register">Daftar di sini</router-link>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await authStore.login({ username: username.value, password: password.value });
  } catch (err) {
    error.value = 'Username atau password salah.';
  } finally {
    loading.value = false;
  }
};
</script>