interface TrendComparisonTooltipProps {
  change: number;
  rate: number;
  position: { left: number; top: number };
}

export default function TrendComparisonTooltip({ change, rate, position }: TrendComparisonTooltipProps) {
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-status-running' : 'text-error';

  return (
    <div className="trend-comparison-tooltip p-3" style={{ left: position.left, top: position.top }}>
      <div className="flex flex-col gap-1.5">
        <div className="text-[13px] text-on-surface-variant border-b border-outline-variant/20 pb-1 mb-0.5">
          供水总量对比分析
        </div>
        <div className="flex justify-between gap-4 items-center">
          <span className="text-[14px]">较昨日值变化:</span>
          <span className={`text-label-sm font-bold font-data-display ${colorClass}`}>
            {isPositive ? '+' : ''}
            {change} km³
          </span>
        </div>
        <div className="flex justify-between gap-4 items-center">
          <span className="text-[14px]">变化率:</span>
          <span className={`text-label-sm font-bold font-data-display ${colorClass}`}>
            {isPositive ? '+' : ''}
            {rate}%
          </span>
        </div>
      </div>
    </div>
  );
}
