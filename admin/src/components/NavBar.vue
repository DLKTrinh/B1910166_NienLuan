<template>
  <div class="nav-bar">
    <router-link to="/" class="products-link">
      <div class="logo-wrap">
        <img style="width: 130px;" :src="logo" />
      </div>
    </router-link>
    
    
    
    <div class="nav-buttons-wrap">
     <router-link to="/home">
        <button class="nav-button">Trang chủ</button>
     </router-link>
     <router-link to="/products">
        <button class="nav-button">Sản phẩm</button>
    </router-link>
    <router-link to="/orders">
      <button class="nav-button">Đơn Hàng</button>
    </router-link>
      
    </div>

  </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue'

import logo from '@/assets/logo.png';

export default {
  name: "NavBar",
  components:{
    InputSearch,
  },
  data() {
    return {
      searchText:"",
      logo,
    }
  },
}
</script>