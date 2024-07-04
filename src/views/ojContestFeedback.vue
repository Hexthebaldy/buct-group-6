<!-- src/views/About.vue -->
<!-- <template>
    <div>
      <h1>ContestFeedback</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ojContestFeedback'
  }
  </script> -->
  <template>
    <div class="container">
      <h3>ContestFeedback</h3>
      <el-table :data="pagedSurveys" style="width: 70%">
        <el-table-column prop="#" label="#" width="50"></el-table-column>
        <el-table-column prop="date" label="Date" width="150"></el-table-column>
        <el-table-column prop="name" label="Name" width="200"></el-table-column>
        <el-table-column prop="question" label="Questions" width="100"></el-table-column>
        <el-table-column prop="status" label="Status" width="100"></el-table-column>
        <el-table-column label="Actions" width="400">
          <template v-slot="{ row }">
            <el-button type="primary" @click="fillSurvey(row)">Fill Survey</el-button>
            <el-button type="info" @click="viewResults(row)">View Results</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          layout="total,prev,pager,next"
          :total="filterdSurveys.length"
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
  ElButton,
  ElPagination,
  ElInput,
} from "element-plus";

  export default {
    name: 'ojContestFeedback',
    components: {
      ElTable,
      ElTableColumn,
      ElButton,
      ElPagination,
      ElInput,
  },
    data() {
      return {
        surveys: [
          { "#": 1, date: "2023-01-15", name: "Winter Coding Challenge", question: 10, status: "finished" },
          { "#": 2, date: "2023-02-10", name: "Spring Hackathon", question: 15, status: "unfinished" },
          { "#": 3, date: "2023-03-05", name: "Algorithm Quest", question: 12, status: "finished" },
          { "#": 4, date: "2023-04-20", name: "Data Structures Showdown", question: 18, status: "unfinished" },
          { "#": 5, date: "2023-05-15", name: "Code Sprint", question: 8, status: "finished" },
          { "#": 6, date: "2023-06-10", name: "Summer Coding Marathon", question: 20, status: "unfinished" },
          { "#": 7, date: "2023-07-05", name: "Hack The Code", question: 11, status: "finished" },
          { "#": 8, date: "2023-08-25", name: "Back-to-School Blitz", question: 14, status: "unfinished" },
          { "#": 9, date: "2023-09-10", name: "Autumn Algorithm Adventure", question: 16, status: "finished" },
          { "#": 10, date: "2023-10-05", name: "October Coding Fest", question: 13, status: "unfinished" },
          { "#": 11, date: "2023-11-20", name: "Pre-Winter Coding Spree", question: 9, status: "finished" },
          { "#": 12, date: "2023-12-15", name: "End-of-Year Codeathon", question: 17, status: "unfinished" },
          { "#": 13, date: "2024-01-10", name: "New Year Code Bash", question: 10, status: "finished" },
          { "#": 14, date: "2024-02-05", name: "Valentine's Day Hack", question: 12, status: "unfinished" },
          { "#": 15, date: "2024-03-01", name: "March Madness Coding", question: 14, status: "finished" },
          { "#": 16, date: "2024-04-10", name: "Spring Code Clash", question: 18, status: "unfinished" },
          { "#": 17, date: "2024-05-15", name: "May Code Mayhem", question: 16, status: "finished" },
          { "#": 18, date: "2024-06-20", name: "Summer Code Slam", question: 20, status: "unfinished" },
          { "#": 19, date: "2024-07-25", name: "July Jolt Coding", question: 15, status: "finished" },
          { "#": 20, date: "2024-08-30", name: "August Algorithm Assault", question: 19, status: "unfinished" }
        ],
        searchQuery: "",
        filterdSurveys: [],
        pageSize: 10,
        currentPage: 1,
      };
    },


    computed: {
    pagedSurveys() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdSurveys.slice(start, end);
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
    fillSurvey(row) {
        console.log(`Filling survey for: ${row.name}`);
    },
    viewResults(row) {
        console.log(`Viewing results for: ${row.name}`);
    },
    applyFilters() {
      if (this.searchQuery) {
        this.filterdSurveys = this.surveys.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdSurveys = this.surveys;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },



    },


    mounted() {
    this.filterdSurveys = this.surveys;
  },


  };
  </script>
  
  <style scoped>
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
  
  
  .el-button {
    margin-right: 10px;
  }

  .searchBar {
    margin-top: 10px;
    width: 20%;
    padding-bottom:100px ;
  }
  
  .block{
    margin-top: 10px;
  }

  </style>
  