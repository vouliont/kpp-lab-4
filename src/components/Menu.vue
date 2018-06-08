<template>
   <div id="menu">
      <button
         class="btn-close-menu"
         @click="toggleMenu()"
      >
         <div class="btn-close-menu__line btn-close-menu__line--first"></div>
         <div class="btn-close-menu__line btn-close-menu__line--second"></div>
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

</style>
