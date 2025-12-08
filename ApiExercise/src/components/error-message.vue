<template>
  <!-- Error Message Component: Displays error messages using PrimeVue Message component -->
  <Message severity="error" :closable="false">
    {{ message }}
  </Message>
</template>

<script setup lang="ts">
// PrimeVue Component
import Message from 'primevue/message';

// Component props: error message to display
defineProps<{
  message: string;
}>();
</script>
