<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1 class="text-h2 mb-6">404</h1>
        <p class="text-h5 mb-6">Halaman tidak ditemukan</p>
        <v-btn
            color="primary"
            @click="$router.push('/')"
        >
          Kembali ke Beranda
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional setup needed
import {createRouter as $router} from "vue-router";
</script>
