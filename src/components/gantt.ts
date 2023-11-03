import { ref } from "vue";
import { CellDto, ColumnDto, RowDto } from "./gantt.model";

export const cellwidth = ref(80);
/**
 * 列数据
 */
export const columData = ref<ColumnDto[]>([])
/**
 * 行数据
 */
export const rowData = ref<RowDto[]>([]);
export const cellValue = ref(3600)