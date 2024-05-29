import {HeaderStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { addiNavigations, loanNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import AdditionalMoreScreen from '@/screens/addi/AdditionalMoreScreen';
import AdditionalMoreDescScreen from '@/screens/addi/AdditionalMoreDescScreen';
import AdditionalHomeScreen from '@/screens/addi/AdditionalHomeScreen';
import useThemeStore from '@/store/useThemStore';

export type AddiStackParamList = {
    [addiNavigations.ADDI_HOME]: undefined;
    [addiNavigations.ADDI_MORE]: undefined;
    [addiNavigations.ADDI_MORE_DESC]: undefined;
};

const Stack = createStackNavigator<AddiStackParamList>();

function AdditionalStackNavigator() {
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
      initialRouteName={addiNavigations.ADDI_HOME}
    >
      <Stack.Screen 
        name={addiNavigations.ADDI_HOME} 
        component={AdditionalHomeScreen} 
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE} 
        component={AdditionalMoreScreen} 
        options={{
          headerTitle: '더 많은 소식',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC} 
        component={AdditionalMoreDescScreen} 
        options={{
          headerTitle: '이사는 너무 어려워',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AdditionalStackNavigator;