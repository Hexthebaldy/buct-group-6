  <template>
    <div class="container">
      <h3>Award</h3>
      <el-table :data="pagedAwardRecords" style="width: 80%">
        <el-table-column prop="#" label="#" width="50"></el-table-column>
        <el-table-column prop="stuName" label="StudentName" width="200"></el-table-column>
        <el-table-column prop="class" label="Class" width="200"></el-table-column>
        <el-table-column prop="grade" label="Grade" width="200"></el-table-column>
        <el-table-column prop="tier" label="Tier" width="200"></el-table-column>
        <el-table-column prop="date" label="Date" width="200"></el-table-column>


        
      </el-table>

      <div class="block">
        <el-pagination
          layout="total,prev,pager,next"
          :total="filterdAwardRecords.length"
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
    name: 'ojAward',
    components: {
      ElTable,
      ElTableColumn,
      ElPagination,
      ElInput,
  },
    data() {
      return {
        awardRecords: [
          {"#": 1, stuName: "Alice Wang", class: "1A", grade: "10", tier: "First", date: "2024-01-15" },
          {"#": 2, stuName: "Bob Li", class: "2B", grade: "11", tier: "Second", date: "2024-02-20" },
          {"#": 3, stuName: "Cathy Zhang", class: "3C", grade: "12", tier: "Third", date: "2024-03-25" },
          {"#": 4, stuName: "David Chen", class: "1D", grade: "10", tier: "First", date: "2024-04-10" },
          {"#": 5, stuName: "Ella Wu", class: "2A", grade: "11", tier: "Second", date: "2024-05-05" },
          {"#": 6, stuName: "Frank Zhou", class: "3B", grade: "12", tier: "Third", date: "2024-06-15" },
          {"#": 7, stuName: "Grace Liu", class: "1C", grade: "10", tier: "First", date: "2024-07-22" },
          {"#": 8, stuName: "Henry Gao", class: "2D", grade: "11", tier: "Second", date: "2024-08-30" },
          {"#": 9, stuName: "Ivy Tang", class: "3A", grade: "12", tier: "Third", date: "2024-09-12" },
          {"#": 10, stuName: "Jack Lin", class: "1B", grade: "10", tier: "First", date: "2024-10-01" },
          {"#": 11, stuName: "Kelly Wang", class: "2C", grade: "11", tier: "Second", date: "2024-11-08" },
          {"#": 12, stuName: "Leo Sun", class: "3D", grade: "12", tier: "Third", date: "2024-12-16" },
          {"#": 13, stuName: "Mona He", class: "1A", grade: "10", tier: "First", date: "2024-01-05" },
          {"#": 14, stuName: "Nina Zhang", class: "2B", grade: "11", tier: "Second", date: "2024-02-12" },
          {"#": 15, stuName: "Oscar Li", class: "3C", grade: "12", tier: "Third", date: "2024-03-20" },
        ],
        searchQuery: "",
        filterdAwardRecords: [],
        pageSize: 10,
        currentPage: 1,
      };
    },


    computed: {
    pagedAwardRecords() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdAwardRecords.slice(start, end);
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
        this.filterdAwardRecords = this.awardRecords.filter((c) =>
          c.stuName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdAwardRecords = this.awardRecords;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },



    },


    mounted() {
    this.filterdAwardRecords = this.awardRecords;
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
  