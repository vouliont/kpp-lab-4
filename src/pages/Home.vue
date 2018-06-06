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

</style>
