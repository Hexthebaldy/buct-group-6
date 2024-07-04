<!-- name:'CalendarView', -->
<template>
    <el-calendar style="width: 80%; height: 600px;">
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
        </p>
      </template>
    </el-calendar>
</template>


<script>
export default {
    name:'CalendarView',
    
}
</script>



<style>
  .is-selected {
    color: 202, 206, 225;
  }


</style>
  