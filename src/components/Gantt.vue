<script setup lang="ts">
// import { ref } from 'vue'
import { onMounted } from 'vue';
import TimeLine from './TimeLine.vue';
import { CellDto, ColumnDto, RowDto } from './gantt.model';
import tempdata from './temData.json'
import { columData, rowData, columWidthXp, leftColumWidthXp, chWeeks } from './gantt';
import dayjs from 'dayjs';
defineProps<{ msg: string }>()

/**
 * 导入模版日历数据，并生成列数据
 */
const createColDtoForTemp = () => {
  console.log('calendar', tempdata.calendar)
  const _colums: ColumnDto[] = []
  tempdata.calendar.forEach(x => {
    const daytime = dayjs(x.date)
    const col: ColumnDto = {
      isDayOff:x.isDayOff,
      title: x.date,
      time: daytime,
      subTitle: chWeeks[daytime.day()],
      startValue: daytime.valueOf() / 1000,
      duration: 86400,
    }
    const cells: CellDto[] = []
    for (let i = 0; i < 24; i++) {
      const celltime = daytime.add(i, 'hour')
      cells.push({
        title: celltime.format("HH:mm"),
        time: celltime,
        subTitle: '',
        startValue: celltime.valueOf() / 1000,
        duration: 3600,
      })
    }
    col.cells = cells
    _colums.push(col)

  })
  columData.value = _colums
}
/**
 * 导入模版工位数据，并生成行数据
 */
const createRowDtoForTemp = () => {
  const rows: RowDto[] = []
  tempdata.stations.forEach(x => {
    rows.push({ code: x.code, name: x.name })
  })
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
  rowData.value = rows
}

onMounted(() => {
  createColDtoForTemp();
  createRowDtoForTemp();

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
        <div class="gantt-cell" v-for="(cell, index2) in row.cells" :key="index2" :id="cell.rowCode + cell.startValue">
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.gantt {
  position: relative;
}

.gantt div {
  box-sizing: border-box;
}

.gantt-row {
  display: flex;
}

.gantt-row-body {
  min-height: 60px;
}

.gantt-cell {
  width: v-bind(columWidthXp);
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;
  border-bottom: 1px solid #D5D9DC;

}

.first-cell {
  background-color: white;
  width: v-bind(leftColumWidthXp);
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

.gantt-row-head {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  /* border-bottom: 2px solid #9aa0a5; */
}

.title-cell {
  border-bottom: 2px solid #9aa0a5;

}
</style>
