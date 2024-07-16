  <template>
  <div class="container">
    <div class="block1">
      <div id="pie1">pie1</div>
      <div id="pie2">pie2</div>
    </div>

    <div class="block2">
      <div id="column1">column1</div>
    </div>

    <div class="block3">
      <div id="column2">column2</div>
    </div>

    
  </div>
</template>


<script>
import axios from "axios";
import * as echarts from "echarts";
import { mapGetters } from "vuex";
import { toRaw } from "vue";

export default {
  name: "ojDataVisualization",
  data() {
    return {
      pie1Data: [
        { value: 0, name: "0-1000" },
        { value: 0, name: "1000-1500" },
        { value: 0, name: "1500-2000" },
        { value: 0, name: "2000-2500" },
        { value: 0, name: "2500-3000" },
      ],
      pie2Data: [
        { value: 0, name: "0" },
        { value: 0, name: "1-10" },
        { value: 0, name: "10-30" },
        { value: 0, name: "30-50" },
        { value: 0, name: "50+" },
      ],
    };
  },

  computed: {
    ...mapGetters(["getArray"]),
    receivedArray() {
      return this.getArray;
    },
  },

  methods: {
    calculateRatingDistribution() {
      this.receivedArray.forEach((element) => {
        if (element.cfRating < 1000) {
          this.pie1Data[0].value += 1;
        } else if (element.cfRating >= 1000 && element.cfRating < 1500) {
          this.pie1Data[1].value += 1;
        } else if (element.cfRating >= 1500 && element.cfRating < 2000) {
          this.pie1Data[2].value += 1;
        } else if (element.cfRating >= 2000 && element.cfRating < 2500) {
          this.pie1Data[3].value += 1;
        } else {
          this.pie1Data[4].value += 1;
        }
      });
    },
    calculateRatingProgress() {
      this.receivedArray.forEach((element) => {
        if (element.ratingHistory[9] - element.ratingHistory[8] < 1) {
          this.pie2Data[0].value += 1;
        } else if (
          element.ratingHistory[9] - element.ratingHistory[8] >= 1 &&
          element.ratingHistory[9] - element.ratingHistory[8] < 10
        ) {
          this.pie2Data[1].value += 1;
        } else if (
          element.ratingHistory[9] - element.ratingHistory[8] >= 10 &&
          element.ratingHistory[9] - element.ratingHistory[8] < 30
        ) {
          this.pie2Data[2].value += 1;
        } else if (
          element.ratingHistory[9] - element.ratingHistory[8] >= 30 &&
          element.ratingHistory[9] - element.ratingHistory[8] < 50
        ) {
          this.pie2Data[3].value += 1;
        } else {
          this.pie2Data[4].value += 1;
        }
      });
    },
    createPie1() {
      let chartDom = document.getElementById("pie1");
      let myChart = echarts.init(chartDom);
      let option;

      this.calculateRatingDistribution();

      const colors = ["#4884C0", "#7BAED3", "#ADD8E6", "#00008B", "#165AAC"];

      option = {
        backgroundColor: "#f1f3f4",
        title: {
          text: "Rating Distribution",
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Rating Distribution",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.pie1Data.sort((a, b) => a.value - b.value),
            roseType: "radius",
            label: {
              color: "rgba(35, 72, 132, 0.8)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(0, 0, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: (params) => {
                return colors[params.dataIndex % colors.length];
              },
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: (idx) => Math.random() * 200,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    createPie2() {
      let chartDom = document.getElementById("pie2");
      let myChart = echarts.init(chartDom);
      let option;

      this.calculateRatingProgress();

      // 生成颜色渐变
      const colors = ["#ADD8E6", "#7BAED3", "#4884C0", "#165AAC", "#00008B"];

      option = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "Rating Progress",
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
          },
        },
        legend: {
          top: "10%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.pie2Data.map((item, index) => ({
              ...item,
              itemStyle: {
                color: colors[index % colors.length],
              },
            })),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    createColumn1(){
      let chartDom = document.getElementById('column1');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: "Problems Solved",
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
          },
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ]
      };

    option && myChart.setOption(option);
    },
    createColumn2(){
      let chartDom = document.getElementById('column2');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: 'Popular Language',
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top:42,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['c#', 'python', 'JavaScript', 'Java', 'C++']
        },
        series: [
          {
            name: 'Codeforces',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744]
          },
          {
            name: 'World',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141]
          }
        ]
      };

      option && myChart.setOption(option);

    }


    
  },

  mounted() {
    this.createPie1();
    this.createPie2();
    this.createColumn1();
    this.createColumn2();

  },
};
</script>  



<style>
.container {
  height: 2150px;
  background: rgb(214, 213, 213);
}

.block1 {
  display: flex;
  width: 1420px;
  height: 580px;
  margin: 20px;
  background-color: rgb(238, 238, 238);
  box-shadow: 0px -1px 5px rgb(156, 156, 159);

}

#pie1 {
  width: 700px;
  height: 580px;
}

#pie2 {
  margin-left: 100px;
  width: 500px;
  height: 580px;
}

.block2 {
  display: flex;
  width: 1420px;
  height: 580px;
  margin: 20px;
  background-color: #eeeeee;
  box-shadow: 0px 1px 5px rgb(156, 156, 159);

}

#column1{
  margin-left: 380px;
  width: 700px;
  height: 580px;
}

.block3 {
  display: flex;
  width: 1420px;
  height: 580px;
  margin: 20px;
  background-color: #eeeeee;
  box-shadow: 0px 1px 5px rgb(156, 156, 159);
}

#column2{
  margin-left: 380px;
  width: 700px;
  height: 580px;
}


</style>