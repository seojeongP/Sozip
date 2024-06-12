import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Linking, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC3>;

function AdditionalMoreDesc3Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>청년들을 위한 대출을 알아보자!</Text>
      <View>
        <Text style={styles.Title}>2024 청년대출 총정리</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.description}>----------------------------------------------------</Text>
        <Text style={styles.subTitle}>📌 2024 청년대출 3줄 요약</Text>
        <Text style={styles.description}>1. 정부에서는 경기 침체와 취업난으로 고통받고 있는 청년을 위한 정책 대출 상품을 제공해요.</Text>
        <Text style={styles.description}>2. 청년은 만 19세 이상 ~ 만 34세 이하의 성인을 의미해요.</Text>
        <Text style={styles.description}>3. 대표적인 청년 대출로 햇살론 유스, 청년전용 버팀목전세자금대출, 중기청 대출 등이 있어요.</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
        <Text style={styles.description}>계속되는 경기 침체와 취업난으로 어려운 청년분들 많으시죠. 자금 문제로 어려움을 겪고 있는 청년분들을 위해, 2024년 청년을 위한 정책 대출 상품들을 정리해드릴게요.</Text>
        <Text style={styles.description}>청년 기준 먼저 알아두세요! 만 19세 이상 ~ 만 34세 이하의 성년</Text>
      </View>

      <View style={{gap: 10}}>
      <Text style={styles.description}>----------------------------------------------------</Text>
        <Pressable onPress={()=>Linking.openURL('https://www.kinfa.or.kr/financialProduct/loanProductGlance.do').catch((err) => console.error('An error occurred', err))}>
            <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>1️⃣ 햇살론 유스</Text>
        </Pressable>
        <Text style={styles.description}>햇살론 유스는 신용 내역이 부족한 대학생, 미취업 청년이 이용할 수 있는 정부 대출 상품이에요.</Text>
        <Text style={styles.subTitle}>대출 대상</Text>
        <Text style={styles.description}> · 만 19세 이상 ~ 만 34세 이하</Text>
        <Text style={styles.description}> · 연소득 3,500만 원 이하이며 취업준비생 또는 중소기업에 1년 이하 재직 중인 자</Text>
        <Text style={styles.subTitle}>대출 금리 및 한도</Text>
        <Text style={styles.description}> · 연 3.5%</Text>
        <Text style={styles.description}> · 최대 1,200만 원 이내</Text>
        <Text style={styles.description}>*서민금융진흥원, 2024.04.23. 기준</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
      </View>

      <View style={{gap: 10}}>
        <Pressable onPress={()=>Linking.openURL('https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020301.jsp').catch((err) => console.error('An error occurred', err))}>
            <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>2️⃣ 청년전용 버팀목전세자금대출</Text>
        </Pressable>
        <Text style={styles.description}>청년전용 버팀목전세자금대출은 전세자금이 부족한 청년들을 위한 정부 대출 상품이에요.</Text>
        <Text style={styles.subTitle}>대출 대상</Text>
        <Text style={styles.description}> · 만 19세 이상 ~ 만 34세 이하</Text>
        <Text style={styles.description}> · 대출 신청자와 배우자의 합산 총소득*이 5천만 원 이하인 무주택자</Text>
        <Text style={styles.description}> · 소득 3분위 전체가구 평균값 이하 (2024년 기준 3.45억 원)</Text>
        <Text style={styles.description}> *다자녀가구 및 2자녀 가구 6천만 원 이하, 신혼가구 7.5천만 원 이하</Text>
        <Text style={styles.subTitle}>대출 금리 및 한도</Text>
        <Text style={styles.description}> · 연 1.8%~2.7%</Text>
        <Text style={styles.description}> · 최대 2억 원 이내</Text>
        <Text style={styles.description}> *주택도시기금, 2024.04.23. 기준</Text>
        <Text style={styles.description}> **임차보증금의 80% 이내</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
      </View>

      <View style={{gap: 10}}>
        <Pressable onPress={()=>Linking.openURL('https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020701.jsp').catch((err) => console.error('An error occurred', err))}>
            <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>3️⃣ 청년전용 보증부월세대출</Text>
        </Pressable>
        <Text style={styles.description}>청년전용 보증부월세대출은 전월세보증금이나 월세가 부족한 청년들을 위한 저금리 대출 상품이에요.</Text>
        <Text style={styles.subTitle}>대출 대상</Text>
        <Text style={styles.description}> · 만 19세 이상 ~ 만 34세 이하</Text>
        <Text style={styles.description}> · 대출 신청자와 배우자의 합산 총소득*이 5천만 원 이하인 무주택자</Text>
        <Text style={styles.description}> · 소득 3분위 전체가구 평균값 이하 (2024년 기준 3.45억 원)</Text>
        <Text style={styles.description}> *다자녀가구 및 2자녀 가구 6천만 원 이하, 신혼가구 7.5천만 원 이하</Text>
        <Text style={styles.subTitle}>대출 금리 및 한도</Text>
        <Text style={styles.description}> · 보증금: 연 1.3%, 최대 4,500만 원 이내</Text>
        <Text style={styles.description}> · 월세금: 연 0%~1.0%, 최대 1,200만 원</Text>
        <Text style={styles.description}> *주택도시기금, 2024.04.23. 기준</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
      </View>

      <View style={{gap: 10}}>
        <Pressable onPress={()=>Linking.openURL('https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020601.jsp').catch((err) => console.error('An error occurred', err))}>
            <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>4️⃣ 중소기업취업청년 전월세보증금대출</Text>
        </Pressable>
        <Text style={styles.description}>중소기업취업청년 전월세보증금대출은 중소기업에 취업한 청년들을 위한 저금리의 전월세보증금 대출이에요. 줄여서 ‘중기청 대출'이라고도 해요.</Text>
        <Text style={styles.subTitle}>대출 대상</Text>
        <Text style={styles.description}> · 만 19세 이상 ~ 만 34세 이하</Text>
        <Text style={styles.description}> · 대출 신청자와 배우자의 합산 총소득*이 5천만 원 이하인 무주택자</Text>
        <Text style={styles.description}> · 소득 3분위 전체가구 평균값 이하 (2024년 기준 3.45억 원)</Text>
        <Text style={styles.subTitle}>대출 금리 및 한도</Text>
        <Text style={styles.description}> · 연 1.0% ~ 1.5%</Text>
        <Text style={styles.description}> · 최대 1억 원 이내</Text>
        <Text style={styles.description}> *주택도시기금, 2024.04.23. 기준</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
      </View>

      <Text style={styles.textTitle}>지금까지 청년을 위한 정부 대출 상품을 알아보았어요. 이 콘텐츠가 힘든 청년 여러분께 유용한 금융 정보가 되길 바라요.</Text>
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

export default AdditionalMoreDesc3Screen;