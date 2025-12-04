<template>
  <div class="home-page min-h-screen flex align-items-center justify-content-center p-4">
    <Card class="home-card max-w-5xl w-full">
      <template #content>
        <div class="text-center py-6 px-4 md:px-6">
          <div class="mb-5">
            <div class="home-icon-wrapper">
              <i class="pi pi-star home-icon"></i>
            </div>
            <h1 class="home-title">Rick and Morty API</h1>
            <p class="home-subtitle">Character Explorer</p>
          </div>

          <div class="mb-6 mt-6">
            <p class="text-lg line-height-4 mb-4 text-color-secondary max-w-2xl mx-auto">
              Welcome to the Rick and Morty API Exercise! This application demonstrates how to fetch
              data from an external API, implement pagination, and use Vue composables and stores
              for state management.
            </p>
            <p class="text-base line-height-4 text-color-secondary max-w-2xl mx-auto">
              Explore characters from the Rick and Morty universe, fetched from the
              <a
                href="https://rickandmortyapi.com/api"
                target="_blank"
                rel="noopener noreferrer"
                class="home-link"
              >
                <i class="pi pi-external-link text-sm ml-1"></i>
                Rick and Morty API </a
              >.
            </p>
          </div>

          <Button
            label="Explore Characters"
            icon="pi pi-users"
            iconPos="right"
            size="large"
            class="mt-2 home-button"
            :pt="{ root: { class: 'gradient-button' } }"
            @click="$router.push('/app')"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #f8f5ff 0%, #faf5ff 50%, #fef5ff 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-card {
  box-shadow: var(--p-shadow-4);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 2px solid #667eea;
}

.home-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--p-shadow-6);
}

.home-icon-wrapper {
  display: inline-block;
  margin-bottom: 1rem;
}

.home-icon {
  font-size: 5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.home-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.home-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.home-link:hover {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-bottom: 2px solid #764ba2;
}

/* Gradient styling for home button (PrimeVue v4 uses data-pc-name) */
.home-button :deep(button[data-pc-name='button']) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
  border: none !important;
  color: white !important;
}

.home-button :deep(button[data-pc-name='button']:hover:not(:disabled)) {
  background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%) !important;
}

@media (max-width: 768px) {
  .home-card :deep(.p-card-body) {
    padding: 1.5rem;
  }

  .home-icon {
    font-size: 4rem;
  }

  .home-title {
    font-size: 2.5rem;
  }

  .home-subtitle {
    font-size: 1.25rem;
  }
}
</style>
