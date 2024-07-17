<!-- src/components/AppSidebar.vue -->
<template>
    <div class="sidebar">
      <router-link class="sideBarSelection" to="/home">Home</router-link>
      <router-link class="sideBarSelection" to="/CFinfo">CFproblems</router-link>
      <router-link class="sideBarSelection" to="/recentContest">RecentContest</router-link>
      <router-link class="sideBarSelection" to="/contestFeedback">ContestFeedback</router-link>
      <router-link class="sideBarSelection" to="/contestArrangement">Schedule</router-link>
      <router-link class="sideBarSelection" to="/rank">Rank</router-link>
      <!-- <router-link class="sideBarSelection" to="/train">Train</router-link> -->
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
    width: 180px;
    height: 100vh;
    box-shadow: 5px 0px 8px rgba(72, 67, 67, 1);
    background: rgb(48,54,54);
    background: linear-gradient(243deg, rgba(48,54,54,1) 32%, rgba(36,38,37,1) 52%, rgba(29,27,27,1) 86%);
    color: #fff;
    padding-top: 150px;
    padding-left: 20px;
    box-sizing: border-box;
    position: fixed;
  }
  
  .sidebar a {
    font-size: 17px;
    display: block;
    color: #fff;
    text-decoration: none;
    margin: 50px 0;
  }
  
  .sidebar a.router-link-exact-active {
    font-weight: bold;
  }

  .sideBarSelection{
    margin-bottom: 10px;
  }

  </style>
  