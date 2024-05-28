import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

interface BoxPlotProps {
    width: any;
    height: any;
    data: {
        min: number;
        Q1: number;
        median: number;
        Q3: number;
        max: number;
      };
}

const BoxPlot = ({ width, height, data }: BoxPlotProps) => {
  // 데이터 예시: { min: 10, Q1: 25, median: 50, Q3: 75, max: 90 }
  const { min, Q1, median, Q3, max } = data;

  const x = width / 2;
  const boxWidth = width * 0.4;
  const whiskerWidth = width * 0.1;

  return (
    <Svg height={height} width={width}>
      {/* Whiskers */}
      <Line x1={x} y1={height - min} x2={x} y2={height - Q1} stroke="black" strokeWidth="2" />
      <Line x1={x} y1={height - Q3} x2={x} y2={height - max} stroke="black" strokeWidth="2" />

      {/* Whisker Caps */}
      <Line x1={x - whiskerWidth / 2} y1={height - min} x2={x + whiskerWidth / 2} y2={height - min} stroke="black" strokeWidth="2" />
      <Line x1={x - whiskerWidth / 2} y1={height - max} x2={x + whiskerWidth / 2} y2={height - max} stroke="black" strokeWidth="2" />

      {/* Box */}
      <Rect x={x - boxWidth / 2} y={height - Q3} width={boxWidth} height={Q3 - Q1} fill="lightgrey" stroke="black" strokeWidth="2" />

      {/* Median */}
      <Line x1={x - boxWidth / 2} y1={height - median} x2={x + boxWidth / 2} y2={height - median} stroke="black" strokeWidth="2" />
    </Svg>
  );
};

export default BoxPlot;