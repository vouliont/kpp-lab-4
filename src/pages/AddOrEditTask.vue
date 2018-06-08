<template>
   <div class="add-task">
      <form class="form-adding-editing-task">
         <textarea
            type="text"
            class="field-task-name"
            rows="2"
            v-model="taskName"
         ></textarea>

         <input
            type="button"
            class="btn-choose-date"
            value="Выбрать дату"
            v-if="!isShowDate"
            @click="isShowDate = true"
         >
         <div
            class="date-block"
            v-else
         >
            <input class="date-block__day" placeholder="День" v-model.number="date.day">
            <input class="date-block__month" placeholder="Месяц" v-model.number="date.month">
         </div>

         <div class="btn-wrapper">
            <input
               type="button"
               value="Отмена"
               class="btn-cancel"
               @click="cancelEditProps()"
            >
            <input
               type="submit"
               class="submit-task"
               :value="submitName"
               @click.prevent="onSubmit()"
            >

         </div>
      </form>
   </div>
</template>

<script>
   export default {
      data() {
         return {
            taskName: '',
            isShowDate: false,
            date: {
               day: '',
               month: ''
            },
            submitName: ''
         }
      },
      methods: {
         addTask() {
            let task = {};
            task.name = this.taskName;
            if (this.isShowDate) {
               task.day = this.date.day;
               task.month = this.date.month;
            }

            this.$store.dispatch('addTask', task)
               .then(() => {
                  this.$router.push('/tasks');
               })
         },
         editTask() {
            let task = {};
            task.name = this.taskName;
            if (this.isShowDate) {
               task.day = this.date.day;
               task.month = this.date.month;
            }

            this.$store.dispatch('editTask', task)
               .then(() => {
                  this.$router.push('/tasks');
               })
         },
         cancelEditProps() {
            this.$router.push('/tasks');
         }
      },
      computed: {
         onSubmit() {
            return (this.$route.name == 'edit-task-page') ? this.editTask : this.addTask;
         }
      },
      created() {
         this.$emit('changedTitle', 'Новая задача');
         
         if (this.$route.name == 'edit-task-page') {
            this.submitName = 'Применить';

            let currTaskId = this.$store.getters.currentTaskId;
            let currTask = this.$store.getters.tasks[currTaskId];

            this.taskName = currTask.name;

            if (currTask.day && currTask.month) {
               this.isShowDate = true;
               this.date.day = currTask.day;
               this.date.month = currTask.month;
            }
         } else {
            this.submitName = 'Добавить';
         }
      }
   }
</script>

<style scoped>
   .form-adding-task {
      width: 100%;
      max-width: 440px;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 0 auto;
   }

   .field-task-name {
      width: 100%;
      margin-bottom: 30px;
   }
   
   .btn-choose-date {
      display: block;
      background-color: #BBDEFB;
      width: 100%;
      height: 40px;
   }

   .date-block {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      overflow: hidden;
   }
   .date-block__day,
   .date-block__month {
      box-sizing: border-box;
      width: 50%;
      float: left;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 0;
      border-radius: 0;
      background-color: #BBDEFB;
   }
   .date-block__day { border-right: 1px solid #90CAF9; }
   .date-block__month { border-left: 1px solid #90CAF9; }

   .btn-add-task {
      display: block;
      width: 100%;
      max-width: 200px;
      height: 40px;
      background-color: #1565C0;
      margin: 40px auto 0;
   }
</style>
