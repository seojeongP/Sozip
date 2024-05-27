import CustomButton from '@/components/common/CustomButton';
import { addiNavigations } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

type AdditionalHomeScreenProps = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_HOME>;

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

function AdditionalHomeScreen({navigation}:AdditionalHomeScreenProps) {
    

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>청년 전세임대주택 조건과 신청방법 정리해 드릴게요</Text>
            <Text style={styles.Title}>오늘의 소식</Text>
            <Text style={styles.textTitle}>📌 청년 전세임대주택 3줄 요약</Text>
            <View style={{gap: 8}}>
                <View>
                    <Text>1. 청년 전세임대주택이란, 청년층에게 기존 주택을 저렴하게</Text>
                    <Text>    임대해 주는 주택이에요.</Text>
                </View>
                <View>
                    <Text>2. 청년의 소득 자산 기준에 따라 1순위~3순위로 신청 자격이</Text>
                    <Text>    분류되어요.</Text>
                </View>
                <View>
                    <Text>3. 청년 전세임대주택은 LH청약플러스에서 온라인으로 접수</Text>
                    <Text>    할 수 있어요.</Text>
                </View>
            </View>
            <Text style={{fontWeight: '300'}}>2024년, 새해를 맞이하여 주거 복지에도 변화가 생겼어요. 한국토지주택공사(LH)는 청년층 및 자립을 준비하고 있는 청년들을 위해, 올해 말까지 전세임대주택을 수시로 접수할 것이라고 발표했는데요. 과연 청년 전세 임대주택은 무엇이고, 어떻게 신청할 수 있을지 함께 살펴보도록 해요.</Text>
            <Text style={styles.textTitle}>🤔 청년 전세임대주택이 무엇인가요?</Text>
        </View>
        <View style={{position:'absolute', bottom:50, alignItems: 'center', paddingHorizontal: 20}}>
            <CustomButton label='더보기' size='large' onPress={()=>navigation.navigate(addiNavigations.ADDI_MORE)}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 15,
    fontWeight: '500',
    },
    Title: {
    fontSize: 20,
    fontWeight: '800',
    },
});

export default AdditionalHomeScreen;