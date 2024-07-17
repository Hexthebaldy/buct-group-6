<template>
  <div class="login">
    <h2>{{ isLoginMode ? 'Welcome To Coding Hub' : 'Register to Coding Hub' }}</h2>
    <form @submit.prevent="isLoginMode ? login() : register()" class="log-in-sheet">
      <div class="input-group">
        <label for="username">{{ isLoginMode ? 'Username' : 'New Username' }}</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="password">{{ isLoginMode ? 'Password' : 'New Password' }}</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-submit">{{ isLoginMode ? 'Login' : 'Register' }}</button>
    </form>
    <p @click="toggleMode" class="toggle-link">
      {{ isLoginMode ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.' }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ojLogin',
  data() {
    return {
      users: [
        { username: 'Reeves', password: '7895123' },
      ],
      username: '',
      password: '',
      isLoginMode: true
    };
  },
  methods: {
    login() {
      const getUsers = axios({
          method:'get',
          url:"/stu/acmer/user/some/1/5"
        }).then(res =>{
          this.users = res.data.data.records;
        })
      if (this.username && this.password) {
        let flag = false;
        for (let i = 0; i < this.users.length; i++) {
          if (this.username === this.users[i].username) {
            if (this.password === this.users[i].password) {
              flag = true;
              break;
            }
          }
        }

        if (flag) {
          this.$emit('login-success');
        } else {
          alert('Wrong Password or User Name !');
        }
      } else {
        alert('Please enter username and password.');
      }
    },
    register() {
      if (this.username && this.password) {
        const registerUser = axios({
          method:'post',
          url:"/stu/acmer/user/insert",
          data: {
            password: this.password,
            username: this.username,
      }
        }).then(res =>{
          console.log("registerd as: ",res);
        })
      } else {
        alert('Please enter a username and password.');
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.username = '';
      this.password = '';
    }
  }
};
</script>

<style scoped>
  .login {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
    text-align: center;
  }

  .login h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .log-in-sheet {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .input-group input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .login-submit {
    padding: 10px 20px;
    background-color: rgb(55, 59, 91);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .login-submit:hover {
    background-color: #52088a;
  }

  .toggle-link {
    margin-top: 15px;
    color: rgb(55, 59, 91);
    cursor: pointer;
    text-decoration: underline;
  }
</style>
