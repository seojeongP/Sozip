import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type LoanHomeScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.LOAN_HOME>;

function LoanHomeScreen({navigation}: LoanHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);


  const {getProfileQuery, profileMutation} = useAuth();
  const {nickname} = getProfileQuery.data || {};

  
  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.back} source={require('../../../assets/back_loan.png')}/>
        <View style={{gap: 30}}>
            <View style={{gap: 10,}}>
                <View style={{flexDirection:'row',paddingTop: 10, marginLeft: 20}}>
                    <Text style={styles.text}>{nickname}님, </Text>
                    <Text style={styles.stretch_text}>추가정보 입력</Text>
                    <Text style={styles.text}>을 통해</Text>
                </View>
                <View style={{flexDirection:'row', marginLeft: 20}}>
                    <Text  style={styles.stretch_text}>맞춤형 대출 추천</Text>
                    <Text style={styles.text}>을 받아보세요!</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>navigation.navigate(loanNavigations.VERIFY)}>
            {theme=='light' && <Image resizeMode="contain" source={require('../../../assets/personal_loan.png')} />}
            {theme=='dark' && <Image resizeMode="contain" source={require('../../../assets/personal_loan_dark.png')} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate(loanNavigations.LTV_HOME)}>
            {theme=='light' && <Image resizeMode="contain" source={require('../../../assets/loan_limit.png')} />}
            {theme=='dark' && <Image resizeMode="contain" source={require('../../../assets/loan_limit_dark.png')} />}
                </TouchableOpacity>
            </View>
            {theme=='light' && <Image resizeMode="contain" source={require('../../../assets/loan_desc.png')} />}
            {theme=='dark' && <Image resizeMode="contain" source={require('../../../assets/loan_desc_dark.png')} />}
            {/* <View style={{position:'absolute', }}>
                <CustomButton label='오늘의 소식 더 보기' variant='filled' size='medium'/>
            </View> */}
        </View>
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors[theme].BLACK,
      },
      stretch_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors[theme].BLUE_MAIN,
      },
      back: {
        position: 'absolute',
        width: '80%',
        height: '50%',
        right: -50,
        bottom: -100,
        opacity: 0.8,
      },
});

export default LoanHomeScreen;