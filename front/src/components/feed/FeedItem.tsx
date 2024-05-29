import { ResponsePost, ResponseSinglePost } from '@/api';
import { colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { getDateWithSeparator } from '@/utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

interface FeedItemProps {
    post: ResponsePost;
}

type Navigation = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  StackNavigationProp<MapStackParamList>
>;


function FeedItem({post}: FeedItemProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    const favoriteMutation = useMutateFavoritePost();
    const navigation = useNavigation<Navigation>();
    const {data: item, isPending, isError} = useGetPost(post.id);

    const handlePressFeed = () => {
        navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id})
    };


    const handlePressFavorite = () => {
      favoriteMutation.mutate(post.id);
    }

  return (
    <View>
    <Pressable style={styles.container} onPress={handlePressFeed}>
        <View>
            {post.images.length > 0 && (
              <View key={post.id} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${
                      Platform.OS === 'ios'
                        ? 'http://localhost:3030/'
                        : 'http://10.0.2.2:3030/'
                    }${post.images[0]?.uri}`,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}
            {post.images.length === 0 && (
              <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                <Text style={styles.descriptionText}>No Image</Text>
              </View>
            )}
        </View>
        <View style={styles.textContainer}>
            {/* <Text style={styles.dateText}>{getDateWithSeparator(post.date, '/')}</Text> */}
            <Text style={styles.titleText}>{post.title}</Text>
            <Text style={styles.addressText}>{post.address}</Text>
            <Text style={styles.descriptionText}
                  numberOfLines={2} //한줄만 표시
            >{post.title}</Text>
        </View>
        <View style={{position:'absolute', bottom:10, right:10}}>
        <Pressable style={({pressed}) => [
              pressed && styles.bookmarkPressedContainer,
              styles.bookmarkContainer,
            ]}
            onPress={handlePressFavorite}
            >
          <Octicons 
            name='heart-fill' 
            size={30} 
            color={item?.isFavorite ? colors[theme].PINK_700 : colors[theme].GRAY_400}/>
        </Pressable>
        </View>
    </Pressable>
    </View>
  );
}

const styling = (theme:ThemeMode) => StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        margin:5,
        padding: 5,
        marginVertical:12,
        borderWidth: 0.2,
        borderColor: colors[theme].GRAY_700,
        borderRadius: 8,
        backgroundColor: colors[theme].WHITE,
        shadowColor: '#171717',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    imageContainer: {
        margin: 8,
        width: Dimensions.get('screen').width / 2 - 25,
        height: Dimensions.get('screen').width / 2 - 25,
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
      },
      emptyImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors[theme].GRAY_200,
        borderRadius: 5,
        borderWidth: 1,
      },
      textContainer: {
        flex:1,
        margin: 15,
        marginLeft: 3,
        gap: 10,
      },
      // dateText: {
      //   color: colors[theme].PINK_700,
      //   fontWeight: '600',
      //   fontSize: 12,
      // },
      addressText: {
        color: colors[theme].GRAY_700,
        fontWeight: '500',
        fontSize: 13,
      },
      titleText: {
        color: colors[theme].BLACK,
        fontWeight: '500',
        fontSize: Dimensions.get('screen').width > 300 ? 18 : 16,
      },
      descriptionText: {
        color: colors[theme].GRAY_500,
        fontSize: 13,
      },
      bookmarkPressedContainer: {
        opacity: 0.5,
      },
      bookmarkContainer: {
        backgroundColor: colors[theme].WHITE,
        height: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
        borderRadius: 3,
      },
});

export default FeedItem;