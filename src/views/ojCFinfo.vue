<!-- src/views/About.vue -->
<template>
  <div class="container">
    <h3>CFproblems</h3>
    <el-table :data="pagedProblemInfo" style="width: 65%">
      <el-table-column prop="cid" label="cid" width="150"></el-table-column>
      <el-table-column
        prop="contestName"
        label="ContestName"
        width="150"
      ></el-table-column>
      <el-table-column prop="index" label="Index" width="100"></el-table-column>
      <el-table-column prop="name" label="Name" width="150"></el-table-column>
      <el-table-column prop="tags" label="Tags" width="150"> </el-table-column>
      <el-table-column
        prop="diffculty"
        label="Diffculty"
        width="150"
      ></el-table-column>
      <el-table-column prop="view" label="View" width="150"></el-table-column>
      <el-table-column
        prop="submit"
        label="Submit"
        width="150"
      ></el-table-column>
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
</template>
  
  <script>
import { ElTable,ElTableColumn,ElInput, ElPagination } from "element-plus";

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
        {
          cid: "00001",
          contestName: "CodeCraft-22",
          index: "A",
          name: "Beat the odds",
          tags: "greedy",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00002",
          contestName: "CodeCraft-22",
          index: "B",
          name: "Shoe Shuffing",
          tags: "implementation",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00003",
          contestName: "CodeCraft-22",
          index: "C",
          name: "Sum of substring",
          tags: "consructive",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00004",
          contestName: "CodeCraft-22",
          index: "D",
          name: "Max GEQ Sum",
          tags: "binary search",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00005",
          contestName: "CodeCraft-22",
          index: "E",
          name: "Number of Groups",
          tags: "bubble sort",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00006",
          contestName: "CodeCraft-23",
          index: "A",
          name: "Not Like Us",
          tags: "greedy",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00007",
          contestName: "CodeCraft-23",
          index: "B",
          name: "Crodie",
          tags: "graphs",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00008",
          contestName: "CodeCraft-23",
          index: "C",
          name: "Tooth Fairy",
          tags: "trees",
          diffculty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00009",
          contestName: "CodeCraft-23",
          index: "D",
          name: "Dragon Slayer",
          tags: "graphs",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00010",
          contestName: "CodeCraft-23",
          index: "E",
          name: "Treasure Hunter",
          tags: "dynamic programming",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00011",
          contestName: "CodeCraft-23",
          index: "F",
          name: "Maze Runner",
          tags: "graphs",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00012",
          contestName: "CodeCraft-23",
          index: "G",
          name: "Puzzle Master",
          tags: "backtracking",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00013",
          contestName: "CodeCraft-23",
          index: "H",
          name: "Space Explorer",
          tags: "geometry",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00014",
          contestName: "CodeCraft-23",
          index: "I",
          name: "Number Cruncher",
          tags: "math",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00015",
          contestName: "CodeCraft-23",
          index: "J",
          name: "Algorithm Alchemist",
          tags: "greedy",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00016",
          contestName: "CodeCraft-23",
          index: "K",
          name: "Bitwise Wizard",
          tags: "bit manipulation",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00017",
          contestName: "CodeCraft-23",
          index: "L",
          name: "Pathfinder",
          tags: "shortest paths",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00018",
          contestName: "CodeCraft-23",
          index: "M",
          name: "Data Diver",
          tags: "data structures",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00019",
          contestName: "CodeCraft-23",
          index: "N",
          name: "Sequence Solver",
          tags: "strings",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
        {
          cid: "00020",
          contestName: "CodeCraft-23",
          index: "O",
          name: "Prime Detective",
          tags: "number theory",
          difficulty: -1,
          view: "view",
          submit: "submit",
        },
      ],

      searchQuery: "",
      filterdProblemInfo: [],
      pageSize: 5,
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
  },

  mounted() {
    this.filterdProblemInfo = this.problemInfo;
  },
};
</script>
  
<style lang="css" scoped>
.container {
  width: 100vw;
  height: 95vh;
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
}

.block{
  margin: 10px;
}


</style>