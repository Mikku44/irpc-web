'use client';

import React, { useEffect, useRef } from 'react';
import { Line } from '@antv/g2plot';
import { ShortDateFormator } from '../ultilities/DateFormater';
import extractKeys from '../ultilities/ExtractKeys';

export default function MultiLineGraph({ data }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Line | null>(null); // To track the chart instance


    useEffect(() => {

        // console.log("DATA : ", data)

        const keys = data ? extractKeys(data) : []
        // console.log("KEYS : ", keys)

        // Fetch data and render chart only if not already rendered
        if (!chartRef.current) {
            if (containerRef.current) {
                chartRef.current = new Line(containerRef.current, {
                    data: data?.length > 0 ? data : [{
                        "timePeriod": "2006 Q3",
                        "value": 1
                    }, {
                        "timePeriod": "2006 Q3",
                        "value": 10
                    },],
                    isStack:false,
                    seriesField:  keys.length > 0 ? keys[0] : 'name',
                    xField: keys.length > 0 ? keys[1] : 'timePeriod',
                    yField: keys.length > 0 ? keys[2] : 'value',
                    xAxis: {
                        label: {
                            formatter: (val) => {
                                try {
                                    return ShortDateFormator(new Date(val.split(" ").join("T")))

                                } catch (error) {
                                    return val
                                }
                            }
                        },
                        range: [0, 1],

                    },
                    yAxis: {
                        label: {
                            formatter: (val) => `${val}`, // Customize y-axis label if needed
                        },
                        range: [0, 1]
                    },
                    smooth: true, // Enable smooth curves
                    //   areaStyle: { fill: 'l(90) 0:#1890ff 1:#f0f0f0' }, // Custom gradient fill
                    area: {
                        style: {
                          fillOpacity: 0.15,
                          areaStyle: { fill: 'l(90) 0:#1890ff 1:#f0f0f0' },
                        },
                      },
                });
                chartRef.current.render();
            }
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
