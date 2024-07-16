<template>
  <div class="container">
    <div class="page">
    <h3 class="topBar">Codeforces Player Data</h3>
    <div class="buttons">
      <el-button @click="filterCompetitions('all')">All</el-button>
      <el-button @click="filterCompetitions('active')">Active</el-button>
      <el-button @click="filterCompetitions('retired')">Retired</el-button>
      <el-button @click="generateLineChart" class="showRatingHistory">showRatingHistory</el-button>
    </div>
    <el-table
      :data="pagedCompetitions"
      style="width: 80%"
      highlight-current-row
      @row-click="handleRowClick"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="stuNo"
        label="stuNo"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="stuName"
        label="stuName"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="stuClass"
        label="stuClass"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="stuAcId"
        label="stuAcId"
        width="150"
      ></el-table-column>
      <el-table-column 
        prop="stuCfId"
        label="stuCfId"
        width="150"></el-table-column>
      <el-table-column
        prop="cfRating"
        label="cfRating"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="cfSumContest"
        label="cfSumContest"
        width="150"
      ></el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="total, prev, pager, next"
        :total="filteredCompetitions.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        background
      ></el-pagination>
    </div>

    <div class="searchBar">
      <el-input
        v-model="searchQuery"
        placeholder="Search by student name"
      ></el-input>
    </div>

    <div id="ratingHistory" ></div>
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
import * as echarts from "echarts";
import axios from 'axios';
import { mapActions } from "vuex";

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElInput,
  },

  data() {
    return {
      competitions: [
      
      ],

      currentRow: null,
      searchQuery: "",
      filteredCompetitions: [],
      currentPage: 1,
      pageSize: 15,
      ratingHistory: [],
    };
  },

  computed: {
    pagedCompetitions() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCompetitions.slice(start, end);
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
    ...mapActions(['updatePlayersInfo']),
    filterCompetitions(type) {
      if (type === "all") {
        this.filteredCompetitions = this.competitions;
      } else if (type === "active") {
        this.filteredCompetitions = this.competitions.filter(
          (c) => !c.isRetired
        );
      } else {
        this.filteredCompetitions = this.competitions.filter(
          (c) => c.isRetired
        );
      }

      this.currentPage = 1; // 重置到第一页
      //   this.applyFilters(); 这是bug
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    applyFilters() {
      if (this.searchQuery) {
        this.filteredCompetitions = this.competitions.filter((c) =>
          c.stuName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredCompetitions = this.competitions;
      }
    },
    handleRowClick(row) {
      console.log("handleRowClick is Triggerd");
      this.currentRow = row;
      this.ratingHistory = row.ratingHistory || [];
      console.log("ratingHistory: ", this.ratingHistory);
    },
    tableRowClassName(row) {
      if (this.currentRow && this.currentRow.stuNO === row.stuNO) {
        return "row-selected";
      }
      return "";
    },
    generateLineChart() {
      const myChart = echarts.init(document.getElementById("ratingHistory"));
      const option = {
        xAxis: {
          type: "category",
          data: ["1", "2", "3","4","5","6","7","8","9","10","11","12"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ratingHistory,
            // data: [1200,1400,1600,1800,1900,2000,2100,2200,2250,2300,2350,2400]测试用
            type: "line",
            smooth:'true',
          },
        ],
      };
      myChart.setOption(option);
    },
    generateRandomRating(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateRatingHistory(currentRating) {
      const history = [];
      let rating = currentRating;
      for (let i = 0; i < 12; i++) {
        const fluctuation = Math.floor(Math.random() * 100) - 100; // -100 到 0
        rating += fluctuation;
        if(rating < 0){
          rating = 0;
        }
        history.unshift(rating); 
      }
      return history;
    },
    getInfo(){
      const sheet = axios({
        method:'get',
        url:'/stu/acmer/student/some/1/120',
      }).then(res =>{
        this.competitions = res.data.data.records;
        console.log("info got!");
        this.competitions.forEach(student => {
          if (student.stuNo) {
            const firstDigit = parseInt(student.stuNo.charAt(0), 10);
            const fourthDigit = parseInt(student.stuNo.charAt(3), 10);
            student.isRetired = !((fourthDigit > 0 && fourthDigit < 4) && firstDigit == 2);
          } else {
            student.isRetired = true; 
          }

          student.cfRating = this.generateRandomRating(400,3000);
          student.cfSumContest = this.generateRandomRating(1,50);
          student.ratingHistory = this.generateRatingHistory(student.cfRating);
    });

        this.filteredCompetitions = this.competitions;
        this.applyFilters(); // 马上应用过滤器以更新分页和显示
        this.sendArray(); //数据存到vuex

      })
    },
    sendArray(){
      this.updatePlayersInfo(this.competitions);
    },

  },

  mounted() {
    this.getInfo();
    this.filteredCompetitions = this.competitions;
  },
};
</script>


<style scoped>
.page{
  border:2px solid rgb(96, 94, 94);
  width:84%;
  box-shadow: 0px -1px 8px rgb(67, 67, 72);
  border-radius: 0.3%;
}

.topBar{
  padding-bottom: 5px;
  padding-left: 550px;  
  color:#4d4e4f;

}

.buttons{
  margin-left: 150px;
}

.el-button{
  border:2px solid rgb(144, 144, 144);
  border-bottom:0;
}

.el-table {
  max-width: 100%;
  overflow: auto;
  margin-bottom: 10px;
  border:2px solid gray;
  margin-left: 150px;
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
  
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
  
}

.block{
  margin-left: 150px;

}

.searchBar {
  margin-top: 10px;
  width: 200px;
  margin-left: 150px;
}

.row-selected {
  background-color: #f5f5f5 !important;
}

.showRatingHistory{
    margin-left:500px;
}

#ratingHistory{
    width:800px;
    height:400px;
    padding-bottom:300px;
    margin-left: 200px;
}

</style>