import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router'
import Products from './views/Products.vue';
import ProductDetail from './views/ProductDetail.vue';
import NotFound from './views/NotFound.vue';
import Bakery from './views/Bakery.vue';
import AddProduct from './views/AddProduct.vue';
import EditProduct from './views/EditProduct.vue';
import Orders from './views/Orders.vue';
import OrderDetail from './views/OrderDetail.vue';
import Login from './views/Login.vue'


import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/home',
    component: Bakery,
  }, {
    path: '/products',
    component: Products,
  }, {
    path: '/products/:productId',
    component: ProductDetail,
  }, {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  }, {
    path: '/products/add',
    component: AddProduct,
  }, {
    path: '/products/:productId/edit',
    component: EditProduct,
    props: true,
  }, {
    path: '/orders',
    component: Orders,
  },{
    path: '/orders/:orderId',
    component: OrderDetail,
  },{
    path: '/',
    redirect: '/login',
  },
  { 
    path: '/login', 
    component: Login
  },]
}))
.mount('#app')

