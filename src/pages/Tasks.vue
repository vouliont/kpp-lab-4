<template>
   <div class="tasks" :class="{'tasks-pb': isShowTaskOptionBar}">
      <ul class="tasks-list">
         <li
            class="tasks-list__item"
            :class="{'tasks-list__item--active': key == $store.getters.currentTaskId}"
            v-for="(task, key) in $store.getters.tasks"
            :key="key"
            @click="toggleTaskOptionBar(key)"
         >
            <div class="task-name">{{ task.name }}</div>

            <div
               class="task-date"
               v-if="task.date"
            >
               {{ task.date.string }}
            </div>
         </li>
      </ul>

      <app-task-option-bar
         v-if="isShowTaskOptionBar"
         @taskDone="taskDone()"
         @closeBar="isShowTaskOptionBar = false"
      ></app-task-option-bar>
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
         this.$store.commit('setCurrentTaskId', null);
      }
   }
</script>

<style scoped>
   .tasks {
      transition: padding 0.3s;
   }
   .tasks-pb {
      padding-bottom: 60px;
   }
   .tasks-list {
      padding: 0 20px;
   }
   .tasks-list__item {
      width: 100%;
      padding: 16px 10px;
      box-sizing: border-box;
      background-color: #BBDEFB;
      border-radius: 3px;
      position: relative;
      margin-bottom: 15px;
   }
   .tasks-list__item:last-child {
      margin-bottom: 0;
   }
   .tasks-list__item--active {
      background-color: #64B5F6;
   }

   .task-date {
      font-size: 16px;
      text-align: right;
      color: #4d4d4d;
   }
</style>
