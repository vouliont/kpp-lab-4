<template>
   <div class="task-option-bar">
      <div
         class="btn-task-done"
         @click="$emit('taskDone')"
      >Выполнено</div>

      <router-link
         tag="div"
         to="/edit-task"
      >Редактировать</router-link>
   </div>
</template>

<script>
   export default {
      methods: {

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
      background-color: aquamarine;
   }
</style>
