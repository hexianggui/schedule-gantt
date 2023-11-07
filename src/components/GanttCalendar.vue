<script setup lang="ts">
import { columData, columWidthPx, rightColumWidthPx } from './gantt'
import { onMounted } from 'vue'

onMounted(() => {
    // console.log('columData',columData.value)
    // getAllDayData()
})
</script>

<template>
    <div class="gantt-calendar" style="background-color: #F9FAFB;">
        <div v-for=" (day, index) in columData" :key="index">
            <div class="gantt-calendar-big-cell-container">
                <div class="gantt-calendar-top-cell">
                    <span class="gantt-calendar-tile">{{ day.title }}</span>
                    &nbsp;
                    <span class="gantt-calendar-subtile">{{ day.subTitle }}</span>
                </div>
                <div class="gantt-calendar-bottom-cell-container">
                    <div class="gantt-calendar-bottom-cell gantt-cell" v-for="(cell, index2) in day.cells" :key="index2"
                        :class="index2 + 1 == day.cells?.length ? 'gantt-calendar-bottom-cell-last' : ''">
                        {{ cell.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gantt-calendar {
    display: flex;
}

.gantt-calendar div {
    box-sizing: border-box;
    /* display: flex; */
}

.gantt-calendar-big-cell-container {
    border-right: 1px solid;
    box-sizing: border-box;
}

.gantt-calendar-top-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
}

.gantt-calendar-top-cell .gantt-calendar-tile {
    font-size: large;
}

.gantt-calendar-top-cell .gantt-calendar-subtile {
    /* font-size: large; */
    color: #7C7A81;
}

.gantt-calendar-bottom-cell-container {
    display: flex;
    /* align-items: center;
    justify-content: center; */
}

.gantt-calendar-bottom-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border-right: 1px solid #D5D9DC;
    /* border-bottom: 2px solid #9aa0a5; */
}

.gantt-cell {
    width: v-bind(columWidthPx);
}

.gantt-calendar-bottom-cell-last {
    border-right: none;
    width: v-bind(rightColumWidthPx);
}
</style>
