import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { colors, mapNavigations } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MarkerColor } from '@/types/domain';
import { validateAddPost } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons'

type AddPostScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost()

  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const address = useGetAddress(location);

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      symbol: '',
      imageUris:[],
    };
    //mutate 함수에 들어가는 것은 전송될 body 정보임
    createPost.mutate({address, ...location, ...body}, {
      onSuccess: ()=>navigation.goBack(),
    });
  };

  useEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> AddPostHeaderRight("등록", handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField 
            value={address}
            disabled 
            icon={
              <Octicons name='location' size={16} color={colors.GRAY_500} />
            }
          />
          {/* <CustomButton variant='outlined' size='large' label='날짜 선택' /> */}
          <InputField 
            placeholder='매물 이름' 
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={()=>descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')} //레스트 문법으로 위에 3줄 다 불러오는 효과
          />
          <InputField 
            ref={descriptionRef}
            placeholder='상세 설명' 
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline //엔터를 눌러도 다음 줄 받을 수 잇음
            returnKeyType='next'
            blurOnSubmit={false}
            {...addPost.getTextInputProps('description')} //레스트 문법으로 위에 3줄 다 불러오는 효과
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap : 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;