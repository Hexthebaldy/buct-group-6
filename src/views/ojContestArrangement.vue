  <template>
    <div class="container">
      <h3>Contests Schedule</h3>
      <CalendarView></CalendarView>
     </div>
  </template>
  
  <script>
  import CalendarView from '../components/secondary/CalendarView.vue'


  export default {
    name: 'ojArrangement',
    components:{
      CalendarView,
    },

    methods: {

    },




  };
  </script>
  

  <style lang="css" scoped>
  .container {
    width: 100vw;
    height: 120vh;
    background: rgb(241, 243, 244);

  }

  h3{
  color:#4d4e4f;
  }

  </style>
