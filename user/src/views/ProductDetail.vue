<template>
  <div v-if="product">
      <div class="img-wrap">
        <img :src="product.imageUrl" />
      </div>
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <h3 style="margin-top: 15px;" class="price">{{ product.price }}</h3>
        <p style="margin: 20px 0px; ">{{ product.description }}</p>
        <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Thêm sản phẩm vào giỏ hàng</button>
        <button class="grey-button" v-if="user && itemIsInCart">Sản phẩm đã có trong giỏ hàng</button>
        <button class="sign-in" @click="signIn" v-if="!user">Bạn cần phải đăng nhập để mua hàng</button>
      </div>
  </div>
  <div v-else>
    <NotFound />
  </div>
</template>

<script>
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import axios from 'axios';
import NotFound from './NotFound.vue';

export default {
  name: "ProductDetail",
  props: ['user'],
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId);
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
    async addToCart() {
      await axios.post(`/api/users/${this.user.uid}/cart`, { id: this.$route.params.productId });
      alert('Đã thêm sản phẩm vào giỏ hàng!');
      this.$router.go();
    },
    async signIn() {
      const email = prompt('Vui lòng nhập địa chỉ email của bạn:');
      const auth = getAuth();
      const actionCodeSettings = {
        url: `http://localhost:8080/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('Link đăng nhập đã được gửi đến địa chỉ email của bạn');
      window.localStorage.setItem('emailForSignIn', email);
    }
  },
  components: {
    NotFound
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      await signInWithEmailLink(auth, email, window.location.href);
      alert('Đăng nhập thành công!');
      window.localStorage.removeItem('emailForSignIn');
    }

    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;
    this.product = product;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = cartResponse.data;
      this.cartItems = cartItems;
    }
  }
}
</script>