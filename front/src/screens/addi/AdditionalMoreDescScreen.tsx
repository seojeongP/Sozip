import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC>;

function AdditionalMoreDescScreen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>서울시 청년 중개. 이사비 지원사업 시작</Text>
      <View>
        <Text style={styles.Title}>이사는 너무 어려워!</Text>
        <Text style={styles.Title}>청년 중개·이사비 40만원 지원</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🌟 서울시 부동산 지원 프로그램 개선</Text>
        <Text style={styles.description}>서울시는 청년들의 부담을 줄이기 위해 부동산 중개보수와 이사비를 지원하는 프로그램을 운영하고 있습니다. 이 프로그램은 학업이나 구직으로 인해 이사가 잦은 청년들을 대상으로 합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>📓 2024년 개선사항</Text>
        <Text style={styles.description}>올해, 서울시는 청년들의 의견을 수렴하여 프로그램을 개선했습니다. 첫째로, 지원 대상 기간이 2년 이상으로 확대되었습니다. 이는 서울로 전입하거나 서울 내 이사한 청년들이 더 많은 기회를 가질 수 있도록 한 조치입니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🙌🏻  모집 횟수 증가</Text>
        <Text style={styles.description}>모집 횟수가 연 1회에서 연 2회로 늘어났습니다. 이로써 이사 시기와 모집 기간이 일치하지 않아 기다려야 했던 청년들도 신속하게 지원을 받을 수 있게 되었습니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🕖 선정 소요기간 단축</Text>
        <Text style={styles.description}>선정 소요기간이 단축되어 기존보다 더 신속한 지원이 가능해졌습니다. 이는 선정 과정을 효율적으로 개선하여 청년들이 빠르게 지원금을 받을 수 있도록 하기 위한 노력입니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>📚 지원 대상 및 신청 방법</Text>
        <Text style={styles.description}>이 프로그램은 서울로 전입하거나 서울 내에서 이사한 만 19~39세 청년을 대상으로 합니다. 가구당 중위소득이 150% 이하이며, 거래금액이 2억원 이하인 주택에 거주하는 청년들이 지원 대상입니다. 신청은 온라인으로 청년몽땅정보통에서 가능합니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>📑 제출 서류 및 추가 정보</Text>
        <Text style={styles.description}>그밖에 자세한 내용 및 제출서류는 청년몽땅정보통에서 확인할 수 있습니다. 지원 사업명은 '청년 부동산 중개보수 및 이사비 지원사업'입니다. 지원금액은 최대 40만 원이며, 실비로 지원됩니다. 지원 대상자가 많을 경우 사회적 약자와 주거취약 청년을 우선으로 선발하게 됩니다..</Text>
      </View>
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
    fontSize: 17,
    fontWeight: '500',
  },
  Title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  description: {
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

export default AdditionalMoreDescScreen;