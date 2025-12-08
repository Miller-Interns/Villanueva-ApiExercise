<template>
  <!-- Pagination Controls Component: Navigation buttons and page info -->
  <!-- Using Tailwind utilities for centering and width -->
  <div class="flex justify-center w-full">
    <!-- PrimeVue Card component -->
    <Card class="pagination-card">
      <template #content>
        <!-- Content container: flex-col on mobile, flex-row on larger screens (Tailwind responsive) -->
        <div class="flex flex-col items-center gap-4 p-2 sm:flex-row sm:gap-6">
          <!-- Previous Button: PrimeVue Button with gradient styling -->
          <Button
            label="Previous"
            icon="pi pi-chevron-left"
            severity="secondary"
            outlined
            :disabled="!hasPrevPage || loading"
            :loading="loading && hasPrevPage"
            @click="$emit('previous')"
            class="pagination-button min-w-[120px]"
            :pt="{ root: { class: 'gradient-button' } }"
          />
          
          <!-- Page Info: Gradient background box with page numbers -->
          <div class="flex items-center gap-2 pagination-info">
            <span class="font-semibold text-lg">
              Page <span class="pagination-page-number">{{ currentPage }}</span> of {{ totalPages }}
            </span>
          </div>
          
          <!-- Next Button: PrimeVue Button with gradient styling -->
          <Button
            label="Next"
            icon="pi pi-chevron-right"
            iconPos="right"
            severity="secondary"
            outlined
            :disabled="!hasNextPage || loading"
            :loading="loading && hasNextPage"
            @click="$emit('next')"
            class="pagination-button min-w-[120px]"
            :pt="{ root: { class: 'gradient-button' } }"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
// PrimeVue Components
import Card from 'primevue/card';
import Button from 'primevue/button';

// Component props: pagination state and loading status
defineProps<{
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loading: boolean;
}>();

// Component events: navigation actions
defineEmits<{
  previous: [];
  next: [];
}>();
</script>

<style scoped>
/* Card styling with border - kept in CSS for custom styling */
.pagination-card {
  background: white;
  border-top: 2px solid #e0e0e0;
  max-width: fit-content;
  margin: 0 auto;
}

/* Override PrimeVue button styling with gradient (PrimeVue v4 uses data-pc-name) */
.pagination-button :deep(button[data-pc-name='button']) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
  border: none !important;
  color: white !important;
}

.pagination-button :deep(button[data-pc-name='button']:hover:not(:disabled)) {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%) !important;
}

.pagination-button :deep(button[data-pc-name='button']:disabled) {
  background: var(--p-surface-100);
  color: var(--p-text-color-secondary);
}

/* Page info box with gradient background - complex styling kept in CSS */
.pagination-info {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: var(--p-border-radius);
  box-shadow: var(--p-shadow-1);
}

.pagination-info span {
  color: var(--p-primary-contrast-color);
}

/* Page number styling with golden color */
.pagination-page-number {
  color: #fbbf24; /* Golden color for emphasis */
  font-weight: 700;
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments for mobile */
@media (max-width: 640px) {
  .pagination-card :deep(.p-card-body) {
    padding: 1rem;
  }

  .pagination-info {
    padding: 0.625rem 1.25rem;
  }
}
</style>
