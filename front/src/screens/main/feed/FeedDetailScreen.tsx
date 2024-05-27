import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import { colors, feedNavigations, mainNavigations, mapNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

type FeedDetailScreenProps = CompositeScreenProps<
      StackScreenProps<FeedStackParamList,typeof feedNavigations.FEED_DETAIL>,
      StackScreenProps<MainStackParamList>
    >;

const FeedDatailScreen = ({route, navigation}: FeedDetailScreenProps) => {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    const {id} = route.params;
    //post 정보 받아옴
    const {data: post, isPending, isError} = useGetPost(id);
    const favoriteMutation = useMutateFavoritePost();
    const insets = useSafeAreaInsets();
    const {setMoveLocation} = useLocationStore()
    
    if(isPending || isError){
        return <><Text>매물 상세보기</Text></>
    }

    const handlePressLocation = () => {
      const {latitude, longitude} = post;
      setMoveLocation({latitude, longitude});
      navigation.navigate(mainNavigations.MAP, {
        screen: mapNavigations.MAP_HOME,
      });
    };

    const handleAnalysis = () => {
      navigation.navigate(feedNavigations.ANALYSIS, {id})
    };

    const handlePressFavorite = () => {
      favoriteMutation.mutate(post.id);
    }

  return (
    <>
    <ScrollView style={insets.bottom 
        ? [styles.container, {marginBottom: insets.bottom+50}]
        : [styles.container, styles.scrollNoInsets]
        }>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Octicons name='arrow-left' size={30} color={colors[theme].WHITE} onPress={() => navigation.goBack()}/>
          </View>
        </SafeAreaView>

        <View style={styles.imageContainer}>
          {post.images.length === 0 && (
              <View style={styles.emptyImageContainer}>
                <Text>No Image</Text>
              </View>
          )}
        </View>

        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors[theme].GRAY_500} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>

          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.descriptionText}>{post.address}</Text>
      </View>

      {post.images.length > 0 && (
        <View style={styles.imageContentsContainer}>
          <PreviewImageList imageUris={post.images} zoomEnable />
        </View>
      )}

    </ScrollView>

    <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
      <View style={styles.tabContainer}>
        <Pressable style={({pressed}) => [
              pressed && styles.bookmarkPressedContainer,
              styles.bookmarkContainer,
            ]}
            onPress={handlePressFavorite}
            >
          <Octicons 
            name='heart-fill' 
            size={30} 
            color={post.isFavorite ? colors[theme].PINK_700 : colors[theme].GRAY_400}/>
        </Pressable>
        <CustomButton 
          label='매물 정보 분석'
          size='medium'
          variant='filled'
          onPress={handleAnalysis}
        />
      </View>
    </View>
    </>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scrollNoInsets: {
    marginBottom: 65,
  },
  imageContainer: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height/2,
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors[theme].GRAY_200,
    borderColor: colors[theme].GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors[theme].WHITE,
    // height: Dimensions.get('screen').height/2,
    // marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors[theme].BLACK,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors[theme].GRAY_500,
    fontSize: 12,
  },
  descriptionText: {
    color: colors[theme].BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors[theme].WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors[theme].GRAY_200,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tabContainerNoInsets: {
    marginBottom: 10,
  },
  bookmarkContainer: {
    backgroundColor: colors[theme].WHITE,
    height: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 3,
  },
  bookmarkPressedContainer: {
    opacity: 0.5,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors[theme].WHITE,
    marginBottom: 10,
  },
});

export default FeedDatailScreen;