import { colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {RadarChart} from '@salmonco/react-native-radar-chart';
// import {  PieChart } from "react-native-chart-kit";
import { BarChart, PieChart, PieChartPro} from "react-native-gifted-charts";


type AnalysisScreenProps = StackScreenProps<FeedStackParamList,typeof feedNavigations.ANALYSIS>;
const screenWidth = Dimensions.get('window').width;

function AnalysisScreen({route, navigation}: AnalysisScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);

  const pieData = [{value: 525, label: '소형', color: '#B4E0FF', text: '소형(525)'},
                    {value: 1277, label: '중소형', color: '#CCE6BA', text: '중소형(1277)'},
                    {value: 2308, label: '중형', color: '#FFE594', text: '중형(2308)'},
                    {value: 684, label: '중대형', color: '#C4C4E7', text: '중대형(684)'},
                    {value: 260, label: '대형', color: '#EC87A5', text: '대형(260)'},
  ];

  const customRadarData = [
    {label: '공공도서관(개)', value:Number(Number(post?.lib) / 0.639414)*40},
    {label: '약국(개)', value:Number(Number(post?.pharmacy) / 4.452253)*40},
    {label: '병원(개)', value:Number(Number(post?.hospital) / 255.145378)*40},
    {label: '편의점(개)', value:Number(Number(post?.conv) /  6.993952)*40},
    {label: '대형마트(개)', value:Number(Number(post?.mart) / 1.279391)*40},
    {label: '소방서(개)', value:Number(Number(post?.fire) / 1.735418)*40},
    {label: '경찰서(개)', value:Number(Number(post?.police) / 5.354590)*40},
  ];

  const boxPlotData = { min: 10, Q1: 25, median: 50, Q3: 75, max: 90 };
  const bar_data = [{value: 2052.13738334, label: '강남구', frontColor:'#EA96A3'},
                    {value: 985.41546748, label: '강동구', frontColor:'#E8968C'},
                    {value: 675.5636289, label: '강북구', frontColor:'#E2925A'},
                    {value: 852.6501438, label: '강서구', frontColor:'#CD974B'},
                    {value: 756.79327722, label: '관악구', frontColor:'#BB9B49'},
                    {value: 1097.16790419, label: '광진구', frontColor:'#AB9E47'},
                    {value: 710.22974615, label: '구로구', frontColor:'#9CA145'},
                    {value: 617.51255132, label: '금천구', frontColor:'#8BA647'},
                    {value: 704.08642743, label: '노원구', frontColor:'#70AC48'},
                    {value: 598.14906506, label: '도봉구', frontColor:'#48B062'},
                    {value: 847.1166751, label: '동대문구', frontColor:'#49AE83'},
                    {value: 1052.8814705, label: '동작구', frontColor:'#4AAD93'},
                    {value: 1227.15001543, label: '마포구', frontColor:'#4AAC9F'},
                    {value: 928.3871847, label: '서대문구', frontColor:'#4BABA9'},
                    {value: 1698.40769254, label: '서초구', frontColor:'#4EABB5'},
                    {value: 1246.29504398, label: '성동구', frontColor:'#4FACC3'},
                    {value: 769.85557001, label: '성북구', frontColor:'#54ACD5'},
                    {value: 1455.49880798, label: '송파구', frontColor:'#54ACD5'},
                    {value: 1010.63636977, label: '양천구', frontColor:'#7FAEE5'},
                    {value: 1027.50206318, label: '영등포구', frontColor:'#A3ACEA'},
                    {value: 1486.69126596, label: '용산구', frontColor:'#CE9BE9'},
                    {value: 731.12841927, label: '은평구', frontColor:'#E28CE7'},
                    {value: 1028.41075405, label: '종로구', frontColor:'#E890D7'},
                    {value: 1027.41973446, label: '중구', frontColor:'#E890C4'},
                    {value: 661.09762248, label: '중랑구', frontColor:'#E993B5'},
  ]

  return (
    <ScrollView style={styles.container}>
      <View>
          <Text style={styles.title}>분석 결과</Text>
        
        <View style={styles.chartContainer}>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>구별 아파트 규모 분포 비교</Text>
            <Text style={{fontSize:13}}>{post?.title}이(가) 위치한 {post?.gu}의 아파트 규모의 분포를 비교합니다.</Text>
          </View>
          
          <View style={styles.pieChart}>
          <PieChartPro
            donut
            showText
            textColor={colors[theme].GRAY_700}
            innerRadius={40}
            // showTextBackground
            // textBackgroundColor={colors[theme].GRAY_200}
            textSize={12}
            // textBackgroundRadius={22}
            labelsPosition='mid'
            data={pieData}
          />
          </View>
        </View>

        <View style={styles.list}>
          <View style={{gap: 10, }}>
            <Text style={styles.subtitle}>규모 구분 기준</Text>
            <Text>소형  : 40㎡미만 </Text>
            <Text>중소형 : 40㎡≤ ≤ 62.8㎡</Text>
            <Text>중형  : 62.8㎡≤ ≤95.86㎡</Text>
            <Text>중대형 : 95.86㎡≤ ≤135㎡</Text>
            <Text>대형  : 135㎡이상</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          
          
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtitle}>각 시설별 분포 비교</Text>
            <Text>{post?.title} 주변 시설의 분포를 확인합니다.</Text>
          </View>
        
        {/* <BoxPlot width={300} height={500} data={boxPlotData} /> */}

          <RadarChart
            data={customRadarData}
            size={350}
            gradientColor={{
              startColor: '#FF9432',
              endColor: '#FFF8F1',
              count: 7,
            }}
            stroke={['#FFE8D3', '#FFE8D3', '#FFE8D3', '#FFE8D3', '#ff9532']}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor="#433D3A"
            dataFillColor="#FF9432"
            dataFillOpacity={0.8}
            dataStroke='salmon'
            dataStrokeWidth={2}
            labelSize={12}
          />
      </View>

      <View style={styles.chartContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>구별 평균 평당가격 비교</Text>
          <Text>서울특별시 25개의 구의 평균 평당가격을 비교합니다. (만원)</Text>
        </View>
        
        {/* <Plotly data={radarData} layout={radarLayout} /> */}
        {/* <BoxPlot width={300} height={500} data={boxPlotData} /> */}
          <BarChart
            data={bar_data}
            width={screenWidth}
            height={200}
            barWidth={20}
            spacing={18}
            rotateLabel
            // showLine
            // lineData={bar_data}
          />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.subtitle}>구별 평균 평당가격 비교</Text>
        
        {/* <Plotly data={radarData} layout={radarLayout} /> */}
        {/* <BoxPlot width={300} height={500} data={boxPlotData} /> */}

          {/* <BarChart
            data={bar_data}
            width={screenWidth}
            height={220}
            barWidth={20}
            spacing={20}
            rotateLabel
          /> */}
        </View>
    </ScrollView>

  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex:1,
    margin: 20,
  },
  list: {
    flex:1,
    // alignItems: 'center'
    gap: 20,
    marginTop: 20,
  },
  header: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[theme].BLUE_MAIN,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  image: {
    // width: '100%',
    // height: '250%',
    marginTop: 20,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, 
    gap: 30,
  },
  pieChart: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('screen').width
  },
  barChart: {
    // flex: 1,
  },
});

export default AnalysisScreen;