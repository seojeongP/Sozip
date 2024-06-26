import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import React from 'react';
import { Text, View } from 'react-native';
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
    color: string;
    my: number;
}

const BoxPlot = ({ width, height, data, color, my }: BoxPlotProps) => {
  const {theme} = useThemeStore();
  
  // 데이터 예시: { min: 10, Q1: 25, median: 50, Q3: 75, max: 90 }
  const { min, Q1, median, Q3, max } = data;

  const x = width / 2;
  const boxWidth = width * 0.7;
  const whiskerWidth = width * 0.1;

  return (
    <View>
      {/* <Text style={{position:'absolute',left:width/4*3+10, top:height-my-20,color: colors[theme].RED_500, fontSize: 15, fontWeight: '700'}}>상위 {Math.round(my/max*100)}%</Text> */}
      <Svg height={height} width={width}>
        <Line x1={0} y1={height/2} x2={width} y2={height/2} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/4} x2={width} y2={height/4} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/4*3} x2={width} y2={height/4*3} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/8} x2={width} y2={height/8} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/8*3} x2={width} y2={height/8*3} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/8*5} x2={width} y2={height/8*5} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        <Line x1={0} y1={height/8*7} x2={width} y2={height/8*7} stroke={colors[theme].GRAY_400} strokeWidth="1" strokeDasharray="2, 2"/>
        
        <Line x1={0} y1={height - my} x2={width} y2={height - my} stroke={colors[theme].RED_500} strokeWidth="2" strokeDasharray="4, 4"/>
        
        {/* Whiskers */}
        <Line x1={x} y1={height - min} x2={x} y2={height - Q1} stroke={colors[theme].GRAY_700} strokeWidth="1" />
        <Line x1={x} y1={height - Q3} x2={x} y2={height - max} stroke={colors[theme].GRAY_700} strokeWidth="1" />

        {/* Whisker Caps */}
        <Line x1={x - whiskerWidth} y1={height - min} x2={x + whiskerWidth} y2={height - min} stroke={colors[theme].GRAY_700} strokeWidth="2" />
        <Line x1={x - whiskerWidth} y1={height - max} x2={x + whiskerWidth} y2={height - max} stroke={colors[theme].GRAY_700} strokeWidth="2" />

        {/* Box */}
        <Rect x={x - boxWidth / 2} y={height - Q3} width={boxWidth} height={Q3 - Q1} fill={color} stroke={colors[theme].GRAY_700} strokeWidth="0.7" />

        {/* Median */}
        <Line x1={x - boxWidth / 2} y1={height - median} x2={x + boxWidth / 2} y2={height - median} stroke={colors[theme].GRAY_700} strokeWidth="1" />
      </Svg>
    </View>
  );
};

export default BoxPlot;