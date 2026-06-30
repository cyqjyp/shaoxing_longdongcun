import Icon from './Icon';
import GlassCard from './GlassCard';
import { PUMP_STATIONS, type WaterMetricKey } from '../data/dashboardData';

interface PumpStationPanelProps {
  onMetricClick: (metric: WaterMetricKey, e: React.MouseEvent) => void;
  onTrendClick: (change: number, rate: number, e: React.MouseEvent) => void;
}

export default function PumpStationPanel({ onMetricClick, onTrendClick }: PumpStationPanelProps) {
  return (
    <GlassCard className="col-span-12 lg:col-span-5 row-span-1 rounded-xl flex flex-col min-h-0 p-1.5">
      <div className="flex items-center gap-2 mb-0.5 shrink-0">
        <Icon name="factory" className="text-primary-fixed-dim text-[20px]" />
        <h2 className="text-body-md font-bold">供水泵站</h2>
      </div>
      <div className="flex gap-3 flex-1 min-h-0 overflow-y-auto custom-scroll">
        {PUMP_STATIONS.map((station) => (
          <div
            key={station.id}
            className="flex-1 min-h-0 bg-surface-container-high/20 rounded-lg border border-outline-variant/20 flex flex-col p-1.5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-label-sm font-bold text-secondary">{station.name}</span>
              <span className="text-[13px] px-2 py-0.5 bg-status-running/20 text-status-running rounded">
                {station.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mb-1">
              {station.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-[13px] text-on-surface-variant">{m.label}</p>
                  <p className="font-data-display text-body-md text-primary">
                    {m.value}
                    <span className="text-label-sm ml-0.5">{m.unit}</span>
                  </p>
                </div>
              ))}
              <div>
                <p className="text-[13px] text-on-surface-variant">供水总量</p>
                <div className="flex items-center gap-1">
                  <p className="font-data-display text-body-md text-primary">
                    {station.totalSupply.value}
                    <span className="text-label-sm ml-0.5">{station.totalSupply.unit}</span>
                  </p>
                  <Icon
                    name={station.totalSupply.trend === 'up' ? 'trending_up' : 'trending_down'}
                    className={`text-[18px] animate-subtle-pulse cursor-pointer ${
                      station.totalSupply.trend === 'up' ? 'text-status-running' : 'text-error'
                    }`}
                    onClick={(e) => onTrendClick(station.totalSupply.change, station.totalSupply.rate, e)}
                  />
                </div>
              </div>
            </div>
            {station.waterQuality && (
              <div className="border-t border-outline-variant/10 pt-0.5 mt-0.5">
                <p className="text-[12px] text-secondary font-bold mb-0.5">实时水质</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {station.waterQuality.map((wq) => (
                      <button
                        key={wq.name}
                        type="button"
                        className="water-quality-item bg-surface-container-highest/30 p-1 rounded text-center border border-transparent"
                        onClick={(e) => onMetricClick(wq.name, e)}
                      >
                        <p className="text-[10px] text-on-surface-variant">{wq.name}</p>
                        <p className="text-[15px] text-secondary font-data-display font-bold leading-tight">{wq.value}</p>
                        <div className="flex flex-col items-center opacity-60">
                          {wq.unit && <span className="text-[10px] text-secondary">{wq.unit}</span>}
                          <span className="metric-limit">{wq.limit}</span>
                        </div>
                      </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
