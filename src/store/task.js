export default {
   state: {
      currentTaskId: null
   },
   mutations: {
      setCurrentTaskId(state, payload) {
         state.currentTaskId = payload;
      }
   },
   getters: {
      currentTaskId(state) {
         return state.currentTaskId;
      }
   }
}