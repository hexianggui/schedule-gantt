<script setup lang="ts">
// import { ref } from 'vue'
import { onMounted, ref } from 'vue';
import GanttCalendar from './GanttCalendar.vue';
import { CellDto, ColumnDto, RowDto } from './gantt.model';
import tempdata from './temData.json'
import { columData, rowData, columWidthPx, minRowHeightPx, chWeeks, columCount, columWidth } from './gantt';
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
      isDayOff: x.isDayOff,
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
  console.log('columData', columData.value)
}
const scrollLeft = ref(0)
const scrollTop = ref(0)
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

const scrollHandler = (e: any) => {
  if (scrollLeft.value != e.target.scrollLeft) {
    scrollLeft.value = e.target.scrollLeft
  }
  if (scrollTop.value != e.target.scrollTop) {
    scrollTop.value = e.target.scrollTop
  }

}
onMounted(() => {
  createColDtoForTemp();
  createRowDtoForTemp();
})
// const count = ref(0)
</script>

<template>
  <div style="width: 1300px;height: 900px;">
    <div class="gantt">
      <div class="gantt-left">
        <div class="gantt-left-head gantt-first-row">
          <div>{{ '机台' }}</div>
        </div>
        <div class="gantt-left-list" :scrollTop="scrollTop">
          <div class="gantt-left-list-item gantt-row" v-for="(row, index) in rowData" :key="index">
            <div class="gantt-left-list-item-cell">{{ row.name }}</div>
          </div>
        </div>
      </div>
      <div class="gantt-right">
        <div class="gantt-right-head gantt-first-row" :scrollLeft="scrollLeft">
          <GanttCalendar></GanttCalendar>
        </div>
        <div class="gantt-table" v-on:scroll="scrollHandler">
          <div class="gantt-grid" :style="{ width: columCount * columWidth + 'px' }">
            <div class="gantt-row" v-for="(row, index) in rowData" :key="index">
              <div class="gantt-cell" v-for="(cell, index2) in row.cells" :key="index2"
                :id="cell.rowCode + cell.startValue">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gantt-table::-webkit-scrollbar {
  width: 20px;
  height: 20px;
  /* background-color: rgba(255, 255, 255, 0.2); */
  background-color: transparent;
}

.gantt-table::-webkit-scrollbar-track {
  background-color: transparent;
  /* -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em; */
}

.gantt-table::-webkit-scrollbar-thumb {
  background-color: rgb(147, 147, 153, 0.2);
  /* -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em; */
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}


.gantt-left-list {
  overflow: hidden;
}

.gantt-left {
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
  border-right: 2px solid #9aa0a5;
}

.gantt-left-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gantt-left-head {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.gantt-table {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.gantt {
  display: flex;
  width: 100%;
  height: 100%;
}

.gantt-right {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.gantt-first-row {
  height: 66px;
  border-bottom: 2px solid #9aa0a5;
}

.gantt-right-head {
  width: 100%;
  overflow: hidden;
  flex-shrink: 0;
}


.gantt-row {
  display: flex;
  min-height: v-bind(minRowHeightPx);
  border-bottom: 1px solid #D5D9DC;
  box-sizing: border-box;
}

.gantt-cell {
  width: v-bind(columWidthPx);
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;
  box-sizing: border-box;
}

/* .gantt {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}

.gantt div {
  box-sizing: border-box;
}

.gantt-row {
  display: flex;
}

.gantt-row-body {
  min-height: 60px;
  border-bottom: 1px solid #D5D9DC;
}

.gantt-cell {
  width: v-bind(columWidthXp);
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;


}

.first-cell {
  background-color: white;
  width: v-bind(leftColumWidthXp);
  flex-shrink: 0;
  border-right: 1px solid #D5D9DC;
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
  border-bottom: 2px solid #9aa0a5;
} */
</style>
