import { colors, mapNavigations } from '@/constants';
import AddPostScreen from '@/screens/main/map/AddPostScreen';
import MapHomeScreen from '@/screens/main/map/MapHomeScreen';
import SearchLocationScreen from '@/screens/main/map/SearchLocationScreen';
import useThemeStore from '@/store/useThemStore';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
    [mapNavigations.ADD_POST]: {location: LatLng};
    [mapNavigations.SEARCH_LOCATION]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
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
      initialRouteName={mapNavigations.MAP_HOME}
    >
      <Stack.Screen 
        name={mapNavigations.MAP_HOME} 
        component={MapHomeScreen} 
        options={{
        //   headerTitle: '내 집 찾기',
        headerShown: false,
        }}
      />
      <Stack.Screen 
        name={mapNavigations.ADD_POST} 
        component={AddPostScreen} 
        options={{
          headerTitle: ' ',
        //   headerShown: false,
        }}
      />
      <Stack.Screen 
        name={mapNavigations.SEARCH_LOCATION} 
        component={SearchLocationScreen} 
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        //   headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MapStackNavigator;