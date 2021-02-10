import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, RouteLocationNormalizedLoaded } from 'vue-router';
import Home from '../views/Home.vue';
import Authentication from '../views/Authentication.vue';
import EditSpendings from '../views/EditSpendings.vue'
import {auth} from '../main';

const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    if(auth.currentUser){
      next()
    } else {
      next("/");
    }
  } catch (error) {
    next("/");
  }
}
 


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/authentication'
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: Authentication
  },

  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: guard
  },

  {
    path: '/spendings',
    name: 'EditSpendings',
    component: EditSpendings,
    beforeEnter: guard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
