import { addiNavigations } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';


type AdditionalMoreScreenProps = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE>;


function AdditionalMoreScreen({navigation}: AdditionalMoreScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{gap:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE_DESC)}>
            <Image resizeMode="contain"
                source={require('../../assets/news_1.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image resizeMode="contain"
                source={require('../../assets/news_2.png')} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 10,  
      alignItems: 'center',
  },
});

export default AdditionalMoreScreen;