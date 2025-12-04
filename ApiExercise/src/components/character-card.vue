<template>
  <Card class="character-card">
    <template #content>
      <div class="character-card-content">
        <!-- Image at top -->
        <div class="character-image-wrapper">
          <img :src="character.image" :alt="character.name" class="character-image" />
        </div>

        <!-- Details below image -->
        <div class="character-details-section">
          <h3 class="character-name">{{ character.name }}</h3>

          <div class="character-status-section">
            <Tag
              :value="character.status"
              :severity="getStatusSeverity(character.status)"
              class="character-status-tag"
            />
            <div class="character-species">
              <i class="pi pi-tag"></i>
              <span>{{ character.species }}</span>
            </div>
          </div>

          <div class="character-info-list">
            <div class="character-info-item">
              <i class="pi pi-map-marker"></i>
              <span>{{ character.location.name }}</span>
            </div>
            <div class="character-info-item">
              <i class="pi pi-globe"></i>
              <span>{{ character.origin.name }}</span>
            </div>
            <div class="character-info-item">
              <i class="pi pi-play-circle"></i>
              <span
                >{{ character.episode.length }}
                {{ character.episode.length === 1 ? 'episode' : 'episodes' }}</span
              >
            </div>
          </div>
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

.character-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Image Section */
.character-image-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;
  border-bottom: 3px solid #6366f1;
}

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

/* Details Section */
.character-details-section {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.25rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%);
}

.character-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.15rem;
  margin-bottom: 0.125rem;
}

.character-status-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.character-status-tag {
  align-self: flex-start;
}

/* Override PrimeVue success tag color to match gradient theme */
.character-status-tag :deep(.p-tag.p-tag-success) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  border: none;
}

.character-species {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.character-species i {
  color: #8b5cf6;
  font-size: 0.875rem;
}

.character-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.125rem;
}

.character-info-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

.character-info-item:nth-child(1) i {
  color: #ef4444;
}

.character-info-item:nth-child(2) i {
  color: #3b82f6;
}

.character-info-item:nth-child(3) i {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.character-info-item i {
  font-size: 1rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.character-info-item span {
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive adjustments */
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

  .character-info-item {
    font-size: 0.8125rem;
  }
}
</style>
