import { PointStyle, LineStyle } from 'renderer/components/stats/LineChart';

interface ChartStyles {
  pointStyle: PointStyle;
  lineStyle: LineStyle;
}

const defaultStyles: ChartStyles = {
  pointStyle: {
    radius: 4,
    cursor: 'auto',
    fill: '#fff',
    stroke: '#fff',
    strokeWidth: 2,
    strokeOpacity: 1,
  },
  lineStyle: {
    cursor: 'auto',
    stroke: '#fff',
    strokeWidth: 2,
    strokeOpacity: 1,
    shapeRendering: 'geometricPrecision',
  },
};

export default defaultStyles;
