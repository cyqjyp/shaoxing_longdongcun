export type WaterMetricKey = '余氯' | '浊度' | 'pH值';

export interface WaterMetricConfig {
  unit: string;
  color: string;
  limit: string;
  yMin: number;
  yMax: number;
  yTicks: number[];
  data: number[];
}

export interface LiquidLevelSeries {
  name: string;
  color: string;
  dash: string;
  data: number[];
}

export interface MetricItem {
  label: string;
  value: string;
  unit?: string;
  limit?: string;
}

export interface PumpStationData {
  id: string;
  name: string;
  status: string;
  metrics: { label: string; value: string; unit: string }[];
  totalSupply: { value: string; unit: string; change: number; rate: number; trend: 'up' | 'down' };
  waterQuality?: { name: WaterMetricKey; value: string; unit?: string; limit: string }[];
}

export const MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCXnjB9h8CKe4DQ2pi_kuSPEJOzFFBaYbpJoMLwPvbKkfF-E1xdHePcWHVrdyRvfwMSQy0rae9L78rmPcN-eJplP_9XBZKYP_nSy8sHsFMlsl7FUqcppZYhH4AfVdTnxTAaNa-zWt2KJ8uULuz81VPT2KmFpvnnx2Fww5Si3KM7JTcKIfe0kIFIE8DBgUJCXu_PUMt2mq67yZCaqldVhH6GtXpPs5w8aUWfUehHn03j7nrPQwsgP5DdHWyJEL2LJqPxzvS9y_PUMMkl';

export const BASIC_INFO = [
  { label: '龙东村', value: '343', unit: '户' },
  { label: '分区计量表', value: '14', unit: '个' },
  { label: '供水泵站', value: '2', unit: '座' },
  { label: '水质仪', value: '1', unit: '个' },
  { label: '液位监测仪', value: '1', unit: '个' },
  { label: '户表', value: '498', unit: '个' },
  { label: '漏损率', value: '5.4%', unit: '' },
];

export const SOURCE_WATER_METRICS: MetricItem[] = [
  { label: '总磷', value: '0.01', unit: 'mg/L', limit: '限值≤0.2' },
  { label: 'pH值', value: '7.08', limit: '限值 6.0-9.0' },
  { label: '溶解氧(DO)', value: '9.03', unit: 'mg/L', limit: '限值≥5.0' },
  { label: '氨氮', value: '0.54', unit: 'mg/L', limit: '限值≤1.0' },
];

export const FINISHED_WATER_METRICS: MetricItem[] = [
  { label: '出厂余氯', value: '0.74', unit: 'mg/L', limit: '限值≥0.3' },
  { label: '出厂浊度', value: '0.50', unit: 'NTU', limit: '限值≤1.0' },
];

export const WATER_METRICS: Record<WaterMetricKey, WaterMetricConfig> = {
  余氯: {
    unit: 'mg/L',
    color: '#00F2FF',
    limit: '限值≥0.5',
    yMin: 0,
    yMax: 1.0,
    yTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    data: [0.72, 0.68, 0.75, 0.7, 0.82, 0.88, 0.91, 0.85, 0.78, 0.83, 0.9, 0.87, 0.92, 0.89, 0.86, 0.91, 0.88, 0.85, 0.9, 0.87, 0.89, 0.86, 0.88, 0.9],
  },
  浊度: {
    unit: 'NTU',
    color: '#F59E0B',
    limit: '限值≤1',
    yMin: 0,
    yMax: 0.7,
    yTicks: [0, 0.14, 0.28, 0.42, 0.56, 0.7],
    data: [0.12, 0.15, 0.22, 0.35, 0.28, 0.18, 0.25, 0.42, 0.38, 0.55, 0.48, 0.32, 0.19, 0.3, 0.45, 0.62, 0.38, 0.2, 0.15, 0.19, 0.28, 0.35, 0.22, 0.19],
  },
  pH值: {
    unit: '',
    color: '#A78BFA',
    limit: '限值 6.5-8.5',
    yMin: 6,
    yMax: 8,
    yTicks: [6, 6.4, 6.8, 7.2, 7.6, 8],
    data: [7.1, 7.12, 7.08, 7.15, 7.18, 7.14, 7.16, 7.13, 7.17, 7.15, 7.12, 7.16, 7.14, 7.18, 7.15, 7.13, 7.16, 7.14, 7.17, 7.15, 7.16, 7.14, 7.15, 7.16],
  },
};

export const X_LABELS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

export const LIQUID_LEVEL_SERIES: LiquidLevelSeries[] = [
  {
    name: '清水池',
    color: '#00F2FF',
    dash: '',
    data: [3.65, 3.72, 3.68, 3.75, 3.8, 3.78, 3.82, 3.79, 3.85, 3.81, 3.76, 3.83, 3.88, 3.82, 3.79, 3.84, 3.8, 3.78, 3.82, 3.85, 3.79, 3.83, 3.8, 3.81],
  },
  {
    name: '原水池',
    color: '#F59E0B',
    dash: '6 4',
    data: [2.35, 2.4, 2.38, 2.42, 2.45, 2.41, 2.44, 2.46, 2.43, 2.4, 2.38, 2.42, 2.44, 2.41, 2.39, 2.43, 2.45, 2.42, 2.4, 2.44, 2.42, 2.41, 2.43, 2.43],
  },
];

export const PUMP_STATIONS: PumpStationData[] = [
  {
    id: '1',
    name: '1#  泵站A',
    status: '运行中',
    metrics: [
      { label: '进水压力', value: '0.49', unit: 'MPa' },
      { label: '出水压力', value: '0.64', unit: 'MPa' },
      { label: '瞬时流量', value: '119.70', unit: 'm³/h' },
    ],
    totalSupply: { value: '2.20', unit: 'km³', change: 0.12, rate: 5.3, trend: 'up' },
    waterQuality: [
      { name: '余氯', value: '0.90', unit: 'mg/L', limit: '限值≥0.5' },
      { name: '浊度', value: '0.19', unit: 'NTU', limit: '限值≤1' },
      { name: 'pH值', value: '7.16', limit: '限值 6.5-8.5' },
    ],
  },
  {
    id: '2',
    name: '2# 泵站B',
    status: '运行中',
    metrics: [
      { label: '进水压力', value: '0.18', unit: 'MPa' },
      { label: '出水压力', value: '0.51', unit: 'MPa' },
      { label: '瞬时流量', value: '94.83', unit: 'm³/h' },
    ],
    totalSupply: { value: '1.98', unit: 'km³', change: -0.08, rate: -4.2, trend: 'down' },
  },
];

export const VALVES = [
  { name: '主管道进水阀', status: '已开启', statusClass: 'text-status-running', openPercent: 85, icon: 'published_with_changes', spinning: true, borderColor: 'border-secondary', barColor: 'bg-secondary' },
  { name: '旁路泄压阀', status: '全关', statusClass: 'text-status-stopped', openPercent: 0, icon: 'lock', spinning: false, borderColor: 'border-outline-variant/50', barColor: 'bg-outline' },
];

export const ALARMS = [
  { message: '1#泵站通讯故障', time: '10:45' },
  { message: '清水池液位超低', time: '10:42' },
  { message: '2#泵站出水压力异常', time: '10:38' },
];

export const NAV_ITEMS = ['综合概览', '运行监控', '水质分析', '报警中心', '资产管理'];
