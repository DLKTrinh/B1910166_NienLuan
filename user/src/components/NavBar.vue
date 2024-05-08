<template>
  <div class="nav-bar">
    <router-link to="/" class="products-link">
      <div class="logo-wrap">
        <img style="width: 130px;" :src="logo" />
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
     <router-link to="/">
        <button class="nav-button">Trang chủ</button>
     </router-link>
     <router-link to="/products">
        <button class="nav-button">Sản phẩm</button>
    </router-link>
    <router-link to="/about">
      <button class="nav-button">Giới thiệu</button>
    </router-link>

    <div class="search">
        <InputSearch v-model="searchText" />
    </div>


      <button @click="signOut" v-if="user">Đăng xuất</button>
      <button @click="signIn" v-if="!user">Đăng Nhập</button>
      <router-link to="/cart" class="cart-link">
        <button>Giỏ hàng</button>
      </router-link>
      
    </div>

  </div>
</template>

<script>
import { getAuth, signOut, sendSignInLinkToEmail } from 'firebase/auth';
import InputSearch from '@/components/InputSearch.vue'

import logo from '@/assets/logo.png';

export default {
  name: "NavBar",
  props: ['user'],
  components:{
    InputSearch,
  },
  data() {
    return {
      searchText:"",
      logo,
    }
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);
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
  }
}
</script>