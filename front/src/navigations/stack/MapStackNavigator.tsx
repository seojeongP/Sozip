import {createStackNavigator} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { mapNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import LoanMainScreen from '@/screens/loans/LoanMainScreen';
import MainHomeScreen from '@/screens/auth/MainHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import { LatLng } from 'react-native-maps';
import SelectRegionScreen from '@/screens/map/SelectRegionScreen';
import { FeedStackParamList } from './FeedStackNavigator';

export type MapStackParamList = {
    [mapNavigations.MAIN_HOME]: undefined;
    [mapNavigations.SELECT_REGION]: undefined;
    [mapNavigations.MAP_HOME]: undefined;
    // [mapNavigations.FEED]: NavigatorScreenParams<FeedStackParamList>;
    [mapNavigations.FEED]: undefined;
    [mapNavigations.LOAN]: undefined;
    [mapNavigations.ADD_POST]: {location: LatLng};
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
      }}
    >
      <Stack.Screen 
        name={mapNavigations.MAIN_HOME} 
        component={MainHomeScreen} 
        options={{
          headerTitle: 'main',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={mapNavigations.SELECT_REGION} 
        component={SelectRegionScreen} 
        options={{
          headerTitle: '지역 선택',
        }}
      />
      <Stack.Screen 
        name={mapNavigations.MAP_HOME} 
        component={MapHomeScreen} 
        options={{
          headerTitle: '내 집 찾기',
        }}
      />
       <Stack.Screen 
        name={mapNavigations.FEED} 
        component={FeedHomeScreen} 
        options={{
          headerTitle: '찜한 매물',
        }}
      />
       <Stack.Screen 
        name={mapNavigations.LOAN} 
        component={LoanMainScreen} 
        options={{
          headerTitle: '대출 알아보기',
        }}
      />
      <Stack.Screen 
        name={mapNavigations.ADD_POST} 
        component={AddPostScreen} 
        options={{
          headerTitle: '매물 추가',
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MapStackNavigator;