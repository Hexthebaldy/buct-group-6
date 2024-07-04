<!-- src/views/About.vue -->
<!-- <template>
    <div>
      <h3>Contests Schedule</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ojArrangement'
  }
  </script> -->
  <template>
    <div class="container">
      <h3>Contests Schedule</h3>
      <CalendarView></CalendarView>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

    </div>
  </template>
  
  <script>
  import CalendarView from '../components/secondary/CalendarView.vue'


  export default {
    name: 'ojArrangement',
    components:{
      CalendarView,
    },

    // data() {
    //   return {
    //     value: new Date(2023, 6, 1),
    //     range: [new Date(2023, 6, 1), new Date(2023, 11, 30)],
    //     events: [
    //       { date: new Date(2023, 6, 5), name: "Hack The Code" },
    //       { date: new Date(2023, 7, 25), name: "Back-to-School Blitz" },
    //       { date: new Date(2023, 8, 10), name: "Autumn Algorithm Adventure" },
    //       { date: new Date(2023, 9, 5), name: "October Coding Fest" },
    //       { date: new Date(2023, 10, 20), name: "Pre-Winter Coding Spree" }
    //     ]
    //   };
    // },


    methods: {

    },




  };
  </script>
  

  <style lang="css" scoped>
  .container {
    width: 100vw;
    height: 100%;
    background: rgb(180, 186, 186);
    background: linear-gradient(
      34deg,
      rgba(180, 186, 186, 1) 19%,
      rgba(208, 211, 235, 1) 52%,
      rgba(186, 185, 185, 1) 86%
    );
  }




  </style>
