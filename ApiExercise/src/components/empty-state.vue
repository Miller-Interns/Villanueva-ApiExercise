<template>
  <Message severity="info" :closable="false">
    {{ message }}
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message';

withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: 'No items found'
  }
);
</script>
