<template>
   <button class="sandwich" @click="toggleMenu()">
      <svg style="width:32px;height:32px" viewBox="0 0 24 24">
         <path fill="#fff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
   </button>
</template>

<script>
   export default {
      props: ['toggleMenu']
   }
</script>

<style scoped>
   .sandwich {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border-radius: 50%;
   }
   .sandwich:active {
      background-color: hsla(0, 0%, 23%, 0.388);
   }
</style>
