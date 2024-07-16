<template>
    <div class="recent-surveys">
      <el-table :data="surveys" style="width: 100%">
        <el-table-column prop="contestId" label="Contest ID" width="120"></el-table-column>
        <el-table-column prop="contestName" label="Contest Name" width="300">
          <template #default="scope">
            <el-button link type="primary" @click="$emit('view-survey', scope.row)">
              {{ scope.row.contestName }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecentSurveys',
    props: {
      surveys: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style>
  .el-table-column{

  }


  </style>