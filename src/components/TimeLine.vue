<script setup lang="ts">
import { CellDto, ColumnDto } from './gantt.model';
import { cellValue, columData, columWidthXp, rightColumWidthXp } from './gantt'
import { onMounted } from 'vue'
import dayjs from 'dayjs'

// defineProps<TimeLineOption>({

// })
const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
// const props = withDefaults(defineProps<TimeLineOption>(), {
//     model: 'Hour',
//     startTime: new Date('2023-11-01'),
//     endtTime: new Date('2023-12-01')
// })
// const maxValue = props.endtTime.valueOf() / 1000 - props.startTime.valueOf() / 1000;

// const dayDatas = ref<{ title: string, subTitle?: string, startValue: number, time: Dayjs, cells: any[] }[]>([])
//开始时间
const startTime = dayjs('2023-11-01');
//结束时间
const endtTime = dayjs('2023-12-01');
// const outercolumns = ref<ColumnDto[]>([])
const getAllDayData = () => {
    const startDay = dayjs(startTime.format("YYYY-MM-DD"))
    const endDay = dayjs(endtTime.format("YYYY-MM-DD"))
    let cellday = startDay;
    const _colums: ColumnDto[] = []
    while (cellday <= endDay) {
        const col: ColumnDto = {
            title: cellday.format("YYYY-MM-DD"),
            time: cellday,
            // items: [],
            subTitle: weeks[cellday.day()],
            startValue: cellday.valueOf() / 1000,
            duration: 86400,
        }
        const cells: CellDto[] = []
        for (let i = 0; i < 24; i++) {
            const celltime = cellday.add(i, 'hour')
            cells.push({
                title: celltime.format("HH:mm"),
                time: celltime,
                subTitle: '',
                startValue: celltime.valueOf() / 1000,
                duration: cellValue.value,
            })
        }
        col.cells = cells
        _colums.push(col)
        cellday = cellday.add(1, 'day')
    }
    columData.value = _colums
}
onMounted(() => {
    console.log('rightCellWidthxp',rightColumWidthXp.value)
    getAllDayData()
})
// console.log(maxValue)
// const count = ref(0)
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

}

.gantt-cell {
    width: v-bind(columWidthXp);
}

.time-line-bottom-cell-last {
    border-right: none;
    width: v-bind(rightColumWidthXp);
}
</style>
