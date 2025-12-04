<template>
  <div class="pagination-wrapper">
    <Card class="pagination-card">
      <template #content>
        <div class="pagination-content">
          <Button
            label="Previous"
            icon="pi pi-chevron-left"
            severity="secondary"
            outlined
            :disabled="!hasPrevPage || loading"
            :loading="loading && hasPrevPage"
            @click="$emit('previous')"
            class="pagination-button"
          />
          <div class="flex align-items-center gap-2 pagination-info">
            <span class="font-semibold text-lg">
              Page <span class="pagination-page-number">{{ currentPage }}</span> of {{ totalPages }}
            </span>
          </div>
          <Button
            label="Next"
            icon="pi pi-chevron-right"
            iconPos="right"
            severity="secondary"
            outlined
            :disabled="!hasNextPage || loading"
            :loading="loading && hasNextPage"
            @click="$emit('next')"
            class="pagination-button"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';

defineProps<{
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loading: boolean;
}>();

defineEmits<{
  previous: [];
  next: [];
}>();
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pagination-card {
  background: white;
  border-top: 2px solid #e0e0e0;
  max-width: fit-content;
  margin: 0 auto;
}

.pagination-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

@media (min-width: 640px) {
  .pagination-content {
    flex-direction: row;
    gap: 1.5rem;
  }
}

.pagination-button {
  min-width: 120px;
}

/* Gradient styling for pagination buttons */
.pagination-button :deep(.p-button) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border: none;
  color: white;
}

.pagination-button :deep(.p-button:hover:not(:disabled)) {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
}

.pagination-button :deep(.p-button:disabled) {
  background: var(--p-surface-100);
  color: var(--p-text-color-secondary);
}

.pagination-info {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: var(--p-border-radius);
  box-shadow: var(--p-shadow-1);
}

.pagination-info span {
  color: var(--p-primary-contrast-color);
}

.pagination-page-number {
  color: var(--p-highlight-text-color);
  font-weight: 700;
  font-size: 1.5rem;
}

@media (max-width: 640px) {
  .pagination-card :deep(.p-card-body) {
    padding: 1rem;
  }

  .pagination-info {
    padding: 0.625rem 1.25rem;
  }
}
</style>
