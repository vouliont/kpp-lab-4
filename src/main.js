import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import './styles/mainStyle.css'

Vue.use(Vuex);

Vue.config.productionTip = false

let app;

fb.initializeApp({
   apiKey: 'AIzaSyCaekCvBkbOdG77DRdPzdu7s8977KgkMtM',
   authDomain: 'list-tasks.firebaseapp.com',
   databaseURL: 'https://list-tasks.firebaseio.com',
   projectId: 'list-tasks',
   storageBucket: 'list-tasks.appspot.com',
   messagingSenderId: '990982464730'
});

fb.auth().onAuthStateChanged((user) => {
   if (app) return;
   
   if (user) {
      store.dispatch('autoLoginUser', user);
      store.commit('setDatabase', fb.database());
   }

   app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
   })
})