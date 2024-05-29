import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type BankItemDetailScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.BANK_ITEM_DETAIL>;

const bankImages = {
  '우리은행': require('../../../assets/bank/ur.png'),
  'KB국민은행': require('../../../assets/bank/kb.png'),
  '하나은행': require('../../../assets/bank/hn.png'),
  '카카오뱅크': require('../../../assets/bank/kakao.png'),
  '토스뱅크': require('../../../assets/bank/toss.png'),
};

const openLink = () => {
  const url = 'https://spot.wooribank.com/pot/Dream?withyou=POLON0055&cc=c010528:c010531;c012425:c012399&PRD_CD=P020006110&PRD_YN=Y';
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
};

function BankItemDetailScreen({route, navigation}: BankItemDetailScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    const bank = route.params.bank=='ur'? '우리은행' 
                :route.params.bank=='kb'? 'KB국민은행'
                :route.params.bank=='hn'? '하나은행'
                :route.params.bank=='kakao'? '카카오뱅크'
                :'토스뱅크';

   const imageSource = bankImages[bank];


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </View>
      <Text style={styles.realtitleText}>대출 상품 정보</Text>
      <ScrollView style={styles.bigBox}>
        <View style={{marginBottom: 50,}}>
        <View style={styles.itemsContainer}>
          <View style={styles.bankBox}>
            <View style={{width: 40, height: 40}}><Image style={styles.image} source={imageSource}/></View>
            <Text style={[styles.titleText, {fontSize:16, bottom: 5,}]}>{bank}</Text>
          </View>
          <Text style={styles.titleText}>{route.params.title}</Text>
        </View>
        <Text style={[styles.textTitle, {marginBottom: 15}]}>청년의 주거비 부담 경감을 위한 청년 전용 전세자금보증 지원 상품</Text>
        <View style={styles.textContainer}>
            <View style={{gap: 15}}>
              <Text style={styles.subTitle}>특징</Text>
                <Text>- 주택법상 주택이면 주택금융신용보증서를 담보로 전세자금을 지원</Text>
                <Text>- 임차보증금의 90%범위내에서 최대 2억원까지 지원</Text>
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>대출대상</Text>
                <Text>보증신청일 기준 민법상 성년으로 만 34세 이하인 무주택 세대주 또는 예비세대주- 임차보증금액이 수도권 7억원, 수도권외 5억원을 초과하는 경우 대출 불가함 </Text>
                <Text>본인과 배우자의 합산한 연소득이 70백만원 이하인 자※ 예비세대주 : 대출실행일로부터 1개월 이내 세대주 요건을 충족한 자※ 개인신용평점 및 심사기준에 따라 대출이 제한될 수 있습니다.</Text>
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>대출한도금액</Text>
                <Text>개인별 최대 한도 2억원(단, 개인별 주택보증서 발급 한도 내)</Text>
                <Text>* 임차보증금의 90% 이내</Text>
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>대출기간</Text>
                <Text>주택 임대차계약 종료일 이내에서 1년 이상 2년 이내. 다만, 만 34세 이하까지 횟수 제한없이 기한연장 가능하며, 만 35세 이상은 1회에 한하여 2년 이내 기한연장 가능</Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>기본금리</Text>
                <Text>대출금리는 상단의 「금리조회」탭을 클릭하시면 조회 가능합니다.기준금리 : 변동대출 기준금리 가산금리 : 상품별 가산금리 적용약정이율 : [기준금리]+[가산금리]※ 주택금융신용보증기금 출연대상 대출금에 해당하는 경우 연 0.01%~연 0.25% 주택금융신용보증기금 출연료가 포함되어 있습니다.※ 정확한 금리정보는 가까운 영업점을 방문하시면 고객별로 자세히 안내해 드리겠습니다.</Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>상환방법</Text>
                <Text>만기일시상환, 이자는 매 1개월 단위로 납부(후납)</Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>담보</Text>
                <Text>주택금융신용보증서(주택금융신용보증 한도조회는 한국주택금융공사 홈페이지를 참조하시기 바랍니다.)</Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>대상주택</Text>
                <Text>주택법상 주택</Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>관련서류</Text>
                <Text>• 신분증, 주민등록등본, 임대차계약서, 보증대상목적물등기부등본</Text> 
                <Text>• 확정일자부 임대차계약서, 임차보증금 5%이상 납입한 영수증 </Text> 
                <Text>• 주택금융 신용보증서 발급서류- 직장인 : 의료보험증 또는 재직증명서, 근로자원천징수영수증- 자영업자 : 소득금액증명원, 사업자등록증 - 무소득자 : 무소득 증빙서류</Text> 
                <Text>• 기본서류외 대출내용에 따라 준비서류가 추가될 수 있으며 배우자 소득합산시에는 배우자의 소득관련 자료도 추가됩니다.</Text>
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>고객부담비용</Text>
                <Text>• 인지세 : 대출금액에 따라 차등적용(은행과 고객 50%씩 부담)- 대출금 5천만원 이하 면제- 5천만원 초과~1억원 이하 : 7만원- 1억원 초과~10억원 이하 : 15만원</Text> 
                <Text>• 보증료 : 최저보증료 연0.02%(일시납만 가능)※ 한국주택금융공사의 ‘보증료 등의 운용규정’에 따라 결정되며, 보증진행상태에 따라 최종보증료율은 변동될 수있음.</Text> 
            
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>이자 계산방법</Text>
                <Text>• 만기 일시상환 : 대출금액× 대출이자율 × 이자일수÷ 365(윤년은 366일) </Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>계약의 해지 및 갱신방법 </Text>
                <Text>• 만기 일시상환 : 대출금액× 대출이자율 × 이자일수÷ 365(윤년은 366일) </Text> 
                <Text>• 고객이 대출금 전액을 상환한 때(영업점, 인터넷홈페이지, 스마트뱅킹 등에서 상환가능)</Text> 
                <Text>• 만기도래시 당행에서 정한 일정요건을 갖춘 경우 기간연장 가능(영업점 연장신청 가능) </Text> 
            </View>
            <View style={{gap: 15, marginTop: 10,}}>
              <Text style={styles.subTitle}>지연배상금 부과 등 처리방법</Text>
                <Text>• 연체이자율 : 대출금리 + 연3%(최고 연 12%) </Text> 
                <Text>• 연체이자(지연배상금)를 납부하셔야 하는 경우 1) 대출금을 만기일에 상환하지 아니한 때 : 대출잔액에 대하여 만기일의 다음날부터 상환일 전일까지 연체이자를 납부하셔야 합니다.  2) 대출금의 기한의 이익이 상실된 때 : 대출잔액에 대하여 기한의 이익이 상실된 다음날부터 상환일 전일까지 연체이자를 납부하셔야 합니다.  3) 이자를 납부하기로 약정한 날에 납부하지 아니한 때 : 이자를 납부하여야 할 날의 다음날부터 1개월 해당일까지는 납부하여야 할 이자에 대하여, 그 이후에는 대출 잔액에 대하여 이자납부 전일까지 연체이자를 납부하셔야 합니다.  4) 분할상환금(또는 분할상환원리금)을 납부하기로 한 날에 상환하지 아니한 때 : 1회 지체시에는 지연된 분할상환금(또는 분할상환원리금)에 대하여, 연속 2회 이상 지체 시에는 대출 잔액에 대하여 분할상환금(또는 분할상환원리금) 납입 전일까지 연체이자를 납부하셔야 합니다.</Text> 
            </View>
        </View>
      <CustomButton style={{marginTop:30,}} label='알아보러 가기' size='large' variant='outlined' onPress={openLink}/>
      </View>
    </ScrollView>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    paddingTop: 30,
    gap: 20,
    marginBottom: 30,
  },
  headerContainer: {
      position: 'absolute',
      // padding: 20,
      top: 20,
      zIndex: 1,
      width: '15%',
  },
  bigBox: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_400,
    borderRadius: 10,
    backgroundColor: colors[theme].WHITE,
    padding: 25,
  },
  realtitleText: {
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 20,
  },
  image: {
    resizeMode: 'cover',
    width: '80%',
    height: '80%',
    borderRadius: 35,
},
  titleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  bankBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
    gap: 15,
    paddingBottom: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors[theme].GRAY_700,
  },
  textContainer: {
    gap: 10,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  Title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default BankItemDetailScreen;