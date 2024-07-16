<template>
    <div class="survey-result">
      <h4>{{ survey.contestName }}</h4>
      <div v-for="(question, index) in questions" :key="index">
        <p><strong>{{ question.text }}</strong></p>
        <p>Answer: {{ survey.answers[index] }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SurveyResult',
    props: {
      survey: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        questions: [
          { text: 'How would you rate the difficulty of this contest?' },
          { text: 'How satisfied are you with the problem set?' },
          { text: 'How clear were the problem statements?' },
          { text: 'How fair do you think the contest was?' },
          { text: 'Would you recommend this contest to others?' },
        ],
      };
    },
  }
  </script>