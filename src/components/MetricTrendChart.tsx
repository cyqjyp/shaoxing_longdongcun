import { useRef, useState } from 'react';
import { X_LABELS, WATER_METRICS, type WaterMetricKey } from '../data/dashboardData';
import { createScales, formatChartHour, indexFromSvgEvent } from '../utils/chartHelpers';

interface MetricTrendChartProps {
  metricName: WaterMetricKey;
}

const W = 316;
const H = 200;
const pad = { top: 8, right: 16, bottom: 28, left: 36 };
const plotW = W - pad.left - pad.right;
const plotH = H - pad.top - pad.bottom;

export default function MetricTrendChart({ metricName }: MetricTrendChartProps) {
  const config = WATER_METRICS[metricName];
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });

  const { data, yMin, yMax, color, yTicks, unit, limit } = config;
  const { xAt, yAt } = createScales(data.length, pad, plotW, plotH, yMin, yMax);

  const handleMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const idx = indexFromSvgEvent(e, svg, pad, plotW, plotH, data.length);
    if (idx === null) {
      setHoverIndex(null);
      return;
    }

    setHoverIndex(idx);

    const x = xAt(idx);
    const containerRect = container.getBoundingClientRect();
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = pad.top;
    const screenPt = pt.matrixTransform(svg.getScreenCTM()!);
    let left = screenPt.x - containerRect.left - 56;
    let top = screenPt.y - containerRect.top - 80;
    left = Math.max(4, Math.min(left, containerRect.width - 120));
    top = Math.max(4, top);
    setTooltipPos({ left, top });
  };

  const linePoints = data.map((v, i) => `${xAt(i)},${yAt(v)}`).join(' ');
  const areaPoints = `${xAt(0)},${yAt(yMin)} ${linePoints} ${xAt(data.length - 1)},${yAt(yMin)}`;

  const hoverValue = hoverIndex !== null ? data[hoverIndex] : null;
  const unitSuffix = unit ? ` ${unit}` : '';

  return (
    <div ref={containerRef} className="popup-chart w-full rounded overflow-hidden bg-surface-container-lowest/50 border border-outline-variant/20">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${metricName}近24小时趋势`}
      >
        {yTicks.map((tick) => {
          const y = yAt(tick);
          return (
            <g key={tick}>
              <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <text x={pad.left - 6} y={y + 3} textAnchor="end" fill="#849495" fontSize={9}>
                {tick}
              </text>
            </g>
          );
        })}
        {X_LABELS.map((label, i) => {
          const x = pad.left + (i / (X_LABELS.length - 1)) * plotW;
          return (
            <text key={label} x={x} y={H - 6} textAnchor="middle" fill="#849495" fontSize={9}>
              {label}
            </text>
          );
        })}
        <polygon points={areaPoints} fill={color} fillOpacity={0.08} />
        <polyline points={linePoints} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {hoverIndex !== null && (
          <>
            <line
              x1={xAt(hoverIndex)}
              y1={pad.top}
              x2={xAt(hoverIndex)}
              y2={pad.top + plotH}
              stroke={color}
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <circle
              cx={xAt(hoverIndex)}
              cy={yAt(data[hoverIndex])}
              r={4.5}
              fill={color}
              stroke="#0e141e"
              strokeWidth={1.5}
            />
          </>
        )}
        <rect
          x={pad.left}
          y={pad.top}
          width={plotW}
          height={plotH}
          fill="transparent"
          style={{ cursor: 'crosshair' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        />
      </svg>
      {hoverIndex !== null && hoverValue !== null && (
        <div className="chart-hover-tooltip visible" style={{ left: tooltipPos.left, top: tooltipPos.top }}>
          <div className="tooltip-time">{formatChartHour(hoverIndex)}</div>
          <div className="tooltip-row">
            <span className="tooltip-label">
              <span className="tooltip-dot" style={{ background: color }} />
              {metricName}
            </span>
            <span className="tooltip-value" style={{ color }}>
              {hoverValue.toFixed(2)}
              {unitSuffix}
            </span>
          </div>
          <div className="tooltip-limit">{limit}</div>
        </div>
      )}
    </div>
  );
}
