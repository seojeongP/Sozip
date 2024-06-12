import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC6>;

function AdditionalMoreDesc6Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>수도권 소형 빌라 임대차 시장의 월세 비중, 역대 최고 기록</Text>
      <View>
        <Text style={styles.Title}>늘어나는 월세</Text>
      </View>
      <Text style={styles.description}>최근 부동산 시장에서 월세의 비중이 역대 최고치를 기록했습니다. 특히, 수도권 소형 빌라 임대차 시장에서 이러한 현상이 두드러지고 있는데요. 전세 사기로 인한 불안감이 원인으로 작용하고 있습니다.</Text>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🌟 1분기 통계 분석</Text>
        <Text style={styles.description}>부동산 정보제공업체 경제만랩이 국토교통부의 실거래가 공개시스템을 분석한 결과, 2024년 1분기 서울·경기·인천 지역의 전용면적 60㎡ 이하 빌라(연립·다세대) 전월세 거래량은 총 5만891건이었으며, 이 중 월세 거래는 2만7,510건(54.1%)을 차지했습니다. 이는 2011년 통계 집계 시작 이래 1분기 기준으로 가장 높은 수치입니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏦 월세 비중 증가 추세</Text>
        <Text style={styles.description}>월세 비중은 매년 꾸준히 증가하고 있습니다. 2020년 1분기에는 31.5%였던 월세 비중이 2021년 32.0%, 2022년 39.9%, 2023년 49.0%로 지속적으로 상승해왔습니다.</Text>
        <Text style={styles.textTitle}>  - 경기도: 1분기 전체 거래 1만4,361건 중 7,916건(55.1%)이 월세 거래.</Text>
        <Text style={styles.textTitle}>  - 서울: 전체 전월세 거래 3만3,043건 중 1만7,937건(54.3%)이 월세 거래.</Text>
        <Text style={styles.textTitle}>  - 인천: 전체 3,487건 중 1,657건(47.5%)이 월세 거래.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🙏 원인과 전망</Text>
        <Text style={styles.description}>경제만랩의 황한솔 리서치연구원은 "전세 사기로 보증금을 돌려받지 못할 수 있다는 불안감이 지속하면서 수도권 소형 빌라 임대차 시장이 전세에서 월세 중심으로 빠르게 바뀌고 있다"고 설명했습니다. 전세보증금에 대한 안전한 회수 인식이 자리 잡기 전까지는 월세 선호 현상이 더욱 두드러질 것으로 예상됩니다.</Text>
      </View>
      <Text style={styles.textTitle}>수도권 소형 빌라 임대차 시장의 변화 추이를 주목하며, 임차인들은 이러한 현황을 고려하여 신중한 결정이 필요합니다.</Text>
      </View>
    </ScrollView>
  )
}

const styling = (theme: ThemeMode)=> StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 20,
  },
  textTitle: {
    color: colors[theme].BLACK,
    fontSize: 17,
    fontWeight: '500',
  },
  Title: {
    color: colors[theme].BLACK,
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    color: colors[theme].BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
  description: {
    color: colors[theme].BLACK,
    fontSize: 13,
    fontWeight: '300',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
});

export default AdditionalMoreDesc6Screen;