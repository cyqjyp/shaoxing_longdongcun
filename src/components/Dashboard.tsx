import { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import MapSection from './MapSection';
import Sidebar from './Sidebar';
import PumpStationPanel from './PumpStationPanel';
import LiquidLevelPanel from './LiquidLevelPanel';
import ValveControlPanel from './ValveControlPanel';
import WaterQualityPopup from './WaterQualityPopup';
import TrendComparisonTooltip from './TrendComparisonTooltip';
import RealTimeAlarmModule from './RealTimeAlarmModule';
import type { WaterMetricKey } from '../data/dashboardData';

function calcPopupPosition(e: React.MouseEvent) {
  let left = e.clientX + 15;
  let top = e.clientY + 15;
  if (left + 340 > window.innerWidth) left = e.clientX - 355;
  if (top + 280 > window.innerHeight) top = e.clientY - 295;
  return { left, top };
}

function calcTrendPosition(e: React.MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  let left = rect.right + 10;
  let top = rect.top - 10;
  if (left + 220 > window.innerWidth) left = rect.left - 230;
  if (top + 80 > window.innerHeight) top = window.innerHeight - 90;
  return { left, top };
}

export default function Dashboard() {
  const [popupMetric, setPopupMetric] = useState<WaterMetricKey | null>(null);
  const [popupPos, setPopupPos] = useState({ left: 0, top: 0 });
  const [trendData, setTrendData] = useState<{ change: number; rate: number; pos: { left: number; top: number } } | null>(
    null,
  );

  const handleMetricClick = useCallback((metric: WaterMetricKey, e: React.MouseEvent) => {
    e.stopPropagation();
    setPopupMetric(metric);
    setPopupPos(calcPopupPosition(e));
  }, []);

  const handleTrendClick = useCallback((change: number, rate: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTrendData({ change, rate, pos: calcTrendPosition(e) });
  }, []);

  useEffect(() => {
    const handleDocClick = () => {
      setPopupMetric(null);
      setTrendData(null);
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden flex-col">
        <main className="dashboard-grid flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-y-auto h-full px-internal-padding pb-4 pt-2">
          <MapSection />
          <Sidebar />
          <PumpStationPanel onMetricClick={handleMetricClick} onTrendClick={handleTrendClick} />
          <LiquidLevelPanel />
          <ValveControlPanel />
        </main>
      </div>

      {popupMetric && (
        <div onClick={(e) => e.stopPropagation()}>
          <WaterQualityPopup metric={popupMetric} position={popupPos} />
        </div>
      )}

      {trendData && (
        <div onClick={(e) => e.stopPropagation()}>
          <TrendComparisonTooltip change={trendData.change} rate={trendData.rate} position={trendData.pos} />
        </div>
      )}

      <RealTimeAlarmModule />
    </div>
  );
}
