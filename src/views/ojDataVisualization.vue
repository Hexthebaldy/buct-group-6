  <template>
  <div class="container">
    <div class="block1">
      <div id="pie1">pie1</div>
      <div id="pie2">pie2</div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "ojDataVisualization",
  data() {
    return {
      tabPosition: "left",
    };
  },

  methods: {
    createPie1() {
      let chartDom = document.getElementById("pie1");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        backgroundColor: "#f1f3f4",
        title: {
          text: "Rating Distribution",
          left: "center",
          top: 20,
          textStyle: {
            color: "#aaa",
          },
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 274, name: "Union Ads" },
              { value: 235, name: "Video Ads" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(35, 72, 132, 0.8)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#152c50",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },

    createPie2() {
      var chartDom = document.getElementById("pie2");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
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
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },

  mounted() {
    this.createPie1();
    this.createPie2();
  },
};
</script>  



<style>
.container {
  background: rgb(241, 243, 244);
}

.block1 {
  display: flex;
  width: 1420px;
  height: 580px;
  margin: 20px;
  border: 1px solid black;
}

#pie1 {
  width: 700px;
  height: 580px;

}

#pie2 {
  margin: 50px;
  width: 500px;
  height: 480px;

}
</style>