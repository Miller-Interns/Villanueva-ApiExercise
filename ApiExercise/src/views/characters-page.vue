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
              <span class="page-info-text">
                Page {{ hasActiveFilters ? filteredPage : currentPage }} of {{ hasActiveFilters ? filteredTotalPages : totalPages }}
              </span>
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

      <!-- Search and Filter Section: Search bar and sort dropdown -->
      <div v-if="!error && (characters.length > 0 || allCharacters.length > 0)" class="search-filter-section mb-6">
        <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <!-- Search Input: PrimeVue InputText with icon -->
          <div class="flex-1 search-input-wrapper">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search search-icon"></i>
              <InputText
                v-model="searchQuery"
                placeholder="Search characters by name..."
                class="w-full search-input"
              />
            </span>
          </div>

          <!-- Sort Dropdown: PrimeVue Dropdown for sorting options -->
          <div class="sort-dropdown-wrapper">
            <span class="p-input-icon-left">
              <i class="pi pi-sort sort-icon"></i>
              <Dropdown
                v-model="sortOption"
                :options="sortOptions"
                optionLabel="label"
                placeholder="Sort by..."
                class="sort-dropdown"
              />
            </span>
          </div>
        </div>

        <!-- Results count: Show filtered count -->
        <div v-if="hasActiveFilters" class="results-info mt-3">
          <i class="pi pi-info-circle results-info-icon"></i>
          <span class="results-info-text">
            Showing {{ filteredAndSortedCharacters.length }} of {{ allCharactersLoaded ? allCharacters.length : characters.length }} characters
            <span v-if="!allCharactersLoaded && hasActiveFilters" class="text-xs ml-2">(Loading all characters...)</span>
          </span>
        </div>
      </div>

      <!-- Loading, Error, Empty States: Conditional rendering based on state -->
      <LoadingSpinner v-if="loading || loadingAllCharacters" :message="loadingAllCharacters ? 'Loading all characters...' : 'Loading characters...'" />
      <ErrorMessage v-else-if="error" :message="error" />
      <EmptyState v-else-if="paginatedCharacters.length === 0" message="No characters found" />
      
      <!-- Characters Grid: Responsive grid using Tailwind grid utilities -->
      <!-- 4 columns on desktop, 3 on tablet, 2 on mobile, 1 on small screens -->
        <div
        v-else-if="paginatedCharacters.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-4"
        >
        <div v-for="character in paginatedCharacters" :key="character.id" class="min-w-0">
          <CharacterCard :character="character" />
        </div>
      </div>

      <!-- Pagination Controls: Show for both filtered and unfiltered results -->
      <PaginationControls
        v-if="!loading && !loadingAllCharacters && (characters.length > 0 || paginatedCharacters.length > 0)"
        :current-page="hasActiveFilters ? filteredPage : currentPage"
        :total-pages="hasActiveFilters ? filteredTotalPages : totalPages"
        :has-next-page="hasActiveFilters ? filteredPage < filteredTotalPages : hasNextPage"
        :has-prev-page="hasActiveFilters ? filteredPage > 1 : hasPrevPage"
        :loading="loading || loadingAllCharacters"
        @previous="hasActiveFilters ? goToFilteredPage(filteredPage - 1) : goToPage(currentPage - 1)"
        @next="hasActiveFilters ? goToFilteredPage(filteredPage + 1) : goToPage(currentPage + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue Composition API
import { onMounted, ref, computed, watch } from 'vue';

// PrimeVue Components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

// Types
import type { Character } from '../types/Character';
import type { CharacterResponse } from '../types/CharacterResponse';

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

// Search and Sort State
const searchQuery = ref('');
const sortOption = ref({ value: 'default', label: 'Default' });

// All Characters: Store all characters from all pages for filtering
const allCharacters = ref<Character[]>([]);
const allCharactersLoaded = ref(false);
const loadingAllCharacters = ref(false);

// Client-side pagination state for filtered results
const filteredPage = ref(1);
const itemsPerPage = 20; // Number of characters per page

// Sort Options: Available sorting methods
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'status', label: 'Status' },
  { value: 'species', label: 'Species' },
  { value: 'episodes-asc', label: 'Episodes (Low to High)' },
  { value: 'episodes-desc', label: 'Episodes (High to Low)' }
];

/**
 * Fetch all characters from all pages
 * This allows filtering and sorting across all characters
 */
