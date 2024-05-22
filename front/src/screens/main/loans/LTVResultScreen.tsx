import CustomButton from '@/components/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type LTVResultScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.LTV_RESULT>;

function LTVResultScreen({navigation}: LTVResultScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  
  return (
    <View style={styles.container}>
        <Image style={styles.back} source={require('../../../assets/back_loan.png')}/>

        <View style={styles.description}>
          <Text style={styles.textTitle}>담보인정비율(LTV) 계산</Text>
          <Text style={{fontSize:12,}}>LTV(Loan to Value: 담보인정비율)은 담보 대비 대출금액의 비율을 나타내는 지표로, 주로 주택담보대출의 대출가능금액을 산출할 때 사용됩니다.</Text>
          <Text style={{fontSize:12,}}>LTV 기준비율은 지역에 따라 다르며, 20~70% 수준입니다. 아래 '지역별 LTV 기준'에서 확인할 수 있습니다.</Text>
        </View>


        <View> 
          <Image resizeMode="contain" style={{width:'100%', height:'70%', marginTop:0}} source={require('../../../assets/table_pre.png')}/>
        </View>

        <View style={{bottom: 40, margin: 20, marginHorizontal: 40}}>
          <CustomButton label='LTV 계산' onPress={() => navigation.navigate(loanNavigations.LTV_MORE)}></CustomButton>
        </View>
    </View>
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
      back: {
        position: 'absolute',
        width: '70%',
        height: '50%',
        right: -70,
        bottom: -100,
        opacity: 0.8,
      },
});

export default LTVResultScreen;