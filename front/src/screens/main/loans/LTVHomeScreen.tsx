import CustomButton from '@/components/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type LTVHomeScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.LTV_HOME>;

function LTVHomeScreen({navigation}: LTVHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  
  const [apa, setApa] = useState(true);
  const [billa, setBilla] = useState(true);
  const [seoul, setSeoul] = useState(true);
  const [sudo, setSudo] = useState(true);
  const [gg, setGg] = useState(true);
  const [gy, setGy] = useState(true);
  const [ect, setEct] = useState(true);
  const [bang, setBang] = useState(true);
  const [imdae, setImdae] = useState(true);
  const [soac, setSoac] = useState(true);

  function apaPress(){ setApa(!apa); };
  function billaPress(){ setBilla(!billa); };
  function seoulPress(){ setSeoul(!seoul); };
  function sudoPress(){ setSudo(!sudo); };
  function ggPress(){ setGg(!gg); };
  function gyPress(){ setGy(!gy); };
  function ectPress(){ setEct(!ect); };
  function bangPress(){ setBang(!bang); };
  function imdaePress(){ setImdae(!imdae) };
  function soacPress(){ setSoac(!soac); };

  return (
      <View style={styles.container}>
        <Image style={styles.back} source={require('../../../assets/back_loan.png')}/>

        <ScrollView>
        <View style={styles.description}>
          <Text style={styles.textTitle}>담보인정비율(LTV) 계산</Text>
          <Text style={{fontSize:12,}}>LTV(Loan to Value: 담보인정비율)은 담보 대비 대출금액의 비율을 나타내는 지표로, 주로 주택담보대출의 대출가능금액을 산출할 때 사용됩니다.</Text>
          <Text style={{fontSize:12,}}>LTV 기준비율은 지역에 따라 다르며, 20~70% 수준입니다. 아래 '지역별 LTV 기준'에서 확인할 수 있습니다.</Text>
        </View>

        <View style={styles.buttonList}>
          <View style={styles.detailedButton}>
            <TouchableOpacity
              style={apa? styles.optionButton:styles.seletedButton}
              onPress={()=>apaPress()}>
              <Text style={apa? styles.buttonText : styles.selectedText}>아파트</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={billa? styles.optionButton:styles.seletedButton}
              onPress={()=>billaPress()}>
              <Text style={billa? styles.buttonText : styles.selectedText}>빌라</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailedButton}>
            <TouchableOpacity
              style={seoul? styles.optionButton:styles.seletedButton}
              onPress={()=>seoulPress()}>
              <Text style={seoul? styles.buttonText : styles.selectedText}>서울</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sudo? styles.optionButton:styles.seletedButton}
              onPress={()=>sudoPress()}>
              <Text style={sudo? styles.buttonText : styles.selectedText}>수도권</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={gy? styles.optionButton:styles.seletedButton}
              onPress={()=>gyPress()}>
              <Text style={gy? styles.buttonText : styles.selectedText}>광역시</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ect? styles.optionButton:styles.seletedButton}
              onPress={()=>ectPress()}>
              <Text style={ect? styles.buttonText : styles.selectedText}>기타</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailedButton}>
            <TouchableOpacity
              style={bang? styles.optionButton:styles.seletedButton}
              onPress={()=>bangPress()}>
              <Text style={bang? styles.buttonText : styles.selectedText}>방공제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={imdae? styles.optionButton:styles.seletedButton}
              onPress={imdaePress}>
              <Text style={imdae? styles.buttonText : styles.selectedText}>임대중</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={true? styles.optionButton:styles.seletedButton}>
              <Text style={true? styles.buttonText : styles.selectedText}>거주중</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailedButton}>
            <TouchableOpacity 
              style={soac? styles.optionButton:styles.seletedButton}
              onPress={()=>soacPress()}>
              <Text style={soac? styles.buttonText : styles.selectedText}>소액 보증금</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputList}>
          <View style={{flexDirection:'row', marginLeft: 5, justifyContent: 'flex-start'}}>
            <Text style={styles.subtitle}>대출금액</Text>
            <Text style={[styles.subtitle, {marginLeft:140}]}>담보가치</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10,}}> 
            <TextInput style={styles.input}/>
            <TextInput style={styles.input}/>
          </View>
          <View style={{flexDirection:'row', marginLeft: 5, justifyContent: 'flex-start', marginTop: 5,}}>
            <Text style={styles.subtitle}>선순위 채권</Text>
            <Text style={[styles.subtitle, {marginLeft:120}]}>방 개수</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10,}}> 
            <TextInput style={styles.input}/>
            <TextInput style={styles.input}/>
          </View>
        </View>
        </ScrollView>

        
        <View style={{bottom: 40, margin: 20, marginHorizontal: 40}}>
          <CustomButton label='LTV 계산' onPress={() => navigation.navigate(loanNavigations.LTV_RESULT)}></CustomButton>
        </View>
        
      </View>
  )
}

const styling = (theme:ThemeMode) =>  StyleSheet.create({
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
  buttonList: {
    flex: 1,
    gap: 20,
    margin: 20,
    alignItems: 'flex-start',
  },
  optionButton: {
    borderColor: colors[theme].GRAY_700,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  seletedButton: {
    borderColor: colors[theme].GRAY_700,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors[theme].GRAY_300
  },
  buttonText: {
    color: colors[theme].BLACK,
  },
  selectedText: {
    color: colors[theme].BLACK,
    fontWeight: '800',
  },
  detailedButton: {
    flexDirection: 'row',
    gap: 20,
  },
  inputList: {
    flex: 1,
    margin: 20,
    marginTop: 10,
    gap: 10,
  },
  subtitle: {
    fontWeight: '500',
  },
  input: {
    width: '50%',
    backgroundColor: colors[theme].WHITE,
    borderColor: colors[theme].BLUE_MAIN,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 10,
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

export default LTVHomeScreen;