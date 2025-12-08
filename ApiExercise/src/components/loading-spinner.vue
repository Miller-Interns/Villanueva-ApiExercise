<template>
  <!-- Loading Spinner Component: Displays a PrimeVue spinner with optional message -->
  <!-- Using Tailwind utilities for layout: flex, flex-col, items-center, justify-center, gap, padding -->
  <div class="flex flex-col items-center justify-center gap-3 p-6">
    <!-- PrimeVue ProgressSpinner component -->
    <ProgressSpinner />
    <!-- Optional loading message with Tailwind typography utilities -->
    <p v-if="message" class="text-lg m-0">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
// PrimeVue Component
import ProgressSpinner from 'primevue/progressspinner';

// Component props with default value
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: 'Loading...'
  }
);
</script>
