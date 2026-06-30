import Icon from './Icon';
import { NAV_ITEMS } from '../data/dashboardData';

export default function Header() {
  return (
    <header className="flex shrink-0 justify-between items-center h-20 px-internal-padding w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-lg shadow-primary-container/10">
      <div className="flex items-center gap-6">
        <h1 className="text-headline-md font-headline-md font-bold text-primary-fixed-dim drop-shadow-[0_0_8px_rgba(0,219,231,0.6)]">
          龙东村生活用水管理平台
        </h1>
        <nav className="hidden md:flex gap-8 ml-12">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href="#"
              className={
                i === 0
                  ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim font-bold pb-1 font-label-sm text-label-sm transition-all duration-200'
                  : 'text-on-surface-variant font-body-md hover:text-primary-fixed transition-colors font-label-sm text-label-sm'
              }
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <Icon name="settings" className="text-on-surface-variant cursor-pointer hover:text-primary-fixed" />
        <div className="relative">
          <Icon name="notifications" className="text-on-surface-variant cursor-pointer hover:text-primary-fixed" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full animate-pulse" />
        </div>
        <Icon name="account_circle" className="text-on-surface-variant cursor-pointer hover:text-primary-fixed" />
      </div>
    </header>
  );
}
