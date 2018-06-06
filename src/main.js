import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import './styles/mainStyle.css'

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
   el: '#app',
   render: h => h(App),
   router,
   store,
   created() {
      fb.initializeApp({
         apiKey: 'AIzaSyCaekCvBkbOdG77DRdPzdu7s8977KgkMtM',
         authDomain: 'list-tasks.firebaseapp.com',
         databaseURL: 'https://list-tasks.firebaseio.com',
         projectId: 'list-tasks',
         storageBucket: 'list-tasks.appspot.com',
         messagingSenderId: '990982464730'
      });

      fb.auth().onAuthStateChanged((user) => {
         if (user) {
            this.$store.dispatch('autoLoginUser', user);
            console.log(user);
         }
      })
   }
})
