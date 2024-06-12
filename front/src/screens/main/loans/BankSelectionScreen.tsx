import CustomButton from '@/components/common/CustomButton';
import { colors, loanNavigations } from '@/constants';
import { LoanStackParamList } from '@/navigations/stack/LoanStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type BankSelectionScreenProps = StackScreenProps<LoanStackParamList>;

function BankSelectionScreen({navigation}: BankSelectionScreenProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    const handleBankPress = (name: string) => {
        navigation.navigate(loanNavigations.BANK_ITEM_LIST, {bank:name,})
    }

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
        </SafeAreaView>
        <Text style={styles.titleText}>거래 은행 선택 </Text>
        <View style={styles.logosContainer}>
            <View style={styles.rowLogoContainer}>
                <Pressable style={styles.logoContainer} onPress={()=>navigation.navigate(loanNavigations.BANK_ITEM_LIST, {bank:'ur',})}>
                    <Image source={require('../../../assets/bank/ur.png')} style={styles.imageContainer}/>
                    <Text style={styles.text}>우리은행</Text>
                </Pressable>
                <Pressable style={styles.logoContainer} onPress={()=>handleBankPress('kb')}>
                    <Image source={require('../../../assets/bank/kb.png')} style={styles.imageContainer}/>
                    <Text style={styles.text}>KB국민은행</Text>
                </Pressable>
                <Pressable style={styles.logoContainer} onPress={()=>handleBankPress('hn')}>
                    <Image source={require('../../../assets/bank/hn.png')} style={styles.imageContainer}/>
                    <Text style={styles.text}>하나은행</Text>
                </Pressable>
            </View>
            <View style={[styles.rowLogoContainer, {justifyContent: 'flex-start'}]}>
                <Pressable style={styles.logoContainer} onPress={()=>handleBankPress('kakao')}>
                    <Image source={require('../../../assets/bank/kakao.png')} style={styles.imageContainer}/>
                    <Text style={styles.text}>카카오뱅크</Text>
                </Pressable>
                <Pressable style={styles.logoContainer} onPress={()=>handleBankPress('toss')}>
                    <Image source={require('../../../assets/bank/toss.png')} style={styles.imageContainer}/>
                    <Text style={styles.text}>토스뱅크</Text>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 30,
    },
    headerContainer: {
        position: 'absolute',
        // padding: 20,
        top: 12,
        zIndex: 1,
        width: '100%',
    },
    titleText: {
        color: colors[theme].BLACK,
        marginLeft: 30,
        fontSize: 23,
        fontWeight: '700',
    },
    button: {
        position: 'absolute',
        bottom: 40,
        left: 20,
    },
    logosContainer:{
        // flex: 1,
        marginTop: 30,
        gap: 40,
    },
    rowLogoContainer: {
        // flex: 1,
        flexDirection: 'row',
        gap: 30,
    },
    logoContainer:{
        flex: 3,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
    text: {
        color: colors[theme].BLACK,
        fontSize: 15,
        fontWeight: '600',
    },
});

export default BankSelectionScreen;