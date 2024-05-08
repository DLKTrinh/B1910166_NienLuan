<template>
  <div>
    <h1>Các Sản Phẩm</h1>
    <ProductsList :products="products"/>
  </div>
</template>

<script>
import ProductsList from '../components/ProductsList.vue';
import axios from 'axios';

export default {
  name: "Products",
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await axios.get('/api/products');
    const products = response.data;
    this.products = products;
  }
}
</script>