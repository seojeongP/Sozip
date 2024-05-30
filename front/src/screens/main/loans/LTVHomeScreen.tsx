import CustomButton from '@/components/common/CustomButton';
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

  const [first, setFirst] = useState<string>();
  const [second, setSecond] = useState<string>();
  const [third, setThird] = useState<string>();
  const [fourth, setFourth] = useState<string>();

  const [result, setResult] = useState<Boolean>(false);

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

  const handleFirstChange = (num: string) => {
    setFirst(num);
  };

  const handleSecondChange = (num: string) => {
    setSecond(num);
  };

  const handleThirdChange = (num: string) => {
    setThird(num);
  };

  const handleFourthChange = (num: string) => {
    setFourth(num);
  };

  return (
      <View style={styles.container}>
        <Image style={styles.back} source={require('../../../assets/back_loan.png')}/>

        
        <View style={styles.description}>
          <Text style={styles.textTitle}>담보인정비율(LTV) 계산</Text>
          <Text style={{fontSize:12,}}>LTV(Loan to Value: 담보인정비율)은 담보 대비 대출금액의 비율을 나타내는 지표로, 주로 주택담보대출의 대출가능금액을 산출할 때 사용됩니다.</Text>
          <Text style={{fontSize:12,}}>LTV 기준비율은 지역에 따라 다르며, 20~70% 수준입니다. 아래 '지역별 LTV 기준'에서 확인할 수 있습니다.</Text>
        </View>

        <View style={{borderTopColor: colors[theme].GRAY_500, borderTopWidth: 1, marginBottom:10,}}></View>

        <ScrollView style={{marginBottom: 30}}>
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
            <TextInput style={styles.input} 
                  placeholder="20000"
                  onChangeText={handleFirstChange}
                  value={first}/>
            <Text style={{fontWeight:'bold', left: 120, position:'absolute', padding: 13,}}>만원</Text>
            <TextInput 
                  style={styles.input} 
                  placeholder="10000"
                  onChangeText={handleSecondChange}
                  value={second}/>
            <Text style={{fontWeight:'bold', left: 310, position:'absolute', padding: 13,}}>만원</Text>
          </View>
          <View style={{flexDirection:'row', marginLeft: 5, justifyContent: 'flex-start', marginTop: 5,}}>
            <Text style={styles.subtitle}>선순위 채권</Text>
            <Text style={[styles.subtitle, {marginLeft:120}]}>방 개수</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10,}}> 
            <TextInput 
                  style={styles.input} 
                  placeholder="50000"
                  onChangeText={handleThirdChange}
                  value={third}/>
            <Text style={{fontWeight:'bold', left: 120, position:'absolute', padding: 13,}}>만원</Text>
            <TextInput 
                  style={[styles.input, {
                    paddingLeft: 120,}]} 
                  placeholder="2"
                  onChangeText={handleFourthChange}
                  value={fourth}/>
            <Text style={{fontWeight:'bold', left: 320, position:'absolute', padding: 13,}}>개</Text>
          </View>
        </View>
        
        {result &&
        <View>
          <View style={styles.description}>
            <Text style={styles.textTitle}>LTV 계산 결과</Text>
            <View style={{marginTop: 20, borderWidth:1, borderColor:colors[theme].GRAY_500, backgroundColor:'white', borderRadius: 5,}}>
              <View style={[styles.oneRow, {borderBottomColor:colors[theme].BLUE_MAIN, borderBottomWidth:1.5}]}>
                <View style={[styles.resultBoxTitle, {flex:0.3,}, ]}><Text style={{fontWeight:'bold', fontSize:15}}>#</Text></View>
                <View style={[styles.resultBoxTitle, {flex:3.4,}, ]}><Text style={{fontWeight:'bold', fontSize:15}}>적용</Text></View>
                <View style={[styles.resultBoxTitle, {flex:2.7,}, ]}><Text style={{fontWeight:'bold', fontSize:15}}>금액</Text></View>
                <View style={[styles.resultBoxTitle, {flex:4,}, ]}><Text style={{fontWeight:'bold', fontSize:15}}>비고</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>1</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>대출금액</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>{parseInt(String(first))*10000}</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>입력값</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>2</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>담보가치</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>{parseInt(String(second))*10000}</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>입력값</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>3</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>선순위채권</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>{parseInt(String(third))*10000}</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>입력값</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>4</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>방 수</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>{parseInt(String(third))}</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>입력값</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>5</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>소액보증금</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>55000000</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>지역별 소액보증금</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>6</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text style={{fontSize:12}}>최우선변제금액</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>55000000</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text>방 수 x 5500만원</Text></View>
              </View>
              <View style={styles.oneRow}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>7</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text style={{fontSize:12}}>대출금액</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>400000000</Text></View>
                <View style={[styles.resultBox, {flex:4,}]}><Text style={{fontSize:9}}>대출금+보증금+선순위채권</Text></View>
              </View>
              <View style={[styles.oneRow, {backgroundColor: colors[theme].PURPLE_400}]}>
                <View style={[styles.resultBox, {flex:0.3,}, ]}><Text>8</Text></View>
                <View style={[styles.resultBox, {flex:3.4,}, ]}><Text>LTV</Text></View>
                <View style={[styles.resultBox, {flex:2.7,}, ]}><Text>80%</Text></View>
                <View style={[styles.resultBox, {flex:4,}, ]}><Text style={{fontSize:10}}>대출금액 / 담보가치 x 100</Text></View>
              </View>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.textTitle}>계산 결과 해설</Text>
            <Text style={{fontSize:13,}}>담보물이 아파트 등 공동주택인 경우에는 임대되지 않은 
            방에 대한 소액보증금 적용대상 방수를 1개로 합니다</Text>
            <Text style={{fontSize:13,}}>방 공제는 금융감독원의 은행업감독업무시행세칙에 따라 계산되었습니다. 
                  은행이 선택적으로 적용할 수 있는 규정의 경우 대출 가능액이  최대한으로  나오는 
                  기준을 적용하여 계산하였습니다. </Text>
            <Text style={{fontSize:13,}}>상세한 내용은 위키 - 방공제새창열기를 참고하세요.</Text>
          </View>
        </View>
        
        }
        </ScrollView>

        
        <View style={{bottom: 40, margin: 20, marginHorizontal: 40}}>
          {!result && <CustomButton label='LTV 계산' onPress={() => setResult(true)} />}
          {result && <CustomButton label='LTV 설명' onPress={() => navigation.navigate(loanNavigations.LTV_MORE)} />}
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
    fontWeight: '700',
  },
  input: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: colors[theme].WHITE,
    borderColor: colors[theme].BLUE_MAIN,
    borderWidth: 0.5,
    height: 40,
    borderRadius: 10,
    paddingLeft: 70,
  },
  back: {
    position: 'absolute',
    width: '70%',
    height: '50%',
    right: -70,
    bottom: -100,
    opacity: 0.8,
  },
  resultBox: {
    padding: 10, 
    flex:1, 
    borderRightWidth:1, 
    borderRightColor:colors[theme].GRAY_500,
  },
  resultBoxTitle: {
    padding: 10, 
    flex:1, 
    alignItems:'center', 
    borderRightWidth:1, 
    borderRightColor:colors[theme].GRAY_500,
  },
  oneRow: {
    flex: 1, 
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    borderBottomColor:colors[theme].GRAY_500, 
    borderBottomWidth:0.8,
  },
});

export default LTVHomeScreen;