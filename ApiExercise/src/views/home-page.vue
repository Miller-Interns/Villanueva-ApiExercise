<template>
  <div
    class="min-h-screen flex align-items-center justify-content-center p-5"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  >
    <Card class="max-w-4xl w-full">
      <template #content>
        <div class="text-center">
          <h1 class="text-4xl mb-4">Rick and Morty API Exercise</h1>
          <p class="text-lg line-height-3 mb-4">
            Welcome to the Rick and Morty API Exercise! This application demonstrates how to fetch
            data from an external API, implement pagination, and use Vue composables and stores for
            state management.
          </p>
          <p class="text-lg line-height-3 mb-5">
            Click the button below to view characters from the Rick and Morty universe, fetched from
            the
            <a
              href="https://rickandmortyapi.com/api"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary font-medium no-underline hover:underline"
              >Rick and Morty API</a
            >.
          </p>
          <Button label="View Characters" @click="$router.push('/app')" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>
