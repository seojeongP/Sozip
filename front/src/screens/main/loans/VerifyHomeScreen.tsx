import CustomButton from '@/components/common/CustomButton';
import { loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

type VerifyHomeScreenProps = StackScreenProps<LoanStackParamList>;

function VerifyHomeScreen({navigation}: VerifyHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <ScrollView>
          <CustomButton label='다음' size='large' onPress={()=>navigation.navigate(loanNavigations.BANK_SELECTION)}/>
        </ScrollView>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding : 20,
  },
});

export default VerifyHomeScreen;