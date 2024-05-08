import React from 'react';
import {StyleSheet, Text, Pressable, PressableProps, Dimensions, View} from 'react-native';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps{
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
    label, 
    variant='filled', 
    size='large',
    inValid=false,
    ...props //presableprops가 제공하는 누르기 기능 사용 가능
}: CustomButtonProps) {
  return (
    <Pressable
        disabled={inValid} 
        style={({pressed})=>[
            styles.container, 
            pressed ? styles[`${variant}Pressed`] : styles[variant],
            inValid && styles.inValid
        ]}
        {...props}>
        <View style={styles[size]}>
            <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    inValid:{
        opacity: 0.5,
    },
    filled: {
        backgroundColor: colors.BLUE_MAIN,
    },
    outlined: {
        borderColor: colors.BLUE_MAIN,
        borderWidth: 1,
    },
    filledPressed: {
        backgroundColor: colors.BLUE_500,
    },
    outlinedPressed: {
        borderColor: colors.BLUE_500,
        borderWidth: 1,
    },
    large: {
        width: "100%",
        paddingVertical: deviceHeight>700 ? 15: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    medium: {
        width: "50%",
        paddingVertical: deviceHeight>700 ? 12: 8,
        alignItems: 'center',
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    filledText: {
        color: colors.WHITE,
    },
    outlinedText: {
        color: colors.BLUE_MAIN,
    },
});

export default CustomButton;