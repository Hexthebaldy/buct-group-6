<template>
  <div class="container">
    <div class="page">
      <div class="main-page">
        <h3>ContestFeedback</h3>
        <el-table :data="pagedSurveys" style="width: 95%">
          <el-table-column prop="cfContestId" label="cfContestId" width="150"></el-table-column>
          <el-table-column prop="cfContestName" label="cfContestName" width="250"></el-table-column>
          <el-table-column prop="cfContestFrozen" label="cfContestFrozen" width="150"></el-table-column>
          <el-table-column prop="cfContestParticipantsnumber" label="Participants" width="150"></el-table-column>
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
          <el-input v-model="searchQuery" placeholder="Search by contest name"></el-input>
        </div>
      </div>

      <div class="side-block">SIDEBLOCK</div>
    </div>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElButton, ElPagination, ElInput } from "element-plus";
import axios from "axios";

export default {
  name: "ojContestFeedback",
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElInput,
  },
  data() {
    return {
      surveys: [],
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
    applyFilters() {
      if (this.searchQuery) {
        this.filterdSurveys = this.surveys.filter((c) =>
          c.cfContestName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdSurveys = this.surveys;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getInfo() {
      axios({
        method: "get",
        url: "/stu/acmer/cfcontest/all/1/20",
      }).then((res) => {
        this.surveys = res.data.data.records;
        this.filterdSurveys = this.surveys;
        this.applyFilters();
      });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

  
  <style scoped>


  
.container {
  margin: 0;
  width: 100vw;
  height: 100%;
  background: rgb(241, 243, 244);
}

.page {
  display: flex;
  margin-top: -20px;
  margin-left: 0px;
  border-left: 2px solid rgb(96, 94, 94);
  border-right: 2px solid rgb(96, 94, 94);
  width: 70%;
  height: 1080px;
  box-shadow: 0px -1px 8px rgba(72, 67, 67, 1);
  border-radius: 0.3%;
}

h3 {
  color: #4d4e4f;
  padding-top: 30px;
  margin-left: 400px;
  width: 200px;
}

.el-button {
  margin-right: 10px;
}

.el-table {
  max-width: 100%;
  overflow: auto;
  margin-bottom: 10px;
  border: 2px solid gray;
  margin-left: 50px;
}

.searchBar {
  margin-top: 10px;
  width: 20%;
  padding-bottom: 100px;
  margin-left: 50px;
  width: 300px;
}

.side-block {
  border: 1px solid black;
}

.block {
  margin-top: 10px;
  margin-left: 50px;
  width: 300px;
}
</style>
  