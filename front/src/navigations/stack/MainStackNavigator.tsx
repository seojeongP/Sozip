import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import { colors } from '@/constants';

import { loanNavigations, mainNavigations } from '@/constants/navigations';
import MapStackNavigator, { MapStackParamList } from './MapStackNavigator';
import FeedStackNavigator, { FeedStackParamList } from './FeedStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainHomeScreen from '@/screens/main/MainHomeScreen';
import LoanHomeScreen from '@/screens/main/loans/LoanHomeScreen';
import LoanStackNavigator from './LoanStackNavigator';
import AdditionalHomeScreen from '@/screens/addi/AdditionalHomeScreen';
import AdditionalStackNavigator from './AddtionalStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import useThemeStore from '@/store/useThemStore';

export type MainStackParamList = {
    [mainNavigations.MAIN_HOME]: undefined;
    [mainNavigations.MAP]: NavigatorScreenParams<MapStackParamList>;
    [mainNavigations.FEED]: NavigatorScreenParams<FeedStackParamList>;
    [mainNavigations.LOAN]: undefined;
    [mainNavigations.ADDI]: undefined;
    [mainNavigations.PROFILE]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
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
      initialRouteName={mainNavigations.MAIN_HOME}
    >
      <Stack.Screen 
        name={mainNavigations.MAIN_HOME} 
        component={MainHomeScreen} 
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={mainNavigations.MAP} 
        component={MapStackNavigator} 
        options={{
          headerTitle: '내 집 찾기',
        }}
      />
       <Stack.Screen 
        name={mainNavigations.FEED} 
        component={FeedStackNavigator} 
        options={{
          headerTitle: '찜한 매물',
          // headerShown: false,
        }}
      />
       <Stack.Screen 
        name={mainNavigations.LOAN} 
        component={LoanStackNavigator} 
        options={{
          headerTitle: '대출 알아보기',
        }}
      />
      <Stack.Screen 
        name={mainNavigations.ADDI} 
        component={AdditionalStackNavigator} 
        options={{
          headerTitle: '오늘의 부동산',
        }}
      />
      <Stack.Screen 
        name={mainNavigations.PROFILE} 
        component={SettingStackNavigator} 
        options={{
          headerTitle: '설정',
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainStackNavigator;