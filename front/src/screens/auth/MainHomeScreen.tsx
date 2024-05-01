import React from 'react';
import {Button, SafeAreaView, StyleSheet, View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/CustomButton';
import { authNavigations, mapNavigations } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';

type MainHomeScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.MAIN_HOME>;

function MainHomeScreen({navigation}: MainHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>청춘 소집</Text>
        <View style={styles.twocategories}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(mapNavigations.MAP_HOME)}>
              <Image resizeMode="contain"
                // style={styles.image} 
                source={require('../../assets/my_home.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(mapNavigations.FEED)}>
              <Image resizeMode="contain"
                // style={styles.image} 
                source={require('../../assets/zzim.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.loan}>
          <View style={[styles.imageContainer]}>
            <TouchableOpacity onPress={()=>navigation.navigate(mapNavigations.LOAN)}>
              <Image 
                resizeMode="contain"
                // style={styles.image} 
                source={require('../../assets/loan.png')} />
            </TouchableOpacity>
          </View>
        </View>
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
  twocategories: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: '',
    gap: 5
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width/1.1,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
  },
  title: {
    flex: 0.5,
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'center',
  },
  loan: {
    flex:1,
  },
});

export default MainHomeScreen;