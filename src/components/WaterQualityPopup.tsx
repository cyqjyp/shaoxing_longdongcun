import Icon from './Icon';
import MetricTrendChart from './MetricTrendChart';
import { WATER_METRICS, type WaterMetricKey } from '../data/dashboardData';

interface WaterQualityPopupProps {
  metric: WaterMetricKey;
  position: { left: number; top: number };
}

export default function WaterQualityPopup({ metric, position }: WaterQualityPopupProps) {
  const config = WATER_METRICS[metric];

  return (
    <div className="water-quality-popup" style={{ left: position.left, top: position.top }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-label-sm font-bold text-primary-fixed-dim flex items-center gap-1">
          <Icon name="monitoring" className="text-[18px]" />
          <span>{metric}</span>
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
          <span className="text-[12px] text-on-surface-variant">{metric}</span>
        </div>
      </div>
      <p className="text-[12px] text-on-surface-variant mb-1">水质趋势（近24小时）</p>
      <p className="metric-limit mb-2">{config.limit}</p>
      <MetricTrendChart metricName={metric} />
    </div>
  );
}
