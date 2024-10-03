'use client';

import React, { useEffect, useRef } from 'react';
import { Area } from '@antv/g2plot';

export default function AreaGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Area | null>(null); // To track the chart instance

  useEffect(() => {
    // Fetch data and render chart only if not already rendered
    if (!chartRef.current) {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
        .then((res) => res.json())
        .then((data) => {
          if (containerRef.current) {
            chartRef.current = new Area(containerRef.current, {
              data,
              xField: 'timePeriod',
              yField: 'value',
              xAxis: {
                range: [0, 1],
              },
              yAxis: {
                label: {
                  formatter: (val) => `${val}`, // Customize y-axis label if needed
                },
              },
              smooth: true, // Enable smooth curves
              areaStyle: { fill: 'l(90) 0:#1890ff 1:#f0f0f0' }, // Custom gradient fill
            });
            chartRef.current.render();
          }
        });
    }

    return () => {
      // Clean up the chart instance when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return <div id="chart" ref={containerRef} style={{ height: 400, width: '100%' }} />;
}
