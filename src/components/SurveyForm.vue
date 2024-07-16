<template>
    <div class="survey-form">
      <h4>{{ contest.cfContestName }}</h4>
      <div v-for="(question, index) in questions" :key="index">
        <p>{{ question.text }}</p>
        <el-radio-group v-model="answers[index]">
          <el-radio v-for="option in question.options" :key="option" :label="option">{{ option }}</el-radio>
        </el-radio-group>
      </div>
      <el-button @click="submitSurvey" type="primary" style="margin-top: 20px;">Submit</el-button>
    </div>
  </template>
  
  <script>
  import { ElRadioGroup, ElRadio, ElButton } from 'element-plus';
  
  export default {
    name: 'SurveyForm',
    components: {
      ElRadioGroup,
      ElRadio,
      ElButton,
    },
    props: {
      contest: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        questions: [
          { text: 'How would you rate the difficulty of this contest?', options: ['Easy', 'Medium', 'Hard', 'Very Hard'] },
          { text: 'How satisfied are you with the problem set?', options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'] },
          { text: 'How clear were the problem statements?', options: ['Very Unclear', 'Unclear', 'Neutral', 'Clear', 'Very Clear'] },
          { text: 'How fair do you think the contest was?', options: ['Very Unfair', 'Unfair', 'Neutral', 'Fair', 'Very Fair'] },
          { text: 'Would you recommend this contest to others?', options: ['Definitely Not', 'Probably Not', 'Maybe', 'Probably Yes', 'Definitely Yes'] },
        ],
        answers: new Array(5).fill(''),
      };
    },
    methods: {
      submitSurvey() {
        if (this.answers.every(answer => answer !== '')) {
          this.$emit('submit', this.answers);
        } else {
          alert('Please answer all questions before submitting.');
        }
      },
    },
  };
  </script>