const fetchAllCharacters = async () => {
  if (allCharactersLoaded.value || loadingAllCharacters.value) return;
  
  loadingAllCharacters.value = true;
  try {
    const allChars: Character[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }
      const data: CharacterResponse = await response.json();
      allChars.push(...data.results);
      hasMore = data.info.next !== null;
      page++;
    }

    allCharacters.value = allChars;
    allCharactersLoaded.value = true;
    // Save all characters to store
    characterStore.setAllCharacters(allChars);
  } catch (err) {
    console.error('Error fetching all characters:', err);
  } finally {
    loadingAllCharacters.value = false;
  }
};

/**
 * Computed property: Filters and sorts all characters based on search query and sort option
 * @returns Filtered and sorted array of characters
 */
const filteredAndSortedCharacters = computed(() => {
  // Use all characters if available, otherwise use current page characters
  const source = allCharactersLoaded.value ? allCharacters.value : characters.value;
  let result = [...source];

  // Filter by search query (case-insensitive search on name)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(character =>
      character.name.toLowerCase().includes(query)
    );
  }

  // Sort based on selected option
  if (sortOption.value && sortOption.value.value !== 'default') {
    switch (sortOption.value.value) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'status':
        result.sort((a, b) => {
          // Sort by status: Alive > Dead > unknown
          const statusOrder: Record<string, number> = { 'Alive': 1, 'Dead': 2, 'unknown': 3 };
          return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
        });
        break;
      case 'species':
        result.sort((a, b) => a.species.localeCompare(b.species));
        break;
      case 'episodes-asc':
        result.sort((a, b) => a.episode.length - b.episode.length);
        break;
      case 'episodes-desc':
        result.sort((a, b) => b.episode.length - a.episode.length);
        break;
    }
  }

  return result;
});

/**
 * Computed property: Paginated filtered results
 * @returns Current page of filtered and sorted characters
 */
const paginatedCharacters = computed(() => {
  const filtered = filteredAndSortedCharacters.value;
  const startIndex = (filteredPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filtered.slice(startIndex, endIndex);
});

/**
 * Computed property: Total pages for filtered results
 * @returns Total number of pages for filtered results
 */
const filteredTotalPages = computed(() => {
  return Math.ceil(filteredAndSortedCharacters.value.length / itemsPerPage);
});

/**
 * Computed property: Check if filters are active
 * @returns True if search or sort is active
 */
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || (sortOption.value && sortOption.value.value !== 'default');
});

/**
 * Reset filtered page when filters change
 */
watch([searchQuery, sortOption], () => {
  filteredPage.value = 1;
});

/**
 * Navigate to a specific filtered page
 * @param page - The page number to navigate to
 */
const goToFilteredPage = (page: number) => {
  if (page < 1 || page > filteredTotalPages.value) return;
  filteredPage.value = page;
  // Scroll to top when changing pages
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Watch for filter activation to load all characters
 */
watch(hasActiveFilters, (active) => {
  if (active && !allCharactersLoaded.value && !loadingAllCharacters.value) {
    fetchAllCharacters();
  }
});

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
    
    // Load all characters if they exist in store
    if (characterStore.allCharacters.length > 0) {
      allCharacters.value = characterStore.allCharacters;
      allCharactersLoaded.value = true;
    }
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

/* Search and Filter Section: Container with gradient border */
.search-filter-section {
  background: var(--p-surface-card);
  border-radius: var(--p-border-radius);
  padding: 1.5rem;
  box-shadow: var(--p-shadow-2);
  border: 2px solid #667eea;
}

/* Search Input Wrapper: Full width with gradient border on focus */
.search-input-wrapper :deep(.p-inputtext) {
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: var(--p-border-radius);
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input-wrapper :deep(.p-inputtext:focus) {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.2);
  outline: none;
}

/* Search Icon: Gradient color */
.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.125rem;
  z-index: 1;
}

/* Sort Dropdown Wrapper: Fixed width with gradient border */
.sort-dropdown-wrapper {
  width: 100%;
  min-width: 200px;
}

@media (min-width: 640px) {
  .sort-dropdown-wrapper {
    width: auto;
    min-width: 220px;
  }
}

.sort-dropdown-wrapper :deep(.p-dropdown) {
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: var(--p-border-radius);
  transition: all 0.3s ease;
}

.sort-dropdown-wrapper :deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: #667eea;
}

.sort-dropdown-wrapper :deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.2);
}

/* Sort Icon: Gradient color */
.sort-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.125rem;
  z-index: 1;
}

/* Results Info: Shows filtered count with gradient styling */
.results-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 50%,
    rgba(240, 147, 251, 0.1) 100%
  );
  border-radius: var(--p-border-radius);
  border: 1px solid #667eea;
}

.results-info-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1rem;
}

.results-info-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-color);
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
