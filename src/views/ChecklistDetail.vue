<template>
  <h1 class="mb-4">Detail Checklist</h1>

  <v-row class="mb-6 align-center">
    <v-col cols="12" md="6">
      <v-text-field v-model="newItemName" label="Nama Item Baru" variant="outlined" hide-details @keyup.enter="createItem" />
    </v-col>
    <v-col cols="12" md="auto">
      <v-btn color="primary" @click="createItem" :loading="loadingCreate">Tambah Item</v-btn>
    </v-col>
  </v-row>

  <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

  <v-list v-else lines="one">
    <v-list-item v-for="item in items" :key="item.id">
      <template v-slot:prepend>
        <v-checkbox-btn :model-value="item.itemCompletionStatus" @click="toggleItemStatus(item.id)"></v-checkbox-btn> </template>
      <v-list-item-title :class="{ 'text-decoration-line-through': item.itemCompletionStatus }">
        {{ item.name }}
      </v-list-item-title>
      <template v-slot:append>
        <v-btn icon="mdi-pencil" variant="text" @click="openRenameDialog(item)"></v-btn> <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteItem(item.id)"></v-btn> </template>
    </v-list-item>
    <v-list-item v-if="!items.length">
      <v-list-item-title>Belum ada item di checklist ini.</v-list-item-title>
    </v-list-item>
  </v-list>

  <v-btn @click="$router.back()" class="mt-6" variant="tonal">Kembali ke Dashboard</v-btn>

  <v-dialog v-model="renameDialog" max-width="500">
    <v-card title="Ubah Nama Item">
      <v-card-text>
        <v-text-field v-model="itemToRename.name" label="Nama Item" variant="outlined" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="renameDialog = false">Batal</v-btn>
        <v-btn color="primary" @click="executeRename">Simpan</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '@/api';

const props = defineProps({
  id: { type: String, required: true },
});

const items = ref([]);
const newItemName = ref('');
const loading = ref(true);
const loadingCreate = ref(false);
const renameDialog = ref(false);
const itemToRename = reactive({ id: null, name: '' });

const fetchItems = async () => {
  loading.value = true;
  try {
    const response = await api.getChecklistItems(props.id);
    items.value = response.data.data;
  } catch (error) {
    console.error("Gagal mengambil item:", error);
  } finally {
    loading.value = false;
  }
};

[cite_start]const createItem = async () => { // Halaman/action untuk membuat item [cite: 104]
  if (!newItemName.value.trim()) return;
  loadingCreate.value = true;
  try {
    await api.createChecklistItem(props.id, { itemName: newItemName.value });
    newItemName.value = '';
    await fetchItems();
  } catch (error) {
    console.error("Gagal membuat item:", error);
  } finally {
    loadingCreate.value = false;
  }
};

const toggleItemStatus = async (itemId) => {
  try {
    await api.updateItemStatus(props.id, itemId);
    await fetchItems();
  } catch (error) {
    console.error("Gagal mengubah status item:", error);
  }
};

const deleteItem = async (itemId) => {
  if (confirm('Yakin ingin menghapus item ini?')) {
    try {
      await api.deleteChecklistItem(props.id, itemId);
      await fetchItems();
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  }
};

const openRenameDialog = (item) => {
  itemToRename.id = item.id;
  itemToRename.name = item.name;
  renameDialog.value = true;
};

const executeRename = async () => {
  try {
    await api.renameItem(props.id, itemToRename.id, { itemName: itemToRename.name });
    await fetchItems();
  } catch (error) {
    console.error("Gagal mengubah nama item:", error);
  } finally {
    renameDialog.value = false;
  }
};

onMounted(fetchItems);
</script>