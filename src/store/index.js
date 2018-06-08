import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import db from './db'
import task from './task'

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      user,
      shared,
      db,
      task
   }
})