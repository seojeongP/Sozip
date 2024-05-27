import React, {ReactNode} from 'react';
import {StyleSheet, Text, Pressable, PressableProps, Dimensions, View, StyleProp, ViewStyle, TextStyle, TextBase} from 'react-native';
import { colors } from '../../constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';

interface CustomButtonProps extends PressableProps{
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'large' | 'medium' | 'small';
    inValid?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: ReactNode;
    radius?: 'rec' | 'round';
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
    label, 
    variant='filled', 
    size='large',
    inValid=false,
    style=null,
    textStyle=null,
    icon=null,
    radius='rec',
    ...props //presableprops가 제공하는 누르기 기능 사용 가능
}: CustomButtonProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
        disabled={inValid} 
        style={({pressed})=>[
            styles.container, 
            pressed ? styles[`${variant}Pressed${radius}`] : styles[`${variant}${radius}`],
            inValid && styles.inValid,
            style,
        ]}
        {...props}>
        <View style={styles[size]}>
            {icon}
            <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{label}</Text>
        </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    inValid:{
        opacity: 0.5,
    },
    filledrec: {
        backgroundColor: colors[theme].BLUE_MAIN,
    },
    outlinedrec: {
        borderColor: colors[theme].BLUE_MAIN,
        borderWidth: 1,
    },
    filledround: {
        backgroundColor: colors[theme].BLUE_MAIN,
        borderRadius: 30,
    },
    outlinedround: {
        borderColor: colors[theme].BLUE_MAIN,
        borderWidth: 1,
        borderRadius: 30,
    },
    filledPressedrec: {
        backgroundColor: colors[theme].BLUE_500,
    },
    outlinedPressedrec: {
        borderColor: colors[theme].BLUE_500,
        borderWidth: 1,
    }, 
    filledPressedround: {
        backgroundColor: colors[theme].BLUE_500,
        borderRadius: 30,
    },
    outlinedPressedround: {
        borderColor: colors[theme].BLUE_500,
        borderWidth: 1,
        borderRadius: 30,
    },
    large: {
        width: "100%",
        paddingVertical: deviceHeight>700 ? 15: 12,
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
        gap: 5,
    },
    medium: {
        width: "50%",
        paddingVertical: deviceHeight>700 ? 12: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
        gap: 5,
    },
    small: {
        width: "30%",
        paddingVertical: deviceHeight>700 ? 20: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
        gap: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    filledText: {
        color: colors[theme].WHITE,
    },
    outlinedText: {
        color: colors[theme].BLUE_MAIN,
    },
});

export default CustomButton;