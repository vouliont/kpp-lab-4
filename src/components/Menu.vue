<template>
   <div id="menu">
      <button
         class="btn-close-menu"
         @click="toggleMenu()"
      >&times;</button>

      <ul class="menu-list">
         
      </ul>

   </div>
</template>

<script>
   export default {
      props: ['toggleMenu']
   }
</script>

<style scoped>

</style>
