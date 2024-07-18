<!-- <template>
  <div class="container">
    <div class="contests-info">
      <h3>RecentContest</h3>
      <el-table
        :data="pagedContests"
        style="width: 95%"
      >
        <el-table-column
          prop="cfContestId"
          label="cfContestId"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestName"
          label="cfContestName"
          width="250">
          <template v-slot="scope">
            <a
              href="javascript:void(0)"
              @click="handleContestClick(scope.row.cfContestName)"
            >
              {{ scope.row.cfContestName }}
            </a>
          </template>
        </el-table-column>

        <el-table-column
          prop="cfContestType"
          label="Type"
          width="80">
        </el-table-column>

        <el-table-column
          prop="cfContestPhase"
          label="cfContestPhase"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestFrozen"
          label="cfContestFrozen"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestStarttimeseconds"
          label="cfContestStarttimeseconds"
          width="250">
        </el-table-column>

        <el-table-column
          prop="cfContestParticipantsnumber"
          label="Participants"
          width="150">
        </el-table-column>
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

    <div class="websites">
      <h4>Contest Websites</h4>
      <ul>
        <li v-for="(site, index) in contestSites" :key="index">
          <a :href="site.url" target="_blank">{{ site.name }}</a>
        </li>
      </ul>
    </div>

    
  </div>

  <div class="students-info" ref="studentsInfo" v-if="selectedContestName">
    <h4>Participants of {{ selectedContestName }}</h4>
    <el-table
      :data="students"
      style="width: 95%"
    >
      <el-table-column
        prop="stuName"
        label="Student Name"
        width="150">
      </el-table-column>
      <el-table-column
        prop="cfUserId"
        label="User ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="cfRank"
        label="Rank"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cfNewRating"
        label="New Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cfOldRating"
        label="Old Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stuClass"
        label="Class"
        width="150">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="total,prev,pager,next"
        :total="studentsTotal"
        :page-size="studentsPageSize"
        :current-page="studentsCurrentPage"
        @current-change="handleStudentsPageChange"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElInput, ElPagination } from "element-plus";
import axios from 'axios';

