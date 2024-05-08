<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.imageUrl" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <router-link :to="'/products/' + product.id">
        <button>Chi Tiết</button>
      </router-link>
      <button style="margin-top: 5px; background-color: red;" @click="deleteProduct(product.id)">Xóa</button>
    </div>
    <div class="product-item">
        <img style="margin-top: 40px;" src="@/assets/cong.png" alt="Button" @click="gotoaddProduct">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ProductsList",
  props: ['products'],
  methods: {
    gotoaddProduct(){
      this.$router.push('/products/add')
    },

    async deleteProduct(productId){
      try{
        const response = await axios.delete(`/api/products/${productId}`)
        this.$router.go();
      } catch(error){
        console.error(error);
      }
    }
  }
}
</script>