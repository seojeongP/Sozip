import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type VerifyHomeScreenProps = StackScreenProps<LoanStackParamList>;

function VerifyHomeScreen({navigation}: VerifyHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const [first, setFirst] = useState<Boolean | null>(null);
  const [second, setSecond] = useState<Boolean | null>(null);
  const [third, setThird] = useState<Boolean | null>(null);
  const [fourth, setFourth] = useState<Boolean | null>(null);
  const [fifth, setFifth] = useState<Boolean | null>(null);
  const [sixth, setSixth] = useState<Boolean | null>(null);
  const [seventh, setSeventh] = useState<Boolean | null>(null);
  const [eight, setEigth] = useState<Boolean | null>(null);
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
                  <View  style={first? styles.selected_button : styles.button}/>
                  <Text style={first? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} onPress={()=>setFirst(false)}>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setSecond(false)}>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setThird(false)}>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setFourth(false)}>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setFifth(false)}>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setSixth(true)}>
                  <View  style={sixth? styles.selected_button : styles.button}/>
                  <Text style={sixth? styles.selected_answer: styles.answer}>예</Text>
                </Pressable>
                <Pressable  style={styles.buttonContainer} onPress={()=>setSixth(false)}>
                  <View  style={sixth?styles.button :styles.selected_button}/>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setSeventh(true)}>
                  <View  style={seventh? styles.selected_button : styles.button}/>
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
                <Pressable  style={styles.buttonContainer} onPress={()=>setEigth(false)}>
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
          onPress={()=>navigation.navigate(loanNavigations.BANK_SELECTION)}/>
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
    fontSize: 12,
    fontWeight: '400',
  },
  answer: {
    fontSize: 13,
    fontWeight: '400',
  },
  selected_answer: {
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
    width: 8,
    height: 8,
    borderWidth: 1, 
    borderRadius: 5,
  },
  selected_button : {
    margin: 3, 
    width: 8,
    height: 8,
    borderWidth: 2, 
    borderRadius: 5,
    borderColor: colors[theme].BLUE_MAIN,
    backgroundColor: colors[theme].BLUE_MAIN,
  },
  back: {
    position: 'absolute',
    width: '70%',
    height: '50%',
    right: -50,
    bottom: -100,
    opacity: 0.8,
  },
});

export default VerifyHomeScreen;