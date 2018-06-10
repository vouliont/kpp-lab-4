<template>
   <div id="home">
      <transition name="menu">
         <app-menu
            v-if="isOpenedMenu"
            :toggleMenu="toggleMenu"
         ></app-menu>
      </transition>

      <div class="header">
         <h2>{{ title }}</h2>
         <app-sandwich :toggleMenu="toggleMenu"></app-sandwich>
      </div>

      <router-view @changedTitle="changeTitle"></router-view>
   </div>
</template>

<script>
   import Sandwich from '../components/Sanwich.vue'
   import Menu from '../components/Menu.vue'

   export default {
      data() {
         return {
            isOpenedMenu: false,
            title: ''
         }
      },
      methods: {
         toggleMenu() {
            this.isOpenedMenu = !this.isOpenedMenu;
         },
         changeTitle(str) {
            this.title = str;
         }
      },
      components: {
         appSandwich: Sandwich,
         appMenu: Menu
      }
   }
</script>

<style scoped>
   #home {
      padding: 120px 0 40px;
   }
   .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2196F3;
      color: #fff;
      z-index: 9990;
   }

   .menu-enter,
   .menu-leave-to {
      transform: translateX(100%);
   }
   .menu-enter-active,
   .menu-leave-active {
      transition: transform 0.5s;
   }
   .menu-enter-to,
   .menu-leave {
      transform: translateX(0);
   }
</style>
