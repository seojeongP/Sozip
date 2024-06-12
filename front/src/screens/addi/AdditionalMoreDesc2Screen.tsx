import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC2>;

function AdditionalMoreDesc2Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>젊은이들을 위한 경제적 주거 선택</Text>
      <View>
        <Text style={styles.Title}>청년 행복주택</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>💍 신혼부동산 정책 및 청년 주거부담 완화 대책</Text>
        <Text style={styles.description}>올해는 신혼부부를 위한 부동산 정책과 청년들의 주거 부담을 낮춰주는 제도가 새롭게 도입됩니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🤍 혼인에 따른 증여재산 공제</Text>
        <Text style={styles.description}>올해 1월1일부터 혼인한 이후 증여받는 분들을 대상으로 '혼인에 따른 증여재산 공제'가 신설됩니다. 직계존속인 증여자가 혼인신고일 전후 2년 이내(총 4년)에 증여한 재산 1억원까지 추가 공제가 가능해졌습니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>👶🏻 출산 가구를 위한 특례 구입 및 전세자금 대출</Text>
        <Text style={styles.description}>출산한 무주택 가구를 대상으로 저금리 구입 자금 대출을 해주는 특례 구입‧전세자금 대출이 올해 1월부터 시행됩니다. 주택 가액 9억원까지 대출이 가능하며, 신생아 특례 전세자금 대출도 제공됩니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>💰 출산 가구에 대한 분양 혜택 확대</Text>
        <Text style={styles.description}>출산 가구를 위한 분양 혜택도 다양하게 제공됩니다. 연 7만호 수준의 특별‧우선 공급이 신설되며, 입주자 모집 공고일 기준 2세 이하 자녀가 있는 가구에 대한 특별공급이 이뤄집니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏠 청년을 위한 부동산 정책 개선</Text>
        <Text style={styles.description}>청년들을 위한 부동산 정책도 개선됩니다. 중복 청약 시 부부 개별 신청이 가능하며, 민간의 일반공급 가점제 청약 시 배우자의 청약통장 가입 기간이 합산되어 신혼가구가 분양 당첨에 유리해집니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏦 청년 주택 드림 청약통장</Text>
        <Text style={styles.description}>2월에 출시되는 '청년 주택 드림 청약통장'을 통해 청년들은 저리‧장기 자금을 지원받을 수 있습니다. 만 39세 이하 무주택자가 가입해 분양가 6억원 이하 주택을 분양받을 경우 금리 최저 2.2%로 대출이 가능합니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏠 공공분양주택 공급 확대</Text>
        <Text style={styles.description}>장기적으로는 시세의 70%~80% 수준의 부담 가능한 공공분양주택을 5년간 34만호에게 공급할 예정입니다.</Text>
      </View>
      <Text style={styles.textTitle}>이러한 정책들을 통해 신혼부부와 청년들의 주거 부담을 줄여주고, 안정적인 주거 환경을 조성하는 데 기여할 것으로 기대됩니다.</Text>
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

export default AdditionalMoreDesc2Screen;