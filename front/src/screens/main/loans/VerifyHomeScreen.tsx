import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { alerts } from '@/constants/messages';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { showToast } from '@/utils/showToasts';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type VerifyHomeScreenProps = StackScreenProps<LoanStackParamList>;

function VerifyHomeScreen({navigation}: VerifyHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const [first, setFirst] = useState<Boolean>(true);
  const [second, setSecond] = useState<Boolean | null>(true);
  const [third, setThird] = useState<Boolean | null>(true);
  const [fourth, setFourth] = useState<Boolean | null>(true);
  const [fifth, setFifth] = useState<Boolean | null>(true);
  const [sixth, setSixth] = useState<Boolean | null>(false);
  const [seventh, setSeventh] = useState<Boolean | null>(false);
  const [eight, setEigth] = useState<Boolean | null>(true);

  const handlePress = () => {
    if (first&&second&&third&&fourth&&fifth&&!sixth&&!seventh&&eight){
      navigation.navigate(loanNavigations.BANK_SELECTION)}
    else{
      Alert.alert(alerts.CONTINUE_LOAN.TITLE, alerts.CONTINUE_LOAN.DESCRIPTION,[
        {text: '조회',onPress: () => {navigation.navigate(loanNavigations.BANK_SELECTION)}},
        {text: '취소',style: 'cancel',}],);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.back} source={require('../../../assets/back_loan.png')}/>
      <Text style={styles.title}>대출신청 자격 확인</Text>
      <ScrollView style={{marginTop: 3}}>
        <View style={styles.rowContainer}>
          <View style={styles.blocksContainer}>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>1. </Text>
                <Text style={styles.question}>현재 만 19세 이상 34세 이하입니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setFirst(true)}>
                  <View style={first? styles.selected_button : styles.button}/>
                  <Text style={first? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                  onPress={()=>{showToast('연령 기준 미충족', '나이 조건이 맞지 않습니다.');setFirst(false)}}>
                  <View  style={first?styles.button :styles.selected_button}/>
                  <Text style={first?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>2. </Text>
                <Text style={styles.question}>현재 대한민국 국적을 가지고 계십니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setSecond(true)}>
                  <View  style={second? styles.selected_button : styles.button}/>
                  <Text style={second? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  
                  style={styles.buttonContainer} 
                  onPress={()=>{showToast('내국인 기준 미충족', '국적이 한국인인 경우 자격이 있습니다.');setSecond(false)}}>
                  <View  style={second?styles.button :styles.selected_button}/>
                  <Text style={second?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.blocksContainer}>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>3. </Text>
                <Text style={styles.question}>정규직 또는 계약직으로 재직 중이십니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setThird(true)}>
                  <View  style={third? styles.selected_button : styles.button}/>
                  <Text style={third? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('근로 기준 미충족', '소득이 안정적인 경우 대출이 가능합니다.');setThird(false)}}>
                  <View  style={third?styles.button :styles.selected_button}/>
                  <Text style={third?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>4. </Text>
                <Text style={styles.question}>현재 연간 소득이 3천만 원 이하입니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setFourth(true)}>
                  <View  style={fourth? styles.selected_button : styles.button}/>
                  <Text style={fourth? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('소득 기준 미충족', '대출 프로그램이 소득 제한을 가질 수 있습니다.');setFourth(false)}}>
                  <View  style={fourth?styles.button :styles.selected_button}/>
                  <Text style={fourth?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.blocksContainer}>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>5. </Text>
                <Text style={styles.question}>신용등급이 1등급에서 6등급 사이에 속합니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setFifth(true)}>
                  <View  style={fifth? styles.selected_button : styles.button}/>
                  <Text style={fifth? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('신용등급 기준 미충족', '낮은 신용등급은 대출이 거부될 수 있습니다.');setFifth(false)}}>
                  <View  style={fifth?styles.button :styles.selected_button}/>
                  <Text style={fifth?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>6. </Text>
                <Text style={styles.question}>기존에 정부 지원 대출을 받고 계십니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('중복 대출 제약', '이미 정부 지원을 받고 있다면, 추가 대출 승인에 제약이 있을 수 있습니다.');setSixth(true)}}>
                  <View style={sixth? styles.selected_button : styles.button}/>
                  <Text style={sixth? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>setSixth(false)}>
                  <View style={sixth?styles.button :styles.selected_button}/>
                  <Text style={sixth?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.blocksContainer}>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>7. </Text>
                <Text style={styles.question}>최근 3개월 이내에 다른 금융기관에서 신규 대출을 받은 적이 있습니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('총 부채 수준 경고', '추가 대출에 대한 상환 능력이 부족으로 대출 승인이 어려울 수 있습니다.');setSeventh(true)}}>
                  <View style={seventh? styles.selected_button : styles.button}/>
                  <Text style={seventh? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} onPress={()=>setSeventh(false)}>
                  <View  style={seventh?styles.button :styles.selected_button}/>
                  <Text style={seventh?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blockContainer}>
              <View style={{flexDirection:"row",justifyContent:'center'}}>
                <Text style={styles.question}>8. </Text>
                <Text style={styles.question}>현재 무주택자입니까?</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable  style={styles.buttonContainer} onPress={()=>setEigth(true)}>
                  <View  style={eight? styles.selected_button : styles.button}/>
                  <Text style={eight? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} 
                onPress={()=>{showToast('주택 자산 확인', '무주택자의 경우 주거 목적의 대출 승인 가능성이 높아질 수 있습니다.');setEigth(false)}}>
                  <View  style={eight?styles.button :styles.selected_button}/>
                  <Text style={eight?styles.answer:styles.selected_answer}>아니오</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.finalbuttonContainer}>
        <CustomButton style={styles.final_button} 
          label='다음' 
          size='large' 
          onPress={handlePress}/>
        </View>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding : 10,
    justifyContent: 'center',
  },
  title: {
    color: colors[theme].BLACK,
    fontSize: 20,
    fontWeight: '700',
    padding: 20,
  },
  rowContainer: {
    // flex: 1,
    paddingHorizontal: 10,
    gap: 20,
    shadowColor: colors[theme].GRAY_500,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    marginBottom: 10,
    marginTop: 5, 
  },
  finalbuttonContainer: {
    alignItems: 'center',
  },
  final_button: {
    marginBottom: 30,
    width: Dimensions.get('screen').width /1.5,
    borderRadius: 10,
  },
  blocksContainer: {
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  blockContainer: {
    flex: 1,
    padding: 20, 
    borderRadius: 10,
    height: 150,
    borderColor: colors[theme].GRAY_400,
    borderWidth: 1,
    backgroundColor: colors[theme].WHITE,
  },
  question: {
    color: colors[theme].BLACK,
    fontSize: 12,
    fontWeight: '400',
  },
  answer: {
    color: colors[theme].BLACK,
    fontSize: 13,
    fontWeight: '400',
  },
  selected_answer: {
    color: colors[theme].BLACK,
    fontSize: 13,
    fontWeight: '700',
  },
  buttonsContainer:{
    flex: 1,
    marginTop: 20,
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    margin: 3, 
    width: 10,
    height: 10,
    borderWidth: 1, 
    borderRadius: 5,
    borderColor: colors[theme].BLACK,
  },
  selected_button : {
    margin: 3, 
    width: 10,
    height: 10,
    borderWidth: 2, 
    borderRadius: 5,
    borderColor: colors[theme].BLUE_MAIN,
    backgroundColor: colors[theme].BLUE_MAIN,
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

export default VerifyHomeScreen;