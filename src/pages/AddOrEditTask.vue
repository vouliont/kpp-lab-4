<template>
   <div class="set-task">
      <form class="form-adding-editing-task">
         <textarea
            type="text"
            class="field-task-name"
            :class="{'field-task-name--error': $v.taskName.$error}"
            rows="2"
            v-model="$v.taskName.$model"
         ></textarea>

         <div class="date-block" :class="{'open': isShowDate}">
            <p class="date-block__label" @click="isShowDate = true">Дата</p>
            <transition name="date-block-elems">
               <button
                  class="btn-close-date-block"
                  v-if="isShowDate"
                  @click.prevent="isShowDate = false"
               >
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                     <path fill="#fff" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
               </button>
            </transition>

            <transition name="date-block-elems">
               <div class="choose-date" v-if="isShowDate">
                  <div class="choose-date__day choose-date__elem" :class="{'choose-date__elem--error': $v.date.day.$error}">
                     <p class="choose-date__label">Число</p>
                     <input
                        class="choose-date__field"
                        type="number"
                        v-model.number="$v.date.day.$model"
                        @input="$v.$touch()"
                     >
                  </div>
                  <div class="choose-date__month choose-date__elem" :class="{'choose-date__elem--error': $v.date.month.$error}">
                     <p class="choose-date__label">Месяц</p>
                     <input
                        class="choose-date__field"
                        type="number"
                        v-model.number="$v.date.month.$model"
                        @input="$v.$touch()"
                     >
                  </div>
                  <div class="choose-date__year choose-date__elem" :class="{'choose-date__elem--error': $v.date.year.$error}">
                     <p class="choose-date__label">Год</p>
                     <input
                        class="choose-date__field"
                        type="number"
                        v-model.number="$v.date.year.$model"
                        @input="$v.$touch()"
                     >
                  </div>
               </div>
            </transition>
         </div>

         <div class="btns-wrapper">
            <input
               type="button"
               value="Отмена"
               class="btn-cancel"
               @click="cancelEditProps()"
            >
            <input
               type="submit"
               class="submit-task"
               :class="{'dont-active': $v.taskName.$invalid || (isShowDate && $v.dateGroup.$invalid)}"
               :value="submitName"
               @click.prevent="onSubmit()"
            >

         </div>
      </form>
   </div>
</template>

<script>
   import { required, integer, minValue, maxValue } from 'vuelidate/lib/validators'

   export default {
      data() {
         return {
            taskName: '',
            isShowDate: false,
            date: {
               day: (new Date()).getDate() + 1,
               month: (new Date()).getMonth() + 1,
               year: (new Date()).getFullYear()
            },
            submitName: ''
         }
      },
      validations() {
         return {
            taskName: {
               required
            },
            date: {
               day: {
                  required,
                  integer,
                  minValue: minValue(this.minDayValue),
                  maxValue: maxValue(this.maxDayValue)
               },
               month: {
                  required,
                  integer,
                  minValue: minValue(this.minMonthValue),
                  maxValue: maxValue(12)
               },
               year: {
                  required,
                  integer,
                  minValue: minValue((new Date()).getFullYear()),
                  maxValue: maxValue((new Date()).getFullYear() + 30)
               }
            },
            dateGroup: ['date.day', 'date.month', 'date.year']
         }
      },
      methods: {
         addTask() {
            this.$v.$touch();
            if (this.$v.taskName.$invalid || (this.isShowDate && this.$v.dateGroup.$invalid)) return;
            
            let task = {};
            task.name = this.taskName;
            if (this.isShowDate) {
               task.date = this.date;
            }

            this.$store.dispatch('addTask', task)
               .then(() => {
                  this.$router.push('/tasks');
               })
         },
         editTask() {
            this.$v.$touch();
            if (this.$v.taskName.$invalid || (this.isShowDate && this.$v.dateGroup.$invalid)) return;

            let task = {};
            task.name = this.taskName;
            if (this.isShowDate) {
               task.date = this.date;
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
         },
         minDayValue() {
            let dateNow = new Date();

            if (this.date.year == dateNow.getFullYear() && this.date.month == dateNow.getMonth() + 1) return dateNow.getDate()
            else return 1;
         },
         maxDayValue() {
            return 32 - new Date(this.date.year, this.date.month - 1, 32).getDate();        
         },
         minMonthValue() {
            let dateNow = new Date();

            if (this.date.year == dateNow.getFullYear()) return dateNow.getMonth() + 1;
            else return 1;
         }
      },
      created() {
         if (this.$route.name == 'edit-task-page') {
            this.$emit('changeSandwichVisibility', false);
            this.$emit('changedTitle', 'Редактирование');
            this.submitName = 'Применить';

            let currTaskId = this.$store.getters.currentTaskId;
            let currTask = this.$store.getters.tasks[currTaskId];

            this.taskName = currTask.name;

            if (currTask.date) {
               this.isShowDate = true;
               this.date.day = currTask.date.day;
               this.date.month = currTask.date.month;
               this.date.year = currTask.date.year;
            }
         } else {
            this.$emit('changedTitle', 'Новая задача');
            this.submitName = 'Добавить';
         }
      },
      beforeRouteLeave(to, from, next) {
         this.$store.commit('setCurrentTaskId', null);
         this.$emit('changeSandwichVisibility', true);
         next();
      }
   }
</script>

<style scoped>
   .form-adding-editing-task {
      width: 100%;
      max-width: 440px;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 0 auto;
   }

   .field-task-name {
      width: 100%;
      margin-bottom: 20px;
      border: 1px solid #fff;
   }
   .field-task-name--error {
      border-color: #F44336;
   }
   
   .date-block {
      width: 100%;
      height: 40px;
      background-color: #1E88E5;
      border-radius: 3px;
      position: relative;
      transition: height 0.3s;
      overflow: hidden;
   }
   .date-block.open {
      height: 120px;
   }
   .date-block__label {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
   }

   .date-block-elems-enter,
   .date-block-elems-leave-to {
      opacity: 0;
   }
   .date-block-elems-enter-active,
   .date-block-elems-leave-active {
      transition: opacity 0.3s;
   }

   .btn-close-date-block {
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border-radius: 50%;
   }
   .btn-close-date-block:active {
      background-color: hsla(0, 0%, 23%, 0.388);
   }

   .choose-date {
      width: 100%;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
   }
   .choose-date__elem {
      width: 30%;
   }
   .choose-date__elem--error .choose-date__label {
      color: #F44336;
   }
   .choose-date__elem--error .choose-date__field {
      border-color: #F44336;
   }

   .choose-date__label {
      margin-bottom: 4px;
      padding-left: 4px;
      color: #dfdfdf;
   }
   .choose-date__field {
      width: 100%;
      height: 30px;
      border: 1px solid #fff;
   }

   .btns-wrapper {
      width: 100%;
      max-width: 300px;
      height: 40px;
      margin: 30px auto 0;
   }
   .btns-wrapper input {
      display: block;
      width: calc(50% - 10px);
      height: 40px;
      float: left;
   }
   .btn-cancel {
      background-color: transparent;
      color: #0D47A1;
      text-decoration: underline;
      margin-right: 20px;
   }
   .submit-task {
      background-color: #1565C0;
   }
   
   .submit-task.dont-active { background-color: #9e9e9e; }
</style>
