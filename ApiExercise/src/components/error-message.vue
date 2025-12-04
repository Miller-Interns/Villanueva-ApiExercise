<template>
  <Message severity="error" :closable="false">
    {{ message }}
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message';

defineProps<{
  message: string;
}>();
</script>
