import MapLegendOption from '@/components/map/MapLegendOption';
import DarkModeOption from '@/components/setting/DarkModeOption';
import { colors, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();
  const mapLegendOption = useModal();
  
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <Pressable
          style={({pressed}) => [
            styles.subcontainer,
            pressed && styles.pressedContainer,
          ]}
          onPress={()=>{navigation.navigate(settingNavigations.EDIT_PROFILE)}}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>프로필 수정</Text>
          </View>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.subcontainer,
            pressed && styles.pressedContainer,
          ]}
          onPress={handlePressEditCategory}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>카테고리 설정</Text>
          </View>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.subcontainer,
            pressed && styles.pressedContainer,
          ]}
          onPress={darkModeOption.show}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>다크 모드</Text>
          </View>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.subcontainer,
            pressed && styles.pressedContainer,
          ]}
          onPress={mapLegendOption.show}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>범례 표시</Text>
          </View>
        </Pressable>
        <View style={styles.space} />
        <Pressable
          style={({pressed}) => [
            styles.subcontainer,
            pressed && styles.pressedContainer,
          ]}
          onPress={handlePressLogout}>
          <Octicons name='sign-out' color={colors[theme].BLUE_MAIN} size={20}/>
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, {color: colors[theme].BLUE_MAIN}]}>로그아웃</Text>
          </View>
        </Pressable>

        <DarkModeOption 
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}/>
        <MapLegendOption 
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}/>
      </ScrollView>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors[theme].GRAY_200,
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors[theme].WHITE,
    borderColor: colors[theme].GRAY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors[theme].GRAY_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors[theme].BLACK,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;