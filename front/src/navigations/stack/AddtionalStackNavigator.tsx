import {HeaderStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { addiNavigations, loanNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import AdditionalMoreScreen from '@/screens/addi/AdditionalMoreScreen';
import AdditionalMoreDescScreen from '@/screens/addi/AdditionalMoreDescScreen';
import AdditionalHomeScreen from '@/screens/addi/AdditionalHomeScreen';
import useThemeStore from '@/store/useThemStore';
import AdditionalMoreDesc4Screen from '@/screens/addi/AdditionalMoreDesc4Screen';
import AdditionalMoreDesc5Screen from '@/screens/addi/AdditionalMoreDesc5Screen';
import AdditionalMoreDesc6Screen from '@/screens/addi/AdditionalMoreDesc6Screen';
import AdditionalMoreDesc7Screen from '@/screens/addi/AdditionalMoreDesc7Screen';
import AdditionalMoreDesc8Screen from '@/screens/addi/AdditionalMoreDesc8Screen';
import AdditionalMoreDesc3Screen from '@/screens/addi/AdditionalMoreDesc3Screen';
import AdditionalMoreDesc2Screen from '@/screens/addi/AdditionalMoreDesc2Screen';

export type AddiStackParamList = {
    [addiNavigations.ADDI_HOME]: undefined;
    [addiNavigations.ADDI_MORE]: undefined;
    [addiNavigations.ADDI_MORE_DESC]: undefined;
    [addiNavigations.ADDI_MORE_DESC2]: undefined;
    [addiNavigations.ADDI_MORE_DESC3]: undefined;
    [addiNavigations.ADDI_MORE_DESC4]: undefined;
    [addiNavigations.ADDI_MORE_DESC5]: undefined;
    [addiNavigations.ADDI_MORE_DESC6]: undefined;
    [addiNavigations.ADDI_MORE_DESC7]: undefined;
    [addiNavigations.ADDI_MORE_DESC8]: undefined;
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
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC2} 
        component={AdditionalMoreDesc2Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC3} 
        component={AdditionalMoreDesc3Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen 
      name={addiNavigations.ADDI_MORE_DESC4} 
      component={AdditionalMoreDesc4Screen} 
      options={{
        headerTitle: '',
        headerShown: false,
      }}
    />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC5} 
        component={AdditionalMoreDesc5Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC6} 
        component={AdditionalMoreDesc6Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC7} 
        component={AdditionalMoreDesc7Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={addiNavigations.ADDI_MORE_DESC8} 
        component={AdditionalMoreDesc8Screen} 
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AdditionalStackNavigator;