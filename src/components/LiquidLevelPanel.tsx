import Icon from './Icon';
import GlassCard from './GlassCard';
import LiquidLevelChart from './LiquidLevelChart';

export default function LiquidLevelPanel() {
  return (
    <GlassCard className="col-span-12 lg:col-span-4 row-span-1 p-1.5 rounded-xl flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-1 shrink-0">
        <div className="flex items-center gap-2">
          <Icon name="water_drop" className="text-primary-fixed-dim text-[20px]" />
          <h2 className="text-body-md font-bold">液位监控</h2>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-status-running" />
            <span className="text-[11px] text-on-surface-variant">清水池: 正常</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-status-running" />
            <span className="text-[11px] text-on-surface-variant">原水池: 正常</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 min-h-0">
        <div className="flex justify-between items-center px-1 shrink-0">
          <div className="flex gap-4">
            <div>
              <p className="text-[11px] text-on-surface-variant">清水池液位</p>
              <p className="text-body-md font-bold text-primary-fixed-dim font-data-display leading-tight">
                3.81<span className="text-[12px] ml-0.5">m</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant">原水池液位</p>
              <p className="text-body-md font-bold text-status-warning font-data-display leading-tight">
                2.43<span className="text-[12px] ml-0.5">m</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-1 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 rounded-full bg-primary-fixed-dim" />
            <span className="text-[11px] text-on-surface-variant">清水池</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 rounded-full bg-status-warning" />
            <span className="text-[11px] text-on-surface-variant">原水池 (24h)</span>
          </div>
        </div>
        <LiquidLevelChart />
      </div>
    </GlassCard>
  );
}
