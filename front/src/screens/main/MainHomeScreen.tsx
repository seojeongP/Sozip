import React, { useEffect } from 'react';
import {Button, SafeAreaView, StyleSheet, View, Image, Dimensions, TouchableOpacity, Text, Pressable} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { colors, feedNavigations, mainNavigations } from '@/constants';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeMode } from '@/types';
import useThemeStore from '@/store/useThemStore';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator';
import useGetAnalysis from '@/hooks/queries/useGetAnalysis';
import useGetOthers from '@/hooks/queries/useGetOthers';

type MainHomeScreenProps = StackScreenProps<MainStackParamList, typeof mainNavigations.MAIN_HOME>;

function MainHomeScreen({navigation}: MainHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {data: result = []} = useGetAnalysis();
  const {data: others = []} = useGetOthers();

  return (
    <SafeAreaView style={styles.container}>
        <View>
          <Pressable onPress={()=>navigation.navigate(mainNavigations.PROFILE)}>
            <MaterialIcons name='person' size={30} style={styles.user}/>
          </Pressable>
        </View>
        <View style={styles.image}>
          <Image resizeMode='cover' source={require('../../assets/Sozip_3.png')} />
        </View>
        <View style={styles.twocategories}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(mainNavigations.MAP)}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/my_home.png')} />}
              {theme=='dark' && <Image resizeMode="contain" source={require('../../assets/my_home_dark.png')} />}
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(mainNavigations.FEED)}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/zzim.png')} />}
              {theme=='dark' && <Image resizeMode="contain" source={require('../../assets/zzip_dark.png')} />}
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(mainNavigations.LOAN)}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/loan.png')} />}
              {theme=='dark' && <Image resizeMode="contain" source={require('../../assets/loan_dark.png')} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(mainNavigations.ADDI)}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/learn.png')} />}
              {theme=='dark' && <Image resizeMode="contain" source={require('../../assets/learn_dark.png')} />}
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

const styling = (theme:ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  user: {
    position: 'absolute',
    left: Dimensions.get('screen').width/2 - 50,
    color: colors[theme].BLUE_700
  },
  twocategories: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 0,
    // justifyContent: '',
    gap: 5,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width/1.1,
  },
  logoImageContainer: {
    justifyContent: 'center',
    width: 0.1
  },
  image: {
    width: '20%',
    height: '20%',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    // gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default MainHomeScreen;