export default {
  name: "ojRecentContest",
  components: [
    ElTable,
    ElTableColumn,
    ElInput,
    ElPagination
  ],
  data() {
    return {
      contests: [],
      contestSites: [
        { name: 'Codeforces', url: 'https://codeforces.com/' },
        { name: 'LeetCode', url: 'https://leetcode.com/' },
        { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
        { name: 'AtCoder', url: 'https://atcoder.jp/' },
        { name: 'TopCoder', url: 'https://www.topcoder.com/' },
        { name: 'CodeChef', url: 'https://www.codechef.com/' },
        { name: 'Kaggle', url: 'https://www.kaggle.com/' },
        { name: 'CS Academy', url: 'https://csacademy.com/' },
        { name: 'Kick Start', url: 'https://codingcompetitions.withgoogle.com/kickstart' },
        { name: 'Facebook Hacker Cup', url: 'https://www.facebook.com/codingcompetitions/hacker-cup' },
        { name: 'Google Code Jam', url: 'https://codingcompetitions.withgoogle.com/codejam' },
        { name: 'Hackerearth', url: 'https://www.hackerearth.com/' },
        { name: 'Sphere Online Judge', url: 'https://www.spoj.com/' }
      ],
      searchQuery: "",
      filterdContests: [],
      pageSize: 10,
      currentPage: 1,
      selectedContestName: "",
      students: [],
      studentsTotal: 0,
      studentsPageSize: 10,
      studentsCurrentPage: 1
    };
  },
  computed: {
    pagedContests() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdContests.slice(start, end);
    }
  },
  watch: {
    searchQuery: {
      handler() {
        this.applyFilters();
      },
      deep: true
    }
  },
  methods: {
    applyFilters() {
      if (this.searchQuery) {
        this.filterdContests = this.contests.filter((c) =>
          c.cfContestName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdContests = this.contests;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getInfo() {
      axios.get('/stu/acmer/cfcontest/all/1/50').then(res => {
        this.contests = res.data.data.records;
        this.filterdContests = this.contests;
        this.applyFilters();
      });
    },
    handleContestClick(contestName) {
      this.selectedContestName = contestName;
      this.getStudents(contestName, 1, this.studentsPageSize);
    },
    getStudents(contestName, page, pageSize) {
      axios.get(`/stu/acmer/cfrating/patici/${contestName}/${page}/${pageSize}`).then(res => {
        this.students = res.data.data.records;
        this.studentsTotal = res.data.data.total;
        this.studentsCurrentPage = page;
        this.$nextTick(() => {
          this.$refs.studentsInfo.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
    handleStudentsPageChange(page) {
      this.getStudents(this.selectedContestName, page, this.studentsPageSize);
    }
  },
  mounted() {
    this.getInfo();
    this.filterdContests = this.contests;
  }
}
</script> -->

<template>
  <div class="container">
    <div class="contests-info">
      <h3>RecentContest</h3>
      <el-table
        :data="pagedContests"
        style="width: 95%"
      >
        <el-table-column
          prop="cfContestId"
          label="cfContestId"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestName"
          label="cfContestName"
          width="250">
          <template v-slot="scope">
            <a
              href="javascript:void(0)"
              @click="handleContestClick(scope.row.cfContestName)"
            >
              {{ scope.row.cfContestName }}
            </a>
          </template>
        </el-table-column>

        <el-table-column
          prop="cfContestType"
          label="Type"
          width="80">
        </el-table-column>

        <el-table-column
          prop="cfContestPhase"
          label="cfContestPhase"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestFrozen"
          label="cfContestFrozen"
          width="150">
        </el-table-column>

        <el-table-column
          prop="cfContestStarttimeseconds"
          label="cfContestStarttimeseconds"
          width="250">
        </el-table-column>

        <el-table-column
          prop="cfContestParticipantsnumber"
          label="Participants"
          width="150">
        </el-table-column>
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

    <div class="websites">
      <h4>Contest Websites</h4>
      <ul>
        <li v-for="(site, index) in contestSites" :key="index">
          <a :href="site.url" target="_blank">{{ site.name }}</a>
        </li>
      </ul>
    </div>

  </div>

  <div class="students-info" ref="studentsInfo" v-if="selectedContestName">
    <h4>Participants of {{ selectedContestName }}</h4>
    <el-table
      :data="students"
      style="width: 95%"
    >
      <el-table-column
        prop="stuName"
        label="Student Name"
        width="700">
        <template v-slot="scope">
          <a
            href="javascript:void(0)"
            @click="handleStudentClick(scope.row.stuName)"
          >
            {{ scope.row.stuName }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="cfRank"
        label="Rank"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cfNewRating"
        label="New Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cfOldRating"
        label="Old Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stuClass"
        label="Class"
        width="150">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="total,prev,pager,next"
        :total="studentsTotal"
        :page-size="studentsPageSize"
        :current-page="studentsCurrentPage"
        @current-change="handleStudentsPageChange"
        background
      ></el-pagination>
    </div>
  </div>
  <div class="student-contests-info" ref="studentContestsInfo" v-if="selectedStudentName">
    <h4>Contests Participated by {{ selectedStudentName }}</h4>
    <el-table
      :data="studentContests"
      style="width: 95%"
    >
      <el-table-column
        prop="cfContestName"
        label="Contest Name"
        width="800">
      </el-table-column>
      
      <el-table-column
        prop="cfRank"
        label="Rank"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cfNewRating"
        label="New Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cfOldRating"
        label="Old Rating"
        width="100">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="total,prev,pager,next"
        :total="studentContestsTotal"
        :page-size="studentContestsPageSize"
        :current-page="studentContestsCurrentPage"
        @current-change="handleStudentContestsPageChange"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElInput, ElPagination } from "element-plus";
import axios from 'axios';

export default {
  name: "ojRecentContest",
  components: [
    ElTable,
    ElTableColumn,
    ElInput,
    ElPagination
  ],
  data() {
    return {
      contests: [],
      contestSites: [
        { name: 'Codeforces', url: 'https://codeforces.com/' },
        { name: 'LeetCode', url: 'https://leetcode.com/' },
        { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
        { name: 'AtCoder', url: 'https://atcoder.jp/' },
        { name: 'TopCoder', url: 'https://www.topcoder.com/' },
        { name: 'CodeChef', url: 'https://www.codechef.com/' },
        { name: 'Kaggle', url: 'https://www.kaggle.com/' },
        { name: 'CS Academy', url: 'https://csacademy.com/' },
        { name: 'Kick Start', url: 'https://codingcompetitions.withgoogle.com/kickstart' },
        { name: 'Facebook Hacker Cup', url: 'https://www.facebook.com/codingcompetitions/hacker-cup' },
        { name: 'Google Code Jam', url: 'https://codingcompetitions.withgoogle.com/codejam' },
        { name: 'Hackerearth', url: 'https://www.hackerearth.com/' },
        { name: 'Sphere Online Judge', url: 'https://www.spoj.com/' }
      ],
      searchQuery: "",
      filterdContests: [],
      pageSize: 10,
      currentPage: 1,
      selectedContestName: "",
      students: [],
      studentsTotal: 0,
      studentsPageSize: 10,
      studentsCurrentPage: 1,
      selectedStudentName: "",
      studentContests: [],
      studentContestsTotal: 0,
      studentContestsPageSize: 10,
      studentContestsCurrentPage: 1
    };
  },
  computed: {
    pagedContests() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdContests.slice(start, end);
    }
  },
  watch: {
    searchQuery: {
      handler() {
        this.applyFilters();
      },
      deep: true
    }
  },
  methods: {
    applyFilters() {
      if (this.searchQuery) {
        this.filterdContests = this.contests.filter((c) =>
          c.cfContestName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filterdContests = this.contests;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getInfo() {
      axios.get('/stu/acmer/cfcontest/all/1/50').then(res => {
        this.contests = res.data.data.records;
        this.filterdContests = this.contests;
        this.applyFilters();
      });
    },
    handleContestClick(contestName) {
      this.selectedContestName = contestName;
      this.getStudents(contestName, 1, this.studentsPageSize);
    },
    getStudents(contestName, page, pageSize) {
      axios.get(`/stu/acmer/cfrating/patici/${contestName}/${page}/${pageSize}`).then(res => {
        this.students = res.data.data.records;
        this.studentsTotal = res.data.data.total;
        this.studentsCurrentPage = page;
        this.$nextTick(() => {
          this.$refs.studentsInfo.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
    handleStudentsPageChange(page) {
      this.getStudents(this.selectedContestName, page, this.studentsPageSize);
    },
    handleStudentClick(studentName) {
      this.selectedStudentName = studentName;
      this.getStudentContests(studentName, 1, this.studentContestsPageSize);
    },
    getStudentContests(studentName, page, pageSize) {
      axios.get(`/stu/acmer/cfrating/stuContest/${studentName}/${page}/${pageSize}`).then(res => {
        this.studentContests = res.data.data.records;
        this.studentContestsTotal = res.data.data.total;
        this.studentContestsCurrentPage = page;
        this.$nextTick(() => {
          this.$refs.studentContestsInfo.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
    handleStudentContestsPageChange(page) {
      this.getStudentContests(this.selectedStudentName, page, this.studentContestsPageSize);
    }
  },
  mounted() {
    this.getInfo();
    this.filterdContests = this.contests;
  }
}
</script>



  <style lang="css" scoped>
.container {
  width: 100vw;
  height: 100%;
  background: rgb(241, 243, 244);
  display: flex;

}

.contests-info{
  margin-top: 20px;
  margin-left: 0px;
  border:2px solid rgb(96, 94, 94);
  width:75%;
  height:100%;
  box-shadow: 0px -1px 8px rgba(72, 67, 67, 1);
  border-radius: 0.3%;
}

.el-table{
  max-width: 100%;
  overflow: auto;
  margin-bottom: 10px;
  border:2px solid gray;
  margin-left: 30px;
  
}

h3{
  margin-left: 550px;
  color:#4d4e4f;

}

.searchBar {
  margin-top: 10px;
  width: 20%;
  padding-bottom:250px ;
  margin-left: 30px;

}

.block{
  margin-top: 10px;
  margin-left: 30px;

}

.websites{
  width: 500px;
  height: 936px;
  border-left: 2px solid rgb(84, 83, 83);
  margin-left: 20px;
  box-shadow: 0px 1px 8px rgba(72, 67, 67, 1);
  border-radius: 0.3%;
  background-color: #d6d8db;
}

h4{
  margin-top: 35px;
  color:#4d4e4f;
  padding-left: 50px;
  padding-bottom: 25px;
  border-bottom: 1px dashed gray;
}

.websites ul {
  list-style-type: none;
  padding: 0;
}

.websites li {
  margin: 20px 0;
  margin-left: 45px;
}

.websites a {
  color: #434344;
  text-decoration: none;
}

.websites a:hover {
  text-decoration: underline;
}

.students-info{
  width:70%;
}

.student-contests-info{
  width:70%;
}
</style>
  