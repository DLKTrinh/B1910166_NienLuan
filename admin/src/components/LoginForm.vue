<template>
    <div class="login-container">
      <h1>Đăng Nhập</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
</template>
  
<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name:'LoginForm',
    data() {
        return {
        email: '',
        password: ''
        }
    },
    methods: {

        login() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log('Đã đăng nhập thành công', user);
            router.push('/home'); 
            })
            .catch((error) => {
            console.error('Lỗi đăng nhập', error);
            });
        }
    }
}
</script>

  
<style scoped>

  .login-container {
    background-color: white;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    padding-top: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }

  input{
    margin: 10px;
  }
</style>
  