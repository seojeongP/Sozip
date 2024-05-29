import {HeaderStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { loanNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import LoanHomeScreen from '@/screens/main/loans/LoanHomeScreen';
import VerifyHomeScreen from '@/screens/main/loans/VerifyHomeScreen';
import LTVHomeScreen from '@/screens/main/loans/LTVHomeScreen';
import LTVResultScreen from '@/screens/main/loans/LTVResultScreen';
import LTVMoreScreen from '@/screens/main/loans/LTVMoreScreen';
import useThemeStore from '@/store/useThemStore';
import BankItemListScreen from '@/screens/main/loans/BankItemListScreen';
import BankSelectionScreen from '@/screens/main/loans/BankSelectionScreen';
import BankItemDetailScreen from '@/screens/main/loans/BankItemDetailScreen';

export type LoanStackParamList = {
    [loanNavigations.LOAN_HOME]: undefined;
    [loanNavigations.LTV_HOME]: undefined;
    [loanNavigations.VERIFY]: undefined;
    [loanNavigations.LTV_RESULT]: undefined;
    [loanNavigations.LTV_MORE]: undefined;
    [loanNavigations.BANK_SELECTION]: undefined;
    [loanNavigations.BANK_ITEM_LIST]: {bank: string};
    [loanNavigations.BANK_ITEM_DETAIL]: {bank: string, title: string};
};

const Stack = createStackNavigator<LoanStackParamList>();

function LoanStackNavigator() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator 
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}
      initialRouteName={loanNavigations.LOAN_HOME}
    >
      <Stack.Screen 
        name={loanNavigations.LOAN_HOME} 
        component={LoanHomeScreen} 
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={loanNavigations.LTV_HOME} 
        component={LTVHomeScreen} 
        options={{
          headerTitle: '대출 한도 계산',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={loanNavigations.VERIFY} 
        component={VerifyHomeScreen} 
        options={{
          headerTitle: '대출신청 자격 확인',
          headerShown: false, 
        }}
      />
      <Stack.Screen 
        name={loanNavigations.BANK_SELECTION} 
        component={BankSelectionScreen} 
        options={{
          headerTitle: '거래 은행 선택',
          headerShown: false, 
        }}
      />
      <Stack.Screen 
        name={loanNavigations.BANK_ITEM_LIST} 
        component={BankItemListScreen} 
        options={{
          headerTitle: '은행 별 대출 상품',
          headerShown: false, 
        }}
        initialParams={{
          bank: 'logo',
        }}
      />
      <Stack.Screen 
        name={loanNavigations.BANK_ITEM_DETAIL} 
        component={BankItemDetailScreen} 
        options={{
          headerTitle: '대출 상품 정보',
          headerShown: false, 
        }}
      />
      <Stack.Screen 
        name={loanNavigations.LTV_RESULT} 
        component={LTVResultScreen} 
        options={{
          headerTitle: ' ',
          headerShown: false, 
        }}
      />
      <Stack.Screen 
        name={loanNavigations.LTV_MORE} 
        component={LTVMoreScreen} 
        options={{
          headerTitle: ' ',
          headerShown: false, 
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default LoanStackNavigator;