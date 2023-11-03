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
  /**
   * 标题
   */
  title: string;
  /**
   * 副标题
   */
  subTitle?: string;
  /**
   * 单元格
   */
  cells?: CellDto[];
  /**
   * 是否休息日
   */
  isDayOff: boolean;
}
/**
 * 单元格数据对象
 */
export interface CellDto {
  /**
   * 开始时间
   */
  startValue: number;
  /**
   * 结束时间
   */
  endValue?: number;
  /**
   * 持续时长
   */
  duration: number;
  time: Dayjs;
  [key: string]: any;
}
