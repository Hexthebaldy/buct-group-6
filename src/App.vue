<!-- src/App.vue -->
<template>
  <div id="app">
    <ojSidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import ojSidebar from './components/ojSidebar'

export default {
  name: 'App',
  components: {
    ojSidebar
  }
}
</script>

<style>
body{
  margin:0%
}

#app {
  display: flex;
}

.main-content {
  background: rgb(180,186,186);
  background: linear-gradient(34deg, rgba(180,186,186,1) 19%, rgba(208,211,235,1) 52%, rgba(186,185,185,1) 86%);
  margin-left: 200px;
  padding: 20px;
  width: 100%;
}
</style>
