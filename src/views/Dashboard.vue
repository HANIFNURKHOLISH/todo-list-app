<template>
  <v-container>
    <h1 class="mb-4">Dashboard Checklist</h1>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
            v-model="newChecklistName"
            label="Nama Checklist Baru"
            variant="outlined"
            @keyup.enter="createChecklist"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn color="primary" @click="createChecklist" :loading="loadingCreate">Buat Checklist</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="checklist in checklists" :key="checklist.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ checklist.name }}</v-card-title>
          <v-card-actions>
            <v-btn color="surface-variant" variant="text" @click="viewChecklist(checklist.id)">Lihat Detail</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click="deleteChecklist(checklist.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const checklists = ref([]);
const newChecklistName = ref('');
const loadingCreate = ref(false);

const fetchChecklists = async () => {
  try {
    const response = await api.getChecklists();
    checklists.value = response.data.data; // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error("Gagal mengambil data checklist:", error);
  }
};

const createChecklist = async () => {
  if (!newChecklistName.value.trim()) return;
  loadingCreate.value = true;
  try {
    await api.createChecklist({ name: newChecklistName.value });
    newChecklistName.value = '';
    await fetchChecklists(); // Muat ulang daftar
  } catch (error) {
    console.error("Gagal membuat checklist:", error);
  } finally {
    loadingCreate.value = false;
  }
};

const deleteChecklist = async (id) => {
  // Disarankan menggunakan dialog konfirmasi di sini
  if (confirm('Apakah Anda yakin ingin menghapus checklist ini?')) {
    try {
      await api.deleteChecklist(id);
      await fetchChecklists(); // Muat ulang daftar
    } catch (error) {
      console.error("Gagal menghapus checklist:", error);
    }
  }
};

const viewChecklist = (id) => {
  router.push({ name: 'ChecklistDetail', params: { id } });
};

onMounted(fetchChecklists);
</script>