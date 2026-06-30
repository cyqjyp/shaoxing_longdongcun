export function formatChartHour(index: number) {
  return `${String(index).padStart(2, '0')}:00`;
}

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function createScales(
  dataLength: number,
  pad: ChartPadding,
  plotW: number,
  plotH: number,
  yMin: number,
  yMax: number,
) {
  const xAt = (i: number) => pad.left + (i / (dataLength - 1)) * plotW;
  const yAt = (v: number) => pad.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  return { xAt, yAt };
}

export function indexFromSvgEvent(
  e: React.MouseEvent<SVGRectElement>,
  svg: SVGSVGElement,
  pad: ChartPadding,
  plotW: number,
  plotH: number,
  pointCount: number,
) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse());
  if (!loc) return null;
  if (loc.x < pad.left || loc.x > pad.left + plotW || loc.y < pad.top || loc.y > pad.top + plotH) {
    return null;
  }
  const idx = Math.round(((loc.x - pad.left) / plotW) * (pointCount - 1));
  return Math.max(0, Math.min(pointCount - 1, idx));
}

export function tooltipPosition(
  container: HTMLElement,
  svg: SVGSVGElement,
  x: number,
  padTop: number,
  tooltip: HTMLElement,
) {
  const containerRect = container.getBoundingClientRect();
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = padTop;
  const screenPt = pt.matrixTransform(svg.getScreenCTM()!);
  let left = screenPt.x - containerRect.left - tooltip.offsetWidth / 2;
  let top = screenPt.y - containerRect.top - tooltip.offsetHeight - 10;
  left = Math.max(4, Math.min(left, containerRect.width - tooltip.offsetWidth - 4));
  top = Math.max(4, top);
  return { left, top };
}
