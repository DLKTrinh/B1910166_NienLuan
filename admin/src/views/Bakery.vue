<template>
  <div>
    <h1>CHÀO MỪNG ĐẾN VỚI TIỆM BÁNH BAKERY</h1>
    <img style="max-width: 800px; border-radius: 10px;;" src="@/assets/bakery.png" alt="">
  </div>
</template>
  
  <script>
  import ProductsList from '../components/ProductsList.vue';

  export default {
    name: "Bakery",
    components: {
      ProductsList,
    },
    data() {
      return {
        products: [],
      }
    },
  }
  </script>