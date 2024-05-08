import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, { useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedItem from './FeedItem';

const FeedList = () => {
  const {data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} = useGetInfinitePosts();
  const [isRefreshing, setIsRefresing] = useState(false)
  
  const handleRefresh = async () => {
    setIsRefresing(true);
    await refetch()
    setIsRefresing(false);
  }

  const hadleEndReached = () => {
    if(hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }
  }
    return (
        <FlatList 
            data={posts?.flat()}
            renderItem={({item})=><FeedItem post={item} />}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            contentContainerStyle={styles.contentContainer}
            onEndReached={hadleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollIndicatorInsets={{right:1}}
            indicatorStyle='black'
        >

        </FlatList>
    );
}

const styles = StyleSheet.create({
    contentContainer:{
        padding: 15,
    },
});

export default FeedList;