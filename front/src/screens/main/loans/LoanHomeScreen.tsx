import CustomButton from '@/components/common/CustomButton';
import { loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';

type LoanHomeScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.LOAN_HOME>;

function LoanHomeScreen({navigation}: LoanHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{gap: 30}}>
            <Image style={{padding: 30, marginLeft: 20}} resizeMode="contain" source={require('../../../assets/main_loan_ment.png')} />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>navigation.navigate(loanNavigations.VERIFY)}>
                <Image resizeMode="contain"
                    source={require('../../../assets/personal_loan.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate(loanNavigations.LTV_HOME)}>
                <Image resizeMode="contain"
                    source={require('../../../assets/loan_limit.png')} />
                </TouchableOpacity>
            </View>
            <Image resizeMode="contain" source={require('../../../assets/loan_desc.png')} />
            {/* <View style={{position:'absolute', }}>
                <CustomButton label='오늘의 소식 더 보기' variant='filled' size='medium'/>
            </View> */}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
      },
});

export default LoanHomeScreen;