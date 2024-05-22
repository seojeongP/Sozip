import { colors, mapNavigations, settingNavigations } from '@/constants';
import AddPostScreen from '@/screens/main/map/AddPostScreen';
import MapHomeScreen from '@/screens/main/map/MapHomeScreen';
import SearchLocationScreen from '@/screens/main/map/SearchLocationScreen';
import DeleteAccountScreen from '@/screens/user/DeleteAccountScreen';
import EditCategoryScreen from '@/screens/user/EditCategoryScreen';
import EditProfileScreen from '@/screens/user/EditProfileScreen';
import SettingHomeScreen from '@/screens/user/SettingHomeScreen';
import useThemeStore from '@/store/useThemStore';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';

export type SettingStackParamList = {
    [settingNavigations.SETTING_HOME]: undefined;
    [settingNavigations.EDIT_PROFILE]: undefined;
    [settingNavigations.DELETE_ACCOUNT]: undefined;
    [settingNavigations.EDIT_CATEGORY]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
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
      initialRouteName={settingNavigations.SETTING_HOME}
    >
      <Stack.Screen 
        name={settingNavigations.SETTING_HOME} 
        component={SettingHomeScreen} 
        options={{
            headerTitle: '설정',
            headerShown: false,
        }}
      />
      <Stack.Screen 
        name={settingNavigations.EDIT_PROFILE} 
        component={EditProfileScreen} 
        options={{
            headerTitle: '프로필 수정',
            cardStyle:{
                backgroundColor: colors[theme].WHITE
            }
        }}
      />
      <Stack.Screen 
        name={settingNavigations.DELETE_ACCOUNT} 
        component={DeleteAccountScreen} 
        options={{
            headerTitle: '회원 탈퇴',
            cardStyle:{
                backgroundColor: colors[theme].WHITE
            }
        }}
      />
      <Stack.Screen 
        name={settingNavigations.EDIT_CATEGORY} 
        component={EditCategoryScreen} 
        options={{
            headerTitle: '카테고리 설정',
            cardStyle:{
                backgroundColor: colors[theme].WHITE
            }
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default SettingStackNavigator;