<!-- src/views/Home.vue -->
<template>
    <div class="container">
      <ContestsCarousel :slides="slides" :interval="3000"></ContestsCarousel>
      <CodeforceData></CodeforceData>
    </div>
</template>
  
  <script>
import ContestsCarousel from '@/components/secondary/ContestsCarousel.vue'
import CodeforceData from '../components/secondary/CodeforcesData.vue'

  export default {
    name: 'ojHome',
    components:{
      ContestsCarousel,
      CodeforceData
    },
    

    data(){
      return{
        slides:[
          {img: require('../assets/AWTFad.jpg'),title:'Slide 1'},
          {img: require('../assets/acm.jpg'),title:'Slide 2'},

        ]
      }
    }


  }
  </script>
  
  <style scoped>
    .container{
      width:100vw;
      height:100%;
      background: rgb(241, 243, 244);
      
    }


  </style>