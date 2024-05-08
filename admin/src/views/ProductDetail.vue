<template>
  <div v-if="product">
      <div class="img-wrap">
        <img :src="product.imageUrl" />
      </div>
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <h3 class="price">{{ product.price }}</h3>
        <p style="margin: 20px 0px; ">{{ product.description }}</p>
        <button @click="gotoEditProduct()" class="add-to-cart">Chỉnh sửa thông tin sản Phẩm</button>
        <button class="add-to-cart" style="margin-top: 5px; background-color: red;" @click="deleteProduct(product.id)">Xóa</button>
      </div>
  </div>
  <div v-else>
    <NotFound />
  </div>
</template>

<script>
import axios from 'axios';
import NotFound from './NotFound.vue';

export default {
  name: "ProductDetail",
  props: ['productData'],
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },

  methods: {
    gotoEditProduct() {
      this.$router.push({ 
        path: `/products/${this.product.id}/edit`,
        query: { productData: JSON.stringify(this.product) }
      });
    },


    async deleteProduct(productId){
      try{
        const response = await axios.delete(`/api/products/${productId}`)
        this.$router.push('/products');
      } catch(error){
        console.error(error);
      }
    }
  },

  components: {
    NotFound
  },
  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;
    this.product = product;
  }
}
</script>