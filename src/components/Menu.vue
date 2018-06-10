<template>
   <div id="menu">
      <button
         class="btn-close-menu"
         @click="toggleMenu()"
      >
         <svg style="width:32px;height:32px" viewBox="0 0 24 24">
            <path fill="#fff" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
         </svg>
      </button>

      <div class="menu-list-wrapper">
         <ul class="menu-list">
            <router-link
               tag="li"
               class="menu-list__item"
               :to="{ name: 'tasks-page' }"
               @click.native="toggleMenu()"
               active-class="menu-list__item--active"
            >Мои задачи</router-link>
            
            <router-link
               tag="li"
               class="menu-list__item"
               :to="{ name: 'add-task-page' }"
               @click.native="toggleMenu()"
               active-class="menu-list__item--active"
            >Добавить задачу</router-link>
         </ul>
      </div>

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
      position: fixed;
      top: 0;
      left: 0;
      background-color: hsla(0, 0%, 13%, 0.938);
      z-index: 9999;
      color: #fff;
   }

   .btn-close-menu {
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

   .menu-list-wrapper {
      height: 100%;
      padding: 60px 0 100px;
      overflow: auto;
   }
   .menu-list {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
   }
   .menu-list__item {
      display: block;
      width: 100%;
      max-width: 300px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 22px;
      margin: 0 auto 10px;
   }
   .menu-list__item--active {
      color: #1976D2;
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
