import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {Dimensions, Image, Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LoanItemBlockProps extends PressableProps{
    name: string;
    title: string;
    desc: string;
}

function LoanItemBlock({name, title, desc, ...props}: LoanItemBlockProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    // console.log('name',name);
  return (
    <View style={[styles.optionBackground]}>
        <View style={styles.cardContainer} >
        <View style={styles.cardInner}>
            
            <View style={styles.imageContainer}>
                {name=='ur'&&<Image style={styles.image} source={require(`../../assets/bank/ur.png`)} />}
                {name=='kb'&&<Image style={styles.image} source={require(`../../assets/bank/kb.png`)} />}
                {name=='hn'&&<Image style={styles.image} source={require(`../../assets/bank/hn.png`)} />}
                {name=='kakao'&&<Image style={styles.image} source={require(`../../assets/bank/kakao.png`)} />}
                {name=='toss'&&<Image style={styles.image} source={require(`../../assets/bank/toss.png`)} />}
            </View>
            <View style={styles.titleGap}>
                <Text style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                <View style={styles.cardAlign}>
                    <View style={styles.infoContainer}>
                        <Text
                            style={styles.addressText}
                            ellipsizeMode="tail"
                            numberOfLines={2}>
                            {desc}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.nextButton}>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color={colors[theme].BLACK}
                />
            </View>
        </View>
        </View>
    </View>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
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
        width: '80%',
        height: '80%',
        left: 5,
        top: 10,
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

export default LoanItemBlock;