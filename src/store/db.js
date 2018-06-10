export default {
   state: {
      db: null,
      tasks: null,
      currentTaskId: null
   },
   mutations: {
      setDatabase(state, payload) {
         state.db = payload;
      },
      setTasks(state, payload) {
         state.tasks = payload;
      },
      setCurrentTaskId(state, payload) {
         state.currentTaskId = payload;
      }
   },
   actions: {
      async addTask({commit, getters}, task) {
         commit('clearError');
         commit('setLoading', true);
         let userId = getters.user.id;

         if (task.date) {
            let someDate = new Date(task.date.year, task.date.month, task.date.day);
            let dateString = someDate.toLocaleString('ru', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric' 
            });

            task.date.string = dateString;
         }

         try {
            await getters.db.ref(`users/${userId}/tasks/`).push(task);
            commit('setLoading', false);
         } catch (error) {
            commit('setLoading', false);
            commit('setError', error.message);
            throw error;
         }
      },
      async editTask({commit, getters}, task) {
         commit('clearError');
         commit('setLoading', true);
         let userId = getters.user.id;

         if (task.date) {
            let someDate = new Date(task.date.year, task.date.month, task.date.day);
            let dateString = someDate.toLocaleString('ru', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric' 
            });

            task.date.string = dateString;
         }

         try {
            await getters.db.ref(`users/${userId}/tasks/${getters.currentTaskId}`).set(task);
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
      },
      currentTaskId(state) {
         return state.currentTaskId;
      }
   }
}