import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/home-page.vue';
import CharactersPage from '../views/characters-page.vue';

enum RouteNames {
  Homepage = 'homepage',
  TodoList = 'todo-list'
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
      name: RouteNames.TodoList,
      component: CharactersPage
    }
  ]
});

export default router;
