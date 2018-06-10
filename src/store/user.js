import * as fb from 'firebase'

class User {
   constructor(id) {
      this.id = id;
   }
}

export default {
   state: {
      user: null
   },
   mutations: {
      setUser(state, payload) {
         state.user = payload;
      }
   },
   actions: {
      async registerUser({commit}, {email, password}) {
         commit('clearError');
         commit('setLoading', true);
         try {
            let objectReturned = await fb.auth().createUserWithEmailAndPassword(email, password);
            let user = objectReturned.user;

            commit('setUser', new User(user.uid));
            commit('setDatabase', fb.database());
            commit('setLoading', false);
         } catch (error) {
            commit('setLoading', false);
            commit('setError', error.message);
            throw error;
         }
      },
      async loginUser({commit}, {email, password}) {
         commit('clearError');
         commit('setLoading', true);
         try {
            let objectReturned = await fb.auth().signInWithEmailAndPassword(email, password);
            let user = objectReturned.user;

            commit('setUser', new User(user.uid));
            commit('setDatabase', fb.database());
            commit('setLoading', false);
         } catch (error) {
            commit('setLoading', false);
            commit('setError', error.message);
            throw error;
         }
      },
      autoLoginUser({commit}, payload) {
         commit('setUser', new User(payload.uid));
      },
      logoutUser({commit}) {
         fb.auth().signOut();
         commit('setTasks', null);
         commit('setUser', null);
      }
   },
   getters: {
      user(state) {
         return state.user;
      }
   }
}