<!-- src/components/AppSidebar.vue -->
<template>
    <div class="sidebar">
      <router-link class="sideBarSelection" to="/home">Home</router-link>
      <router-link class="sideBarSelection" to="/CFinfo">CFinfo</router-link>
      <router-link class="sideBarSelection" to="/recentContest">RecentContest</router-link>
      <router-link class="sideBarSelection" to="/contestFeedback">ContestFeedback</router-link>
      <router-link class="sideBarSelection" to="/contestArrangement">ContestArrangement</router-link>
      <router-link class="sideBarSelection" to="/rank">Rank</router-link>
      <router-link class="sideBarSelection" to="/train">Train</router-link>
      <router-link class="sideBarSelection" to="/award">Awards</router-link>
      <router-link class="sideBarSelection" to="/dataVisualization">DataVisualization</router-link>
    </div>
</template>
  
  <script>
  export default {
    name: 'ojSidebar'
  }
  </script>
  
  <style>
  .sidebar {
    width: 200px;
    height: 100vh;
    background: rgb(163,176,175);
    background: linear-gradient(34deg, rgba(163,176,175,1) 19%, rgba(55,59,91,1) 52%, rgba(111,109,109,1) 86%, rgba(112,112,112,1) 92%);
    color: #fff;
    padding-top: 150px;
    padding-left: 20px;
    box-sizing: border-box;
    position: fixed;
  }
  
  .sidebar a {
    display: block;
    color: #fff;
    text-decoration: none;
    margin: 30px 0;
  }
  
  .sidebar a.router-link-exact-active {
    font-weight: bold;
  }

  .sideBarSelection{
    margin-bottom: 10px;
  }

  </style>
  