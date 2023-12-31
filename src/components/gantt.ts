import { ref, computed } from "vue";
import { CellDto, ColumnDto, RowDto } from "./gantt.model";
/**
 * 默认列宽度
 */
export const columWidth = ref(80);
export const columWidthPx = computed(() => {
  return columWidth.value + "px";
});
export const rightColumWidthPx = computed(() => {
  return columWidth.value - 1 + "px";
});
/**
 * 默认左侧第一列宽度
 */
export const leftColumWidth = ref(160);
export const leftColumWidthPx = computed(() => {
  return leftColumWidth.value + "px";
});
/**
 * 列数据
 */
export const columData = ref<ColumnDto[]>([]);
/**
 * 列数量
 */
export const columCount = computed(() => {
  let c = 0;
  columData.value.forEach((x) => {
    c += x.cells?.length || 0;
  });
  return c;
});
export const minRowHeight = ref(60);
export const minRowHeightPx = computed(() => {
  return minRowHeight.value  + "px";
});
/**
 * 行数据
 */
export const rowData = ref<RowDto[]>([]);
export const cellValue = ref(3600);

export const chWeeks = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
