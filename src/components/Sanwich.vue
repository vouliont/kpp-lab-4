<template>
   <div class="sandwich-wrap" @click="openMenu()">
      <button id="sandwich">
         <div class="sandwich__line"></div>
         <div class="sandwich__line"></div>
         <div class="sandwich__line"></div>
      </button>
   </div>
</template>

<script>
   export default {
      props: ['toggleMenu']
   }
</script>

<style scoped>

</style>
