import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC4>;

function AdditionalMoreDesc4Screen({navigation}: AdditionalMoreDescScreenProps) {
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
        <Text style={styles.subTitle}>🏠 행복주택</Text>
        <Text style={styles.description}>행복주택은 대학생, 청년, 신혼부부를 위한 공공 임대주택으로, 주변 시세 대비 60~80% 저렴한 임대료가 장점입니다. 교통이 편리한 곳에 위치하며, 입주 자격은 무주택자, 소득 기준, 자산 및 자동차 가액 조건을 충족해야 합니다. 청년은 최대 6년, 신혼부부는 최대 10년, 주거급여 수급자와 고령자는 최대 20년까지 거주 가능합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🧑‍🧑‍🧒‍🧒 기숙사형 청년주택</Text>
        <Text style={styles.description}>기숙사형 청년주택은 대학교 인근 다가구 주택이나 오피스텔을 기숙사로 운영하는 형태입니다. 세탁기, 냉장고, 책상, 침대 등 기본 시설이 제공되며, 시세의 40% 수준의 임대료로 최대 6년간 거주할 수 있습니다. 대학생, 대학원생, 무주택자, 소득 기준을 충족하는 미혼 청년이 입주 가능합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>💰 청년 매입임대주택 및 전세임대주택</Text>
        <Text style={styles.description}>청년 매입임대주택은 기존 주택을 매입 후 리모델링하여 저렴하게 공급하는 공공 임대주택입니다. 시세보다 4050% 저렴하며, 기본 가구와 가전이 제공됩니다. 청년과 취업준비생이 입주할 수 있습니다.청년 전세임대주택은 공공주택사업자가 주택과 전세계약을 맺고 청년에게 저렴하게 임대해주는 형태입니다. 수도권 1.2억원, 광역시 9500만원, 기타 지역 8500만원의 전세금 지원이 가능하며, 12%의 이자를 임대료로 납부합니다. 청년과 졸업 후 2년 이내 미취업자도 신청 가능합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🚉 역세권 청년주택</Text>
        <Text style={styles.description}>역세권 청년주택은 역세권에 위치한 공공주택으로, 시세 대비 60~80% 저렴한 임대료를 제공합니다. 임대 보증금의 50%를 무이자로 지원하며, 월 20만원의 임차료를 최대 10개월 동안 지원합니다. 다양한 금융지원도 제공됩니다.</Text>
      </View>
      <Text style={styles.textTitle}>청년 행복주택을 통해 경제적이고 편리한 주거 환경을 마련해 보세요!</Text>
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

export default AdditionalMoreDesc4Screen;