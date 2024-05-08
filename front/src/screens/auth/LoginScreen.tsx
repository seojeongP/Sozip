import React, { useRef, useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateLogin } from '@/utils';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = ()=>{
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
          <InputField 
            autoFocus
            placeholder='이메일' 
            error={login.errors.email}
            touched={login.touched.email}
            inputMode="email"
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={()=>passwordRef.current?.focus()}
            // value={values.email}
            // onChangeText={text=>handleChangeText('email', text)}
            // onBlur={()=>handleBlur('email')} //엘리먼트에서 포커스가 사라졌을 때 호출됨
            {...login.getTextInputProps('email')} //레스트 문법으로 위에 3줄 다 불러오는 효과
          />
          <InputField 
            ref={passwordRef}
            placeholder='비밀번호' 
            error={login.errors.password}
            touched={login.touched.password}
            secureTextEntry
            // value={values.password}
            // onChangeText={text=>handleChangeText('password', text)}
            // onBlur={()=>handleBlur('password')}
            returnKeyType='join'
            blurOnSubmit={false}
            onSubmitEditing={handleSubmit}
            {...login.getTextInputProps('password')} //레스트 문법으로 위에 3줄 다 불러오는 효과
          />
      </View>
      <CustomButton 
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;