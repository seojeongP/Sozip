import LoanItemBlock from '@/components/loan/LoanItemBlock';
import { colors, loanNavigations } from '@/constants';
import { loanList } from '@/constants/loan_detail';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type BankItemListScreenProps = StackScreenProps<LoanStackParamList, typeof loanNavigations.BANK_ITEM_LIST>;

function BankItemListScreen({route, navigation}: BankItemListScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    const {bank: bank_name} = route.params;

    const handlePress = (bank: string, title:string) => {
        navigation.navigate(loanNavigations.BANK_ITEM_DETAIL, {bank, title})
    }

  return (
    <>
    <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
        </SafeAreaView>
    <ScrollView style={styles.container}>
        <View style={styles.itemsContainer}>
            <Text style={[styles.realtitleText, {marginBottom:10,}]}>청년 맞춤 상품</Text>

            {bank_name=='ur'&&
            <Pressable onPress={()=>handlePress('ur', "우리 청년 맞춤형 전세대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"우리 청년 맞춤형 전세대출"} 
                desc={"청년의 주거비 부담 경감을 위한 청년 전용 전세자금보증 지원 상품"
                }/></Pressable>}
            {bank_name=='ur'&&
            <Pressable onPress={()=>handlePress('ur', "우리 청년 맞춤 월세대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"우리 청년 맞춤 월세대출"} 
                desc={"주택법상 주택이면 주택금융신용보증서를 담보로 월세자금을 지원"}/></Pressable>}

            {bank_name=='kb'&&
            <Pressable onPress={()=>handlePress('ur', "청년전용 버팀목전세자금대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"청년전용 버팀목전세자금대출"} 
                desc={"청년 세대주를 위한 전세대출이며 임차보증금의 80% 내에서 최대 2억원까지 지원"}/></Pressable>}
            {bank_name=='kb'&&
            <Pressable onPress={()=>handlePress('ur', "징검다리전세자금보증 주택전세자금대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"징검다리전세자금보증 대출"} 
                desc={"제2금융권 전세자금대출을 상환할 목적으로 설계된 금융상품"}/></Pressable>}
            {bank_name=='kb'&&
            <Pressable onPress={()=>handlePress('ur', "KB 청년 맞춤형 전·월세자금대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"청년 맞춤형 전·월세자금대출"} 
                desc={"무주택 청년을 위한 금융위원회 정책 상품"}/></Pressable>}

            {bank_name=='hn'&&
            <Pressable onPress={()=>handlePress('ur', "하나 청년전세론")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"하나 청년전세론"} 
                desc={"만 19세 이상 34세 이하 무주택 세대주를 대상"}/></Pressable>}

            {bank_name=='kakao'&&
            <Pressable onPress={()=>handlePress('ur', "카카오뱅크 전월세보증금 대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"카카오뱅크 전월세보증금 대출"} 
                desc={"주거 부담 경감을 목표로 한 금융 상품"}/></Pressable>}

            {bank_name=='toss'&&
            <Pressable onPress={()=>handlePress('ur', "토스 전월세 보증금 대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"토스 전월세 보증금 대출"} 
                desc={"만 19세 이상 내국인 중에서 1개월 이상 재직한 근로소득자, 사업소득자, 기타소득자 및 무소득자를 대상"}/></Pressable>}
        </View>
        


        <View style={styles.itemsContainer}>
            <Text style={styles.realtitleText}>일반 상품</Text>
            {bank_name=='ur'&&
            <Pressable onPress={()=>handlePress('ur', "주택도시기금대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"주택도시기금대출"} 
                desc={"청년의 주거비 부담 경감을 위한 청년 전용 전세자금보증 지원 상품"}/></Pressable>}
            {bank_name=='ur'&&
            <Pressable onPress={()=>handlePress('ur', "스마트리빙론")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"스마트리빙론"} 
                desc={"주택법상 주택이면 주택금융신용보증서를 담보로 월세자금을 지원"}/></Pressable>}
            {bank_name=='ur'&&
            <Pressable onPress={()=>handlePress('ur', "iTouch 전세론")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"iTouch 전세론"} 
                desc={"주택법상 주택이면 주택금융신용보증서를 담보로 월세자금을 지원"}/></Pressable>}

            {bank_name=='kb'&&
            <Pressable onPress={()=>handlePress('kb', "임대주택 입주자 특례보증 전세자금대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"임대주택 특례보증 전세대출"} 
                desc={"주택법상 주택이면 주택금융신용보증서를 담보로 월세자금을 지원"}/></Pressable>}
            {bank_name=='kb'&&
            <Pressable onPress={()=>handlePress('kb', "KB주택담보대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"KB주택담보대출"} 
                desc={"혼합금리와 변동금리 중 선택이 가능한 주택담보대출"}/></Pressable>}

            {bank_name=='kakao'&&
            <Pressable onPress={()=>handlePress('kakao', "주택담보대출 갈아타기")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"주택담보대출 갈아타기"} 
                desc={"주택법상 주택이면 주택금융신용보증서를 담보로 월세자금을 지원"}/></Pressable>}
            {bank_name=='kakao'&&
            <Pressable onPress={()=>handlePress('kakao', "주택담보대출")}>
                <LoanItemBlock 
                name={bank_name} 
                title={"주택담보대출"} 
                desc={"혼합금리와 변동금리 중 선택이 가능한 주택담보대출"}/></Pressable>}
        </View>
   </ScrollView>
   </>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 30, 
        gap: 20,
        marginBottom: 30,
    },
    headerContainer: {
        position: 'absolute',
        // padding: 20,
        top: 20,
        zIndex: 1,
        width: '20%',
    },
    realtitleText: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
    },
    itemsContainer: {
        flex: 1,
        gap: 20,
        paddingBottom: 30,
        marginBottom: 30,
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: colors[theme].GRAY_700,
    },
    titleGap: {
        gap: 10,
    },
    optionBackground: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    cardContainer: {
        backgroundColor: colors[theme].WHITE,
        margin: 0,
        borderRadius: 20,
        shadowColor: colors[theme].BLACK,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        elevation: 1,
        borderColor: colors[theme].GRAY_500,
        borderWidth: 1.5,
        height: 100,
    },
    cardInner: {
        padding: 10,
        gap: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    cardAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        width: Dimensions.get('screen').width / 2-20,
    },
    addressText: {
        color: colors[theme].GRAY_500,
        fontSize: 12,
    },
    titleText: {
        color: colors[theme].BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    
});

export default BankItemListScreen;