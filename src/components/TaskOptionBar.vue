<template>
   <transition name="task-option-bar">
      <div class="task-option-bar">
         <div class="task-option-bar__inner">
            <button
               class="btn-task-done"
               @click="$emit('taskDone')"
            >
               <svg style="width:44px;height:44px" viewBox="0 0 24 24">
                  <path fill="#fff" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
               </svg>
            </button>

            <router-link
               tag="div"
               class="btn-task-edit"
               to="/edit-task"
            >
               <svg style="width:44px;height:44px" viewBox="0 0 24 24">
                  <path fill="#fff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
               </svg>
            </router-link>

            <button
               class="btn-close-bar"
               @click="closeBar()"
            >
               <svg style="width:44px;height:44px" viewBox="0 0 24 24">
                  <path fill="#fff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,10L12,15L17,10H7Z" />
               </svg>
            </button>
         </div>
      </div>
   </transition>
</template>

<script>
   export default {
      methods: {
         closeBar() {
            this.$emit('closeBar');
            this.$store.commit('setCurrentTaskId', null);
         }
      }
   }
</script>

<style scoped>
   .task-option-bar {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      background-color: #1976D2;
      z-index: 9990;
   }
   .task-option-bar-enter,
   .task-option-bar-leave-to {
      transform: translateY(100%);
   }
   .task-option-bar-enter-active,
   .task-option-bar-leave-active {
      transition: transform 0.3s;
   }
   .task-option-bar-enter-to,
   .task-option-bar-leave {
      transform: translateY(0);
   }

   .task-option-bar__inner {
      width: 100%;
      max-width: 300px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
   }
   .btn-task-done,
   .btn-task-edit,
   .btn-close-bar {
      width: 44px;
      height: 44px;
      background-color: transparent;
   }
</style>
