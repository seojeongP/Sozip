
import { colorHex, colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { MarkerColor, ThemeMode } from '@/types';
import { validateCategory } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditCategoryHeaderRight from './EditCategoryHeaderRight';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants/messages';
import useThemeStore from '@/store/useThemStore';
import InputField from '@/components/common/InputField';

const categoryList: MarkerColor[] = [
    'RED',
    'YELLOW',
    'GREEN',
    'BLUE',
    'PURPLE'
];

const categoryPlaceholderList = [
    'ex) 부동산',
    'ex) 버스정류장',
    'ex) 지하철',
    'ex) 초등학교',
    'ex) 중학교',
];

type EditCategoryScreenProps = StackScreenProps<SettingStackParamList>;

function EditCategoryScreen({navigation}: EditCategoryScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    
    const refArray = useRef<(TextInput | null)[]>([]);
    const {getProfileQuery, categoryMutation} = useAuth();
    const {categories} = getProfileQuery.data||{}
    const category = useForm({
        initialValue: {
            RED: categories?.RED??'',
            YELLOW: categories?.YELLOW??'',
            GREEN: categories?.GREEN??'',
            BLUE: categories?.BLUE??'',
            PURPLE: categories?.PURPLE??'',
        },
        validate: validateCategory,
    });

    const handleSubmit = () => {
        categoryMutation.mutate(category.values, {
            onSuccess: ()=> Toast.show({type:'success', text1:'저장되었습니다.', position:'bottom'}),
            onError: error => Toast.show({type: 'error',
                    text1:
                        // error.response?.data.message ||
                        errorMessages.UNEXPECT_ERROR,
                    position: 'bottom',
            }),
        })
    };

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => EditCategoryHeaderRight(handleSubmit)
        })
    }, [])

  return (
    <View style={styles.container}>
        <ScrollView style={styles.contentContainer} scrollIndicatorInsets={{right:1}}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>마커 색상의 카테고리를 설정해보세요.</Text>
                <Text style={styles.infoText}>마커 필터링, 범례 표시에 사용할 수 있어요.</Text>
            </View>

            <View style={styles.formContainer}>
                {categoryList.map((color, i)=>{
                    return (
                        <View key={i} style={[styles.categoryContainer]}>
                            <View style={[styles.category, {backgroundColor: colorHex[color]}]}/>
                            <View style={styles.inputContainer}>
                                <InputField 
                                    {...category.getTextInputProps(color)} 
                                    error={category.errors[color]}
                                    touched={category.touched[color]}
                                    placeholder={categoryPlaceholderList[i]}
                                    ref={el => (refArray.current[i] = el)}
                                    autoFocus={color === 'RED'}
                                    maxLength={10}
                                    returnKeyType='next'
                                    blurOnSubmit={false}
                                    onSubmitEditing={()=>{
                                        refArray.current[i+1]?.focus();
                                    }}
                                />
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    </View>
  )
}

const styling = (theme:ThemeMode)=> StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex:1,
        padding: 20,
        marginBottom: 20,
    },
    infoText: {
        color: colors[theme].BLUE_MAIN,
        fontSize: 15,
        fontWeight: '600',
    },
    formContainer: {
        gap: 15,
    },
        categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    category: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors[theme].PINK_400,
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: colors[theme].BLUE_MAIN,
        borderRadius: 3,
        padding: 10,
        gap: 10,
    },
    inputContainer: {
        flex: 1,
    },
});

export default EditCategoryScreen;