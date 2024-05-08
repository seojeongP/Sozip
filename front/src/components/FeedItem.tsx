import { ResponsePost } from '@/api';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { getDateWithSeparator } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

interface FeedItemProps {
    post: ResponsePost;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedItem({post}: FeedItemProps) {
    const navigation = useNavigation<Navigation>();

    const handlePressFeed = () => {
        navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id})
    };

  return (
    <Pressable style={styles.container} onPress={handlePressFeed}>
        <View>
            <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                    <Text style={styles.descriptionText}>No Image</Text>
            </View>
        </View>
        <View style={styles.textContainer}>
            {/* <Text style={styles.dateText}>{getDateWithSeparator(post.date, '/')}</Text> */}
            <Text style={styles.titleText}>{post.title}</Text>
            <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:5,
        marginVertical:12,
    },
    imageContainer: {
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
        borderColor: colors.GRAY_200,
        borderRadius: 5,
        borderWidth: 1,
      },
      textContainer: {
        marginTop: 7,
        gap: 2,
      },
      dateText: {
        color: colors.PINK_700,
        fontWeight: '600',
        fontSize: 12,
      },
      titleText: {
        color: colors.BLACK,
        fontWeight: '500',
        fontSize: 13,
      },
      descriptionText: {
        color: colors.GRAY_500,
        fontSize: 13,
      },
});

export default FeedItem;