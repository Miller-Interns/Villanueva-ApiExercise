import { defineStore } from 'pinia';
import type { Character } from '../types/Character';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as Character[],
    currentPage: 1,
    totalPages: 0
  }),

  getters: {
    getCharacterById: state => {
      return (characterId: number) =>
        state.characters.find(character => character.id === characterId);
    },
    totalCharacters: state => state.characters.length
  },

  actions: {
    setCharacters(characters: Character[]) {
      this.characters = characters;
      this.saveToLocalStorage();
    },

    addCharacters(newCharacters: Character[]) {
      this.characters = [...this.characters, ...newCharacters];
      this.saveToLocalStorage();
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
      this.saveToLocalStorage();
    },

    setTotalPages(pages: number) {
      this.totalPages = pages;
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('rickAndMortyCharacters', JSON.stringify(this.characters));
        localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
        localStorage.setItem('totalPages', JSON.stringify(this.totalPages));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },

    loadFromLocalStorage() {
      try {
        const savedCharacters = localStorage.getItem('rickAndMortyCharacters');
        const savedPage = localStorage.getItem('currentPage');
        const savedTotalPages = localStorage.getItem('totalPages');

        if (savedCharacters) {
          this.characters = JSON.parse(savedCharacters);
        }
        if (savedPage) {
          this.currentPage = JSON.parse(savedPage);
        }
        if (savedTotalPages) {
          this.totalPages = JSON.parse(savedTotalPages);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    },

    clearCharacters() {
      this.characters = [];
      this.currentPage = 1;
      this.totalPages = 0;
      localStorage.removeItem('rickAndMortyCharacters');
      localStorage.removeItem('currentPage');
      localStorage.removeItem('totalPages');
    }
  }
});
