import BasicInfo from './BasicInfo';
import WaterQualityPanel from './WaterQualityPanel';
import { SOURCE_WATER_METRICS, FINISHED_WATER_METRICS } from '../data/dashboardData';

export default function Sidebar() {
  return (
    <section className="sidebar-column col-span-12 lg:col-span-4 row-span-1 min-h-0">
      <BasicInfo />
      <div className="sidebar-panels">
        <WaterQualityPanel
          title="水源地水质监测仪"
          icon="waves"
          metrics={SOURCE_WATER_METRICS}
          layout="quad"
        />
        <WaterQualityPanel
          title="出厂水质监测仪"
          icon="verified_user"
          metrics={FINISHED_WATER_METRICS}
          layout="dual"
          valueColor="text-primary-fixed-dim"
          showFooter
        />
      </div>
    </section>
  );
}
