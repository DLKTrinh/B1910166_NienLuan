<template>
    <div>
      <h1>All Orders</h1>
      <div class="grid-wrap" v-if="orders.length > 0">
        <div class="product-container" v-for="order in orders" :key="order._id">
            <div class="content-wrap" style="padding: 10px 0;">
                <h2>Khách Hàng: {{ order.name }}</h2>
                <h2>{{ order.total }}</h2>
            </div>

            <router-link :to="'/orders/' + order._id">
              <button style="margin-left: 280px; height: 75px">Chi Tiết</button>
            </router-link>
            <button style="margin-left: 10px ; padding: 0 28px; background-color: darkred;" @click="deleteOrder(order._id)">Xóa</button>
          
        </div>
      </div>
      <div v-else>
        <p>Không Có Đơn Hàng Nào (T-T)</p>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
    }
  },
  async created() {
    try {
      const response = await axios.get('/api/orders');
      this.orders = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async deleteOrder(orderId) {
      try {
        await axios.delete(`/api/orders/${orderId}`);
        this.orders = this.orders.filter(order => order._id !== orderId);
      } catch (error) {
        console.error(error);
      }
    },

    viewOrderDetails(orderId) {
    }
  }
}
</script>
  