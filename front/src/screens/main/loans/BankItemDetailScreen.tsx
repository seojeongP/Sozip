import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface BankItemDetailScreenProps {

}

function BankItemDetailScreen({}: BankItemDetailScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
  return (
    <View></View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({});

export default BankItemDetailScreen;