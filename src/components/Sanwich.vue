<template>
   <button class="sandwich" @click="toggleMenu()">
      <div class="sandwich__inner">
         <div class="sandwich__line sandwich__line--first"></div>
         <div class="sandwich__line sandwich__line--second"></div>
         <div class="sandwich__line sandwich__line--third"></div>
      </div>
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
   .sandwich__inner {
      position: relative;
      width: 28px;
      height: 22px;
   }
   .sandwich__line {
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
   }
   .sandwich__line--first {
      top: 0;
   }
   .sandwich__line--second {
      top: 50%;
      transform: translateY(-50%);
   }
   .sandwich__line--third {
      top: 100%;
      transform: translateY(-100%);
   }
</style>
