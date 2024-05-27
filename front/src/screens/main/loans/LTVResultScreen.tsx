import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

        <View style={{borderTopColor: colors[theme].GRAY_500, borderTopWidth: 1, marginBottom:10,}}></View>
        {/* <View> 
          <Image resizeMode="contain" style={{width:'100%', height:'70%', marginTop:0}} source={require('../../../assets/table_pre.png')}/>
        </View> */}
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>1</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>담보가치</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>20,000,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>입력값</Text></View>
              </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>2</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>선순위채권</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>1,500,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>입력값</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>3</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>방 개수</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>2</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>입력값</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>4</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>소액보증금</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>55,000,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>지역별 소액보증금 적용</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>5</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>최우선변제금액</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>10,000,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>물건 평가액의 1/2</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>6</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>기준 LTV</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>70%</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>비규제지역</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>7</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>담보가능액</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>14,000,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>담보가치 X LTV</Text></View>
              </View>
            </View>
            <View style={styles.smallContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.smallestContainer, {flex: 0.5,}]}><Text>8</Text></View>
                <View style={[styles.smallestContainer, {flex: 2.5,}]}><Text>차감 금액</Text></View>
                <View style={[styles.smallestContainer, {flex: 3.5,}]}><Text>11,500,000</Text></View>
                <View style={[styles.smallestContainer, {flex: 4,}]}><Text>소액보증금 + 선순위채권</Text></View>
              </View>
            </View>
              
            </View>
          </View>
        </ScrollView>

        <View style={{position: 'absolute', bottom: 40, margin: 20, marginHorizontal: 40}}>
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
      smallContainer: {
        // flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: colors[theme].GRAY_400,
        alignItems: 'flex-start',
      },
      rowContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      smallestContainer: {
        marginLeft: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: colors[theme].GRAY_300,
      },
});

export default LTVResultScreen;