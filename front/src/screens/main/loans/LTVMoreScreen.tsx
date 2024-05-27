import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type LTVRMoreScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.LTV_MORE>;

function LTVMoreScreen({navigation}: LTVRMoreScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    
    // <View style={styles.container}>
    //     {/* <Image style={styles.back} source={require('../../../assets/back_loan.png')}/> */}

        <ScrollView style={{flex:1}}>
            <View style={styles.description}>
                <Text style={styles.textTitle}>담보인정비율(LTV) 계산</Text>
                <Text style={{fontSize:12,}}>LTV(Loan to Value: 담보인정비율)은 담보 대비 대출금액의 비율을 나타내는 지표로, 주로 주택담보대출의 대출가능금액을 산출할 때 사용됩니다.</Text>
                <Text style={{fontSize:12,}}>LTV 기준비율은 지역에 따라 다르며, 20~70% 수준입니다. 아래 '지역별 LTV 기준'에서 확인할 수 있습니다.</Text>
            </View>

            <View style={styles.description}>
                <Text style={styles.subtitle}>계산결과 해설:</Text>
                <Text style={styles.normal}>수도권 3억이하, 지방 2.5억이하 단독주택의 경우 소액보증금 적용 대상 방수를 아래와 같이 조정할 수 있습니다.</Text>
                <Text style={styles.normal}>임대차 없는 방수가 3개 이하: 1개 이상</Text>
                <Text style={styles.normal}>임대차 없는 방수가 4개 이하: 2개 이상</Text>
                <Text style={styles.normal}>대략적인 지역 구분을 통해 소액임차보증금을 계산하였습니다. 구, 군, 동에 따라 다를 수도 있으니 아래 지역별 소액임차보증금 표를 보고 부정확한 경우  소액임차보증금을 직접 입력해주세요.</Text>
                <Text style={styles.normal}>차감하는 소액보증금의 합은 담보 대상 물건 가액의 1/2을 한도로 합니다.</Text>
                <Text style={styles.normal}>방 공제는 금융감독원의 은행업감독업무시행세칙에 따라 계산되었습니다. </Text>
                <Text style={styles.normal}>은행이 선택적으로 적용할 수 있는 규정의 경우 대출 가능액이 최대한으로 나오는 기준을 적용하여 계산하였습니다. 상세한 내용은 위키 - 방공제새창열기를 참고하세요.</Text>
            </View>

            <View style={styles.description}>
                <Text style={styles.subtitle}>계산식:</Text>
                <Text style={styles.tt}>- 담보인정비율(LTV) = (대출금액 + 선순위채권 + 임차보증금 등) / 담보가치</Text>
                <Text style={styles.tt}>- 선순위채권 = 본 대출 이전에 동일한 담보로 받은 대출 잔액 등</Text>
                <Text style={styles.tt}>- 임차보증금 등 = 전월세보증금, 소액보증금 최우선변제금액 등</Text>
            </View>

            <View style={styles.description}>
                <Text style={styles.subtitle}>지역별 LTV 기준 (2023년 개정 반영):</Text>
                <Image resizeMode="contain" style={{width:'100%', height:'30%', marginTop:10, marginBottom:0}} source={require('../../../assets/region_LTV.png')}/>
            </View>

            <View style={styles.description}>
                <Text style={styles.subtitle}>지역별 소액임차보증금 :</Text>
                <Image resizeMode="contain" style={{width:'100%', height:'30%', marginTop:0, marginBottom:0}} source={require('../../../assets/region_soac.png')}/>
            </View>
        </ScrollView>
    // </View>
    
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
      },
      description: {
        padding: 20,
        gap: 10,
      },
      textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors[theme].BLUE_MAIN,
      },
      subtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors[theme].BLUE_MAIN,
      },
      normal:{
        fontSize: 12,
        fontWeight: '400',
      },
      tt: {
        fontSize: 13,
        fontWeight: '600',
      },
      back: {
        position: 'absolute',
        width: '70%',
        height: '50%',
        right: -70,
        bottom: -100,
        opacity: 0.8,
      },
});

export default LTVMoreScreen;