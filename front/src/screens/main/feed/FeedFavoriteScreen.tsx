import FeedFavoriteList from '@/components/FeedFavoriteList';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
        <FeedFavoriteList />
    </SafeAreaView>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : colors[theme].WHITE,
    },
});

export default FeedFavoriteScreen;