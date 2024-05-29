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
import BoxesPlot from '@/components/feed/BoxesPlot';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


type AnalysisScreenProps = StackScreenProps<FeedStackParamList,typeof feedNavigations.ANALYSIS>;
const screenWidth = Dimensions.get('window').width;

function AnalysisScreen({route, navigation}: AnalysisScreenProps) {
  const {theme} = useThemeStore();

  const {id} = route.params;
  const {data: post} = useGetPost(id);
  const {data: result = []} = useGetAnalysis();

  const house_scale = Number(post?.area) < 40 ? '소형'
                    : Number(post?.area) < 62.8 ? '중소형'
                    : Number(post?.area) < 95.86 ? '중형'
                    : Number(post?.area) < 135 ? '중대형'
                    : '대형';

  const first = result.filter(item => item.num === 1 && item.check === post?.gu)[0];
  const first_total = first.min+first.Q1+first.median+first.Q3+first.max;

  const pieData = [{value: first.min, color: '#B4E0FF', text: `소형(${Math.floor(100*first.min/first_total)}%)`},
                    {value: first.Q1, color: '#CCE6BA', text: `중소형(${Math.floor(100*first.Q1/first_total)}%)`},
                    {value: first.median, color: '#FFE594', text: `중형(${Math.floor(100*first.median/first_total)}%)`},
                    {value: first.Q3, color: '#C4C4E7', text: `중대형(${Math.floor(100*first.Q3/first_total)}%)`},
                    {value: first.max, color: '#EC87A5', text: `대형(${Math.floor(100*first.max/first_total)}%)`},
  ];

  const second = result.filter(item => item.num === 2 && item.check === post?.dong)[0];
  const second_total = second.min+second.Q1+second.median+second.Q3+second.max;
  // console.log(first);

  const pieData_2 = [{value: second.min, color: '#B4E0FF', text: `소형(${Math.floor(100*second.min/second_total)}%)`},
                    {value: second.Q1, color: '#CCE6BA', text: `중소형(${Math.floor(100*second.Q1/second_total)}%)`},
                    {value: second.median, color: '#FFE594', text: `중형(${Math.floor(100*second.median/second_total)}%)`},
                    {value: second.Q3, color: '#C4C4E7', text: `중대형(${Math.floor(100*second.Q3/second_total)}%)`},
                    {value: second.max, color: '#EC87A5', text: `대형(${Math.floor(100*second.max/second_total)}%)`},
  ];

  const colorss = ['#EA96A3', '#E8968C', '#E2925A', '#CD974B', '#BB9B49', '#AB9E47', '#9CA145', 
                    '#8BA647', '#70AC48', '#48B062', '#49AE83', '#4AAD93', '#4AAC9F', '#4BABA9', 
                    '#4EABB5', '#4FACC3', '#54ACD5', '#54ACD5', '#7FAEE5', '#A3ACEA', '#CE9BE9', 
                    '#E28CE7', '#E890D7', '#E890C4', '#E993B5'
                  ];

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

  const third = result.filter(item => item.num === 3 && item.check === post?.gu);

  let max_final = -Infinity;
  let min_final = Infinity;

  third.forEach(item => {
    if (item.max > max_final) {
      max_final = item.max;
    }
    if (item.min < min_final) {
      min_final = item.min;
    }
  });

  const updatedThird = third.map((item, index) => {
    return {
      ...item,
      color: colorss[index % colorss.length]
    };
  });

  const styles = styling(theme, third.length);

  const customRadarData = [
    {label: '공공도서관(개)', value:Number(Number(post?.lib) / 0.639414)*40},
    {label: '약국(개)', value:Number(Number(post?.pharmacy) / 4.452253)*40},
    {label: '병원(개)', value:Number(Number(post?.hospital) / 255.145378)*40},
    {label: '편의점(개)', value:Number(Number(post?.conv) /  6.993952)*40},
    {label: '대형마트(개)', value:Number(Number(post?.mart) / 1.279391)*40},
    {label: '소방서(개)', value:Number(Number(post?.fire) / 1.735418)*40},
    {label: '경찰서(개)', value:Number(Number(post?.police) / 5.354590)*40},
  ];

  const fourth = result.filter(item => item.num === 4 && item.check === post?.payment && item.option === house_scale)[0];
  const fourth_min = ((fourth.min - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20;
  const fourth_Q1 = ((fourth.Q1 - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20;
  const fourth_median = ((fourth.median - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20;
  const fourth_Q3 = ((fourth.Q3 - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20;
  const fourth_max = ((fourth.max - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20;
  const boxPlotData = { min: fourth_min, Q1: fourth_Q1, median: fourth_median, Q3: fourth_Q3, max: fourth_max };
  
  
  return (
    <ScrollView style={styles.container}>
      <View>
          <Text style={styles.title}>분석 결과</Text>
        

      {/* ------------------------------------------------------- */}
        {post?.category=='apart'&&
        <View style={[styles.chartContainer]}>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>구별 아파트 규모 분포 비교</Text>
            <Text style={styles.description}>{post?.title}이(가) 위치한 {post?.gu}의 아파트 규모의 분포를 비교합니다.</Text>
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


      {/* ------------------------------------------------------- */}
        {/* 2번째 그래프 */}
        {post?.category=='apart'&&
        <View style={[styles.chartContainer, {borderBottomWidth: 0}]}>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>동별 아파트 규모 분포 비교</Text>
            <Text style={styles.description}>{post?.title}이(가) 위치한 {post?.dong}의 아파트 규모의 분포를 비교합니다.</Text>
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

        {post?.category=='apart'&&
        <View style={styles.list}>
          <View style={styles.listContainer}>
            <Text style={styles.subtitle}>규모 구분 기준</Text>
            <Text>소형  : 40㎡미만 </Text>
            <Text>중소형 : 40㎡≤ ≤ 62.8㎡</Text>
            <Text>중형  : 62.8㎡≤ ≤95.86㎡</Text>
            <Text>중대형 : 95.86㎡≤ ≤135㎡</Text>
            <Text>대형  : 135㎡이상</Text>
          </View>
        </View>}


      {/* ------------------------------------------------------- */}
      {/* 3번째 그래프 */}
      <View style={[styles.chartContainer, {marginBottom: 50}]}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>구별 평균 평당가격 비교</Text>
          <Text style={styles.description}>서울특별시 25개의 구의 평균 평당가격을 비교합니다. (만원)</Text>
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


      {/* ------------------------------------------------------- */}
      {/* 4번째 그래프 */}
      <View style={[styles.chartContainer, {paddingBottom:30}]}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.subtitle}>동별 평당가격 분포 비교</Text>
          <Text style={styles.description}>{post?.title}이(가) 위치한 {post?.gu}의 속한 {third.length}개의 동의 평당가격 분포를 비교합니다. (만원)</Text>
        </View>
        <View>
          <ScrollView horizontal>
            <View style={{justifyContent:'space-between', alignItems: 'flex-end', marginRight:5,}}>
              <Text>{Math.trunc(max_final)}</Text>
              <Text style={{bottom:110}}>{Math.trunc(min_final)}</Text>
            </View>
          <View style={styles.boxesPlotContainer}>
          {updatedThird.map(({num, check, option, color, ...input}) => (
              <View style={styles.oneBox}>
              <BoxesPlot 
                  width={50} 
                  height={200} 
                  data={input} 
                  color={color}
                  my={Number(post?.price)}
                  min_final={min_final}
                  max_final={max_final}
                />
                <Text style={option==post?.dong?styles.selectedText:styles.normal}>{option}</Text>
                {option==post?.dong&&<MaterialIcons name='arrow-upward' style={{color:colors[theme].RED_700}}/>}
              </View>))}
            </View>
          </ScrollView>
          <Text></Text>
        </View>
      </View>

      {/* ------------------------------------------------------- */}
      {/* 5번째 그래프 */}
      <View style={styles.chartContainer}>
          <View></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtitle}>각 시설별 분포 비교</Text>
            <Text style={styles.description}>{post?.title} 주변 시설의 분포를 확인합니다.</Text>
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

      {/* ------------------------------------------------------- */}
      {/* 6번째 그래프 */}
      {post?.category=='apart'&&
      <View style={[styles.chartContainer, {marginVertical:20, borderBottomWidth:0}]}>
          <Text style={styles.subtitle}>동일 규모내의 가격 비교</Text>
          <View style={styles.boxPlotContainer}>
            <BoxPlot 
                width={300} 
                height={320} 
                data={boxPlotData} 
                color='#74B6A1' 
                my={((post.price - fourth.min) / (fourth.max - fourth.min)) * (300 - 20) + 20}
            />
          </View>
        </View>}
      </View>
    </ScrollView>
  )
}

const styling = (theme: ThemeMode, third: number) => StyleSheet.create({
  container: {
    flex:1,
    margin: 20,
  },
  list: {
    alignItems: 'center',
    flex:1,
    // alignItems: 'center'
    marginLeft: 10,
    gap: 20,
    marginTop: 10,
    paddingBottom: 20,
    borderBottomColor: colors[theme].GRAY_500,
    borderBottomWidth: 1,
  },
  listContainer: {
    gap: 10, 
    padding: 20,
    borderColor:colors[theme].GRAY_400, 
    borderWidth: 2,
    borderRadius: 20,
  },
  header: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors[theme].BLUE_MAIN,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 10,
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
    marginTop: 20,
    marginBottom: 10, 
    paddingBottom: 40,
    gap: 30,
    borderBottomColor: colors[theme].GRAY_500,
    borderBottomWidth: 1,
  },
  pieChart: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('screen').width
  },
  barChart: {
    // flex: 1,
  },
  boxPlotContainer: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_400,
  },
  boxesPlotContainer: {
    flexDirection: 'row',
    gap: 0,
    borderColor: colors[theme].GRAY_700,
    borderWidth: 1,
    width: 50*third,
    height: 200,
  },
  oneBox:{
    width: 50,
    alignItems: 'center',
    gap: 8,
  },
  selectedText:{
    color: colors[theme].RED_700,
    fontWeight: '800',
  },
  normal: {},
  description: {
    fontSize: 13, 
    padding: 10,
    fontFamily: ''
  },
});

export default AnalysisScreen;