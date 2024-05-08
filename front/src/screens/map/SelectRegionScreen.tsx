import { mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface SelectRegionScreenProps {

}

type MainHomeScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.MAIN_HOME>;

function SelectRegionScreen({}: SelectRegionScreenProps) {
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({});

export default SelectRegionScreen;