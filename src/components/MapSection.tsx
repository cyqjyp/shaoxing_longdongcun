import Icon from './Icon';
import { MAP_IMAGE_URL } from '../data/dashboardData';

export default function MapSection() {
  return (
    <section className="col-span-12 lg:col-span-8 row-span-1 relative rounded-xl overflow-hidden border border-outline-variant/30 shadow-2xl p-3 lg:col-start-1 min-h-0">
      <div className="absolute inset-3 bg-surface-container-lowest rounded-lg overflow-hidden">
        <img
          alt="3D aerial view of a modern residential community"
          className="w-full h-full object-cover opacity-60"
          src={MAP_IMAGE_URL}
        />
      </div>
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          type="button"
          className="glass-card px-3 py-2 rounded-full flex items-center gap-1 border border-primary/20 text-primary-fixed-dim hover:bg-primary/20 transition-colors active:scale-95"
        >
          <Icon name="chevron_left" className="text-[22px]" />
          <span className="text-label-sm">返回上一级</span>
        </button>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button type="button" className="glass-card p-2 rounded-lg border border-outline-variant/30 hover:bg-primary/20">
          <Icon name="add" />
        </button>
        <button type="button" className="glass-card p-2 rounded-lg border border-outline-variant/30 hover:bg-primary/20">
          <Icon name="remove" />
        </button>
        <button type="button" className="glass-card p-2 rounded-lg border border-outline-variant/30 hover:bg-primary/20">
          <Icon name="layers" />
        </button>
      </div>
    </section>
  );
}
