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
import {Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

    console.log("isPending", isPending);
    console.log("isError", isError);

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

    const dividedArea = (post.area / 3.3058).toFixed(2);

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
          {post.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.contentsContainer}>

          <Text style={styles.titleText}>{post.title}</Text>

          
          <Pressable onPress={handlePressLocation}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={20} color={colors[theme].GRAY_700} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail">
              {post.si}
            </Text>
            <Text
              style={styles.addressText}
              ellipsizeMode="tail">
              {post.gu}
            </Text>
            <Text
              style={styles.addressText}
              ellipsizeMode="tail">
              {post.dong}
            </Text>
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
            </View>
            </Pressable>
          
          

          <View style={styles.descriptionContainer}>
            <View style={{flexDirection: 'row', gap: 20,}}>
              <Ionicons name="wallet" size={25} color={colors[theme].BLACK} />
              <Text style={{lineHeight: 25,fontSize: 18, fontWeight: '600', color:colors[theme].BLACK}}>거래가</Text>
            </View>
            <View style={styles.descriptionDetailContainer}>
            <Text style={[styles.descriptionText, {fontWeight: '700'}]}>
              {post.payment=='ws'? '월세' : post.payment=='js'?'전세':'매매'}
            </Text>
            <Text style={styles.descriptionText}>
              {post.price} 만원
            </Text>
            <Text style={styles.descriptionText}>
              / {post.payment=='ws'? post.rent : ''} 
            </Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
          <View style={{flexDirection: 'row', gap: 20,}}>
              <Ionicons name="resize" size={25} color={colors[theme].BLACK} />
              <Text style={{lineHeight: 25,fontSize: 18, fontWeight: '600', color:colors[theme].BLACK}}>전용면적</Text>
            </View>
            <Text style={styles.descriptionText}>
              {post.area} m{'\xB2'} / {dividedArea} 평
            </Text>
          </View>


          <Text style={[styles.descriptionText, {marginTop: 30 ,fontSize: 25, fontWeight: '700'}]}>주변 시설 정보</Text>
      
          <View style={styles.tableContainer}>
            <View style={[styles.oneRow]}>
              <View style={[styles.oneBlock, {flex: 2, alignItems:'center'}]}><Text style={{fontWeight: '700', color:colors[theme].BLACK}}>주변 시설</Text></View>
              <View style={[styles.oneBlock, {flex: 4, alignItems:'center'}]}><Text style={{fontWeight: '700', color:colors[theme].BLACK}}>가장 가까운 시설 정보</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{fontWeight: '700', color:colors[theme].BLACK}}>거리(m)</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 2}]}><Text style={{color:colors[theme].BLACK}}>버스 정류장</Text></View>
              <View style={[styles.oneBlock, {flex: 4}]}><Text style={{color:colors[theme].BLACK}}>{post.bus}</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{color:colors[theme].BLACK}}>{post.dis_bus}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 2}]}><Text style={{color:colors[theme].BLACK}}>지하철역</Text></View>
              <View style={[styles.oneBlock, {flex: 4}]}><Text style={{color:colors[theme].BLACK}}>{post.metro}</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{color:colors[theme].BLACK}}>{post.dis_metro}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 2}]}><Text style={{color:colors[theme].BLACK}}>초등학교</Text></View>
              <View style={[styles.oneBlock, {flex: 4}]}><Text style={{color:colors[theme].BLACK}}>{post.elementary}</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{color:colors[theme].BLACK}}>{post.dis_elementary}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 2}]}><Text style={{color:colors[theme].BLACK}}>중학교</Text></View>
              <View style={[styles.oneBlock, {flex: 4}]}><Text style={{color:colors[theme].BLACK}}>{post.middle}</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{color:colors[theme].BLACK}}>{post.dis_middle}</Text></View>
            </View>
            <View style={[styles.oneRow, {borderBottomEndRadius: 10,borderBottomStartRadius: 10,}]}>
              <View style={[styles.oneBlock, {flex: 2}]}><Text style={{color:colors[theme].BLACK}}>고등학교</Text></View>
              <View style={[styles.oneBlock, {flex: 4}]}><Text style={{color:colors[theme].BLACK}}>{post.high}</Text></View>
              <View style={[styles.oneBlock, {flex: 2, borderRightWidth:0, alignItems:'flex-end'}]}><Text style={{color:colors[theme].BLACK}}>{post.dis_high}</Text></View>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View style={[styles.oneRow]}>
              <View style={[styles.oneBlock, {flex: 1, alignItems:'center'}]}><Text style={{fontWeight: '700', color:colors[theme].BLACK}}>주변 시설 (1.3km)</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, marginRight:10, alignItems:'center'}]}><Text style={{fontWeight: '700', color:colors[theme].BLACK}}>개수</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>편의점 (300m)</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.conv}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>대형마트</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.mart}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>약국 (300m)</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.pharmacy}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>병원</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.hospital}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>공공도서관</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.lib}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>경찰서</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.police}</Text></View>
            </View>
            <View style={styles.oneRow}>
              <View style={[styles.oneBlock, {flex: 1}]}><Text style={{color:colors[theme].BLACK}}>소방서</Text></View>
              <View style={[styles.oneBlock, {flex: 1, borderRightWidth:0, alignItems:'flex-end', marginRight:10}]}><Text style={{color:colors[theme].BLACK}}>{post.fire}</Text></View>
            </View>
          </View>
      </View>

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
  image: {
    width: '100%',
    height: '100%',
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
    gap: 10,
    // height: Dimensions.get('screen').height/2,
    // marginBottom: 10,
  },
  titleText: {
    fontSize: 30,
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
    color: colors[theme].GRAY_700,
    fontSize: 15,
  },
  descriptionContainer: {
    gap: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionDetailContainer: {
    flexDirection: 'row',
    gap: 5,
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
  tableContainer: {
    flex: 5,
    margin: 5,
    gap: 5,
    // marginTop: 20,
    borderWidth: 1,
    borderColor: colors[theme].GRAY_700,
    borderRadius: 10,
  },
  oneRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    borderBottomColor: colors[theme].GRAY_700,
    borderBottomWidth: 0.7,
  },
  oneBlock: {
    // borderRightColor: colors[theme].GRAY_700,
    // borderRightWidth: 0.7,
    padding:5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRightColor: colors[theme].GRAY_400,
    borderRightWidth: 1,
  },
});

export default FeedDatailScreen;