import { colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RadarChart} from '@salmonco/react-native-radar-chart';
import { BarChart, PieChartPro} from "react-native-gifted-charts";
import BoxPlot from '@/components/feed/BoxPlot';
import useGetAnalysis from '@/hooks/queries/useGetAnalysis';


type AnalysisScreenProps = StackScreenProps<FeedStackParamList,typeof feedNavigations.ANALYSIS>;
const screenWidth = Dimensions.get('window').width;

function AnalysisScreen({route, navigation}: AnalysisScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {id} = route.params;
  const {data: post} = useGetPost(id);
  const {data: result = []} = useGetAnalysis();

  console.log("post?.gu", post?.gu)

  // const test = result.filter(item => item.num === 1 && item.check === post?.gu);
  // console.log("test",test);
  // const first = result.filter(item => item.num === 1 && item.check === post?.gu)[0];
  // if(!first) console.log("first 안 들어옴");
  // const first_total = first.min+first.Q1+first.median+first.Q3+first.max;

  // const pieData = [{value: first.min, color: '#B4E0FF', text: `소형(${Math.floor(100*first.min/first_total)}%)`},
  //                   {value: first.Q1, color: '#CCE6BA', text: `중소형(${Math.floor(100*first.Q1/first_total)}%)`},
  //                   {value: first.median, color: '#FFE594', text: `중형(${Math.floor(100*first.median/first_total)}%)`},
  //                   {value: first.Q3, color: '#C4C4E7', text: `중대형(${Math.floor(100*first.Q3/first_total)}%)`},
  //                   {value: first.max, color: '#EC87A5', text: `대형(${Math.floor(100*first.max/first_total)}%)`},
  // ];

  // const second = result.filter(item => item.num === 2 && item.check === post?.dong)[0];
  // const second_total = second.min+second.Q1+second.median+second.Q3+second.max;
  // // console.log(first);

  // const pieData_2 = [{value: second.min, color: '#B4E0FF', text: `소형(${Math.floor(100*second.min/second_total)}%)`},
  //                   {value: second.Q1, color: '#CCE6BA', text: `중소형(${Math.floor(100*second.Q1/second_total)}%)`},
  //                   {value: second.median, color: '#FFE594', text: `중형(${Math.floor(100*second.median/second_total)}%)`},
  //                   {value: second.Q3, color: '#C4C4E7', text: `중대형(${Math.floor(100*second.Q3/second_total)}%)`},
  //                   {value: second.max, color: '#EC87A5', text: `대형(${Math.floor(100*second.max/second_total)}%)`},
  // ];

  const customRadarData = [
    {label: '공공도서관(개)', value:Number(Number(post?.lib) / 0.639414)*40},
    {label: '약국(개)', value:Number(Number(post?.pharmacy) / 4.452253)*40},
    {label: '병원(개)', value:Number(Number(post?.hospital) / 255.145378)*40},
    {label: '편의점(개)', value:Number(Number(post?.conv) /  6.993952)*40},
    {label: '대형마트(개)', value:Number(Number(post?.mart) / 1.279391)*40},
    {label: '소방서(개)', value:Number(Number(post?.fire) / 1.735418)*40},
    {label: '경찰서(개)', value:Number(Number(post?.police) / 5.354590)*40},
  ];

  const house_scale = Number(post?.area) < 40 ? '소형'
                    : Number(post?.area) < 62.8 ? '중소형'
                    : Number(post?.area) < 95.86 ? '중형'
                    : Number(post?.area) < 135 ? '중대형'
                    : '대형';
  // const fourth = result.filter(item => item.num === 4 && item.check === post?.payment && item.option === house_scale)[0];
  // console.log('fourth', fourth);
  // const fourth_min = ((fourth.min - fourth.min) / (fourth.max - fourth.min)) * (300 - 0) + 0;
  // const fourth_Q1 = ((fourth.Q1 - fourth.min) / (fourth.max - fourth.min)) * (300 - 0) + 0;
  // const fourth_median = ((fourth.median - fourth.min) / (fourth.max - fourth.min)) * (300 - 0) + 0;
  // const fourth_Q3 = ((fourth.Q3 - fourth.min) / (fourth.max - fourth.min)) * (300 - 0) + 0;
  // const fourth_max = ((fourth.max - fourth.min) / (fourth.max - fourth.min)) * (300 - 0) + 0;
  // const boxPlotData = { min: fourth_min, Q1: fourth_Q1, median: fourth_median, Q3: fourth_Q3, max: fourth_max };
  
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
        
        {/* {post?.category=='apart'&&<View style={styles.chartContainer}>
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
            textSize={12}
            labelsPosition='mid'
            data={pieData}
          />
          </View>
        </View>}

        {post?.category=='apart'&&<View style={styles.chartContainer}>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>동별 아파트 규모 분포 비교</Text>
            <Text style={{fontSize:13}}>{post?.title}이(가) 위치한 {post?.dong}의 아파트 규모의 분포를 비교합니다.</Text>
          </View>
          
          <View style={styles.pieChart}>
          <PieChartPro
            donut
            showText
            textColor={colors[theme].GRAY_700}
            innerRadius={40}
            textSize={12}
            labelsPosition='mid'
            data={pieData_2}
          />
          </View>
        </View>}

        {post?.category=='apart'&&<View style={styles.list}>
          <View style={{gap: 10, }}>
            <Text style={styles.subtitle}>규모 구분 기준</Text>
            <Text>소형  : 40㎡미만 </Text>
            <Text>중소형 : 40㎡≤ ≤ 62.8㎡</Text>
            <Text>중형  : 62.8㎡≤ ≤95.86㎡</Text>
            <Text>중대형 : 95.86㎡≤ ≤135㎡</Text>
            <Text>대형  : 135㎡이상</Text>
          </View>
        </View>} */}

      <View style={styles.chartContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>구별 평균 평당가격 비교</Text>
          <Text>서울특별시 25개의 구의 평균 평당가격을 비교합니다. (만원)</Text>
        </View>
          <BarChart
            data={bar_data}
            width={screenWidth}
            height={200}
            barWidth={20}
            spacing={18}
            rotateLabel
          />
        </View>
      </View>

      <View style={styles.chartContainer}>
          <View></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtitle}>각 시설별 분포 비교</Text>
            <Text>{post?.title} 주변 시설의 분포를 확인합니다.</Text>
          </View>
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


      {/* {post?.category=='apart'&&<View style={[styles.chartContainer, {marginVertical:20,}]}>
        <Text style={styles.subtitle}>동일 규모내의 가격 비교</Text>
        <View style={styles.boxsPlotContainer}>
          <BoxPlot width={300} height={300} data={boxPlotData} />
        </View>

        </View>} */}
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
    paddingTop: 20,
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
  boxsPlotContainer: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_400,
    
  },
});

export default AnalysisScreen;