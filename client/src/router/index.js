import { createRouter, createWebHistory } from 'vue-router'
import InitialLoadComp from '../views/InitialLoad.vue'
import OnePersonComp from "../views/OnePerson.vue"
import PageNotFoundComp from "../views/PageNotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InitialLoadComp
    },
    {
      path: '/:id',
      name: 'person',
      component: OnePersonComp,
    },
    {
      path: '/:pathMatch(.*)*',
      name: "PageNotFound",
      component: PageNotFoundComp
    }
  ]
})

export default router
