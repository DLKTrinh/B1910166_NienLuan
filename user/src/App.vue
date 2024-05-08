<template>
  <NavBar :user="user" />
  <div class="page-wrap">
      <router-view :user="user"></router-view>
  </div>
  <Footer />
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue'
import Footer from './components/Footer.vue';

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      user: null,
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      this.user = user;
    });
  }
};
</script>
