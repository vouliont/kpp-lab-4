<template>
   <div id="menu">
      <button
         class="btn-close-menu"
         @click="toggleMenu()"
      >
         <div class="btn-close-menu__inner">
            <div class="btn-close-menu__line btn-close-menu__line--first"></div>
            <div class="btn-close-menu__line btn-close-menu__line--second"></div>
         </div>
      </button>

      <ul class="menu-list">
         <router-link
            tag="li"
            class="menu-list-item"
            :to="{ name: 'tasks-page' }"
         >Мои задачи</router-link>
         <router-link
            tag="li"
            class="menu-list-item"
            :to="{ name: 'add-task-page' }"
         >Добавить задачу</router-link>
      </ul>

      <button
         class="log-out"
         @click="logout()"   
      >Выход</button>

   </div>
</template>

<script>
   export default {
      props: ['toggleMenu'],
      methods: {
         logout() {
            this.$store.dispatch('logoutUser');
            this.$router.push('/auth');
         }
      }
   }
</script>

<style scoped>
   #menu {
      width: 100%;
      height: 100vh;
      padding: 40px 0 100px;
      position: fixed;
      top: 0;
      left: 0;
      background-color: hsla(0, 0%, 13%, 0.938);
      z-index: 9999;
      color: #fff;
   }

   .btn-close-menu {
      font-size: 0;
      position: absolute;
      top: 15px;
      right: 15px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border-radius: 50%;
   }
   .btn-close-menu:active {
      background-color: hsla(0, 0%, 23%, 0.388);
   }
   .btn-close-menu__inner {
      position: relative;
      width: 24px;
      height: 24px;
   }
   .btn-close-menu__line {
      position: absolute;
      width: 30px;
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
      transform-origin: left center;
   }
   .btn-close-menu__line--first {
      top: 1px;
      transform: rotateZ(45deg);
   }
   .btn-close-menu__line--second {
      bottom: 0;
      transform: rotateZ(-45deg);
   }



   .log-out {
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #1E88E5;
   }
</style>
