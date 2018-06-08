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
               <form class="form-log">
                  <input type="email" name="email" class="form-log__input input-email" v-model="logEmail" placeholder="Емейл">
                  <input type="password" name="pass" class="form-log__input input-pass" v-model="logPassword" placeholder="Пароль">

                  <input type="submit" name="log-in" class="form-log__submit" value="Войти" @click.prevent="logIn()">
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
               <form class="form-reg">
                  <input type="email" name="email" class="form-reg__input input-email" v-model="regEmail" placeholder="Емейл">
                  <input type="password" name="pass" class="form-reg__input input-pass" v-model="regPassword" placeholder="Пароль">
                  <input type="password" name="pass-repeat" class="form-reg__input input-pass input-pass-repeat" v-model="regPasswordRepeat" placeholder="Повторите пароль">

                  <input type="submit" name="sign-in" class="form-reg__submit" value="Зарегистрироваться" @click.prevent="signIn()">
               </form>
            </div>
         </transition>

         <transition name="btn-back">
            <button
               class="btn-back"
               @click="openBlockName = ''"
               v-if="openBlockName !== ''"
            >
               <div class="btn-back__inner">
                  <div class="btn-back__line btn-back__line--first"></div>
                  <div class="btn-back__line btn-back__line--second"></div>
                  <div class="btn-back__line btn-back__line--third"></div>
               </div>
            </button>
         </transition>
      </div>

   </div>
</template>

<script>
   export default {
      data() {
         return {
            openBlockName: '',
            regEmail: '',
            regPassword: '',
            regPasswordRepeat: '',
            logEmail: '',
            logPassword: ''
         }
      },
      methods: {
         logIn() {
            let user = {
               email: this.logEmail,
               password: this.logPassword
            };

            this.$store.dispatch('loginUser', user)
               .then(() => {
                  this.$router.push('/tasks');
               })
               .catch(error => console.log(error));
         },
         signIn() {
            let user = {
               email: this.regEmail,
               password: this.regPassword
            };

            this.$store.dispatch('registerUser', user)
               .then(() => {
                  this.$router.push('/tasks');
               })
               .catch(error => console.log(error));
         }
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
      height: 160px;
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
      height: 215px;
   }

   .form-log,
   .form-reg {
      padding: 0 20px;
      width: 100%;
      max-width: 400px;
   }
   .form-log__input,
   .form-reg__input {
      width: 100%;
      height: 40px;
      margin-bottom: 15px;
   }
   .form-log__submit,
   .form-reg__submit {
      display: block;
      width: 100%;
      max-width: 200px;
      height: 40px;
      background-color: #1565C0;
      margin: 10px auto 0;
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
   .btn-back__inner {
      position: relative;
      width: 24px;
      height: 24px;
   }
   .btn-back__line {
      position: absolute;
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
   }
   .btn-back__line--first {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
   }
   .btn-back__line--second {
      top: 50%;
      width: 60%;
      transform-origin: top left;
      transform: translateY(-50%) rotateZ(-35deg);
   }
   .btn-back__line--third {
      top: 50%;
      width: 60%;
      transform-origin: bottom left;
      transform: translateY(-50%) rotateZ(35deg);
   }
</style>