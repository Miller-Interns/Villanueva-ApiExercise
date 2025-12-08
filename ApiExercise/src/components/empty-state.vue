<template>
  <!-- Empty State Component: Displays informational messages when no data is available -->
  <Message severity="info" :closable="false">
    {{ message }}
  </Message>
</template>

<script setup lang="ts">
// PrimeVue Component
import Message from 'primevue/message';

// Component props with default value
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: 'No items found'
  }
);
</script>
