import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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
        <View style={{marginTop: 20, gap:20}}>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_1.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC2)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_2.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC3)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_4.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC4)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_3.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC5)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_5.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC6)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10, 
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_6.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC7)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10, left: 10,
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_7.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC8)}>
            <Image resizeMode="contain" 
                  style={{borderRadius: 10, 
                          shadowColor: colors[theme].GRAY_500,
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.9,
                          shadowRadius: 5,}}
                source={require('../../assets/news_8.png')} />
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