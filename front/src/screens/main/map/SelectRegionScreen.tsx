import { mainNavigations } from '@/constants';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface SelectRegionScreenProps {

}

type MainHomeScreenProps = StackScreenProps<MainStackParamList, typeof mainNavigations.MAIN_HOME>;

function SelectRegionScreen({}: SelectRegionScreenProps) {
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({});

export default SelectRegionScreen;