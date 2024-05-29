import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';


type AdditionalMoreScreenProps = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE>;


function AdditionalMoreScreen({navigation}: AdditionalMoreScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <ScrollView>
        <View style={{marginTop: 20, gap:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC)}>
            <Image resizeMode="contain"
                source={require('../../assets/news_1.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image resizeMode="contain"
                source={require('../../assets/news_2.png')} />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
      flex: 1,
      margin: 10,  
      alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
});

export default AdditionalMoreScreen;