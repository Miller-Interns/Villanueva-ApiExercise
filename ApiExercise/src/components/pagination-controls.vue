<template>
  <Card>
    <template #content>
      <div class="flex justify-content-center align-items-center gap-3">
        <Button
          label="Previous"
          icon="pi pi-chevron-left"
          :disabled="!hasPrevPage || loading"
          @click="$emit('previous')"
        />
        <span class="font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button
          label="Next"
          icon="pi pi-chevron-right"
          iconPos="right"
          :disabled="!hasNextPage || loading"
          @click="$emit('next')"
        />
      </div>
    </template>
  </Card>
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
