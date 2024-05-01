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
import type {PropsWithChildren} from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
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
