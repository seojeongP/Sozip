import React, { useState } from 'react';
import {
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
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import 'react-native-svg'

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
