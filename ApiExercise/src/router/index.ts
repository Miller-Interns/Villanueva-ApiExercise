import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/home-page.vue';
import CharactersPage from '../views/characters-page.vue';

enum RouteNames {
  Homepage = 'homepage',
  CharactersPage = 'characters-page'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Homepage,
      component: HomePage
    },
    {
      path: '/app',
      name: RouteNames.CharactersPage,
      component: CharactersPage
    }
  ]
});

export default router;
