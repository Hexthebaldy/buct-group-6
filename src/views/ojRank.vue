<!-- src/views/About.vue -->
<!-- <template>
    <div>
      <h1>Rank</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ojRank'
  }
  </script> -->
  <template>
    <div class="container">
      <div class="main-page">
        <h3>Codeforces Top Rated</h3>
        <el-table :data="filterdRankList" style="width: 80%">
          <el-table-column prop="#" label="#" width="100"></el-table-column>
          <el-table-column prop="RealName" label="realName" width="400"></el-table-column>
          <el-table-column prop="Score" label="Score" width="100"></el-table-column>
          <el-table-column prop="Submit" label="Submit" width="100"></el-table-column>
          <el-table-column prop="country" label="Country" width="150"></el-table-column>

          
        </el-table>

        <!-- <div class="block">
          <el-pagination
            layout="total,prev,pager,next"
            :total="filterdRankList.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            background
          ></el-pagination>
        </div> -->
    
        <!-- <div class="searchBar">
          <el-input
            v-model="searchQuery"
            placeholder="Search by contest name"
          ></el-input>
        </div> -->
      </div>

      <div class="side-page">
        <div class="side-page-1">
          <h4>Top rated in China</h4>
          <div class="rank-china">
            <ol>
              <li v-for="rank in rankChina" :key="rank.id">
                {{ rank.id }} - {{ rank.score }}
              </li>
            </ol>
          </div>
        </div>

        <div class="side-page-2">
          <h4>Coming Contest</h4>
          <div class="coming-contest">
            Codeforces Round (Div. 1 + Div. 2)
          </div>
          <div class="contest-date">2024-07-18</div>
          <div class="register"><a href="https://codeforces.com/contests/1994" target="_blank">Register Now -></a></div>
          <div class="instruction-block">
            <ul>
              <li class="instruction">Codeforces 积分主要由比赛成绩决定，影响因素包括比赛排名、比赛难度、对手水平和比赛类型。积分系统类似于 Elo 评分系统，比赛成绩好、击败高分选手会增加积分，反之则减少积分。新用户有新手保护机制，前几场比赛积分变化较小。</li>
            </ul>
          </div>
        </div>

        <!-- <div class="side-page-3">
          <h4>Coming Contest</h4>
          <div class="coming-contest">
            Codeforces Round (Div. 1 + Div. 2)
          </div>
          <div class="contest-date">2024-07-18</div>
        </div> -->

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
        rankList: [
          { "#": 1, RealName: "tourist",  Score: 3803,Submit:266, country:"Belarus" },
          { "#": 2, RealName: "jiangly",  Score: 3707,Submit:159, country:"China" },
          { "#": 3, RealName: "Benq",  Score: 3627,Submit:149, country:"US" },
          { "#": 4, RealName: "ecnerwata",  Score: 3584,Submit:184, country:"US" },
          { "#": 5, RealName: "orzdevinwang",  Score: 3573,Submit:64, country:"China" },
          { "#": 6, RealName: "Geothermal",  Score: 3569,Submit:85, country:"US" },
          { "#": 6, RealName: "cnnfls_csy",  Score: 3569,Submit:57, country:"China" },
          { "#": 8, RealName: "Radewoosh",  Score: 3542,Submit:241, country:"Poland" },
          { "#": 9, RealName: "jqdai0815",  Score: 3532,Submit:129, country:"Samoa" },
          { "#": 10, RealName: "gyh20",  Score: 3447,Submit:75, country:"China" },
          { "#": 11, RealName: "gamegame",  Score: 3437,Submit:92, country:"Hongkong" },
          { "#": 12, RealName: "ksun48",  Score: 3413,Submit:273, country:"Canada" },
          { "#": 13, RealName: "Rebelz",  Score: 3409,Submit:74, country:"China" },
          { "#": 14, RealName: "maroonrk",  Score: 3397,Submit:176, country:"Japan" },
          { "#": 15, RealName: "Um_nik",  Score:3320,Submit:289, country:"UK" },
          { "#": 16, RealName: "Peter",  Score: 3285,Submit:216, country:"Switzerland" },
          { "#": 17, RealName: "ugly2333",  Score: 3270,Submit:134, country:"China" },
          { "#": 18, RealName: "conqueror_of_tourist",  Score: 3260,Submit:81, country:"US" },
          { "#": 19, RealName: "LJC00118",  Score: 3250,Submit:94, country:"China" },
          { "#": 20, RealName: "turmax",  Score: 3210,Submit:91, country:"Russia" },

        ],
        rankChina:[
          {
            "#":1, id:'jiangly', score:3707
          },
          {
            "#":2, id:'orzdevinwang', score:3573
          },
          {
            "#":3, id:'cnnfls_csy', score:3569
          },
          {
            "#":4, id:'gyh20', score:3447
          },
          {
            "#":5, id:'Rebelz', score:3409
          },
          {
            "#":6, id:'ugly2333', score:3270
          },
          {
            "#":7, id:'LJC00118', score:3250
          },
          {
            "#":8, id:'Rewinding', score:3197
          },
          {
            "#":9, id:'crazy_sea', score:3146
          },
          {
            "#":10, id:'PubabaOnO', score:3127
          },
        ],

        searchQuery: "",
        filterdRankList: [],
        pageSize: 10,
        currentPage: 1,
      };
    },


    computed: {
    pagedRankList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdRankList.slice(start, end);
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
        this.filterdRankList = this.rankList.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdRankList = this.rankList;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },



    },


    mounted() {
    this.filterdRankList = this.rankList;
  },


  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    width: 100vw;
    height: 100%;
    background: rgb(241, 243, 244);

  }
  
  .main-page{
    margin-top: 20px;
    border:2px solid rgb(96, 94, 94);
    width:60%;
    height:980px;
    box-shadow: 0px -1px 8px rgba(72, 67, 67, 1);
    border-radius: 0.3%;
  }

  h3{
    margin-left: 400px;
    color:#4d4e4f;
  
  }

  .el-table{
    max-width: 100%;
    overflow: auto;
    margin-bottom: 10px;
    border:2px solid rgb(29, 34, 67);
    margin-left: 105px;
    box-shadow: 0px 1px 5px rgba(72, 67, 67, 1);
    
  }

  .el-button {
    margin-right: 10px;
  }

  .searchBar {
    margin-top: 10px;
    width: 20%;
    padding-bottom:220px ;
  }
  
  .block{
    margin-top: 10px;
  }

  .side-page{
    margin: 20px;
    width:20%;
    height:880px;
  }

  .side-page-1{
    margin: 0px;
    border:2px solid rgb(96, 94, 94);
    width:100%;
    height:480px;
    border-radius: 0.3%;
    background-color: #eaeaea;
  }

  h4{
    margin-left: 100px;
    color:#232222;
    font-weight: 400;
  }

  .rank-china{
    height: 400px;
    border-top:3px dashed rgb(255, 255, 255) ;
  }

  .rank-china ol li{
    color:#434343;
    margin:17px;
    margin-left: 50px;
  }

  .side-page-2{
    margin-top: 20px;
    border:2px solid rgb(96, 94, 94);
    width:100%;
    height:350px;
    box-shadow: 1px 0px 8px rgb(224, 224, 224);
    border-radius: 0.3%;
    background-color: #eaeaea;


  }

  .coming-contest{
    text-align: center;
    font-size: larger;
    color:#434343;
    margin-bottom: 10px;
  }

  .contest-date{
    text-align: center;
  }

  .register{
    margin-top: 20px;
    text-align: center;
  }

  .register a {
    color: #636668;
    text-decoration: none;
  }

  .register a:hover {
    text-decoration: underline;
  }

  .instruction-block{
    margin-right: 15px;
  }

  .instruction{
    color:#484747;
  }

  .side-page-3{
    margin-top: 20px;
    width:100%;
    height:150px;
    border:0.5px solid rgb(96, 94, 94);
    box-shadow: 1px 0px 3px rgba(72, 67, 67, 1);
    border-radius: 0.3%;
    background-color: #d5d7d8;

  }

  </style>
  