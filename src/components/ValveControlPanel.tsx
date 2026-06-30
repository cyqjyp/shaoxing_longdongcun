import Icon from './Icon';
import GlassCard from './GlassCard';
import { VALVES } from '../data/dashboardData';

export default function ValveControlPanel() {
  return (
    <GlassCard className="col-span-12 lg:col-span-3 row-span-1 p-1.5 rounded-xl flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-1 shrink-0">
        <Icon name="settings_input_component" className="text-primary-fixed-dim text-[20px]" />
        <h2 className="text-body-md font-bold">阀门控制</h2>
      </div>
      <div className="flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto custom-scroll">
        {VALVES.map((valve) => (
          <div
            key={valve.name}
            className="p-1.5 bg-surface-container-high/40 rounded border border-outline-variant/10 flex items-center gap-2"
          >
            <div className={`w-7 h-7 rounded-full border-2 ${valve.borderColor} flex items-center justify-center shrink-0`}>
              <Icon
                name={valve.icon}
                className={`text-[18px] ${valve.spinning ? 'animate-spin-slow text-secondary' : 'text-outline'}`}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold">{valve.name}</span>
                <span className={`text-[12px] ${valve.statusClass}`}>{valve.status}</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className={`${valve.barColor} h-full`} style={{ width: `${valve.openPercent}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[12px] text-on-surface-variant">开度</span>
                <span className="text-[12px] font-bold">{valve.openPercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
