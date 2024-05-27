import React from 'react';
import {Button, SafeAreaView, StyleSheet, View, Image, Dimensions, Pressable, Text} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations, colors } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  
  const {appleLoginMutation} = useAuth();

  const handlePressAppleLogin = async() => {
    try{
      const {identityToken, fullName} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      if(identityToken){
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.SozipApp',
          nickname: fullName?.givenName ?? null
        })
      }
    } catch (error:any) {
      if(error.code !== appleAuth.Error.CANCELED){
        Toast.show({
          type: 'error',
          text1: '애플 로그인이 실패했습니다.',
          text2: '나중에 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          resizeMode="contain"
          style={styles.image} 
          source={require('../../assets/Sozip.png')}
        />
      </View>
      <View style={{margin: 30, alignItems: 'center', gap:15}}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>청춘 소비기반 집 구하기</Text>
        <Text style={{fontSize: 14}}>로그인을 해주세요.</Text>
      </View>
      <View style={styles.buttonContainer}>
          <CustomButton
            label="이메일 로그인하기"
            onPress={() => navigation.navigate(authNavigations.LOGIN)}
          />
          <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
            <Text style={styles.emailText}>이메일로 가입하기</Text>
          </Pressable>

          <Text style={{fontSize:15, color:colors[theme].GRAY_500}}>
            ----------------or continue with----------------
          </Text>

          <AppleButton 
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
          <CustomButton
            label="카카오 로그인하기"
            variant="filled"
            size="large"
            onPress={() => navigation.navigate(authNavigations.KAKAO)}
            style={styles.kakaoButtonContainer}
            textStyle={styles.kakaoButtonText}
            icon={
              <Ionicons name={'chatbubble-sharp'} color={'#181600'} size={16} />
            }
          />

          
      </View>
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode)=> StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.5,
    width: Dimensions.get('screen').width /2,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center'
  },
  kakaoButtonContainer: {
    backgroundColor: '#fee503',
  },
  kakaoButtonText: {
    color: '#181600',
  },
  appleButton:{
    marginTop: 30,
    width: Dimensions.get('screen').width - 60,
    height: 45,
    paddingVertical: 25,
  },
  emailText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: colors[theme].BLACK,
  },
});

export default AuthHomeScreen;