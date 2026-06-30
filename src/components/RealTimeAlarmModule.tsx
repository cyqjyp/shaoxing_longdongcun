import { useState } from 'react';
import Icon from './Icon';
import GlassCard from './GlassCard';
import { ALARMS } from '../data/dashboardData';

export default function RealTimeAlarmModule() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <GlassCard
      className={`fixed bottom-4 right-4 z-50 flex flex-col w-64 rounded-xl border border-error/30 bg-surface-container-lowest/80 backdrop-blur-xl shadow-2xl transition-all duration-300 overflow-hidden alarm-module ${collapsed ? 'collapsed' : ''}`}
    >
      <div className="flex items-center justify-between p-3 border-b border-outline-variant/20 bg-error/10">
        <div className="flex items-center gap-2">
          <Icon name="warning" className="text-error animate-pulse text-[24px]" />
          <h3 className="text-label-sm font-bold text-on-surface">实时报警</h3>
          <span className="bg-error text-white text-[13px] px-1.5 py-0.5 rounded-full font-bold">{ALARMS.length}</span>
        </div>
        <button
          type="button"
          className="toggle-alarm-btn text-on-surface-variant hover:text-primary cursor-pointer"
          onClick={() => setCollapsed((c) => !c)}
        >
          <Icon name="keyboard_arrow_down" className="text-[22px]" />
        </button>
      </div>
      <div className="alarm-list-container p-2 max-h-40 overflow-hidden">
        <div className="flex flex-col gap-2 animate-marquee-vertical">
          {[...ALARMS, ...ALARMS].map((alarm, i) => (
            <div
              key={`${alarm.message}-${i}`}
              className="flex items-center gap-2 p-2 rounded bg-surface-container-high/40 border-l-2 border-error"
            >
              <span className="text-[14px] text-on-surface">{alarm.message}</span>
              <span className="text-[12px] text-on-surface-variant ml-auto">{alarm.time}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
