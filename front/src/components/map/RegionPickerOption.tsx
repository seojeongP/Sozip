import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RegionPickerOptionProps {
    isVisible: boolean;
}

function RegionPickerOption({isVisible}: RegionPickerOptionProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Modal visible={isVisible} transparent animationType='slide'>
        <SafeAreaView style={[styles.optionBackground, styles.dimmed]}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>

          </View>
        </View>


        </SafeAreaView>
        
    </Modal>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
        pickerContainer: {
          alignItems: 'center',
        },
        optionBackground: {
          flex: 1,
          justifyContent: 'flex-end',
        },
        dimmed: {
          backgroundColor: 'rgba(0 0 0 / 0.5)',
        },
        optionContainer: {
          borderRadius: 15,
          marginHorizontal: 10,
          marginBottom: 10,
          backgroundColor: colors[theme].GRAY_100,
          overflow: 'hidden',
        },
        optionButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          gap: 5,
        },
        optionText: {
          fontSize: 17,
          color: colors[theme].BLUE_500,
          fontWeight: '500',
        },
});

export default RegionPickerOption;