import useAuth from '@/hooks/queries/useAuth';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {StyleSheet, View, Alert, Pressable, Button, Text, TouchableOpacity, Dimensions} from 'react-native';
import MapView, { Callout, LatLng, LongPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomMarker from '@/components/common/CustomMarker';
import { alerts } from '@/constants/messages';
import useGetMarkers from '@/hooks/queries/useGetMarkers'
import useModal from '@/hooks/useModal';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import FeedList from '@/components/feed/FeedList';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import useLocationStore from '@/store/useLocationStore';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { mapNavigations, numbers } from '@/constants';
import getMapStyle from '@/style/mapStyle';
import useLegendStorage from '@/hooks/useLegendStorage';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import MapLegend from '@/components/map/MapLegend';
import MarkerModal from '@/components/map/MarkerModal';
import useGetBuses from '@/hooks/queries/useGetBuses';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList>,
  StackNavigationProp<MapStackParamList>
>;

function MapHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const legend = useLegendStorage();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetListRef = useRef<BottomSheetModal>(null);
  const bottomSheetPriceRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentPricePress = useCallback(() => {
    bottomSheetPriceRef.current?.present();
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
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const {data:markers = []} = useGetMarkers();
  const {data:buses = []} = useGetBuses();
  const [markerId, setMarkerId] = useState<number|null>(null);
  const {mapRef, moveMapView, hadleChangeDelta} = useMoveMapView();

  const [apart, setApart] = useState<Boolean>(true);
  const [villa, setVilla] = useState<Boolean>(true);

  const [deposit, setDeposit] = useState<Boolean>(true);
  const [month, setMonth] = useState<Boolean>(true);
  const [mm, setMm] = useState<Boolean>(true);

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
  const [police, setPolice] = useState<Boolean>(true);
  const [fire, setFire] = useState<Boolean>(true);


  const markerModal = useModal();
  // usePermission();

  console.log("왜 못 받아와");
  // console.log("markers", markers);
  // console.log('buses[3].latitude' , buses[3].latitude);

  //매물 마커 필터링
  const filterMarkers = (markers: any[], apart: Boolean, villa: Boolean, mm: Boolean, month: Boolean, deposit: Boolean) => {
    return markers.filter(marker => {
      // Category 필터링 조건
      const categoryCondition = apart && villa ? 
        (marker.category === 'apart' || marker.category === 'villa') :
        apart ? marker.category === 'apart' :
        villa ? marker.category === 'villa' :
        false;
  
      // Payment 필터링 조건
      const paymentCondition = mm || month || deposit ? 
        (mm && marker.payment === 'mm') || 
        (month && marker.payment === 'ws') || 
        (deposit && marker.payment === 'js') :
        true;
  
      // 두 조건을 모두 만족해야 함
      return categoryCondition && paymentCondition;
    });
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate)
  }

  const handlePressAddPost = () => {
    //longPress를 안 했는데 add가 눌리면 alert
    if(!selectLocation){
      return Alert.alert(alerts.NOT_SELECTED_LOCATION.TITLE, alerts.NOT_SELECTED_LOCATION.DESCRIPTION);
    }
    navigation.navigate(mapNavigations.ADD_POST, {location: selectLocation});
    setSelectLocation({
      latitude: 0.0922,
      longitude: 0.0421,
  },) //다시 맵홈으로 돌아왔을 때 선택 위치를 없애줌
  }

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  }

  const handlePressUserLocation = () => {
    if(isUserLocationError){
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      })
    }
    moveMapView(userLocation);
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

  const handlePressWhat = (what: string) => {
    switch (what){
      case "apart": setApart(!apart); console.log('apart', apart); break;
      case "villa": setVilla(!villa); break;
      case "deposit": setDeposit(!deposit); break;
      case "month": setMonth(!month); break;
      case "mm": setMm(!mm); break;
      case "elementary": setElementary(!elementary); break;
      case "middle": setMiddle(!middle); break;
      case "high": setHigh(!high); break;
      case "bus": setBus(!bus); console.log('bus', bus); break;
      case "metro": setMetro(!metro); break;
      case "phar": setPhar(!phar); break;
      case "convi": setConvi(!convi); break;
      case "hospi": setHospi(!hospi); break;
      case "mart": setMart(!mart); break;
      case "lib": setLib(!lib); break;
      case "police": setPolice(!police); break;
      case "fire": setFire(!fire); break;
    }
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

  const hadleReset_2 = () => {
    setApart(true);
    setVilla(true);
    setMm(true);
    setMonth(true);
    setDeposit(true);
  }

  const filteredMarkers = filterMarkers(markers, !apart, !villa, !mm, !month, !deposit);

  return (
    <>
      <MapView 
        ref = {mapRef}
        style={styles.container} 
        provider={PROVIDER_GOOGLE} 
        showsUserLocation
        followsUserLocation
        showsMyLocationButton = {false}
        customMapStyle={getMapStyle(theme)}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={hadleChangeDelta}
        initialRegion={{
          ...userLocation,
          ...numbers.INITIAL_DELTA
        }}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA
        }}
      >
      
        {/* <CustomMarker key={buses[3].id} coordinate={{latitude: buses[3].latitude, longitude: buses[3].longitude}} category='location-pin'/> */}
        {/* <CustomMarker key={markers[3].id} 
        coordinate={{latitude: markers[3].latitude, longitude: markers[3].longitude}}
        category='location-pin'/>  */}

      {!bus && buses.map(({id, which, ...coordinate})=>(
            <CustomMarker 
              key={id} 
              coordinate={coordinate} 
              category='directions-bus'
            />
        ))} 

      {filteredMarkers.map(({id, category, payment, ...coordinate})  => (
        <CustomMarker
          key={id}
          coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
          category='location-pin'
          onPress={() => handlePressMarker(id, coordinate)}
        />
      ))}
  
      {selectLocation && (
        <Callout>
          <Marker coordinate={selectLocation} />
        </Callout>
      )}
      </MapView>

      <View style={styles.mainButton}>
        <View style={styles.listButton}>
          <CustomButton label="매물" size='small' variant="filled" radius='round'
          // onPress={handlePressShowList} 
          onPress={handlePresentListPress}/>
        </View>
      </View>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <Ionicons name="add" color={colors[theme].WHITE} size={25}/>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <Ionicons name="search" color={colors[theme].WHITE} size={25}/>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name='my-location' color={colors[theme].WHITE} size={25}/>
        </Pressable>
      </View>

      <BottomSheetModalProvider>
      <View style={styles.bottomConditionContainer}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={[{width: "50%", margin:10, top:10, },
              (bus||elementary||middle||high)? styles.conditionSeletedButton: styles.conditionOptionButton]}
            onPress={() => handlePresentModalPress()}>
              <View style={{flexDirection:'row', alignItems: 'stretch'}}>
                <Text style={(bus||elementary||middle||high)? styles.conditionSeletedButtonText:styles.conditionButtonText}>세부 조건</Text>
                <MaterialIcons style={{left:8, fontSize:15, color:colors[theme].GRAY_700}} name='keyboard-arrow-down'></MaterialIcons>
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
          <View style={{padding:3}}>
          <View style={styles.contentOptionContainer}>
            <Text style={{fontWeight: 'bold', fontSize:22, }}>세부 조건</Text>

            <ScrollView>
            <View style={{gap: 10}}>
            <Text style={styles.optionTitle}>학교</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={elementary? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("elementary")}>
                <Text style={elementary? styles.buttonText:styles.seletedButtonText}>초등학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={middle? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("middle")}>
                <Text style={middle? styles.buttonText:styles.seletedButtonText}>중학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={high? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("high")}>
                <Text style={high? styles.buttonText:styles.seletedButtonText}>고등학교</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              <View style={{gap: 10}}>
              <Text style={styles.optionTitle}>교통</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={!bus? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("bus")}>
                <Text style={!bus? styles.buttonText:styles.seletedButtonText}>정류장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={metro? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("metro")}>
                <Text style={metro? styles.buttonText:styles.seletedButtonText}>지하철역</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View style={{gap: 10}}>
            <Text style={styles.optionTitle}>편의 시설</Text>
            <ScrollView horizontal={true}>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={phar? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("phar")}>
                <Text style={phar? styles.buttonText:styles.seletedButtonText}>약국</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={convi? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("convi")}>
                <Text style={convi? styles.buttonText:styles.seletedButtonText}>편의점</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={mart? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("mart")}>
                <Text style={mart? styles.buttonText:styles.seletedButtonText}>대형마트</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={hospi? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("hospi")}>
                <Text style={hospi? styles.buttonText:styles.seletedButtonText}>병원</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={lib? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("lib")}>
                <Text style={lib? styles.buttonText:styles.seletedButtonText}>도서관</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={police? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("police")}>
                <Text style={police? styles.buttonText:styles.seletedButtonText}>경찰서</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={fire? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("fire")}>
                <Text style={fire? styles.buttonText:styles.seletedButtonText}>소방서</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
            </ScrollView>
          </View>

          <View style={{backgroundColor: colors[theme].WHITE, flexDirection:'row', justifyContent:'space-around', bottom:1, gap:40, margin:60}}>
            <CustomButton label='초기화' size='medium' variant="outlined" onPress={hadleReset}/>
            <CustomButton label='필터 적용' size='medium' variant="filled"/>
          </View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

      <BottomSheetModalProvider>
      <View style={styles.bottomPriceContainer}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={[{width: "50%", margin: 10, top:10, },
              (!apart||!month||!villa||!deposit||!mm)? styles.conditionSeletedButton: styles.conditionOptionButton]}
            onPress={() => handlePresentPricePress()}>
              <View style={{flexDirection:'row', alignItems: 'stretch'}}>
                <Text style={(!apart||!month||!villa||!deposit||!mm)? styles.conditionSeletedButtonText:styles.conditionButtonText}>거래</Text>
                <MaterialIcons style={{left:8, fontSize:15, color:colors[theme].GRAY_700}} name='keyboard-arrow-down'></MaterialIcons>
              </View>
          </TouchableOpacity>
        </View>

        <BottomSheetModal
          ref={bottomSheetPriceRef}
          index={1}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={{padding:3}}>
          <View style={styles.contentOptionContainer}>
            <ScrollView>
            <View style={{gap: 10}}>
            <Text style={styles.optionTitle}>주거 형태</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={apart? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("apart")}>
                <Text style={apart? styles.buttonText:styles.seletedButtonText}>아파트</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={villa? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("villa")}>
                <Text style={villa? styles.buttonText:styles.seletedButtonText}>빌라</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              <View style={{gap: 10}}>
              <Text style={styles.optionTitle}>거래 방식</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={month? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("month")}>
                <Text style={month? styles.buttonText:styles.seletedButtonText}>월세</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={deposit? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("deposit")}>
                <Text style={deposit? styles.buttonText:styles.seletedButtonText}>전세</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={mm? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("mm")}>
                <Text style={mm? styles.buttonText:styles.seletedButtonText}>매매</Text>
              </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
          </View>

          <View style={{backgroundColor: colors[theme].WHITE, flexDirection:'row', justifyContent:'space-around', bottom:1, gap:40, margin:60}}>
            <CustomButton label='초기화' size='medium' variant="outlined" onPress={hadleReset_2}/>
            <CustomButton label='필터 적용' size='medium' variant="filled"/>
          </View>
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
              <FeedList />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

      

      <MarkerModal markerId={markerId} isVisible={markerModal.isVisible} hide={markerModal.hide}/>
      {legend.isVisible && <MapLegend />}
    </>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({
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
    backgroundColor: colors[theme].BLUE_MAIN,
    marginVertical: 5,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: colors[theme].BLACK,
    shadowOffset: {width:1, height:1},
    shadowOpacity: 0.5,
  },
  listButton: {
    alignItems: 'center',
  },
  bottomSheet:{
    width: "100%",
    color: colors[theme].WHITE,
  },
  bottomContainer: {
    width: "100%",
    position: 'absolute',
  },
  bottomPriceContainer: {
    width: "50%",
    position: 'absolute',
  },
  bottomConditionContainer: {
    width: "50%",
    right:80,
    position: 'absolute',
  },
  contentContainer: {
    gap: 10,
  },
  contentOptionContainer: {
    left: 20,
    gap: 20,
  },
  optionList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 10,
    gap : 5,
  },
  conditionOptionButton: {
    backgroundColor: colors[theme].WHITE, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors[theme].GRAY_700,
    borderWidth: 0.2,
    borderRadius: 20,
    marginBottom: 20,
  },
  conditionSeletedButton: {
    backgroundColor: colors[theme].BLUE_200, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors[theme].BLUE_MAIN,
    borderWidth: 0.2,
    borderRadius: 20,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: colors[theme].GRAY_200, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors[theme].GRAY_200,
    borderWidth: 1.3,
    borderRadius: 20,
    marginBottom: 20,
  },
  seletedButton: {
    backgroundColor: colors[theme].BLUE_200, // 버튼 배경색상 추가
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors[theme].BLUE_MAIN,
    borderWidth: 1.3,
    borderRadius: 20,
    marginBottom: 20,
  },
  conditionButtonText: {
    color: colors[theme].GRAY_700,
    fontWeight: '200',
  },
  conditionSeletedButtonText: {
    color: colors[theme].BLUE_700,
    fontWeight: '200',
  },
  buttonText: {
    color: colors[theme].GRAY_700,
  },
  seletedButtonText: {
    color: colors[theme].BLUE_700,
  },
  optionTitle: {
    fontWeight: 'bold',
    fontSize:18, 
    marginLeft:5,
  },
}); 

export default MapHomeScreen;