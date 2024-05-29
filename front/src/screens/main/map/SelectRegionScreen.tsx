import { mainNavigations, mapNavigations } from '@/constants';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-svg';

type SelectRegionScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.SELET_REGION>;

function SelectRegionScreen({}: SelectRegionScreenProps) {
  return (
    <View>
      <Text>알아보고 싶은 지역을 선택해주세요.</Text>
    </View>
  )
}

const styles = StyleSheet.create({});

export default SelectRegionScreen;