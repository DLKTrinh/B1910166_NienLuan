<template>
    <div class="order-detail">
      <h1>Chi Tiết Đơn Hàng</h1>
      <div v-if="order">
        <div class="order-info">
          <h2>Tên Khách Hàng: {{ order.name }}</h2>
          <h2>Địa Chỉ: {{ order.address }}</h2>
          <h2>Tổng Đơn Hàng: {{ order.total }}</h2>
        </div>
        <div class="product-list">
          <div class="product-container" v-for="product in order.cart" :key="product.id">
            <img class="product-image" :src="product.imageUrl" alt="Product Image" />
            <div class="product-details">
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Order not found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        order: null
      };
    },
    async created() {
      try {
        const orderId = this.$route.params.orderId;
        const response = await axios.get(`/api/orders/${orderId}`);
        this.order = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>
  
  <style scoped>

    h2{
        margin: 12px;
    }

  .order-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .order-info {
    margin-bottom: 20px;
  }
  
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
  }
  
  .product-container {
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  
  .product-details {
    flex-grow: 1;
  }
  
  @media (max-width: 768px) {
    .product-list {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
  </style>
  