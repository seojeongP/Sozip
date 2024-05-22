import FeedFavoriteList from '@/components/FeedFavoriteList';
import FeedList from '@/components/FeedList';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function FeedHomeScreen() {
  return (
    <View style={styles.container}>
      {/* <FeedList /> */}
      <FeedFavoriteList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;