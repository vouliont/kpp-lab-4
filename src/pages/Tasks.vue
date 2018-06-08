<template>
   <div class="tasks">
      <ul class="tasks-list">
         <li
            class="tasks-list__item"
            v-for="(task, key) in $store.getters.tasks"
            :key="key"
            @click="toggleTaskOptionBar(key)"
         >
            <div class="task-name">{{ task.name }}</div>

            <div
               class="task-date"
               v-if="task.day && task.month"
            >
               {{ task.day }} {{ task.month }}
            </div>
         </li>
      </ul>

      <app-task-option-bar v-if="isShowTaskOptionBar" @taskDone="taskDone()"></app-task-option-bar>
   </div>
</template>

<script>
   import TaskOptionBar from '../components/TaskOptionBar.vue'

   export default {
      data() {
         return {
            isShowTaskOptionBar: false
         }
      },
      methods: {
         toggleTaskOptionBar(taskId) {
            let curTaskId = this.$store.getters.currentTaskId;
            
            if (curTaskId) {
               if (curTaskId == taskId) {
                  this.$store.commit('setCurrentTaskId', null);
                  this.isShowTaskOptionBar = false;
               } else {
                  this.$store.commit('setCurrentTaskId', taskId);
               }
            } else {
               this.$store.commit('setCurrentTaskId', taskId);
               this.isShowTaskOptionBar = true;
            }
         },
         taskDone() {
            this.$store.dispatch('removeTask', this.$store.getters.currentTaskId);
            this.isShowTaskOptionBar = false;
            this.$store.commit('setCurrentTaskId', null);
         }
      },
      components: {
         appTaskOptionBar: TaskOptionBar
      },
      created() {
         this.$emit('changedTitle', 'Мои задачи');

         this.$store.dispatch('readTasks');
      }
   }
</script>

<style scoped>

</style>
