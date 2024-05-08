import useAuth from '@/hooks/queries/useAuth';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {StyleSheet, View, Alert, Pressable, Button, Text, TouchableOpacity} from 'react-native';
import MapView, { Callout, LatLng, LongPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors, mapNavigations } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePermission from '@/hooks/usePermission';
import mapStyle from '@/style/mapStyle';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import CustomButton from '@/components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomMarker from '@/components/CustomMarker';
import { alerts } from '@/constants/messages';
import useGetMarkers from '@/hooks/queries/useGetMarkers'
import MarkerModal from '@/components/MarkerModal';
import useModal from '@/hooks/useModal';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import { ScrollView } from 'react-native-gesture-handler';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import FeedList from '@/components/FeedList';
import { scaleZetaToMatchClamps } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  StackNavigationProp<MapStackParamList>
>;

function MapHomeScreen() {
  const [option, setOption] = useState<Boolean>(false);
  const [listShown, setListShown] = useState<Boolean>(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetListRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentListPress = useCallback(() => {
    bottomSheetListRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const inset = useSafeAreaInsets();

  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const mapRef = useRef<MapView | null>(null)
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {data:markers = []} = useGetMarkers();
  const [markerId, setMarkerId] = useState<number|null>(null);

  const [isOption, setIsOptions] = useState<Boolean>(false);

  const [elementary, setElementary] = useState<Boolean>(true);
  const [middle, setMiddle] = useState<Boolean>(true);
  const [high, setHigh] = useState<Boolean>(true);

  const [bus, setBus] = useState<Boolean>(true);
  const [metro, setMetro] = useState<Boolean>(true);

  const [phar, setPhar] = useState<Boolean>(true);
  const [convi, setConvi] = useState<Boolean>(true);
  const [mart, setMart] = useState<Boolean>(true);
  const [hospi, setHospi] = useState<Boolean>(true);
  const [lib, setLib] = useState<Boolean>(true);

  const markerModal = useModal();
  usePermission();
  
  const moveMapView = (coordinate:LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  const handleLongPRessMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate)
  }

  const handlePressAddPost = () => {
    //longPress를 안 했는데 add가 눌리면 alert
    if(!selectLocation){
      return Alert.alert(alerts.NOT_SELECTED_LOCATION.TITLE, alerts.NOT_SELECTED_LOCATION.DESCRIPTION);
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation
    });
    setSelectLocation(null) //다시 맵홈으로 돌아왔을 때 선택 위치를 없애줌
  }

  const handlePressUserLocation = () => {
    if(isUserLocationError){
      return 
    }
    moveMapView(userLocation)
  }

  const handlePressMarker = (id:number, coordinate:LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  }

  const handleSubmit = () => {
    //mutate 함수에 들어가는 것은 전송될 body 정보임
    // createPost.mutate({
    //   onSuccess: ()=>navigation.goBack(),
    // });
  };

  const handlePressShowList = () => {
    console.log(selectLocation)
  }

  const handlePressElementary = () => {
    setElementary(!elementary);
    console.log('elementary',elementary);
  }

  const handlePressMiddle = () => {
    setMiddle(!middle);
    console.log('middle',middle);
  }

  const handlePressHigh = () => {
    setHigh(!high);
    console.log('high',high);
  }

  const handlePressBus = () => {
    setBus(!bus);
    console.log('bus',bus);
  }

  const handlePressMetro = () => {
    setMetro(!metro);
    console.log('metro',metro);
  }

  const handlePressPhar = () => {
    setPhar(!phar);
    console.log('phar',phar);
  }

  const handlePressMart = () => {
    setMart(!mart);
    console.log('mart',mart);
  }

  const handlePressConvi = () => {
    setConvi(!convi);
    console.log('convi',convi);
  }

  const handlePressHospi = () => {
    setHospi(!hospi);
    console.log('hospi',hospi);
  }

  const handlePressLib = () => {
    setLib(!lib);
    console.log('lib',lib);
  }

  useEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> AddPostHeaderRight("내 정보", handleSubmit),
    });
  });

  const hadleReset = () => {
    setElementary(true);
    setMiddle(true);
    setHigh(true);
    setBus(true);
    setMetro(true);
    setPhar(true);
    setConvi(true);
    setMart(true);
    setHospi(true);
    setLib(true);
  }


  return (
    <>
      <MapView 
        ref = {mapRef}
        style={styles.container} 
        provider={PROVIDER_GOOGLE} 
        showsUserLocation
        followsUserLocation
        showsMyLocationButton = {false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPRessMapView}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(({id, color, score, symbol, ...coordinate})=>(
          <CustomMarker 
            key={id} 
            color={color} 
            score={score} 
            symbol='string'
            coordinate={coordinate}
            onPress={()=>handlePressMarker(id, coordinate)}
          />
        ))}
        <CustomMarker 
            color="GREEN"
            symbol="BUS_STOP"
            coordinate={{
            latitude: 37.5516032365118,
            longitude: 126.9898962602019,
          }}
        />
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
        {/* <Marker 
        coordinate={{
            latitude: 37.53217277,
            longitude: 126.833118}}
          /> */}
      </MapView>

      <View style={styles.mainButton}>
        <View style={styles.listButton}>
          <CustomButton label="매물 리스트" size='medium' variant="filled"
          // onPress={handlePressShowList} 
          onPress={handlePresentListPress}/>
        </View>
      </View>
      {/* (isOption &&  */}
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <Ionicons name="add" color={colors.WHITE} size={25}/>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name='my-location' color={colors.WHITE} size={25}/>
        </Pressable>
      </View>
      {/* ) */}

      <BottomSheetModalProvider>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={[{width: "20%", left:10, top:10, },
              (!bus||!elementary||!middle||!high)? styles.seletedButton: styles.optionButton]}
            onPress={() => handlePresentModalPress()}>
              <View style={{flexDirection:'row', alignItems: 'stretch'}}>
                <Text style={(!bus||!elementary||!middle||!high)? styles.seletedButtonText:styles.buttonText}>옵션</Text>
                <MaterialIcons style={{}} name='keyboard-arrow-down'></MaterialIcons>
              </View>
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text style={{fontWeight: 'bold', fontSize:22, }}>세부 조건</Text>

            <ScrollView>
            <Text style={{fontWeight: 'bold', fontSize:18,}}>학교</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={elementary? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressElementary()}>
                <Text style={elementary? styles.buttonText:styles.seletedButtonText}>초등학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={middle? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressMiddle()}>
                <Text style={middle? styles.buttonText:styles.seletedButtonText}>중학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={high? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressHigh()}>
                <Text style={high? styles.buttonText:styles.seletedButtonText}>고등학교</Text>
              </TouchableOpacity>
              </View>
              
              <Text style={{fontWeight: 'bold', fontSize:18,}}>교통  </Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={bus? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressBus()}>
                <Text style={bus? styles.buttonText:styles.seletedButtonText}>정류장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={metro? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressMetro()}>
                <Text style={metro? styles.buttonText:styles.seletedButtonText}>지하철역</Text>
              </TouchableOpacity>
            </View>

          
            <Text style={{fontWeight: 'bold', fontSize:18,}}>편의 시설</Text>
            <ScrollView horizontal={true}>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={phar? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressPhar()}>
                <Text style={phar? styles.buttonText:styles.seletedButtonText}>약국</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={convi? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressConvi()}>
                <Text style={convi? styles.buttonText:styles.seletedButtonText}>편의점</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={mart? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressMart()}>
                <Text style={mart? styles.buttonText:styles.seletedButtonText}>대형마트</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={hospi? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressHospi()}>
                <Text style={hospi? styles.buttonText:styles.seletedButtonText}>병원</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={lib? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressLib()}>
                <Text style={lib? styles.buttonText:styles.seletedButtonText}>도서관</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
            </ScrollView>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around', bottom:25, gap:20, margin:20}}>
            <CustomButton label='초기화' size='medium' variant="outlined" onPress={hadleReset}/>
            <CustomButton label='필터 적용' size='medium' variant="filled"/>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>


    <BottomSheetModalProvider>
      <View style={styles.bottomContainer}>
        <BottomSheetModal
          ref={bottomSheetListRef}
          index={1}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>

            {/* <ScrollView> */}
              <FeedList />
            {/* </ScrollView> */}
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

      

      <MarkerModal markerId={markerId} isVisible={markerModal.isVisible} hide={markerModal.hide}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainButton: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    bottom: 30,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.BLUE_MAIN,
    marginVertical: 5,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width:1, height:1},
    shadowOpacity: 0.5,
  },
  listButton: {
    // marginVertical: 5,
    // paddingVertical: 12,
    alignItems: 'center',
    // justifyContent: 'center', 
    // flexDirection: 'row',
  },
  bottomSheet:{
    width: "100%",
    color: colors.WHITE,
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE_400,
    borderWidth: 1,
    // paddingVertical: 15,
    // alignItems: 'center',
    // justifyContent: 'center', 
    // flexDirection: 'row',
  },
  bottomContainer: {
    width: "100%",
    position: 'absolute',
    // flex: 1,
    // padding: 24,
    // justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  contentContainer: {
    // flex: 1,
    // alignItems: 'flex-start',
    left: 15,
    gap: 20,
  },
  optionList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 10,
    gap : 5,
  },
  optionButton: {
    backgroundColor: colors.GRAY_200, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors.GRAY_700,
    borderRadius: 20,
    marginBottom: 20,
  },
  seletedButton: {
    backgroundColor: colors.BLUE_400, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors.BLUE_MAIN,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.GRAY_700,

  },
  seletedButtonText: {
    color: colors.BLUE_700,
  },
});

export default MapHomeScreen;