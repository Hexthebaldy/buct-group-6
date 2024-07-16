<!-- src/views/About.vue -->
<template>
  <div class="container">
    <div class="page">
      <h3>Codeforces Problems</h3>
    <el-table :data="pagedProblemInfo" style="width: 88%">
      <el-table-column
        prop="cfContestId"
        label="cfContestId"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="cfContestName"
        label="cfContestName" 
        width="350">
      </el-table-column>
      <el-table-column prop="cfIndex" label="cfIndex" width="100"></el-table-column>
      <el-table-column 
        prop="cfProblemName" 
        label="cfProblemName" 
        width="200">
      </el-table-column>
      <el-table-column
        prop="cfTags"
        label="cfTags"
        width="200"
      ></el-table-column>
      <el-table-column label="Actions" width="150">
        <template v-slot="scope">
          <el-button 
            @click="viewProblem(scope.row.cfContestId,scope.row.cfIndex)" 
            type="primary" 
            size="small"
          >View</el-button>
        </template>
      </el-table-column>
      
    </el-table>

    <div class="block">
      <el-pagination
        layout="total,prev,pager,next"
        :total="filterdProblemInfo.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        background
      ></el-pagination>
    </div>

    <div class="searchBar">
      <el-input
        v-model="searchQuery"
        placeholder="Search by problem name"
      ></el-input>
    </div>
    </div>
  </div>
</template>
  
  <script>
import { ElTable,ElTableColumn,ElInput, ElPagination } from "element-plus";
import axios from 'axios';


export default {
  name: "ojAbout",
  components: {
    ElTable,
    ElTableColumn,
    ElInput,
    ElPagination,
  },
  data() {
    return {
      problemInfo: [
        
      ],

      searchQuery: "",
      filterdProblemInfo: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  computed: {
    pagedProblemInfo() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdProblemInfo.slice(start, end);
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
        this.filterdProblemInfo = this.problemInfo.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdProblemInfo = this.problemInfo;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getInfo(){
      const sheet = axios({
        method:'get',
        url:'/stu/acmer/cfproblem/all/1/200',
      }).then(res =>{
        this.problemInfo = res.data.data.records;
        console.log('info got: ',this.problemInfo);

        this.filterdProblemInfo = this.problemInfo;
        this.applyFilters();

      })

    },
    viewProblem(contestId,index){
      const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
      window.open(url,'_blank')
    }



  },

  mounted() {
    this.getInfo();
    this.filterdProblemInfo = this.problemInfo;
  },
};
</script>
  
<style lang="css" scoped>
.container {
  
  background: rgb(241, 243, 244);

}

.page{
  margin-top: 20px;
  margin-left: 70px;
  border:2px solid rgb(96, 94, 94);
  width:95%;
  height:1180px;
  box-shadow: 0px -1px 8px rgba(72, 67, 67, 1);
  border-radius: 0.3%;
}

h3{
  margin-left: 550px;
  color:#4d4e4f;

}

.el-table{
  max-width: 100%;
  overflow: auto;
  margin-bottom: 10px;
  border:2px solid gray;
  margin-left: 80px;
  
}

.searchBar {
  margin-top: 10px;
  width: 20%;
  margin-left: 80px;

}

.block{
  margin: 10px;
  margin-left: 80px;

}


</style>