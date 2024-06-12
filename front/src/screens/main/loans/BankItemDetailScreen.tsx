import CustomButton from '@/components/common/CustomButton';
import LoanItemDetail from '@/components/loan/LoanItemDetail';
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

    console.log(route.params.title);
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
          <LoanItemDetail bank={bank} title={route.params.title}/>
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
      color: colors[theme].BLACK,
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
    color: colors[theme].BLACK,
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
    color: colors[theme].BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
  Title: {
    color: colors[theme].BLACK,
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    color: colors[theme].BLACK,
    fontSize: 17,
    fontWeight: '700',
  },
  descriptionText: {
    color: colors[theme].BLACK,
  },
});

export default BankItemDetailScreen;