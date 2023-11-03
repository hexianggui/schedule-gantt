import { Dayjs } from "dayjs";

/**
 * 时间线配置项
 */
export interface TimeLineOption {
  model?: "Hour" | "Day" | "Week" | "Month";
  startTime: Date;
  endtTime: Date;
}
export interface RowDto {
  code: string;
  name: string;
  cells?: CellDto[];
  [key: string]: any;
}

// export interface BigColumnDto extends ColumnDto {
//   items: ColumnDto[];
// }

export interface ColumnDto extends CellDto {
  title: string;
  subTitle?: string;
  cells?: CellDto[];
}
export interface CellDto {
  // title?: string;
  // subTitle?: string;
  startValue: number;
  endValue?: number;
  duration: number;
  time: Dayjs;
  [key: string]: any;
}
// { title: string, subTitle?: string, startValue: number, time: Dayjs, cells: any[] }
