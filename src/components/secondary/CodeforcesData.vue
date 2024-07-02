<template>
    
  <div>
    <h2>Codeforces Competitions Data</h2>
    <div>
      <el-button @click="filterCompetitions('all')">All</el-button>
      <el-button @click="filterCompetitions('active')">Active</el-button>
      <el-button @click="filterCompetitions('retired')">Retired</el-button>
    </div>
    <el-table 
        :data="pagedCompetitions" 
        style="width: 70%; "
    >
      <el-table-column
        prop="stuNO"
        label="ID"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="realName"
        label="Name"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="className"
        label="Major"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="Gender"
        width="100"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="school"
        label="School"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="year"
        label="Year"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="cfRating"
        label="cfRating"
        width="150"
        class="dataTableColumn"
      ></el-table-column>
      <el-table-column
        prop="atRating"
        label="atRating"
        width="150"
        class="dataTableColumn"
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
        <el-input v-model="searchQuery" placeholder="Search by student name"></el-input>
    </div>

  </div>
</template>
  
  <script>
import { ElTable, ElTableColumn, ElButton,ElPagination, ElInput } from "element-plus";

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElInput,
  },
  props: ["studentId"],
  data() {
    return {
      competitions: [
        {
          stuNO: "2021040001",
          realName: "Wennie",
          className: "CS",
          gender: "female",
          school: "BUCT",
          year: "2021",
          cfRating: "1500",
          atRating: "1306",
          isRetired: false,
        },
        {
          stuNO: "2021040002",
          realName: "John",
          className: "CS",
          gender: "male",
          school: "BUCT",
          year: "2021",
          cfRating: "1400",
          atRating: "1250",
          isRetired: true,
        },
        {
          stuNO: "2021040003",
          realName: "Alice",
          className: "CS",
          gender: "female",
          school: "NTU",
          year: "2021",
          cfRating: "1550",
          atRating: "1350",
          isRetired: false,
        },
        {
          stuNO: "2021040004",
          realName: "Bob",
          className: "CS",
          gender: "male",
          school: "BUCT",
          year: "2021",
          cfRating: "1600",
          atRating: "1400",
          isRetired: false,
        },
        {
          stuNO: "2021040005",
          realName: "Charlie",
          className: "CS",
          gender: "male",
          school: "BUCT",
          year: "2021",
          cfRating: "1450",
          atRating: "1280",
          isRetired: true,
        },
        {
          stuNO: "2021040006",
          realName: "David",
          className: "CS",
          gender: "male",
          school: "NTU",
          year: "2021",
          cfRating: "1380",
          atRating: "1200",
          isRetired: false,
        },
        {
          stuNO: "2021040007",
          realName: "Eve",
          className: "CS",
          gender: "female",
          school: "BUCT",
          year: "2021",
          cfRating: "1500",
          atRating: "1300",
          isRetired: false,
        },
        {
          stuNO: "2021040008",
          realName: "Frank",
          className: "EE",
          gender: "male",
          school: "BUCT",
          year: "2021",
          cfRating: "1470",
          atRating: "1260",
          isRetired: true,
        },
        {
          stuNO: "2021040009",
          realName: "Grace",
          className: "EE",
          gender: "female",
          school: "BUCT",
          year: "2021",
          cfRating: "1420",
          atRating: "1230",
          isRetired: false,
        },
        {
          stuNO: "2021040010",
          realName: "Hank",
          className: "EE",
          gender: "male",
          school: "BUCT",
          year: "2021",
          cfRating: "1500",
          atRating: "1306",
          isRetired: true,
        },{
    stuNO: "2021040010",
    realName: "Hank",
    className: "EE",
    gender: "male",
    school: "BUCT",
    year: "2021",
    cfRating: "1500",
    atRating: "1306",
    isRetired: true,
  },
  {
    stuNO: "2021040011",
    realName: "Alice",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: false,
  },
  {
    stuNO: "2021040012",
    realName: "Bob",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040013",
    realName: "Charlie",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: true,
  },
  {
    stuNO: "2021040014",
    realName: "David",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040015",
    realName: "Eve",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: false,
  },
  {
    stuNO: "2021040016",
    realName: "Frank",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: true,
  },
  {
    stuNO: "2021040017",
    realName: "Grace",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040018",
    realName: "Hank",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040019",
    realName: "Ivy",
    className: "EE",
    gender: "female",
    school: "UCLA",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: true,
  },
  {
    stuNO: "2021040020",
    realName: "John",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040021",
    realName: "Karen",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040022",
    realName: "Larry",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: true,
  },
  {
    stuNO: "2021040023",
    realName: "Mallory",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: false,
  },
  {
    stuNO: "2021040024",
    realName: "Nina",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: true,
  },
  {
    stuNO: "2021040025",
    realName: "Oscar",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040026",
    realName: "Peggy",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040027",
    realName: "Quinn",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: true,
  },
  {
    stuNO: "2021040028",
    realName: "Rob",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040029",
    realName: "Steve",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: true,
  },
  {
    stuNO: "2021040030",
    realName: "Trudy",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040031",
    realName: "Uma",
    className: "EE",
    gender: "female",
    school: "UCLA",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: true,
  },
  {
    stuNO: "2021040032",
    realName: "Victor",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040033",
    realName: "Wendy",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040034",
    realName: "Xander",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: true,
  },
  {
    stuNO: "2021040035",
    realName: "Yara",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: false,
  },
  {
    stuNO: "2021040036",
    realName: "Zane",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: true,
  },
  {
    stuNO: "2021040037",
    realName: "Andy",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040038",
    realName: "Betty",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040039",
    realName: "Carl",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: true,
  },
  {
    stuNO: "2021040040",
    realName: "Diana",
    className: "EE",
    gender: "female",
    school: "UCLA",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040041",
    realName: "Ethan",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: true,
  },
  {
    stuNO: "2021040042",
    realName: "Fiona",
    className: "AI",
    gender: "female",
    school: "MIT",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
  {
    stuNO: "2021040043",
    realName: "George",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: true,
  },
  {
    stuNO: "2021040044",
    realName: "Helen",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: false,
  },
  {
    stuNO: "2021040045",
    realName: "Isaac",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040046",
    realName: "Jack",
    className: "EE",
    gender: "male",
    school: "UCLA",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: true,
  },
  {
    stuNO: "2021040047",
    realName: "Kate",
    className: "CS",
    gender: "female",
    school: "NTU",
    year: "2020",
    cfRating: "1600",
    atRating: "1400",
    isRetired: false,
  },
  {
    stuNO: "2021040048",
    realName: "Leo",
    className: "AI",
    gender: "male",
    school: "MIT",
    year: "2022",
    cfRating: "1700",
    atRating: "1500",
    isRetired: true,
  },
  {
    stuNO: "2021040049",
    realName: "Mia",
    className: "EE",
    gender: "female",
    school: "UCLA",
    year: "2023",
    cfRating: "1400",
    atRating: "1200",
    isRetired: false,
  },
  {
    stuNO: "2021040050",
    realName: "Nick",
    className: "CS",
    gender: "male",
    school: "NTU",
    year: "2021",
    cfRating: "1500",
    atRating: "1300",
    isRetired: false,
  },
      ],

      searchQuery: '',
      filteredCompetitions: [],
      currentPage: 1,
      pageSize: 10,
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
    searchQuery() {
      this.applyFilters();
    },
  },
  methods: {
    filterCompetitions(type) {
      if (type === 'all') {
        this.filteredCompetitions = this.competitions;
      } else if (type === 'active') {
        this.filteredCompetitions = this.competitions.filter(c => !c.isRetired);
      } else{
        this.filteredCompetitions = this.competitions.filter(c => c.isRetired);
      }
      this.applyFilters();
      this.currentPage = 1; // 重置到第一页
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    applyFilters() {
      if (this.searchQuery) {
        this.filteredCompetitions = this.filteredCompetitions.filter(c => c.realName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    
  },
  mounted() {
    this.filteredCompetitions = this.competitions; // 默认显示所有数据
  },
};
</script>
  

  <style scoped>

  .el-table {
    max-width: 100%;
    overflow: auto;
    margin-bottom: 10px;
  }
  

.dataTableColumn{
    background-color: #c4c8d7;
}

.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
  }
  .example-pagination-block .example-demonstration {
    margin-bottom: 16px;
  }

.searchBar{
    margin-top:10px;
    width:200px;
}

</style>
  