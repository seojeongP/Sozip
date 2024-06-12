import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {Image, Linking, PressableProps, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../common/CustomButton';
import { details, urls } from '@/constants/bank_items';

interface LoanItemDetailProps extends PressableProps{
    bank: string;
    title: string;
}

//대출 상품 별 url 정리
const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

const bankImages = {
    '우리은행': require('../../assets/bank/ur.png'),
    'KB국민은행': require('../../assets/bank/kb.png'),
    '하나은행': require('../../assets/bank/hn.png'),
    '카카오뱅크': require('../../assets/bank/kakao.png'),
    '토스뱅크': require('../../assets/bank/toss.png'),
  };

function LoanItemDetail({bank, title, ...props}: LoanItemDetailProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    const my_bank = bank=='우리은행'? '우리은행' 
                :bank=='KB국민은행'? 'KB국민은행'
                :bank=='하나은행'? '하나은행'
                :bank=='카카오뱅크'? '카카오뱅크'
                :'토스뱅크';

    var url='';
    var intro = '';
    var arr: any[]=[];
    switch(my_bank){
        case '우리은행':{
            switch(title){
                case '우리 청년 맞춤형 전세대출': intro=details.UR_1_INTRO; arr=details.UR_1; url= urls.UR_1; break;
                case '우리 청년 맞춤 월세대출': intro=details.UR_2_INTRO; arr=details.UR_2; url= urls.UR_2; break;
                case '주택도시기금대출': intro=details.UR_3_INTRO; arr=details.UR_3; url= urls.UR_3; break;
                case '스마트리빙론': intro=details.UR_4_INTRO; arr=details.UR_4; url= urls.UR_4; break;
                case 'iTouch 전세론': intro=details.UR_5_INTRO; arr=details.UR_5; url= urls.UR_5; break; 
            }
            break;
        }
        case 'KB국민은행':{
            switch(title){
                case '청년전용 버팀목전세자금대출': intro=details.KB_1_INTRO; arr=details.KB_1; url=urls.KB_1;break;
                case '징검다리전세자금보증 주택전세자금대출': intro=details.KB_2_INTRO; arr=details.KB_2; url=urls.KB_2; break;
                case 'KB 청년 맞춤형 전·월세자금대출': intro=details.KB_3_INTRO; arr=details.KB_3; url=urls.KB_3; break;
                case '임대주택 입주자 특례보증 전세자금대출': intro=details.KB_4_INTRO; arr=details.KB_4; url=urls.KB_4; break;
                case 'KB주택담보대출': intro=details.KB_5_INTRO; arr=details.KB_5; url=urls.KB_5; break; 
            }
            break;
        }
        case '하나은행': intro=details.HN_INTRO; arr=details.HN; url=urls.hn_1; break;

        case '카카오뱅크':{
            switch(title){
                case '카카오뱅크 전월세보증금 대출': intro=details.KAKAO_1_INTRO; arr=details.KAKAO_1; url=urls.kakao_1;break;
                case '주택담보대출 갈아타기': intro=details.KAKAO_2_INTRO; arr=details.KAKAO_2; url=urls.kakao_2; break;
                case '주택담보대출': intro=details.KAKAO_3_INTRO; arr=details.KAKAO_3; url=urls.kakao_3; break;
            }
            break;
        }
        case '토스뱅크': intro=details.TOSS_INTRO; arr=details.TOSS; url=urls.toss_1; break;
    }

   const imageSource = bankImages[my_bank];

   return (
        <ScrollView style={styles.bigBox}>
            <View style={{marginBottom: 50,}}>
            <View style={styles.itemsContainer}>
            <View style={styles.bankBox}>
                <View style={{width: 40, height: 40}}><Image style={styles.image} source={imageSource}/></View>
                <Text style={[styles.titleText, {fontSize:16, bottom: 5,}]}>{bank}</Text>
            </View>
            <Text style={styles.titleText}>{title}</Text>
            </View>
            <Text style={[styles.textTitle, {marginBottom: 15}]}>{intro}</Text>
            
            <View style={styles.textContainer}>
            {arr.map(({title, description})=>(
                <View style={{gap: 15, marginTop: 10,}}>
                <Text style={styles.subTitle}>{title}</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            ))}
            </View>
        <CustomButton style={{marginTop:30,}} label='알아보러 가기' size='large' variant='outlined' onPress={()=>openLink(url)}/>
        </View>
        </ScrollView>
    )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        // padding: 20,
        top: 20,
        zIndex: 1,
        width: '15%',
    },
    bigBox: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_400,
    borderRadius: 10,
    backgroundColor: colors[theme].WHITE,
    padding: 25,
    },
    realtitleText: {
        color: colors[theme].BLACK,
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
    },
    image: {
    resizeMode: 'cover',
    width: '80%',
    height: '80%',
    borderRadius: 35,
},
    titleText: {
    color: colors[theme].BLACK,
    fontSize: 20,
    fontWeight: '700',
    },
    bankBox: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    itemsContainer: {
    flex: 1,
    gap: 15,
    paddingBottom: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors[theme].GRAY_700,
    },
    textContainer: {
    gap: 10,
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
    subTitle: {
    color: colors[theme].BLACK,
    fontSize: 17,
    fontWeight: '700',
    },
        descriptionText: {
        color: colors[theme].BLACK,
      },
});

export default LoanItemDetail;