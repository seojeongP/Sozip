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

    // console.log(bank_name);
    // console.log(`../../../assets/bank/${bank_name}.png`);

    // const youth_num = Object.keys(loanList.ur.for_youth).length;

    // const list = Array(youth_num).fill().map((obj, index)=>index+1)

  return (
    <ScrollView style={styles.container}>
        <View style={styles.itemsContainer}>
            <Text style={styles.realtitleText}>청년 맞춤 상품</Text>
            <View>
            {/* {
                list.map(()=>{
                    return <LoanItemBlock 
                                name='ur' 
                                onPress={()=>navigation.navigate(
                                    loanNavigations.BANK_ITEM_DETAIL, 
                                    {bank: bank_name})}
                            />
                })
            } */}
            </View>
            {/* {Array(2).fill(
                <LoanItemBlock name='ur'/>
            )} */}
            <LoanItemBlock name='ur'/>
        </View>
        


        <View style={styles.itemsContainer}>
            <Text style={styles.realtitleText}>일반 상품</Text>
        </View>
   </ScrollView>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 30, 
        gap: 20,
    },
    realtitleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemsContainer: {
        flex: 1,
        gap: 15,
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