<template>
  <div>
    <h1>Giỏ Hàng</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
      <button class="checkout-button" @click="toggleForm">Thanh Toán</button>
      <form v-if="showForm" @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="formData.address" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-if="cartItems.length === 0">
      <h2 style="margin-top: 30px;">Giỏ hàng rỗng!</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList.vue';

export default {
  name: "ShoppingCart",
  props: ['user'],
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: [],
      showForm: false,
      formData: {
        name: '',
        address: ''
      }
    }
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    async submitForm() {
      try {
        let totalPrice = 0;
        this.cartItems.forEach(product => {
          totalPrice += parseFloat(product.price.replace('đ', '').trim());
        });
        
        const response = await axios.post(`/api/users/${this.user.uid}/orders`, {
          name: this.formData.name,
          address: this.formData.address,
          total: totalPrice,
        });

        console.log(response.data);
        this.showForm = false;
        this.formData = { name: '', address: '' }; 
        this.$router.push('/purchased');
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  }
}
</script>

<style>
.checkout-form {
  width: 300px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

form div{
  margin: 20px 0px;
}

</style>

