<!-- src/views/Home.vue -->
<template>
    <div class="container">
      <CodeforceData></CodeforceData>
    </div>
</template>
  
  <script>
  import CodeforceData from '../components/secondary/CodeforcesData.vue'

  export default {
    name: 'ojHome',
    components:{
      CodeforceData
    }
  }
  </script>
  
  <style scoped>
    .container{
      width:100vw;
      height:100%;
      background: rgb(180,186,186);
      background: linear-gradient(34deg, rgba(180,186,186,1) 19%, rgba(208,211,235,1) 52%, rgba(186,185,185,1) 86%);
    }


  </style>