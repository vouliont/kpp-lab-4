<template>
   <div class="auth-container">
      <div id="auth" :class="{'to-top': openBlockName !== ''}">

         <transition name="btn-log">
            <button
               id="log"
               :class="{'to-top': openBlockName === 'log'}"
               @click="openBlockName = 'log'"
               v-if="openBlockName !== 'reg'"
            >Вход</button>
         </transition>

         <transition name="form-log-container">
            <div
               class="form-log-container"
               v-if="openBlockName === 'log'"
            >
               <form class="form-group">
                  <div
                     class="input-group"
                     :class="{
                        'input-group--error': $v.log.email.$error,
                        'input-group--dirty': $v.log.email.$dirty && $v.log.email.$model,
                        'input-group--active': activeInput == 'log-email'
                     }"
                  >
                     <label for="log-email" class="input-group-label">Емейл</label>

                     <input
                        type="email"
                        id="log-email"
                        class="input-group-item"
                        v-model="$v.log.email.$model"
                        @focus="onFocusInput($event)"
                        @blur="onBlurInput($event)"
                     >

                     <div class="input-group-error" v-if="!$v.log.email.required && $v.log.email.$error">Это поле является обязательным!</div>
                     <div class="input-group-error" v-if="!$v.log.email.email && $v.log.email.$error">Некорректный емейл!</div>
                  </div>

                  <div
                     class="input-group"
                     :class="{
                        'input-group--error': $v.log.password.$error,
                        'input-group--dirty': $v.log.password.$dirty && $v.log.password.$model,
                        'input-group--active': activeInput == 'log-password'
                     }"
                  >
                     <label for="log-password" class="input-group-label">Пароль</label>

                     <input
                        type="password"
                        id="log-password"
                        class="input-group-item"
                        v-model="$v.log.password.$model"
                        @focus="onFocusInput($event)"
                        @blur="onBlurInput($event)"
                     >

                     <div class="input-group-error" v-if="!$v.log.password.required && $v.log.password.$error">Это поле является обязательным!</div>
                  </div>

                  <input
                     type="submit"
                     class="form-group-submit"
                     :class="{'dont-active': $v.logGroup.$invalid}"
                     value="Войти"
                     @click.prevent="logIn()"
                  >
               </form>
            </div>
         </transition>

         <transition name="btn-reg">
            <button
               id="reg"
               :class="{'to-top': openBlockName === 'reg'}"
               @click="openBlockName = 'reg'"
               v-if="openBlockName !== 'log'"
            >Регистрация</button>
         </transition>

         <transition name="form-reg-container">
            <div
               class="form-reg-container"
               v-if="openBlockName === 'reg'"
            >
               <form class="form-group">
                  <div
                     class="input-group"
                     :class="{
                        'input-group--error': $v.reg.email.$error,
                        'input-group--dirty': $v.reg.email.$dirty && $v.reg.email.$model,
                        'input-group--active': activeInput == 'reg-email'
                     }"
                  >
                     <label for="reg-email" class="input-group-label">Емейл</label>

                     <input
                        type="email"
                        id="reg-email"
                        class="input-group-item"
                        v-model="$v.reg.email.$model"
                        @focus="onFocusInput($event)"
                        @blur="onBlurInput($event)"
                     >

                     <div class="input-group-error" v-if="!$v.reg.email.required && $v.reg.email.$error">Это поле является обязательным!</div>
                     <div class="input-group-error" v-if="!$v.reg.email.email && $v.reg.email.$error">Некорректный емейл!</div>
                  </div>

                  <div
                     class="input-group"
                     :class="{
                        'input-group--error': $v.reg.password.$error,
                        'input-group--dirty': $v.reg.password.$dirty && $v.reg.password.$model,
                        'input-group--active': activeInput == 'reg-password'
                     }"
                  >
                     <label for="reg-password" class="input-group-label">Пароль</label>

                     <input
                        type="password"
                        id="reg-password"
                        class="input-group-item"
                        v-model="$v.reg.password.$model"
                        @focus="onFocusInput($event)"
                        @blur="onBlurInput($event)"
                     >

                     <div class="input-group-error" v-if="!$v.reg.password.required && $v.reg.password.$error">Это поле является обязательным!</div>
                     <div class="input-group-error" v-if="!$v.reg.password.minLength && $v.reg.password.$error">Мин. длина пароля - 6 символов!</div>
                  </div>

                  <div
                     class="input-group"
                     :class="{
                        'input-group--error': $v.reg.repeatPassword.$error,
                        'input-group--dirty': $v.reg.repeatPassword.$dirty && $v.reg.repeatPassword.$model,
                        'input-group--active': activeInput == 'reg-repeat-password'
                     }"
                  >
                     <label for="reg-repeat-password" class="input-group-label">Повторите пароль</label>

                     <input
                        type="password"
                        id="reg-repeat-password"
                        class="input-group-item"
                        v-model="$v.reg.repeatPassword.$model"
                        @focus="onFocusInput($event)"
                        @blur="onBlurInput($event)"
                     >

                     <div class="input-group-error" v-if="!$v.reg.repeatPassword.sameAsPassword && $v.reg.repeatPassword.$error">Пароли не совпадают!</div>
                  </div>

                  <input
                     type="submit"
                     class="form-group-submit"
                     :class="{'dont-active': $v.regGroup.$invalid}"
                     value="Зарегистрироваться"
                     @click.prevent="signUp()"
                  >
               </form>
            </div>
         </transition>

         <transition name="btn-back">
            <button
               class="btn-back"
               @click="openBlockName = ''"
               v-if="openBlockName !== ''"
            >
               <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                  <path fill="#fff" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
               </svg>
            </button>
         </transition>
      </div>

   </div>
