<template>
  <div class="flex flex-column align-items-center justify-content-center gap-3 p-6">
    <ProgressSpinner />
    <p v-if="message" class="text-lg m-0">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: 'Loading...'
  }
);
</script>
