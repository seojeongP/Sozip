import React, { useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

const FeedFavoriteList = () => {
  const {data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} = useGetInfiniteFavoritePosts();
  const [isRefreshing, setIsRefresing] = useState(false)
  
  const handleRefresh = async () => {
    setIsRefresing(true);
    await refetch()
    setIsRefresing(false);
  }

  const hadleEndReached = () => {
    //다음페이지가 있고 가져오는 중이 아니라면
    if(hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); //다음 페이지 가져옴
    }
  }
    return (
        <FlatList 
            data={posts?.flat()}
            renderItem={({item})=><FeedItem post={item} />}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            ListEmptyComponent={<View><Text style={{textAlign:'center'}}>즐겨찾기한 장소가 없습니다.</Text></View>}
            contentContainerStyle={styles.contentContainer}
            onEndReached={hadleEndReached}
            onEndReachedThreshold={0.5} //완전히 바닥에 닿기 전에 다음 페이지 가져오기
            refreshing={isRefreshing} //위로 끌어당겼을 때 새로고침
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

export default FeedFavoriteList;