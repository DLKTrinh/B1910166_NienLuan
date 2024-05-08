<template>
  <div class="grid-wrap">
    <div class="product-container" v-for="product in products" :key="product.id">
      <img class="product-image" :src="product.imageUrl" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button @click="$emit('remove-from-cart', product.id)" class="remove-button">Xóa</button>
    </div>
    <h1 class="total-price">Tổng: {{ totalPrice }}đ</h1>
  </div>
  
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: ['products'],
  computed: {
    totalPrice() {
      return this.products.reduce((total, product) => {
        const price = Number(product.price.replace('đ', ''));
        return total + price;
      }, 0); 
    }
  }
}
</script>