<script setup lang="ts">
import { columData, columWidthPx, rightColumWidthPx } from './gantt'
import { onMounted } from 'vue'

onMounted(() => {
    // console.log('columData',columData.value)
    // getAllDayData()
})
</script>

<template>
    <div class="time-line" style="background-color: #F9FAFB;">
        <div v-for=" (day, index) in columData" :key="index">
            <div class="time-line-big-cell-container">
                <div class="time-line-top-cell">
                    <span class="time-line-tile">{{ day.title }}</span>
                    &nbsp;
                    <span class="time-line-subtile">{{ day.subTitle }}</span>
                </div>
                <div class="time-line-bottom-cell-container">
                    <div class="time-line-bottom-cell gantt-cell" v-for="(cell, index2) in day.cells" :key="index2"
                        :class="index2 + 1 == day.cells?.length ? 'time-line-bottom-cell-last' : ''">
                        {{ cell.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.time-line {
    display: flex;
}

.time-line div {
    box-sizing: border-box;
    /* display: flex; */
}

.time-line-big-cell-container {
    border-right: 1px solid;
    box-sizing: border-box;
}

.time-line-top-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
}

.time-line-top-cell .time-line-tile {
    font-size: large;
}

.time-line-top-cell .time-line-subtile {
    /* font-size: large; */
    color: #7C7A81;
}

.time-line-bottom-cell-container {
    display: flex;
    /* align-items: center;
    justify-content: center; */
}

.time-line-bottom-cell {
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

.time-line-bottom-cell-last {
    border-right: none;
    width: v-bind(rightColumWidthPx);
}
</style>