</template>

<script>
   import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

   export default {
      data() {
         return {
            activeInput: '',
            openBlockName: '',
            log: {
               email: '',
               password: ''
            },
            reg: {
               email: '',
               password: '',
               repeatPassword: ''
            }
         }
      },
      methods: {
         logIn() {
            this.$v.logGroup.$touch();
            if (this.$v.logGroup.$invalid) return;

            this.$store.dispatch('loginUser', this.log)
               .then(() => {
                  this.$router.push('/tasks');
               })
               .catch(error => console.log(error));
         },
         signUp() {
            this.$v.regGroup.$touch();
            if (this.$v.regGroup.$invalid) return;
            
            let newUser = {
               email: this.reg.email,
               password: this.reg.password
            };

            this.$store.dispatch('registerUser', newUser)
               .then(() => {
                  this.$router.push('/tasks');
               })
               .catch(error => console.log(error));
         },
         onFocusInput(e) {
            this.activeInput = e.target.id;
         },
         onBlurInput(e) {
            this.activeInput = '';
         }
      },
      validations: {
         log: {
            email: {
               required,
               email
            },
            password: {
               required
            }
         },
         reg: {
            email: {
               required,
               email
            },
            password: {
               required,
               minLength: minLength(6)
            },
            repeatPassword: {
               sameAsPassword: sameAs('password')
            }
         },
         logGroup: ['log.email', 'log.password'],
         regGroup: ['reg.email', 'reg.password', 'reg.repeatPassword']
      }
   }
</script>

<style scoped>
   .auth-container {
      display: flex;
      align-items: center;
      min-height: 100vh;
   }

   #auth {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      min-height: 250px;
      transition: all 0.6s;
      padding: 140px 0 40px;
   }
   #auth.to-top {
      min-height: 100vh;
      padding-top: 120px;
   }

   #log {
      position: absolute;
      top: 40px;
      left: 0;
      display: block;
      width: 100%;
      height: 80px;
      background-color: #2196F3;
      overflow: hidden;
      transition: all 0.6s;
   }
   #log.to-top {
      top: 0;
   }
   .btn-log-enter-active {
      animation: toggleLogBtn 0.6s;
   }
   .btn-log-leave-active {
      animation: toggleLogBtn 0.6s ease-in reverse;
   }
   @keyframes toggleLogBtn {
      from {
         top: 0;
         height: 0;
         opacity: 0;
      }
      to {
         top: 40px;
         height: 80px;
         opacity: 1;
      }
   }

   #reg {
      position: absolute;
      top: 160px;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: #90CAF9;
      font-size: 20px;
      transition: all 0.6s;
   }
   #reg.to-top {
      height: 80px;
      top: 0;
      background-color: #2196F3;
      font-size: 24px;
   }
   .btn-reg-enter-active {
      animation: toggleRegBtn 0.6s;
   }
   .btn-reg-leave-active {
      animation: toggleRegBtn 0.6s ease-in reverse;
      animation-fill-mode: forwards;
   }
   @keyframes toggleRegBtn {
      from {
         opacity: 0;
         top: calc(100vh - 50px);
      }
      to {
         opacity: 1;
         top: 160px;
      }
   }

   .form-log-container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .form-log-container-enter,
   .form-log-container-leave-to {
      height: 0;
      opacity: 0;
   }
   .form-log-container-enter-active,
   .form-log-container-leave-active {
      transition: all 0.6s;
   }
   .form-log-container-enter-to,
   .form-log-container-leave {
      height: 228px;
   }

   .form-reg-container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .form-reg-container-enter,
   .form-reg-container-leave-to {
      height: 0;
      opacity: 0;
   }
   .form-reg-container-enter-active,
   .form-reg-container-leave-active {
      transition: all 0.6s;
   }
   .form-reg-container-enter-to,
   .form-reg-container-leave {
      height: 312px;
   }

   .form-group {
      padding: 0 20px;
      width: 100%;
      max-width: 400px;
   }
   .input-group-item {
      width: 100%;
      height: 40px;
      border: 1px solid #fff;
   }
   .form-group-submit {
      display: block;
      width: 100%;
      max-width: 200px;
      height: 40px;
      background-color: #1565C0;
      margin: 20px auto 0;
   }

   .input-group {
      padding: 16px 0 28px;
      position: relative;
   }

   .input-group-label {
      position: absolute;
      color: #757575;
      top: 25px;
      left: 14px;
      display: inline-block;
      transition: transform 0.35s, font-size 0.35s;
   }

   .input-group--active .input-group-label,
   .input-group--dirty .input-group-label {
      transform: translate3d(-9px, -30px, 0);
      font-size: 16px;
   }

   .input-group--active .input-group-label {
      color: #1565C0;
   }

   .input-group--error .input-group-item {
      border: 1px solid #F44336;
   }
   .input-group--error .input-group-label {
      color: #F44336;
   }

   .input-group-error {
      position: absolute;
      bottom: 10px;
      left: 0;
      color: #F44336;
      font-size: 16px;
      padding-left: 10px;
   }

   .btn-back {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border-radius: 50%;
      position: absolute;
      top: 15px;
      left: 10px;
   }
   .btn-back:active {
      background-color: hsla(0, 0%, 23%, 0.388);
   }
   .btn-back-enter-active {
      animation: toggleBtnBack 0.8s;
   }
   .btn-back-leave-active {
      animation: toggleBtnBack 0.3s linear reverse;
   }
   @keyframes toggleBtnBack {
      from {
         opacity: 0;
         left: -24px;
      }
      90% {
         left: 10px;
      }
      to {
         opacity: 1;
      }
   }

   .form-group-submit.dont-active { background-color: #9e9e9e; }
</style>