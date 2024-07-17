<template>
  <div class="container">
    <div class="page">
      <h3 class="topBar">Codeforces Player Data</h3>
      <div class="buttons">
        <el-button @click="filterCompetitions('all')">All</el-button>
        <el-button @click="filterCompetitions('active')">Active</el-button>
        <el-button @click="filterCompetitions('retired')">Retired</el-button>
        <el-button @click="generateLineChart" class="showRatingHistory"
          >showRatingHistory</el-button
        >
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
          width="150"
        ></el-table-column>
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

      <div id="ratingHistory"></div>

      <div id="rating-prediction" v-if="isPredictionVisible">Predicted Rating Next Month: {{prediction}}</div>

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
import axios from "axios";
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
      isPredictionVisible: false,
      competitions: [],
      prediction: 0,
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
    ...mapActions(["updatePlayersInfo"]),
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
      this.predictRating();
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
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ratingHistory,
            // data: [1200,1400,1600,1800,1900,2000,2100,2200,2250,2300,2350,2400]测试用
            type: "line",
            smooth: "true",
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
        if (rating < 0) {
          rating = 0;
        }
        history.unshift(rating);
      }
      return history;
    },
    getInfo() {
      const sheet = axios({
        method: "get",
        url: "/stu/acmer/student/some/1/120",
      }).then((res) => {
        this.competitions = res.data.data.records;
        console.log("info got!");
        this.competitions.forEach((student) => {
          if (student.stuNo) {
            const firstDigit = parseInt(student.stuNo.charAt(0), 10);
            const fourthDigit = parseInt(student.stuNo.charAt(3), 10);
            student.isRetired = !(
              fourthDigit > 0 &&
              fourthDigit < 4 &&
              firstDigit == 2
            );
          } else {
            student.isRetired = true;
          }

          student.cfRating = this.generateRandomRating(400, 3000);
          student.cfSumContest = this.generateRandomRating(1, 50);
          student.ratingHistory = this.generateRatingHistory(student.cfRating);
        });

        this.filteredCompetitions = this.competitions;
        this.applyFilters(); // 马上应用过滤器以更新分页和显示
        this.sendArray(); //数据存到vuex
      });
    },
    sendArray() {
      this.updatePlayersInfo(this.competitions);
    },
    predictRating() {
      const synaptic = require("synaptic"); // 引入 Synaptic.js

      const { Layer, Network, Trainer } = synaptic;

      // 准备数据
      const data = [
        [
          1023, 1040, 1098, 1137, 1225, 1253, 1305, 1334, 1367, 1456, 1511,
          1596,
        ],
        [
          1927, 2004, 2092, 2121, 2160, 2259, 2260, 2267, 2341, 2416, 2455,
          2510,
        ],
        [
          2106, 2186, 2225, 2241, 2320, 2416, 2476, 2545, 2564, 2573, 2614,
          2629,
        ],
        [
          1554, 1560, 1565, 1582, 1640, 1670, 1741, 1791, 1869, 1941, 1954,
          2017,
        ],
        [872, 908, 985, 989, 1067, 1153, 1181, 1231, 1294, 1309, 1334, 1375],
        [
          1227, 1270, 1320, 1331, 1366, 1439, 1497, 1540, 1590, 1638, 1642,
          1708,
        ],
        [
          1582, 1583, 1615, 1637, 1706, 1721, 1776, 1809, 1868, 1873, 1939,
          1952,
        ],
        [614, 694, 769, 820, 863, 935, 999, 1051, 1083, 1172, 1234, 1256],
        [
          1522, 1526, 1575, 1637, 1718, 1740, 1790, 1843, 1919, 1955, 1994,
          2021,
        ],
        [517, 592, 646, 739, 838, 888, 981, 1055, 1117, 1182, 1279, 1359],
        [
          1948, 2018, 2076, 2142, 2206, 2246, 2315, 2385, 2485, 2577, 2590,
          2630,
        ],
        [358, 384, 475, 522, 617, 678, 734, 746, 842, 847, 937, 1026],
        [381, 431, 436, 528, 624, 683, 764, 819, 868, 883, 921, 1017],
        [324, 420, 439, 471, 523, 606, 694, 725, 728, 806, 827, 914],
        [1362,1435,1467,1523,1545,1546,1577,1669,1691,1703,1768,1842],
        // ...更多数据
      ];

      // 提取输入和输出
      const trainingData = data.map((d) => ({
        input: d.slice(1, 12).map((x) => x / 3000), // 使用第2到第12个月的积分作为输入，归一化处理
        output: [d[11] / 3000], // 第12个月的积分作为输出，归一化处理
      }));

      // 创建神经网络
      const inputLayer = new Layer(11);
      const hiddenLayer = new Layer(10);
      const outputLayer = new Layer(1);

      inputLayer.project(hiddenLayer);
      hiddenLayer.project(outputLayer);

      const myNetwork = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer,
      });

      const trainer = new Trainer(myNetwork);

      // 训练模型
      trainer.train(trainingData, {
        rate: 0.01,
        iterations: 2000000,
        error: 0.005,
        shuffle: true,
        log: 1000,
        cost: Trainer.cost.MSE,
      });

      // 预测
      const newInput = this.ratingHistory.slice(1,12);
      const newInput2 = newInput.map((x) => x / 3000); // 新的输入数据，归一化处理
      const prediction = myNetwork.activate(newInput2);

      this.prediction = prediction[0]*3000;
      this.isPredictionVisible = true;
      console.log("Predicted score:", prediction[0] * 3000); // 反归一化处理
    },
  },

  mounted() {
    this.getInfo();
    this.filteredCompetitions = this.competitions;
  },
};
</script>


<style scoped>
.page {
  border: 2px solid rgb(96, 94, 94);
  width: 84%;
  box-shadow: 0px -1px 8px rgb(67, 67, 72);
  border-radius: 0.3%;
}

.topBar {
  padding-bottom: 5px;
  padding-left: 550px;
  color: #4d4e4f;
}

.buttons {
  margin-left: 150px;
}

.el-button {
  border: 2px solid rgb(144, 144, 144);
  border-bottom: 0;
}

.el-table {
  max-width: 100%;
  overflow: auto;
  margin-bottom: 10px;
  border: 2px solid gray;
  margin-left: 150px;
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.block {
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

.showRatingHistory {
  margin-left: 500px;
}

#ratingHistory {
  width: 800px;
  height: 400px;
  margin-left: 200px;
}

#rating-prediction{
  font-size: larger;
  color:rgb(46, 129, 18);
  margin-left: 400px;
  margin-bottom: 50px;

}

</style>