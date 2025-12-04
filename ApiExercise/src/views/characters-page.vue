<template>
  <div class="min-h-screen surface-ground p-5">
    <div class="max-w-7xl mx-auto">
      <Card class="mb-4">
        <template #content>
          <div class="flex justify-content-between align-items-center">
            <h1 class="m-0">Rick and Morty Characters</h1>
            <Button label="Back to Home" severity="secondary" @click="$router.push('/')" />
          </div>
        </template>
      </Card>

      <Card class="mb-4">
        <template #content>
          <div class="flex justify-content-between align-items-center">
            <span class="font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
            <Button
              label="Refresh Characters"
              icon="pi pi-refresh"
              severity="success"
              :disabled="loading"
              :loading="loading"
              @click="fetchCharacters"
            />
          </div>
        </template>
      </Card>

      <LoadingSpinner v-if="loading" message="Loading characters..." />
      <ErrorMessage v-else-if="error" :message="error" />
      <EmptyState v-else-if="characters.length === 0" message="No characters found" />
      <div v-else class="grid mb-4">
        <div
          v-for="character in characters"
          :key="character.id"
          class="col-12 md:col-6 lg:col-4 xl:col-3"
        >
          <CharacterCard :character="character" />
        </div>
      </div>

      <PaginationControls
        v-if="!loading && characters.length > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        :has-next-page="hasNextPage"
        :has-prev-page="hasPrevPage"
        :loading="loading"
        @previous="goToPage(currentPage - 1)"
        @next="goToPage(currentPage + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useCharacters } from '../composables/useCharacters';
import { useCharacterStore } from '../stores/characterStore';
import CharacterCard from '../components/character-card.vue';
import PaginationControls from '../components/pagination-controls.vue';
import LoadingSpinner from '../components/loading-spinner.vue';
import ErrorMessage from '../components/error-message.vue';
import EmptyState from '../components/empty-state.vue';

const characterStore = useCharacterStore();
const {
  characters,
  loading,
  error,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  fetchCharacters: fetchCharactersFromApi
} = useCharacters();

// Load from localStorage on mount
onMounted(() => {
  characterStore.loadFromLocalStorage();
  if (characterStore.characters.length > 0) {
    // Use store data if available
    characters.value = characterStore.characters;
    currentPage.value = characterStore.currentPage;
    totalPages.value = characterStore.totalPages;
    // Calculate pagination state
    hasNextPage.value = currentPage.value < totalPages.value;
    hasPrevPage.value = currentPage.value > 1;
  } else {
    // Otherwise fetch new data
    fetchCharacters();
  }
});

const fetchCharacters = async () => {
  await fetchCharactersFromApi(currentPage.value);
  characterStore.setCharacters(characters.value);
  characterStore.setCurrentPage(currentPage.value);
  characterStore.setTotalPages(totalPages.value);
};

const goToPage = async (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  await fetchCharactersFromApi(page);
  characterStore.setCharacters(characters.value);
  characterStore.setCurrentPage(currentPage.value);
  characterStore.setTotalPages(totalPages.value);
};
</script>
