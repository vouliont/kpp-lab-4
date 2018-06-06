import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../pages/Auth.vue'
import Home from '../pages/Home.vue'
import Tasks from '../pages/Tasks.vue'
import AddTask from '../pages/AddTask.vue'
import OverdueTasks from '../pages/OverdueTasks.vue'

Vue.use(VueRouter)

export default new VueRouter({
   routes: [
      {
         path: '',
         component: Home,
         children: [
            {
               path: '/tasks',
               component: Tasks
            },
            {
               path: '/addtask',
               component: AddTask
            },
            {
               path: '/overduetasks',
               component: OverdueTasks
            }
         ]
      },
      {
         path: '/auth',
         component: Auth
      }
   ],
   mode: 'history'
})
