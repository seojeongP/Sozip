import {HeaderStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { feedNavigations } from '@/constants/navigations';
import { colors } from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';

export type FeedStackParamList = {
    [feedNavigations.FEED_HOME]: undefined;
    [feedNavigations.FEED_DETAIL]: {id:number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
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
        name={feedNavigations.FEED_HOME} 
        component={FeedHomeScreen} 
        options={{
          headerTitle: '피드',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={feedNavigations.FEED_DETAIL} 
        component={FeedDetailScreen}
        options={{
            headerShown: false,
            headerTitle: ' ',
            cardStyle: {
                backgroundColor:colors.GRAY_200
            }
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default FeedStackNavigator;