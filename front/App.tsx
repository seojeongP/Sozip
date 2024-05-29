import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import Toast, { BaseToast, BaseToastProps, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import 'react-native-svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const toastConfig = {
  success: (props:BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].BLUE_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  
  error: (props:BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors['light'].RED_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
}


function App() {
  const {theme} = useThemeStore();

  const toastConfig: ToastConfig = {
    selectedToast: ({text1, text2}) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          bottom: 60,
          height: 130,
          width: Dimensions.get('window').width - 60,
          backgroundColor: colors[theme].PINK_200, 
          borderWidth: 1, 
          borderColor: colors[theme].RED_500,
          padding: 20,
          borderRadius: 20,
          gap: 20,
        }}>
        <MaterialIcons name='error-outline' size={40} color={colors[theme].RED_700}/>
        <View style={{gap: 20,}}>
        <Text
          style={{
            color: colors[theme].RED_700,
            fontSize: 17,
            fontWeight: '600',
          }}>
          {text1}
        </Text>
        <Text
          style={{
            color: colors[theme].RED_700,
            fontSize: 15,
            width: Dimensions.get('screen').width/1.7,
          }} numberOfLines={2} ellipsizeMode="tail">
          {text2}
        </Text>
        </View>
      </View>
    ),
  };
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={theme === 'light'? 'dark-content':'light-content'}/>
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig}/>
      </NavigationContainer>
    </QueryClientProvider>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

});

export default App;
