<template>
  <div class="container">
    <div class="page">
      <h3>ContestFeedback</h3>
      <div class="table">
        <el-table :data="pagedSurveys" style="width: 90%">
          <el-table-column
            prop="cfContestId"
            label="cfContestId"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="cfContestName"
            label="cfContestName"
            width="330"
          ></el-table-column>
          <el-table-column
            prop="cfContestFrozen"
            label="cfContestFrozen"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="cfContestParticipantsnumber"
            label="Participants"
            width="150"
          ></el-table-column>
          <el-table-column label="Survey" width="150">
            <template #default="scope">
              <el-button @click="openSurvey(scope.row)">Fill Survey</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
        <el-input
          v-model="searchQuery"
          placeholder="Search by contest name"
        ></el-input>
      </div>

      <!-- <el-dialog v-model="surveyDialogVisible" title="Contest Survey" width="50%">
        <survey-form :contest="selectedContest" @submit="submitSurvey"></survey-form>
      </el-dialog> -->
    </div>

    <div class="recent-surveys-section">
      <h3 class="recent-survey">Recent Surveys</h3>
      <recent-surveys
        :surveys="recentSurveys"
        @view-survey="viewSurvey"
      ></recent-surveys>
    </div>

    <el-dialog v-model="surveyDialogVisible" :title="dialogTitle" width="50%">
      <survey-form
        v-if="!viewingExistingSurvey"
        :contest="selectedContest"
        @submit="submitSurvey"
      ></survey-form>
      <survey-result v-else :survey="selectedSurvey"></survey-result>
    </el-dialog>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElButton, ElPagination, ElInput } from "element-plus";
import axios from "axios";
import SurveyForm from '../components/SurveyForm.vue';
import RecentSurveys from "@/components/RecentSurveys.vue";
import SurveyResult from "@/components/secondary/SurveyResult.vue";

