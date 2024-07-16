<!-- name:'CalendarView', -->
<template>
    <div class="container">
      <div class="page">
        <el-calendar class="custom-calendar" style="width: 85%; ">
          <template #date-cell="{ data }" >
            <div>
              <p >
                {{ data.day.split('-').slice(1).join('-') }}
              </p>
              <div v-if="hasContest(data.day)" >
                <ul>
                  <li v-for="con in getContest(data.day)" :key="con.event">
                    {{ con.event }}
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
</template>


<script>
import axios from 'axios';


export default {
    name:'CalendarView',
    data(){
      return{
        contestData:[
          // {date:'2024-07-01',event:'Codeforces Round #700'},
          
        ]
      }
    },


    methods:{
      fomatDate(date){
        return date.split('-').slice(1).join('-');
      },
      hasContest(date){
        return this.contestData.some(con => con.date === date);
      },
      getContest(date){
        return this.contestData.filter(con => con.date === date);
      },
      getInfo() {
      const sheet = axios({
        method: "get",
        url: "/stu/acmer/cfcontest/all/1/10",
      }).then((res) => {
        this.contestData = res.data.data.records;
        this.contestData.forEach(con =>{
          con.date = con.cfContestStarttimeseconds.slice(0,10);
          con.event = con.cfContestName;
        });
      });
    },
    },
    

    mounted(){
      this.getInfo();
    }
    
}
</script>



<style>
  .page{
  }

  .el-calendar{
    border: 2px solid rgb(52, 51, 51);
    box-shadow: 0px 1px 8px rgba(72, 67, 67, 1);
    border-radius: 0.3%;
  }

  .custom-calendar .el-calendar-table td{
    height:150px;
    transition: none; /* 禁用默认过渡效果 */
  }

  .custom-calendar .el-calendar-table td:hover {
    background-color: transparent; /* 清除背景色 */
  }
  
  .custom-calendar .el-calendar-table td > div {
    background-color: transparent; /* 清除内部元素背景色 */
  }

  .is-selected {
    color: 202, 206, 225;
  }

  li{
    color:rgb(37, 7, 147);
  }


</style>
  