<template>
  <!-- Characters Page: Main page displaying character cards in a grid -->
  <div class="characters-page min-h-screen pb-8">
    <!-- Container with Tailwind max-width, centering, and padding utilities -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Header Section: Title, page info, and action buttons -->
      <div class="header-section mb-6">
        <!-- Header content container using Tailwind flex utilities -->
        <div class="flex flex-col gap-2">
          <!-- Title section with icon and heading -->
          <div class="flex items-center gap-4">
            <i class="pi pi-users header-icon"></i>
            <h1 class="header-title">Rick and Morty Characters</h1>
          </div>

          <!-- Info section: page info and action buttons -->
          <!-- Using Tailwind flex utilities with responsive wrapping -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-4 mt-6 border-t-2 border-purple-500">
            <!-- Page info box with gradient background -->
            <div class="page-info">
              <i class="pi pi-list page-info-icon"></i>
              <span class="page-info-text">Page {{ currentPage }} of {{ totalPages }}</span>
            </div>

            <!-- Action buttons container using Tailwind flex utilities -->
            <div class="flex gap-3 flex-wrap">
              <!-- Refresh Button: PrimeVue Button with gradient styling -->
              <Button
                label="Refresh"
                icon="pi pi-refresh"
                :disabled="loading"
                :loading="loading"
                @click="fetchCharacters"
                class="min-w-[100px] refresh-button"
                :pt="{ root: { class: 'gradient-button' } }"
              />
              <!-- Home Button: PrimeVue Button with secondary styling -->
              <Button
                label="Home"
                icon="pi pi-home"
                iconPos="left"
                severity="secondary"
                outlined
                @click="$router.push('/')"
                class="min-w-[100px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading, Error, Empty States: Conditional rendering based on state -->
      <LoadingSpinner v-if="loading" message="Loading characters..." />
      <ErrorMessage v-else-if="error" :message="error" />
      <EmptyState v-else-if="characters.length === 0" message="No characters found" />

      <!-- Characters Grid: Responsive grid using Tailwind grid utilities -->
      <!-- 4 columns on desktop, 3 on tablet, 2 on mobile, 1 on small screens -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-4"
      >
        <div v-for="character in characters" :key="character.id" class="min-w-0">
          <CharacterCard :character="character" />
        </div>
      </div>

      <!-- Pagination Controls: Only show when data is loaded -->
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
// Vue Composition API
import { onMounted } from 'vue';

// PrimeVue Components
import Button from 'primevue/button';

// Composables: Reusable logic for fetching characters
import { useCharacters } from '../composables/useCharacters';

// Stores: Pinia store for state management
import { useCharacterStore } from '../stores/characterStore';

// Components
import CharacterCard from '../components/character-card.vue';
import PaginationControls from '../components/pagination-controls.vue';
import LoadingSpinner from '../components/loading-spinner.vue';
import ErrorMessage from '../components/error-message.vue';
import EmptyState from '../components/empty-state.vue';

// Initialize Pinia store for character state management
const characterStore = useCharacterStore();

// Destructure reactive state and methods from the composable
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

/**
 * Lifecycle hook: Load data from localStorage on component mount
 * If data exists in localStorage, restore it; otherwise fetch from API
 */
onMounted(() => {
  characterStore.loadFromLocalStorage();
  if (characterStore.characters.length > 0) {
    // Restore state from localStorage
    characters.value = characterStore.characters;
    currentPage.value = characterStore.currentPage;
    totalPages.value = characterStore.totalPages;
    // Calculate pagination state based on current page
    hasNextPage.value = currentPage.value < totalPages.value;
    hasPrevPage.value = currentPage.value > 1;
  } else {
    // No cached data, fetch from API
    fetchCharacters();
  }
});

/**
 * Fetch characters from API and update store
 * Called when user clicks Refresh button
 */
const fetchCharacters = async () => {
  await fetchCharactersFromApi(currentPage.value);
  // Persist data to store (which saves to localStorage)
  characterStore.setCharacters(characters.value);
  characterStore.setCurrentPage(currentPage.value);
  characterStore.setTotalPages(totalPages.value);
};

/**
 * Navigate to a specific page
 * @param page - The page number to navigate to
 */
const goToPage = async (page: number) => {
  // Validate page number
  if (page < 1 || page > totalPages.value) return;
  // Fetch characters for the new page
  await fetchCharactersFromApi(page);
  // Update store with new data
  characterStore.setCharacters(characters.value);
  characterStore.setCurrentPage(currentPage.value);
  characterStore.setTotalPages(totalPages.value);
};
</script>

<style scoped>
/* Page background gradient - complex styling kept in CSS */
.characters-page {
  background: linear-gradient(135deg, #f8f5ff 0%, #faf5ff 50%, #fef5ff 100%);
}

/* Header section styling with PrimeVue theme variables and custom border */
.header-section {
  background: var(--p-surface-card);
  border-radius: var(--p-border-radius);
  padding: 1.5rem 2rem;
  box-shadow: var(--p-shadow-2);
  border: 2px solid #667eea;
}

/* Gradient text styling for header icon */
.header-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient text styling for header title */
.header-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Page info box with gradient background and border */
.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 50%,
    rgba(240, 147, 251, 0.1) 100%
  );
  border-radius: var(--p-border-radius);
  border: 1px solid #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

/* Gradient text styling for page info icon */
.page-info-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.125rem;
}

/* Page info text styling */
.page-info-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
}

/* Override PrimeVue button styling with gradient (PrimeVue v4 uses data-pc-name) */
.refresh-button :deep(button[data-pc-name='button']) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
  border: none !important;
  color: white !important;
}

.refresh-button :deep(button[data-pc-name='button']:hover:not(:disabled)) {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%) !important;
}

/* Responsive Design: Adjust header padding and title size for smaller screens */
@media (max-width: 1024px) {
  .header-section {
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 1rem 1.25rem;
  }

  .header-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.25rem;
  }

  .header-icon {
    font-size: 1.5rem;
  }
}
</style>
