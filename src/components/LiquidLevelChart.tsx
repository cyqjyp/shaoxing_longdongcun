import { useRef, useState } from 'react';
import { LIQUID_LEVEL_SERIES } from '../data/dashboardData';
import { createScales, formatChartHour, indexFromSvgEvent } from '../utils/chartHelpers';

const W = 400;
const H = 120;
const pad = { top: 6, right: 48, bottom: 20, left: 36 };
const plotW = W - pad.left - pad.right;
const plotH = H - pad.top - pad.bottom;
const yMin = 1.0;
const yMax = 4.5;
const yTicks = [1, 2, 3, 4];
const xLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
const pointCount = LIQUID_LEVEL_SERIES[0].data.length;

export default function LiquidLevelChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });

  const { xAt, yAt } = createScales(pointCount, pad, plotW, plotH, yMin, yMax);

  const handleMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const idx = indexFromSvgEvent(e, svg, pad, plotW, plotH, pointCount);
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
    let top = screenPt.y - containerRect.top - 70;
    left = Math.max(4, Math.min(left, containerRect.width - 120));
    top = Math.max(4, top);
    setTooltipPos({ left, top });
  };

  return (
    <div
      ref={containerRef}
      className="liquid-level-chart flex-1 min-h-[72px] bg-surface-container-highest/10 rounded-lg border border-outline-variant/20"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="液位近24小时趋势"
      >
        {yTicks.map((tick) => {
          const y = yAt(tick);
          return (
            <g key={tick}>
              <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fill="#b9cacb" fontSize={11}>
                {tick}m
              </text>
            </g>
          );
        })}
        {xLabels.map((label, i) => {
          const x = pad.left + (i / (xLabels.length - 1)) * plotW;
          return (
            <text key={label} x={x} y={H - 4} textAnchor="middle" fill="#b9cacb" fontSize={11}>
              {label}
            </text>
          );
        })}
        <text x={pad.left} y={pad.top - 2} fill="#849495" fontSize={10}>
          液位 (m)
        </text>
        {LIQUID_LEVEL_SERIES.map((series) => {
          const points = series.data.map((v, i) => `${xAt(i)},${yAt(v)}`).join(' ');
          return (
            <polyline
              key={series.name}
              points={points}
              fill="none"
              stroke={series.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={series.dash || undefined}
            />
          );
        })}
        {LIQUID_LEVEL_SERIES.map((series) => {
          const last = series.data.length - 1;
          const v = series.data[last];
          return (
            <g key={`marker-${series.name}`}>
              <circle cx={xAt(last)} cy={yAt(v)} r={3.5} fill={series.color} stroke="#0e141e" strokeWidth={1.5} />
              <text x={xAt(last) + 8} y={yAt(v) + 4} fill={series.color} fontSize={11} fontWeight={600}>
                {v.toFixed(2)}m
              </text>
            </g>
          );
        })}
        {hoverIndex !== null &&
          LIQUID_LEVEL_SERIES.map((series) => (
            <circle
              key={`hover-${series.name}`}
              cx={xAt(hoverIndex)}
              cy={yAt(series.data[hoverIndex])}
              r={5}
              fill={series.color}
              stroke="#0e141e"
              strokeWidth={1.5}
            />
          ))}
        {hoverIndex !== null && (
          <line
            x1={xAt(hoverIndex)}
            y1={pad.top}
            x2={xAt(hoverIndex)}
            y2={pad.top + plotH}
            stroke="rgba(0,242,255,0.45)"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
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
      {hoverIndex !== null && (
        <div className="chart-hover-tooltip visible" style={{ left: tooltipPos.left, top: tooltipPos.top }}>
          <div className="tooltip-time">{formatChartHour(hoverIndex)}</div>
          {LIQUID_LEVEL_SERIES.map((series) => (
            <div key={series.name} className="tooltip-row">
              <span className="tooltip-label">
                <span className="tooltip-dot" style={{ background: series.color }} />
                {series.name}
              </span>
              <span className="tooltip-value" style={{ color: series.color }}>
                {series.data[hoverIndex].toFixed(2)}m
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
