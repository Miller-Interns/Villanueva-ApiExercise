<template>
  <Card class="character-card">
    <template #content>
      <div class="flex flex-column gap-3">
        <img
          :src="character.image"
          :alt="character.name"
          class="w-full border-round"
          style="width: 100%; border: 4px solid var(--primary-color)"
        />
        <div>
          <h3 class="m-0 mb-2">{{ character.name }}</h3>
          <p class="m-0 mb-2">
            <Tag :value="character.status" :severity="getStatusSeverity(character.status)" />
            <span class="ml-2">- {{ character.species }}</span>
          </p>
          <p class="m-0 mb-2 text-sm"><strong>Location:</strong> {{ character.location.name }}</p>
          <p class="m-0 mb-2 text-sm"><strong>Origin:</strong> {{ character.origin.name }}</p>
          <p class="m-0 text-sm"><strong>Episodes:</strong> {{ character.episode.length }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import type { Character } from '../types/Character';

defineProps<{
  character: Character;
}>();

const getStatusSeverity = (status: string) => {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'danger';
  return 'secondary';
};
</script>

<style scoped>
.character-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.character-card:hover {
  transform: translateY(-2px);
}
</style>
