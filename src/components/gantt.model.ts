import { Dayjs } from "dayjs";

/**
 * 时间线配置项
 */
export interface TimeLineOption {
  model?: "Hour" | "Day" | "Week" | "Month";
  startTime: Date;
  endtTime: Date;
}
/**
 * 行数据对象
 */
export interface RowDto {
  code: string;
  name: string;
  cells?: CellDto[];
  [key: string]: any;
}

/**
 * 列数据对象
 */
export interface ColumnDto extends CellDto {
  title: string;
  subTitle?: string;
  cells?: CellDto[];
}
/**
 * 单元格数据对象
 */
export interface CellDto {
  startValue: number;
  endValue?: number;
  duration: number;
  time: Dayjs;
  [key: string]: any;
}
