<script setup lang="ts">
// import { ref } from 'vue'
import { onMounted, ref } from 'vue';
import TimeLine from './TimeLine.vue';
import { CellDto, RowDto } from './gantt.model';
import tempdata from './temData.json'
import { columData, rowData } from './gantt';
defineProps<{ msg: string }>()

// const rowsData = ref<RowDto[]>([])
const createCells = (rows: RowDto[]) => {
  const rowcell: CellDto[] = []
  columData.value.forEach(col => {
    if (col.cells) {
      const col1 = col.cells.map(x => x)
      rowcell.push(...col1)
    }
  })
  rows.forEach(row => {
    row.cells = rowcell.map(x => { return { rowCode: row.code, ...x } })
  })
}
onMounted(() => {
  console.log('stations', tempdata.stations)
  const station: RowDto[] = []
  tempdata.stations.forEach(x => {
    station.push({ code: x.code, name: x.name })
  })
  createCells(station)
  rowData.value = station
  // rows.value = sations

})
// const count = ref(0)
</script>

<template>
  <div style="height: 100%;width: 100%;">
    <div class="gantt" style="height: 100%;width: 100%;">
      <div class="gantt-row  gantt-row-head ">
        <div class="first-cell title-cell first-row"> {{ '机台' }}</div>
        <div class="first-row">
          <TimeLine></TimeLine>
        </div>
      </div>
      <div class="gantt-row gantt-row-body" v-for="(row, index) in rowData" :key="index">
        <div class="first-cell">{{ row.name }}</div>
        <div class="gantt-cell" v-for="(cell, index2) in row.cells" :key="index2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.first-cell {
  background-color: white;
  width: 160px;
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;
  border-bottom: 1px solid #D5D9DC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

.gantt-row-head  {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.gantt {
  position: relative;
}
.gantt-row {
  display: flex;
}
.gantt-row-body {
  height: 60px;
}

.gantt-cell {
  width: 80px;
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;
  border-bottom: 1px solid #D5D9DC;
  box-sizing: border-box;

}
</style>
