import Icon from './Icon';
import GlassCard from './GlassCard';
import { BASIC_INFO } from '../data/dashboardData';

export default function BasicInfo() {
  return (
    <GlassCard className="shrink-0 p-2.5 rounded-xl flex flex-col border-l-2 border-primary-fixed-dim bg-surface-container-low/40 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon name="info" className="text-primary-fixed-dim text-[20px]" />
        <h2 className="font-headline-md text-body-md font-bold">基础信息</h2>
      </div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-1.5">
        {BASIC_INFO.map((item) => (
          <div key={item.label} className="flex flex-col min-w-0">
            <span className="text-[12px] text-on-surface-variant uppercase truncate">{item.label}</span>
            <span className="text-body-md font-bold text-primary-fixed-dim leading-tight">
              {item.value}
              {item.unit && <span className="text-[12px] ml-0.5">{item.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
