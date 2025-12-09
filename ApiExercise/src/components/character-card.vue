<template>
  <!-- Character Card Component: Displays individual character information -->
  <!-- PrimeVue Card component with custom styling -->
  <Card class="character-card">
    <template #content>
      <!-- Card content container using Tailwind flex utilities -->
      <div class="flex flex-col h-full">
        <!-- Image Section: Character portrait with gradient border -->
        <div class="character-image-wrapper">
          <img :src="character.image" :alt="character.name" class="character-image" />
        </div>

        <!-- Details Section: Character information below image -->
        <!-- Using Tailwind padding and flex utilities -->
        <div class="character-details-section flex flex-col flex-grow gap-1 p-5">
          <!-- Character Name: Truncated to 2 lines if too long -->
          <h3 class="character-name">{{ character.name }}</h3>

          <!-- Status directly under the name -->
          <Tag
            :value="character.status"
            :severity="getStatusSeverity(character.status)"
            class="character-status-tag self-start mt-1 mb-2"
          />

          <!-- Info List: Species, Location, origin, and episode count -->
          <!-- Added top margin to separate from status -->
          <div class="flex flex-col gap-2.5 mt-1">
            <!-- Species info with icon using Tailwind flex utilities -->
            <div class="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
              <i class="pi pi-tag text-purple-500 text-sm"></i>
              <span>{{ character.species }}</span>
            </div>
            <!-- Location info -->
            <div class="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <i class="pi pi-map-marker text-red-500 text-base mt-0.5 flex-shrink-0"></i>
              <span class="flex-1 break-words line-clamp-2">{{ character.location.name }}</span>
            </div>
            <!-- Origin info -->
            <div class="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <i class="pi pi-globe text-blue-500 text-base mt-0.5 flex-shrink-0"></i>
              <span class="flex-1 break-words line-clamp-2">{{ character.origin.name }}</span>
            </div>
            <!-- Episode count with gradient icon -->
            <div class="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <i
                class="pi pi-play-circle character-episode-icon text-base mt-0.5 flex-shrink-0"
              ></i>
              <span class="flex-1 break-words line-clamp-2">
                {{ character.episode.length }}
                {{ character.episode.length === 1 ? 'episode' : 'episodes' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
// PrimeVue Components
import Card from 'primevue/card';
import Tag from 'primevue/tag';

// Types
import type { Character } from '../types/Character';

// Component props: character data to display
defineProps<{
  character: Character;
}>();

/**
 * Maps character status to PrimeVue Tag severity
 * @param status - Character status (Alive, Dead, unknown)
 * @returns PrimeVue severity level for Tag component
 */
const getStatusSeverity = (status: string) => {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'danger';
  return 'secondary';
};
</script>

<style scoped>
/* Card styling with hover effects - complex transitions kept in CSS */
.character-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #6366f1;
  border-width: 2px;
}

/* Image wrapper with gradient background and border */
.character-image-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;
  border-bottom: 3px solid #6366f1;
}

/* Character image with hover zoom effect */
.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  border: 2px solid rgba(99, 102, 241, 0.2);
}

.character-card:hover .character-image {
  transform: scale(1.05);
}

/* Details section with gradient background */
.character-details-section {
  background: linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%);
}

/* Character name with line clamping for text overflow */
.character-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  line-clamp: 2; /* Standard property for compatibility */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.15rem;
  margin-bottom: 0.125rem;
}

/* Override PrimeVue success tag color to match gradient theme */
.character-status-tag :deep(.p-tag.p-tag-success) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  border: none;
}

/* Episode icon with gradient text effect */
.character-episode-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments for mobile devices */
@media (max-width: 768px) {
  .character-card:hover {
    transform: translateY(-2px);
  }

  .character-details-section {
    padding: 1rem;
    gap: 0.625rem;
  }

  .character-name {
    font-size: 1rem;
    min-height: 2.8rem;
  }
}
</style>
