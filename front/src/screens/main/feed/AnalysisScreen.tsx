import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type AnalysisScreenProps = StackScreenProps<FeedStackParamList,typeof feedNavigations.ANALYSIS>;


function AnalysisScreen({navigation}: AnalysisScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <ScrollView style={styles.container}>
        {/* <View style={styles.header}>
            <Octicons name='arrow-left' size={30} color={colors[theme].WHITE} onPress={() => navigation.goBack()}/>
        </View> */}
        <View style={{gap: 20,}}>
          <Text style={styles.title}>분석 결과</Text>
          <Text style={styles.subtitle}>구, 동 별 아파트 규모 비중 비교</Text>
        </View>
        <View style={styles.list}>
            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/anal_1.png')}/>
            <Text></Text>
            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/anal_2.png')}/>
          <View style={{gap: 15, }}>
            <Text style={styles.subtitle}>규모 구분 기준</Text>
            <Text>40㎡미만은 소형</Text>
            <Text>40㎡≤ ≤ 62.8㎡는 중소형</Text>
            <Text>62.8㎡≤ ≤95.86㎡는 중형</Text>
            <Text>95.86㎡≤ ≤135㎡는 중대형</Text>
            <Text>135㎡이상은 대형</Text>
          </View>
        </View>

        <View style={styles.list}>
        <Text style={[{fontSize:18, fontWeight: '900'}, {top: 60,}]}>각 시설별 분포 비교</Text>
            <Image resizeMode="contain" style={[styles.image, {marginTop:100}]} source={require('../../../assets/ana_3.png')}/>          
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
  },
  image: {
    // width: '100%',
    // height: '250%',
    marginTop: 20,
  },
});

export default AnalysisScreen;