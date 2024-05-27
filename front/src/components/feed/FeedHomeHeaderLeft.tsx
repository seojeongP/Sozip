import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../common/HeaderButton';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {MainStackParamList} from '@/navigations/stack/MainStackNavigator';
import useThemeStore from '@/store/useThemStore';


type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  StackNavigationProp<MainStackParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  const {theme} = useThemeStore();
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors[theme].BLACK} size={25} />}
      onPress={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({});

export default FeedHomeHeaderLeft;