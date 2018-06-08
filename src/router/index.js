import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Auth from '../pages/Auth.vue'
import Home from '../pages/Home.vue'
import Tasks from '../pages/Tasks.vue'
import AddOrEditTask from '../pages/AddOrEditTask.vue'
import Error404 from '../pages/Error404.vue'
import authGuard from './auth-guard.js'

Vue.use(VueRouter)

export default new VueRouter({
   routes: [
      {
         path: '',
         component: Home,
         redirect: '/tasks',
         children: [
            {
               path: '/tasks',
               component: Tasks,
               name: 'tasks-page',
               beforeEnter: authGuard
            },
            {
               path: '/add-task',
               component: AddOrEditTask,
               name: 'add-task-page',
               beforeEnter: authGuard
            },
            {
               path: '/edit-task',
               component: AddOrEditTask,
               name: 'edit-task-page',
               beforeEnter: (to, from, next) => {
                  if (store.getters.user) {
                     if (store.getters.currentTaskId) {
                        next();
                     } else {
                        next({ name: 'tasks-page' });
                     }
                  } else {
                     next('/auth');
                  }
               }
            }
         ]
      },
      {
         path: '/auth',
         component: Auth,
         beforeEnter: (to, from, next) => {
            if (store.getters.user) {
               next({ name: 'tasks-page' });
            } else {
               next();
            }
         }
      },
      {
         path: '*',
         component: Error404,
         name: 'error404'
      }
   ],
   mode: 'history'
})
