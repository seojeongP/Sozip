import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC5>;

function AdditionalMoreDesc5Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>반환보증의 모든 것!</Text>
      <View>
        <Text style={styles.Title}>전세금 반환보증 HF, HUG, SGI의 차이</Text>
        <Image resizeMode='contain' source={require('../../assets/hf_hug_sgi.png')} />
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.description}>----------------------------------------------------</Text>
        <Text style={styles.subTitle}>📌 전세보증금 반환보증 HF, HUG, SGI 3줄 요약</Text>
        <Text style={styles.description}>1. 전세보증금 반환보증이란 집주인이 보증금을 돌려주지 않을 때 보증기관에서 대신 지급하는 상품이에요.</Text>
        <Text style={styles.description}>2.  대표적인 보증기관에는 HF, HUG, SGI가 있어요.</Text>
        <Text style={styles.description}>3. 각 보증기관 별로 보증금 조건, 보증료율 등 가입 조건이 달라져요.</Text>
        <Text style={styles.description}>----------------------------------------------------</Text>
        <Text style={styles.description}>최근 전세사기로 많은 분들이 피해를 입으며, 전세 계약에 대한 불안감이 높아지고 있어요.</Text>
        <Text style={styles.description}>이럴 때 전세보증금 반환보증을 가입하면, 피해를 최소화할 수 있다고 하는데요. 함께 살펴보도록 해요.</Text>
      </View>

      <View style={{gap: 15}}>
        <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>🏠 전세보증금 반환보증이 뭐예요?</Text>
        <Text style={styles.subTitle}>전세보증금 반환보증의 의미</Text>
        <Text style={styles.description}>전세보증금 반환보증이란 집주인이 정당한 사유 없이 보증금을 돌려주지 않는다면, 보증기관에서 대신 보증금을 지급하는 상품이에요.</Text>
        <Text style={styles.subTitle}>상환보증과 반환보증의 차이</Text>
        <Text style={styles.description}>상환보증은 세입자가 은행에서 빌린 전세대출금을 상환할 수 없는 경우, 보증기관이 세입자 대신에 대출금을 상환하는 상품이에요.</Text>
        <Text style={styles.description}>반환보증은 위에서 함께 살펴본 것처럼, 보증기관이 집주인 대신에 세입자에게 보증금을 돌려주는 상품이에요.</Text>
        <Text style={styles.subTitle}>전세보증금 반환보증의 중요성</Text>
        <Text style={styles.description}>불안한 세입자 입장에서는 전세금을 안전하게 보장받을 수 있고, 집주인의 동의가 따로 필요 없어 편리해요.</Text>
        <Text style={styles.subTitle}>대표적인 보증기관에는 HF(한국주택금융공사), HUG(주택도시보증공사), SGI(서울보증)가 있어요.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={[styles.textTitle, {fontWeight: 'bold'}]}>📃 전세보증금 반환보증 가입 조건</Text>
        <Text style={styles.description}>전세보증금 반환보증의 가입 조건은 보증기관마다 차이가 있어요. 함께 살펴볼까요?</Text>
        <Text style={styles.subTitle}>1. HF (한국주택금융공사)</Text>
        <Text style={styles.description}>- 보증금 : 수도권* 7억 원 이하, 비수도권 5억 원 이하</Text>
        <Text style={styles.description}>- 전세계약기간 : 전세계약기간</Text>
        <Text style={styles.description}>- 보증신청시기 : 전세계약기간의 1/2이 경과하기 전까지</Text>
        <Text style={styles.description}>- 보증료율 : 연 0.02%~0.04%</Text>

        <Text style={styles.description}></Text>

        <Text style={styles.subTitle}>2. HUG (주택도시보증공사)</Text>
        <Text style={styles.description}>- 보증금 : 수도권* 7억 원 이하, 비수도권 5억 원 이하</Text>
        <Text style={styles.description}>- 전세계약기간 : 1년 이상</Text>
        <Text style={styles.description}>- 보증신청시기 : 전세계약기간의 1/2이 경과하기 전까지</Text>
        <Text style={styles.description}>- 보증료율 : 연 0.115%~0.154%</Text>

        <Text style={styles.description}></Text>

        <Text style={styles.subTitle}>3. SGI (서울보증)</Text>
        <Text style={styles.description}>- 보증금 : 아파트는 제한 없음, 일반주택 10억 원 이하</Text>
        <Text style={styles.description}>- 전세계약기간 : 1년 이상</Text>
        <Text style={styles.description}>- 보증신청시기 : 전세계약기간의 1/2이 경과하기 전까지</Text>
        <Text style={styles.description}>- 보증료율 : 연 0.183%~0.208%</Text>
      </View>
      
      <Text style={styles.textTitle}>내 집을 안전하게 지키는 방법인 ‘전세보증금 반환보증’. 지금까지 각 보증기관 별로 주요 가입 조건의 차이점을 함께 살펴보았어요.</Text>
      <Text style={styles.textTitle}>자세한 내용은 각 보증기관의 홈페이지를 참고하시고, 보증금을 안전하게 지키는 데 도움이 되길 바라요.</Text>
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

export default AdditionalMoreDesc5Screen;