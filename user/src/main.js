import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router'
import ShoppingCart from './views/ShoppingCart.vue';
import Products from './views/Products.vue';
import ProductDetail from './views/ProductDetail.vue';
import NotFound from './views/NotFound.vue';
import Bakery from './views/Bakery.vue';
import About from '@/views/About.vue'
import Purchased from './views/Purchased.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { initializeApp } from "firebase/app";

library.add(fas,fab,far);

const firebaseConfig = {
  apiKey: "AIzaSyBPmmBnYs8oTVMzw_k8YtMMlzNgZyFdD48",
  authDomain: "bakery-4ad37.firebaseapp.com",
  projectId: "bakery-4ad37",
  storageBucket: "bakery-4ad37.appspot.com",
  messagingSenderId: "356543590332",
  appId: "1:356543590332:web:2d9f04b3c6c2233b3fc5b9"
};

initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/',
    component: Bakery,
  }, {
    path: '/cart',
    component: ShoppingCart,
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
    path: '/about',
    component: About,
  }, {
    path: '/purchased',
    name: 'purchased',
    component: Purchased,
  }
]
}))
.mount('#app')
.component("font-awesome-icon", FontAwesomeIcon);
