<template>
    <div>
      <h1>Thêm Sản Phẩm</h1>
      <form @submit.prevent="addProduct" class="product-form">
        <div class="form-group">
          <label for="id">ID:</label>
          <input type="text" id="id" v-model="product.id" class="form-control">
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="product.name" class="form-control">
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="text" id="price" v-model="product.price" class="form-control">
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="product.description" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" v-model="product.imageUrl" class="form-control">
        </div>
      <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
  </div>
</template>
  
<script>
  import axios from 'axios';

  export default {
    name: "AddProduct",
    data() {
    return {
      product: {
        id: '',
        name: '',
        price: '',
        description: '',
        imageUrl: '/images/'
      }
    }
  },
  methods: {
    async addProduct() {
      try {
        const response = await axios.post('/api/products', this.product);
        this.product = {
          id: '',
          name: '',
          price: '',
          description: '',
          imageUrl: '/images/'
        };
        this.$router.push('/products');
      } catch(error) {
        console.error("Error submitting form:", error);
        }
      }
    }
  }
</script>
  
  <style scoped>
  .product-form {
    max-width: 400px;
    margin: 30px auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  