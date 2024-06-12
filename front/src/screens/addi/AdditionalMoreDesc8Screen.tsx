import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC8>;

function AdditionalMoreDesc8Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>서울 동작구, 청년을 위한 '월세 1만원' 주택 개소</Text>
      <View>
        <Text style={styles.Title}>양녕 청년 주택</Text>
      </View>
      <Text style={styles.description}>서울 동작구에 위치한 '양녕 청년 주택'이 화제입니다. 이 주택은 저렴한 임대료와 고급스러운 인테리어로 주목받고 있는데요, 서울 한복판에서 월세가 1만원인 이 주택이 어떻게 가능한지 살펴보겠습니다.</Text>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏠 양녕 청년 주택 개소</Text>
        <Text style={styles.description}>동작구는 청년 주거비 부담을 줄이기 위해 서울시 최초로 '양녕 청년 주택'을 개소합니다. 오는 4월 30일 개소식을 앞두고 있는 이 주택은 35㎡(약 10.6평)의 크기로, 월세가 단돈 1만원에 불과합니다. 보증금 역시 기존 공공임대주택의 절반 수준으로 낮출 계획입니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>💰 파격적인 월세의 비결</Text>
        <Text style={styles.description}>이렇게 낮은 월세가 가능한 이유는 동작구 출자기관인 '대한민국동작주식회사'가 제1호 지역공헌 사업으로 얻은 수익금을 청년주택 임대료 지원 사업에 활용했기 때문입니다. 이를 통해 청년들에게 경제적인 주거 환경을 제공할 수 있게 되었습니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🌟 넉넉한 공간과 풀옵션</Text>
        <Text style={styles.description}>양녕 청년 주택은 월세가 저렴하지만, 공간은 넉넉합니다. 각 주택의 공급면적은 35㎡로, 냉장고, 드럼세탁기, 에어컨, 전기쿡탑, 레인지후드, 일체형 가구장 등 생활에 필요한 모든 것이 갖춰진 '풀옵션' 주택입니다. 지하 1층부터 지상 5층까지 총 36가구가 입주하며, 청년특화시설과 공영주차장도 마련되어 있습니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>📑 입주 대상 및 절차</Text>
        <Text style={styles.description}>입주 대상은 월평균 소득 50% 이하인 19세에서 39세의 무주택 청년입니다. 지난해 모집공고를 통해 올해 2월 입주 선정자가 발표되었으며, 호실 배정은 공개추첨으로 진행되었습니다. 입주는 4월 24일부터 6월까지 순차적으로 진행됩니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🙏 청년 주택 사업 확대</Text>
        <Text style={styles.description}>동작구는 이러한 청년형 주택 사업을 더욱 확대할 계획입니다. 올해 하반기에는 청년 1인 가구와 신혼부부를 위해 구에서 직접 구한 '전세임대주택'을 월세 1만원에 제공할 예정입니다.</Text>
      </View>
      <Text style={styles.textTitle}>박일하 동작구청장은 "만원주택은 서울 한복판에서 주거비 부담이 큰 저소득 청년과 청년 신혼부부에게 획기적으로 도움이 되는 지원책"이라며, "앞으로 청년임대주택 운영뿐만 아니라 청년 자립을 위한 다양한 프로그램도 확충해 나가겠다"고 밝혔습니다.</Text>
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

export default AdditionalMoreDesc8Screen;