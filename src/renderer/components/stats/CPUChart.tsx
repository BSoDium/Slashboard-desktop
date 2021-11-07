import React from 'react';

import { ParentSize } from '@visx/responsive';
import { Chart, Point, Line } from 'renderer/components/stats/Chart';
import defaultStyles from 'renderer/components/stats/ChartStyles';
import OWStack from 'renderer/utils/OWStack';
import ColorGen from 'renderer/utils/ColorGen';
import Storage from 'renderer/utils/Storage';

interface Props {
  coreStates: Array<{
    model: string;
    speed: number;
    load: number;
  }>;
  duration: number;
  title: string;
  subtitle: string;
  stroke?: string; // if not set, will be generated
}

interface State {
  areaChart: boolean; // if only one core is provided, show area chart
}

/**
 * A chart showing cpu usage accross time.
 */
class CPUChart extends React.Component<Props, State> {
  data: Array<OWStack<Point>>;

  constructor(props: Props) {
    super(props);

    const { coreStates } = props;
    this.state = {
      areaChart: coreStates.length === 1,
    };

    // instantiate and initialize stacks
    this.data = new Array<OWStack<Point>>(coreStates.length);

    const { duration } = this.props;
    for (let i = 0; i < this.data.length; i += 1) {
      this.data[i] = new OWStack<Point>(duration, (j) => {
        const t = new Date();
        t.setSeconds(t.getSeconds() - duration + j);
        return {
          value: 0,
          date: t,
          style: defaultStyles.pointStyle,
        };
      });
    }
  }

  render() {
    const { coreStates, title, subtitle, stroke } = this.props;
    const { areaChart } = this.state;
    const { dynamicCPUScale } = Storage.internals.settings;

    // convert the Array of stacks to an array of Lines
    const arrayData = new Array<Line>();
    for (let i = 0; i < this.data.length; i += 1) {
      // push the new cpu values for each core
      this.data[i].push({
        value: coreStates[i].load,
        date: new Date(),
        style: defaultStyles.pointStyle,
      });

      // push each new Line to the previously created array
      arrayData.push({
        data: this.data[i].toArray(),
        style: {
          cursor: 'auto',
          stroke: stroke || ColorGen.generate(i, [9, 31, 47]),
          strokeWidth: 2,
          strokeOpacity: 1,
          shapeRendering: 'geometricPrecision',
        },
      });
    }

    return (
      <div className="chart-wrapper">
        <ParentSize>
          {(parent) => {
            return (
              <Chart
                data={arrayData}
                width={parent.width}
                height={300}
                scaleYMax={100}
                area={areaChart}
                title={title}
                subtitle={subtitle}
                dynamicScale={dynamicCPUScale}
              />
            );
          }}
        </ParentSize>
      </div>
    );
  }
}

export default CPUChart;
