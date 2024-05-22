import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';
import { colors } from '@/constants';

import { feedNavigations } from '@/constants/navigations';
import FeedHomeScreen from '@/screens/main/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/main/feed/FeedDetailScreen';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';
import ImageZoomScreen from '@/screens/main/feed/ImageZoomScreen';
import FeedFavoriteScreen from '@/screens/main/feed/FeedFavoriteScreen';
import AnalysisScreen from '@/screens/main/feed/AnalysisScreen';
import useThemeStore from '@/store/useThemStore';

export type FeedStackParamList = {
    [feedNavigations.FEED_HOME]: undefined;
    [feedNavigations.FEED_DETAIL]: {id:number};
    [feedNavigations.IMAGE_ZOOM]: {index: number};
    [feedNavigations.FEED_FAVORITE]: undefined;
    [feedNavigations.ANALYSIS]: {id:number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
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
    >
      <Stack.Screen 
        name={feedNavigations.FEED_HOME} 
        component={FeedHomeScreen} 
        options={({navigation}) => ({
          // headerTitle: '피드',
          headerShown: false,
          //
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen 
        name={feedNavigations.FEED_DETAIL} 
        component={FeedDetailScreen}
        options={{
            headerShown: false,
            headerTitle: ' ',
            cardStyle: {
                backgroundColor:colors[theme].GRAY_200
            }
        }}
      />
      <Stack.Screen 
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={feedNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name={feedNavigations.ANALYSIS}
        component={AnalysisScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default FeedStackNavigator;