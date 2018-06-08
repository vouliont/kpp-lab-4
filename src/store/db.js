export default {
   state: {
      db: null,
      tasks: []
   },
   mutations: {
      setDatabase(state, payload) {
         state.db = payload;
      },
      setTasks(state, payload) {
         state.tasks = payload;
      }
   },
   actions: {
      async addTask({commit, getters}, task) {
         commit('clearError');
         commit('setLoading', true);
         let userId = getters.user.id;

         try {
            let newTask = await getters.db.ref(`users/${userId}/tasks/`).push(task);
            commit('setLoading', false);
         } catch (error) {
            commit('setLoading', false);
            commit('setError', error.message);
            throw error;
         }
      },
      async readTasks({commit, getters}) {
         commit('setLoading', true);
         let userId = getters.user.id;

         let allTasks = await getters.db.ref(`users/${userId}/tasks`).once('value');
         
         commit('setLoading', false);
         
         allTasks = allTasks ? allTasks.val() : null;         
         commit('setTasks', allTasks);
      },
      removeTask({state, getters}, payload) {
         state.tasks[payload] = null;
         delete state.tasks[payload];

         let userId = getters.user.id;

         getters.db.ref(`users/${userId}/tasks/${payload}`).remove();
      }
   },
   getters: {
      db(state) {
         return state.db;
      },
      tasks(state) {
         return state.tasks;
      }
   }
}