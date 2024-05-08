<template>
  <div>
    <h1>Trang Chủ</h1>
    <img style="max-width: 800px; border-radius: 10px;;" src="@/assets/bakery.png" alt=""> 
    <h2 style="margin: 10px 0">Chào mừng đến với cửa hàng Bakery! </h2>
    <p>Cửa hàng bánh Bakery là điểm đến lý tưởng cho những người yêu thưởng thức hương vị tinh tế và đẳng cấp của các loại bánh tươi ngon. Với sự kết hợp hoàn hảo giữa sự sáng tạo và đội ngũ nghệ nhân bánh tài năng, chúng tôi mang đến những sản phẩm bánh chất lượng cao, từ những chiếc bánh ngọt đầy màu sắc và hấp dẫn đến những loại bánh mặn độc đáo và hấp dẫn. Khách hàng của chúng tôi không chỉ được thưởng thức những món bánh tươi mới mẻ mỗi ngày, mà còn được trải nghiệm không gian ấm áp và thân thiện, tạo nên những kỷ niệm đáng nhớ bên gia đình và bạn bè. Hãy đến và khám phá thế giới bánh ngọt đầy mê hoặc của chúng tôi tại cửa hàng Bakery ngay hôm nay!</p>     
    <h1>Một Số Sản Phẩm Bán Chạy</h1>
    <ProductsList :products="products"/>
  </div>
</template>
  
  <script>
  import ProductsList from '../components/ProductsList.vue';
  import axios from 'axios';
  
  export default {
    name: "Bakery",
    components: {
      ProductsList,
    },
    data() {
      return {
        products: [],
      }
    },
    async created() {
      const response = await axios.get('/api/products/');
      const products = response.data.slice(0,3);
      this.products = products;
    }
  }
  </script>