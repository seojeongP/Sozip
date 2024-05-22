import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React, { ReactNode } from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

interface HeaderButtonProps extends PressableProps {
    labelText?: string;
    icon?: ReactNode;
    hasError?: boolean;
}

const HeaderButton = ({labelText, icon, hasError=false, ...props}: HeaderButtonProps) => {
    const {theme} = useThemeStore();
    const styles = styling(theme);

  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
        {!labelText && icon}
        {!icon && labelText &&
        <Text style={[styles.text, hasError&&styles.textError]}>{labelText}</Text> }
    </Pressable>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: colors[theme].BLUE_MAIN,
    },
    textError: {
        color:colors[theme].GRAY_200,
    },
});

export default HeaderButton;