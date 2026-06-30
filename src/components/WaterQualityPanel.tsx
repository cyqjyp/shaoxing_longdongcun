import Icon from './Icon';
import GlassCard from './GlassCard';
import type { MetricItem } from '../data/dashboardData';

interface WaterQualityPanelProps {
  title: string;
  icon: string;
  metrics: MetricItem[];
  layout: 'quad' | 'dual';
  valueColor?: string;
  showFooter?: boolean;
}

export default function WaterQualityPanel({
  title,
  icon,
  metrics,
  layout,
  valueColor = 'text-secondary',
  showFooter = false,
}: WaterQualityPanelProps) {
  return (
    <GlassCard className="water-quality-panel rounded-xl flex flex-col">
      <div className="flex justify-between items-center panel-header shrink-0">
        <div className="flex items-center gap-2">
          <Icon name={icon} className="text-primary-fixed-dim text-[20px]" />
          <h2 className="panel-title font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-on-surface-variant">在线</span>
          <span className="w-2 h-2 bg-status-running rounded-full shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
        </div>
      </div>
      <div className={`water-panel-body water-panel-body--${layout}`}>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="water-metric-cell bg-surface-container-high/40 rounded border border-outline-variant/10"
          >
            <p className="text-[12px] text-on-surface-variant">{metric.label}</p>
            <p className={`metric-value font-data-display font-bold ${valueColor}`}>
              {metric.value}
              {metric.unit && <span className="text-[12px] ml-0.5 font-normal">{metric.unit}</span>}
            </p>
            {metric.limit && <p className="metric-limit">{metric.limit}</p>}
          </div>
        ))}
      </div>
      {showFooter && (
        <div className="panel-footer mt-2 py-1 px-2 bg-status-running/10 border border-status-running/30 rounded flex items-center justify-between">
          <span className="text-[12px] text-status-running">各项参数监测正常</span>
          <Icon name="check_circle" className="text-status-running text-[18px]" />
        </div>
      )}
    </GlassCard>
  );
}
