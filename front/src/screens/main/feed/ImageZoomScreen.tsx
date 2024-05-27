import React from 'react';
import {StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import ImageCarousel from '@/components/common/ImageCarousel';
import useDetailPostStore from '@/store/useDetailPostStore';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();

  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}

export default ImageZoomScreen;