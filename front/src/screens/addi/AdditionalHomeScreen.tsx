import CustomButton from '@/components/common/CustomButton';
import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type AdditionalHomeScreenProps = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_HOME>;

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

function AdditionalHomeScreen({navigation}:AdditionalHomeScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            {/* <Text style={styles.textTitle}>청년 전세임대주택 조건과 신청방법 정리해 드릴게요</Text> */}
            <Text style={styles.Title}>청년 부동산 지원</Text>
            {/* <Text style={styles.textTitle}>📌 청년 전세임대주택 3줄 요약</Text>
            <View style={{gap: 8}}>
                <View>
                    <Text style={styles.description}>1. 청년 전세임대주택이란, 청년층에게 기존 주택을 저렴하게</Text>
                    <Text style={styles.description}>    임대해 주는 주택이에요.</Text>
                </View>
                <View>
                    <Text style={styles.description}>2. 청년의 소득 자산 기준에 따라 1순위~3순위로 신청 자격이</Text>
                    <Text style={styles.description}>    분류되어요.</Text>
                </View>
                <View>
                    <Text style={styles.description}>3. 청년 전세임대주택은 LH청약플러스에서 온라인으로 접수</Text>
                    <Text style={styles.description}>    할 수 있어요.</Text>
                </View>
            </View>
            <Text style={{fontWeight: '300', color:colors[theme].BLACK}}>2024년, 새해를 맞이하여 주거 복지에도 변화가 생겼어요. 한국토지주택공사(LH)는 청년층 및 자립을 준비하고 있는 청년들을 위해, 올해 말까지 전세임대주택을 수시로 접수할 것이라고 발표했는데요. 과연 청년 전세 임대주택은 무엇이고, 어떻게 신청할 수 있을지 함께 살펴보도록 해요.</Text>
            <Text style={styles.textTitle}>🤔 청년 전세임대주택이 무엇인가요?</Text> */}
        </View>
        <ScrollView style={{marginBottom: 130}}>
        <View style={{alignItems: 'center', gap: 15,}}>
            <TouchableOpacity style={styles.homepage} onPress={()=>Linking.openURL('https://youth.seoul.go.kr/mainA.do').catch((err) => console.error('An error occurred', err))}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/sosic_1.png')} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.homepage} onPress={()=>Linking.openURL('https://housing.seoul.go.kr').catch((err) => console.error('An error occurred', err))}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/sosic_2.png')} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.homepage}  onPress={()=>Linking.openURL('https://www.seoulhousing.kr').catch((err) => console.error('An error occurred', err))}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/sosic_3.png')} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.homepage}  onPress={()=>Linking.openURL('https://soco.seoul.go.kr/coHouse/main/main.do').catch((err) => console.error('An error occurred', err))}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/sosic_4.png')} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.homepage}  onPress={()=>Linking.openURL('https://soco.seoul.go.kr/youth/main/main.do').catch((err) => console.error('An error occurred', err))}>
              {theme=='light' && <Image resizeMode="contain" source={require('../../assets/sosic_5.png')} />}
            </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={{position:'absolute', bottom:50, alignItems: 'center', paddingHorizontal: 20}}>
            <CustomButton label='부동산 소식 더보기' size='large' onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE)}/>
        </View>
    </View>
  )
}

const styling = (theme:ThemeMode)=> StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
    },
    image: {
        width: deviceWidth,
        height: deviceWidth,
        marginLeft: 20,
    },
    textContainer: {
        padding: 30,
        gap: 20,
    },
    textTitle: {
        color: colors[theme].BLACK,
        fontSize: 15,
        fontWeight: '500',
    },
    Title: {
        color: colors[theme].BLACK,
        fontSize: 20,
        fontWeight: '800',
    },
    description: {
        color: colors[theme].BLACK,
    },
    homepage: {
        borderWidth: 0.2,
        borderColor: colors[theme].GRAY_700,
        borderRadius: 8,
        backgroundColor: colors[theme].WHITE,
        shadowColor: '#171717',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default AdditionalHomeScreen;