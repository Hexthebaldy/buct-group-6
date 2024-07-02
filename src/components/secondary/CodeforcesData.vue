<template>
    <div>
      <h2>Codeforces Competitions for Student {{ studentId }}</h2>
      <table v-if="competitions.length">
        <thead>
          <tr>
            <th>stu_no</th>
            <th>stu_name</th>
            <th>stu_class</th>
            <th>stu_ac_id</th>
            <th>stu_cf_id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="competition in competitions" :key="competition.stu_no">
            <td>{{ competition.stu_no }}</td>
            <td>{{ competition.stu_name }}</td>
            <td>{{ competition.stu_class }}</td>
            <td>{{ competition.stu_ac_id }}</td>
            <td>{{ competition.stu_cf_id }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No competitions found.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['studentId'],
    data() {
      return {
        competitions: [
          {
            stu_no: '00001',
            stu_name: 'Jaden',
            stu_class: 'CS',
            stu_ac_id: '00001',
            stu_cf_id: '00001',
          },
          {
            stu_no: '00002',
            stu_name: 'Tommy',
            stu_class: 'CS',
            stu_ac_id: '00002',
            stu_cf_id: '00002',
          },{
            stu_no: '00003',
            stu_name: 'Adam',
            stu_class: 'CS',
            stu_ac_id: '00003',
            stu_cf_id: '00003',
          },{
            stu_no: '00004',
            stu_name: 'Steph',
            stu_class: 'CS',
            stu_ac_id: '00004',
            stu_cf_id: '00004',
          },{
            stu_no: '00005',
            stu_name: 'Wennie',
            stu_class: 'CS',
            stu_ac_id: '00005',
            stu_cf_id: '00005',
          },{
            stu_no: '00006',
            stu_name: 'Elon',
            stu_class: 'EE',
            stu_ac_id: '00006',
            stu_cf_id: '00006',
          },{
            stu_no: '00007',
            stu_name: 'Kendrick',
            stu_class: 'EE',
            stu_ac_id: '00007',
            stu_cf_id: '00007',
          },{
            stu_no: '00008',
            stu_name: 'Yukio',
            stu_class: 'EE',
            stu_ac_id: '00008',
            stu_cf_id: '00008',
          },{
            stu_no: '00009',
            stu_name: 'Kris Wu',
            stu_class: 'AI',
            stu_ac_id: '00009',
            stu_cf_id: '00009',
          },{
            stu_no: '00010',
            stu_name: 'Xukun Cai',
            stu_class: 'AI',
            stu_ac_id: '000010',
            stu_cf_id: '000010',
          },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 85%;
    border-collapse: collapse;
  }
  th, td {
    text-align: center;
    border: 1px solid #ddd;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  