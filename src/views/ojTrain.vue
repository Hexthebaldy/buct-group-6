<!-- src/views/Home.vue -->
<!-- <template>
    <div>
      <h1>Train</h1>
      <p>Welcome to the Train page!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ojTrain'
  }
  </script> -->

  <template>
    <div class="container">
      <h3>Train</h3>
      <el-table :data="pagedTrainList" style="width: 55%">
        <el-table-column prop="#" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="Name" width="400"></el-table-column>
        <el-table-column prop="start" label="Start" width="250"></el-table-column>
        <el-table-column prop="end" label="End" width="250"></el-table-column>


        
      </el-table>

      <div class="block">
        <el-pagination
          layout="total,prev,pager,next"
          :total="filterdTrainList.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
          background
        ></el-pagination>
      </div>
  
      <div class="searchBar">
        <el-input
          v-model="searchQuery"
          placeholder="Search by contest name"
        ></el-input>
      </div>

    </div>
  </template>
  
  <script>
  import {
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
} from "element-plus";

  export default {
    name: 'ojRank',
    components: {
      ElTable,
      ElTableColumn,
      ElPagination,
      ElInput,
  },
    data() {
      return {
        trainList: [
          { "#": 1, name: "Codeforces Round #700", start: "2024-07-01 10:00", end: "2024-07-01 12:00" },
          { "#": 2, name: "AtCoder Beginner Contest", start: "2024-07-02 09:00", end: "2024-07-02 11:00" },
          { "#": 3, name: "LeetCode Weekly Contest", start: "2024-07-03 14:00", end: "2024-07-03 16:00" },
          { "#": 4, name: "Google Code Jam", start: "2024-07-04 15:00", end: "2024-07-04 17:00" },
          { "#": 5, name: "Facebook Hacker Cup", start: "2024-07-05 16:00", end: "2024-07-05 18:00" },
          { "#": 6, name: "TopCoder SRM", start: "2024-07-06 13:00", end: "2024-07-06 15:00" },
          { "#": 7, name: "Kaggle Competition", start: "2024-07-07 11:00", end: "2024-07-07 13:00" },
          { "#": 8, name: "Codeforces Round #701", start: "2024-07-08 10:00", end: "2024-07-08 12:00" },
          { "#": 9, name: "AtCoder Grand Contest", start: "2024-07-09 09:00", end: "2024-07-09 11:00" },
          { "#": 10, name: "LeetCode Biweekly Contest", start: "2024-07-10 14:00", end: "2024-07-10 16:00" },
          { "#": 11, name: "Hash Code", start: "2024-07-11 15:00", end: "2024-07-11 17:00" },
          { "#": 12, name: "Kick Start", start: "2024-07-12 16:00", end: "2024-07-12 18:00" },
          { "#": 13, name: "TopCoder Marathon", start: "2024-07-13 13:00", end: "2024-07-13 15:00" },
          { "#": 14, name: "Hack The Box", start: "2024-07-14 11:00", end: "2024-07-14 13:00" },
          { "#": 15, name: "Codeforces Round #702", start: "2024-07-15 10:00", end: "2024-07-15 12:00" }
        ],
        searchQuery: "",
        filterdTrainList: [],
        pageSize: 10,
        currentPage: 1,
      };
    },


    computed: {
    pagedTrainList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdTrainList.slice(start, end);
    },
  },


  watch: {
    searchQuery: {
      handler() {
        this.applyFilters();
      },
      deep: true,
    },
  },


  methods: {
    applyFilters() {
      if (this.searchQuery) {
        this.filterdTrainList = this.trainList.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdTrainList = this.trainList;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },



    },


    mounted() {
    this.filterdTrainList = this.trainList;
  },


  };
  </script>
  
  <style scoped>
  .container {
    width: 100vw;
    height: 100%;
    background: rgb(241, 243, 244);

  }
  

  .searchBar {
    margin-top: 10px;
    width: 20%;
    padding-bottom:220px ;
  }
  
  .block{
    margin-top: 10px;
  }

  </style>
  