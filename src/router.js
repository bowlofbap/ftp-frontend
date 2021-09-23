import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserProfile from './views/UserProfile.vue'
import LandingPage from '@/views/LandingPage'

import auth from '@/store/modules/auth.js'
import route from '@/store/modules/route.js'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/profile/:username",
      name: "user-profile",
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
      meta: {
        requiresAuth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const user = auth.getters.getCurrentUser(auth.state)
  route.mutations.setCurrentRoute(route.state, to.name);
  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && !user) {
    route.mutations.setCurrentRoute(route.state, 'landing-page');
    next("/");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
