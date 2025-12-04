import { ref } from 'vue';
import type { CharacterResponse } from '../types/CharacterResponse';
import type { Character } from '../types/Character';

export function useCharacters() {
  const characters = ref<Character[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const hasNextPage = ref(false);
  const hasPrevPage = ref(false);

  const fetchCharacters = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }

      const data: CharacterResponse = await response.json();
      characters.value = data.results;
      currentPage.value = page;
      totalPages.value = data.info.pages;
      hasNextPage.value = data.info.next !== null;
      hasPrevPage.value = data.info.prev !== null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching characters:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchCharacters
  };
}
