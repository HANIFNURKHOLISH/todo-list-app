<template>
  <v-card class="mx-auto pa-6" elevation="8">
    <v-card-title class="text-h5 text-center mb-4">Daftar Akun Baru</v-card-title>
    <v-form @submit.prevent="handleRegister">
      <v-text-field v-model="email" label="Email" type="email" prepend-inner-icon="mdi-email" variant="outlined" required></v-text-field>
      <v-text-field v-model="username" label="Username" prepend-inner-icon="mdi-account" variant="outlined" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" prepend-inner-icon="mdi-lock" variant="outlined" required></v-text-field>
      <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
      <v-btn :loading="loading" type="submit" block color="success" size="large">Daftar</v-btn>
    </v-form>
    <div class="text-center mt-6">
      Sudah punya akun? <router-link to="/auth/login">Login di sini</router-link>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const email = ref('');
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const handleRegister = async () => {
  loading.value = true;
  error.value = null;
  try {
    await authStore.register({
      email: email.value,
      username: username.value,
      password: password.value,
    });
  } catch (err) {
    error.value = err.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
};
</script>