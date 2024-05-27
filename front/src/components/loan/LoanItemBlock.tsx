import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {Dimensions, Image, Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LoanItemBlockProps extends PressableProps{
    name: string;
}

function LoanItemBlock({name, ...props}: LoanItemBlockProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
  return (
    <View style={[styles.optionBackground]}>
                <Pressable style={styles.cardContainer} >
                <View style={styles.cardInner}>
                    
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require(`../../assets/bank/ur.png`)} />
                    </View>
                    <View style={styles.titleGap}>
                        <Text style={styles.titleText}>우리 청년 맞춤 월세대출</Text>
                        <View style={styles.cardAlign}>
                            <View style={styles.infoContainer}>
                                <Text
                                    style={styles.addressText}
                                    ellipsizeMode="tail"
                                    numberOfLines={2}>
                                    대출기간 13년 내에서 최대 12백만원까지 지원
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
                </Pressable>
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

export default LoanItemBlock;