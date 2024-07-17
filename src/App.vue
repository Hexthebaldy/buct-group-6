<!-- src/App.vue -->
<!-- <template>
  <div id="app">
      <ojLogin v-if="!isLoggedIn" @login-success="handleLoginSuccess"></ojLogin>
      <div v-else class="container">
        <ojSidebar id="ojSidebar"/>
        <div class="main-content">
          <router-view />
        </div>
      </div>
  </div>
</template> -->
<template>
  <div id="app">
    <div class="login-container" v-if="0">
      <ojLogin @login-success="handleLoginSuccess"></ojLogin>
    </div>
    <div v-else class="container">
      <ojSidebar id="ojSidebar"/>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import ojSidebar from './components/ojSidebar';
import ojLogin from './components/ojLogin.vue';
import { mapState,mapActions } from 'vuex';


export default {
  name: 'App',
  components: {
    ojSidebar,
    ojLogin,
  },


  computed:{
    ...mapState(['isLoggedIn'])
  },


  methods:{
    ...mapActions(['login']),
    handleLoginSuccess(){
      this.login();
    }
  },



};
</script>

<style>
body{
  margin:0%;
  background: rgb(241, 243, 244);

}

#app {
  display: flex;
  width:100vw;
  height:100vh;
  
}

#ojSidebar{
  flex: left;
}

.main-content {
  margin-left: 200px;
  padding-left: 20px;
  flex: left;
}

.login-container{
  display: flex;
  background-image: url(./assets/log-in-background.png);
  background-size: cover;
  justify-content: center;
  align-items: center;
  height: 100%;
  width:100%;
}

</style>
