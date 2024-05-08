import { feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type FeedDetailScreenProps = StackScreenProps<FeedStackParamList,typeof feedNavigations.FEED_DETAIL>;

const FeedDatailScreen = ({route}: FeedDetailScreenProps) => {
    const {id} = route.params;
    const {data: post, isPending, isError} = useGetPost(id);
    
    if(isPending || isError){
        return <><Text>매물 상세보기</Text></>
    }

  return (
    <ScrollView>
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <Text style={styles.descriptionText}>No Image</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    emptyImageContainer: {

    },
    descriptionText: {

    },
});

export default FeedDatailScreen;