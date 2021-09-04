import React from 'react';

import { curveBasis } from '@visx/curve';
import { AreaClosed, LinePath } from '@visx/shape';
import { ScaleSVG } from '@visx/responsive';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { extent, max } from 'd3-array';

import theming from 'renderer/sass/variables/_theming.scss';

interface Point {
  value: number;
  date: Date;
  style: PointStyle;
}

interface Line {
  data: Point[];
  style: LineStyle;
}

interface drawableStyle {
  cursor: string;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
}

interface PointStyle extends drawableStyle {
  radius: number;
  fill: string;
}

interface LineStyle extends drawableStyle {
  shapeRendering: string;
}

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Props {
  data: Array<Line>;
  width: number;
  height: number;
  margin?: Margin;
  showPoints?: boolean;
  area?: boolean;
  scaleXMax?: number;
  bg?: string;
  title?: string;
  subtitle?: string;
}

class Chart extends React.Component<Props, {}> {
  static defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    showPoints: false,
    area: false,
    bg: theming.blockAccent,
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, width, height, margin, showPoints, area, scaleXMax, bg } =
      this.props;

    const allData = data
      .map((value) => value.data)
      .reduce((acc, curr) => acc.concat(curr), []);

    // data accessors
    const getX = (d: Point) => d.date;
    const getY = (d: Point) => d.value;

    // scales
    const xScale = scaleTime<number>({
      domain: extent(allData, getX) as [Date, Date],
    });
    const yScale = scaleLinear<number>({
      domain: [0, scaleXMax ? scaleXMax : (max(allData, getY) as number)],
    });

    // update scale output ranges
    xScale.range([0, width - margin?.left! - margin?.right!]);
    yScale.range([height - margin?.bottom! - margin?.top!, 0]);

    return (
      <div className="chart">
        <ScaleSVG width={width} height={height}>
          <rect width={width} height={height} fill={bg} rx={14} ry={14} />
          <Group top={margin?.top} left={margin?.left!}>
            {/* <AxisLeft scale={yScale} stroke="#fff" tickStroke="#fff" /> */}
            {width > 0 &&
              height > 0 &&
              data.map((series, i) => (
                <>
                  {/* should have a key */}
                  {area && (
                    <>
                      <LinearGradient
                        id={`area-gradient-${series.style.stroke}-${series.style.strokeOpacity}`}
                        from={series.style.stroke}
                        to={series.style.stroke}
                        fromOpacity={series.style.strokeOpacity * 0.5}
                        toOpacity={0}
                      />
                      <AreaClosed<Point>
                        curve={curveBasis}
                        data={series.data}
                        x={(p: Point) => xScale(getX(p)) ?? 0}
                        y={(p: Point) => yScale(getY(p)) ?? 0}
                        yScale={yScale}
                        stroke={`url(#area-gradient-${series.style.stroke}-${series.style.strokeOpacity})`}
                        fill={`url(#area-gradient-${series.style.stroke}-${series.style.strokeOpacity})`}
                        strokeWidth={series.style.strokeWidth}
                        strokeOpacity={series.style.strokeOpacity}
                        shapeRendering={series.style.shapeRendering}
                        key={`linepath-${i}`} // this needs to be changed to something unique, copilot is sometimes an idiot
                      />
                    </>
                  )}
                  <LinePath<Point>
                    curve={curveBasis}
                    data={series.data}
                    x={(p: Point) => xScale(getX(p)) ?? 0}
                    y={(p: Point) => yScale(getY(p)) ?? 0}
                    stroke={series.style.stroke}
                    strokeWidth={series.style.strokeWidth}
                    strokeOpacity={series.style.strokeOpacity}
                    shapeRendering={series.style.shapeRendering}
                    key={`linepath-${i}`} // this needs to be changed to something unique, copilot is sometimes an idiot
                  />
                </>
              ))}
            {showPoints &&
              data.map((series, i) =>
                series.data.map((point, j) => (
                  <circle
                    r={point.style.radius}
                    cursor={point.style.cursor}
                    cx={xScale(getX(point)) ?? 0}
                    cy={yScale(getY(point)) ?? 0}
                    fill={point.style.fill}
                    strokeWidth={point.style.strokeWidth}
                    strokeOpacity={point.style.strokeOpacity}
                    key={`point-${i}-${j}`} // this needs to be changed to something unique, copilot is sometimes an idiot
                  />
                ))
              )}
          </Group>
        </ScaleSVG>
        <div className="chart-title">
          <h2 style={{ color: '#fff' }}>{this.props.title}</h2>
          <h3>{this.props.subtitle}</h3>
        </div>
      </div>
    );
  }
}

export default Chart;
export { Chart, Point, Line, PointStyle, LineStyle };
