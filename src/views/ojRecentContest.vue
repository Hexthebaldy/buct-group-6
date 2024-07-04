<!-- src/views/About.vue -->
<template>
  <div class="container">
    <h3>RecentContest</h3>
    <el-table
      :data="pagedContests"
      style="width: 55%"
    >
      <el-table-column
        prop="#"
        label="#"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="date"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="name"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="stu"
        label="stu"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="source"
        label="source"
        width="150"
      ></el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="total,prev,pager,next"
        :total="filterdContests.length"
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
import { ElTable,ElTableColumn,ElInput, ElPagination } from "element-plus";


export default {
  name: "ojRecentContest",
  components:[
    ElTable,
    ElTableColumn,
    ElInput, 
    ElPagination
  ],
  data() {
    return {
      contests: [
        {
          "#": 1,
          date: "2023-01-15",
          name: "Winter Coding Challenge",
          stu: 500,
          source: "CodeForces",
        },
        {
          "#": 2,
          date: "2023-02-10",
          name: "Spring Hackathon",
          stu: 750,
          source: "LeetCode",
        },
        {
          "#": 3,
          date: "2023-03-05",
          name: "Algorithm Quest",
          stu: 600,
          source: "HackerRank",
        },
        {
          "#": 4,
          date: "2023-04-20",
          name: "Data Structures Showdown",
          stu: 850,
          source: "AtCoder",
        },
        {
          "#": 5,
          date: "2023-05-15",
          name: "Code Sprint",
          stu: 400,
          source: "CodeSignal",
        },
        {
          "#": 6,
          date: "2023-06-10",
          name: "Summer Coding Marathon",
          stu: 1000,
          source: "TopCoder",
        },
        {
          "#": 7,
          date: "2023-07-05",
          name: "Hack The Code",
          stu: 550,
          source: "Kaggle",
        },
        {
          "#": 8,
          date: "2023-08-25",
          name: "Back-to-School Blitz",
          stu: 700,
          source: "HackerEarth",
        },
        {
          "#": 9,
          date: "2023-09-10",
          name: "Autumn Algorithm Adventure",
          stu: 650,
          source: "CodeChef",
        },
        {
          "#": 10,
          date: "2023-10-05",
          name: "October Coding Fest",
          stu: 800,
          source: "Google Code Jam",
        },
        {
          "#": 11,
          date: "2023-11-20",
          name: "Pre-Winter Coding Spree",
          stu: 450,
          source: "Facebook Hacker Cup",
        },
        {
          "#": 12,
          date: "2023-12-15",
          name: "End-of-Year Codeathon",
          stu: 950,
          source: "Kick Start",
        },
        {
          "#": 13,
          date: "2024-01-10",
          name: "New Year Code Bash",
          stu: 500,
          source: "Microsoft Imagine Cup",
        },
        {
          "#": 14,
          date: "2024-02-05",
          name: "Valentine's Day Hack",
          stu: 600,
          source: "TechGig",
        },
        {
          "#": 15,
          date: "2024-03-01",
          name: "March Madness Coding",
          stu: 700,
          source: "Hash Code",
        },
        {
          "#": 16,
          date: "2024-04-10",
          name: "Spring Code Clash",
          stu: 750,
          source: "Google Foobar",
        },
        {
          "#": 17,
          date: "2024-05-15",
          name: "May Code Mayhem",
          stu: 800,
          source: "Kick Start",
        },
        {
          "#": 18,
          date: "2024-06-20",
          name: "Summer Code Slam",
          stu: 900,
          source: "CodeForces",
        },
        {
          "#": 19,
          date: "2024-07-25",
          name: "July Jolt Coding",
          stu: 850,
          source: "LeetCode",
        },
        {
          "#": 20,
          date: "2024-08-30",
          name: "August Algorithm Assault",
          stu: 950,
          source: "HackerRank",
        },
      ],
      
      searchQuery: "",
      filterdContests: [],
      pageSize: 10,
      currentPage: 1,

    };
  },


  computed: {
    pagedContests() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdContests.slice(start, end);
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
        this.filterdContests = this.contests.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdContests = this.contests;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },


  mounted() {
    this.filterdContests = this.contests;
  },



};
</script>

  <style lang="css" scoped>
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

.searchBar {
  margin-top: 10px;
  width: 20%;
  padding-bottom:250px ;
}

.block{
  margin-top: 10px;
}

</style>
  