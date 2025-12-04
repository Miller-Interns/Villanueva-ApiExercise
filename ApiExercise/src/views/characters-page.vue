<template>
  <div class="characters-page min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Header Section -->
      <div class="header-section mb-6">
        <div class="header-content">
          <div class="header-title-section">
            <i class="pi pi-users header-icon"></i>
            <h1 class="header-title">Rick and Morty Characters</h1>
          </div>

          <div class="header-info-section">
            <div class="page-info">
              <i class="pi pi-list page-info-icon"></i>
              <span class="page-info-text">Page {{ currentPage }} of {{ totalPages }}</span>
            </div>

            <div class="header-actions">
              <Button
                label="Refresh"
                icon="pi pi-refresh"
                :disabled="loading"
                :loading="loading"
                @click="fetchCharacters"
                class="action-button refresh-button"
                :pt="{ root: { class: 'gradient-button' } }"
              />
              <Button
                label="Home"
                icon="pi pi-home"
                iconPos="left"
                severity="secondary"
                outlined
                @click="$router.push('/')"
                class="action-button"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading, Error, Empty States -->
      <LoadingSpinner v-if="loading" message="Loading characters..." />
      <ErrorMessage v-else-if="error" :message="error" />
      <EmptyState v-else-if="characters.length === 0" message="No characters found" />

      <!-- Characters Grid - 4 cards per row -->
      <div v-else class="characters-grid mb-4">
        <div v-for="character in characters" :key="character.id" class="character-grid-item">
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

<style scoped>
.characters-page {
  padding-bottom: 2rem;
  background: linear-gradient(135deg, #f8f5ff 0%, #faf5ff 50%, #fef5ff 100%);
}

/* Header Section */
.header-section {
  background: var(--p-surface-card);
  border-radius: var(--p-border-radius);
  padding: 1.5rem 2rem;
  box-shadow: var(--p-shadow-2);
  border: 2px solid #667eea;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-info-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 1rem;
  margin-top: 1.5rem;
  border-top: 2px solid #667eea;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--p-surface-50);
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-surface-border);
}

.page-info-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.125rem;
}

.page-info-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-button {
  min-width: 100px;
}

/* Gradient styling for refresh button (PrimeVue v4 uses data-pc-name) */
.refresh-button :deep(button[data-pc-name='button']) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
  border: none !important;
  color: white !important;
}

.refresh-button :deep(button[data-pc-name='button']:hover:not(:disabled)) {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%) !important;
}

/* Characters Grid - 4 per row */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.character-grid-item {
  min-width: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .characters-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .header-section {
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .header-section {
    padding: 1rem 1.25rem;
  }

  .header-title {
    font-size: 1.5rem;
  }

  .header-info-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-actions {
    width: 100%;
  }

  .action-button {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 480px) {
  .characters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .header-title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .header-icon {
    font-size: 1.5rem;
  }
}
</style>