export default {
  name: "ojContestFeedback",
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElPagination,
    ElInput,
    SurveyForm,
    RecentSurveys,
    SurveyResult,
  },
  data() {
    return {
      surveys: [],
      searchQuery: "",
      filterdSurveys: [],
      pageSize: 10,
      currentPage: 1,
      surveyDialogVisible: false,
      selectedContest: null,
      surveyAnswers: [
        {contestId: 1010, contestName: "Codeforces Round #704", answers: ["Easy", "Neutral", "Clear", "Fair", "Maybe"] }, 
        {contestId: "1573",contestName: "Codeforces Round 742 (Div. 2)",answers: [4, 5, 4, 5, "Yes"]},
        {contestId: "1574",contestName: "Codeforces Round 743 (Div. 1)",answers: [5, 4, 5, 4, "Yes"]},
        {contestId: "1575",contestName: "Codeforces Round 744 (Div. 3)",answers: [3, 4, 5, 4, "Maybe"] },
        {contestId: "1576",contestName: "Codeforces Round 745 (Div. 2)",answers: [4, 3, 4, 5, "Yes"]},
        {contestId: "1577",  contestName: "Codeforces Round 746 (Div. 2)",  answers: [5, 5, 4, 5, "Yes"]},
        {contestId: "1580",contestName: "Codeforces Round 748 (Div. 3)",answers: [4, 5, 5, 5, "Yes"]},
        { contestId: 1001, contestName: "Codeforces Round #700", answers: ["Medium", "Satisfied", "Clear", "Fair", "Probably Yes"] },
        { contestId: 1002, contestName: "Educational Codeforces Round 100", answers: ["Hard", "Very Satisfied", "Very Clear", "Very Fair", "Definitely Yes"] },
        { contestId: 1003, contestName: "Codeforces Global Round 13", answers: ["Very Hard", "Neutral", "Clear", "Fair", "Maybe"] },
        { contestId: 1004, contestName: "Codeforces Round #701", answers: ["Easy", "Dissatisfied", "Unclear", "Unfair", "Probably Not"] },
        {contestId: "1578",  contestName: "Codeforces Educational Round 114",  answers: [4, 4, 5, 4, "Yes"]},
        {contestId: "1579",contestName: "Codeforces Round 747 (Div. 2)",answers: [3, 4, 4, 4, "Maybe"]},
        { contestId: 1005, contestName: "Educational Codeforces Round 101", answers: ["Medium", "Satisfied", "Clear", "Fair", "Probably Yes"] },
        { contestId: 1006, contestName: "Codeforces Round #702", answers: ["Hard", "Very Satisfied", "Very Clear", "Very Fair", "Definitely Yes"] },
        { contestId: 1007, contestName: "Codeforces Global Round 14", answers: ["Very Hard", "Neutral", "Clear", "Fair", "Maybe"] },
        { contestId: 1008, contestName: "Codeforces Round #703", answers: ["Medium", "Satisfied", "Clear", "Fair", "Probably Yes"] },
        { contestId: 1009, contestName: "Educational Codeforces Round 102", answers: ["Hard", "Very Satisfied", "Very Clear", "Very Fair", "Definitely Yes"] },
        
      ], // 存储所有问卷的答案
      viewingExistingSurvey: false,
      selectedSurvey: null,

    };
  },
  computed: {
    pagedSurveys() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filterdSurveys.slice(start, end);
    },
    recentSurveys() {
      return this.surveyAnswers.slice(-18).reverse();
    },
    dialogTitle() {
      return this.viewingExistingSurvey ? "Survey Result" : "Contest Survey";
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
        url: "/stu/acmer/cfcontest/all/1/30",
      }).then((res) => {
        this.surveys = res.data.data.records;
        this.filterdSurveys = this.surveys;
        this.applyFilters();
      });
    },
    viewSurvey(survey) {
      this.selectedSurvey = survey;
      this.viewingExistingSurvey = true;
      this.surveyDialogVisible = true;
    },
    openSurvey(contest) {
      this.selectedContest = contest;
      this.viewingExistingSurvey = false;
      this.surveyDialogVisible = true;
    },
    submitSurvey(answers) {
      this.surveyAnswers.push({
        contestId: this.selectedContest.cfContestId,
        contestName: this.selectedContest.cfContestName,
        answers: answers
      });
      this.surveyDialogVisible = false;
      console.log('Survey answers:', this.surveyAnswers);
    },
    // openSurvey(contest) {
    //   this.selectedContest = contest;
    //   this.surveyDialogVisible = true;
    // },

    // submitSurvey(answers) {
    //   this.surveyAnswers.push({
    //     contestId: this.selectedContest.cfContestId,
    //     answers: answers
    //   });
    //   this.surveyDialogVisible = false;
    //   console.log('Survey answers:', this.surveyAnswers);
    // },

  },


  mounted() {
    this.getInfo();
  },
};
</script>

  
<style scoped>
.container {
  display: flex;
  margin: 0;
  width: 100vw;
  height: 100%;
  background: rgb(241, 243, 244);
}

.page {
  background-color: #eeeeee;
  margin-top: -20px;
  margin-left: 0px;
  border-left: 2px solid rgb(96, 94, 94);
  border-right: 2px solid rgb(96, 94, 94);
  width: 60%;
  height: 1080px;
  box-shadow: 0px -1px 8px rgba(72, 67, 67, 1);
  border-radius: 0.3%;
}

h3 {
  color: #4d4e4f;
  padding-top: 30px;
  margin-left: 450px;
  width: 200px;
}

.el-button {
  margin-right: 10px;
}

.el-table {
  margin-left: 50px;
  border: 2px solid gray;
}

.searchBar {
  margin-top: 10px;
  width: 20%;
  padding-bottom: 100px;
  margin-left: 50px;
  width: 300px;
}

.block {
  margin-top: 10px;
  margin-left: 50px;
  width: 300px;
}

.recent-surveys-section {
  margin: 20px;
  width: 400px;
  height: 845px;
  border: 3px solid rgb(101, 101, 101);
  box-shadow: 0px -2px 0px rgba(72, 67, 67, 1);
}

.recent-survey {
  margin-left: 130px;
}
</style>
  