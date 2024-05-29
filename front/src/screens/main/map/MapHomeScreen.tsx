import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {StyleSheet, View, Alert, Pressable, Button, Text, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
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
import MarkerModal from '@/components/map/MarkerModal';
import useGetBuses from '@/hooks/queries/useGetBuses';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList>,
  StackNavigationProp<MapStackParamList>
>;

function MapHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

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
  const handlePresentModalButtonPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handlePresentPricePress = useCallback(() => {
    bottomSheetPriceRef.current?.present();
  }, []);
  const handlePresentPriceButtonPress = useCallback(() => {
    bottomSheetPriceRef.current?.close();
  }, []);

  const handlePresentListPress = useCallback(() => {
    bottomSheetListRef.current?.present();
  }, []);
  const handlePresentListButtonPress = useCallback(() => {
    bottomSheetListRef.current?.close();
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

  const [isFilter, setIsFilter] = useState<Boolean>(false);
  const [apart, setApart] = useState<Boolean>(false);
  const [villa, setVilla] = useState<Boolean>(false);

  const [deposit, setDeposit] = useState<Boolean>(false);
  const [month, setMonth] = useState<Boolean>(false);
  const [mm, setMm] = useState<Boolean>(false);

  const [isOption, setIsOption] = useState<Boolean>(false);
  const [elementary, setElementary] = useState<Boolean>(false);
  const [middle, setMiddle] = useState<Boolean>(false);
  const [high, setHigh] = useState<Boolean>(false);
  const [bus, setBus] = useState<Boolean>(false);
  const [metro, setMetro] = useState<Boolean>(false);

  const [phar, setPhar] = useState<Boolean>(false);
  const [convi, setConvi] = useState<Boolean>(false);
  const [mart, setMart] = useState<Boolean>(false);
  const [hospi, setHospi] = useState<Boolean>(false);
  const [lib, setLib] = useState<Boolean>(false);
  const [police, setPolice] = useState<Boolean>(false);
  const [fire, setFire] = useState<Boolean>(false);


  const markerModal = useModal();
  // usePermission();

  // console.log("왜 못 받아와");
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

  const handlePressWhat = (what: string) => {
    switch (what){
      case "apart": setApart(!apart); console.log('apart', apart);setIsFilter(apart||villa||deposit||month||mm);break;
      case "villa": setVilla(!villa);setIsFilter(apart||villa||deposit||month||mm); break;
      case "deposit": setDeposit(!deposit);setIsFilter(apart||villa||deposit||month||mm); break;
      case "month": setMonth(!month);setIsFilter(apart||villa||deposit||month||mm); break;
      case "mm": setMm(!mm);setIsFilter(apart||villa||deposit||month||mm); break;
      case "elementary": setElementary(!elementary);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "middle": setMiddle(!middle);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "high": setHigh(!high);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "bus": setBus(!bus); console.log('bus', bus);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "metro": setMetro(!metro);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "phar": setPhar(!phar);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "convi": setConvi(!convi);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "hospi": setHospi(!hospi);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "mart": setMart(!mart);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "lib": setLib(!lib);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "police": setPolice(!police);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
      case "fire": setFire(!fire);setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire); break;
    }
  }


  const hadleReset = () => {
    setElementary(false);
    setMiddle(false);
    setHigh(false);
    setBus(false);
    setMetro(false);
    setPhar(false);
    setHospi(false);
    setConvi(false);
    setMart(false);
    setLib(false);
    setFire(false);
    setPolice(false);
    setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire);
  }

  const hadleReset_2 = () => {
    setApart(false);
    setVilla(false);
    setMm(false);
    setMonth(false);
    setDeposit(false);
    setIsFilter(apart||villa||deposit||mm||month);
  }

  const filteredMarkers = filterMarkers(markers, apart, villa, mm, month, deposit);

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

      {bus && buses.map(({id, which, ...coordinate})=>(
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

      <View>
        <View style={styles.listButton}>
          <CustomButton label="매물" size='small' variant="filled" radius='round'
          // onPress={handlePressShowList} 
          onPress={handlePresentListPress}/>
        </View>
      </View>

      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <Ionicons name="search" color={colors[theme].WHITE} size={25}/>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name='my-location' color={colors[theme].WHITE} size={25}/>
        </Pressable>
      </View>

      <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={[{width: "25%", margin: 10, top:10, },
              (isFilter)? styles.conditionSeletedButton: styles.conditionOptionButton]}
            onPress={() => handlePresentPricePress()}>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={(isFilter)? styles.conditionSeletedButtonText:styles.conditionButtonText}>거래</Text>
                <MaterialIcons style={{right:5, fontSize:15, color:colors[theme].GRAY_700}} name='keyboard-arrow-down'></MaterialIcons>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{width: "30%", margin:10, top:10, },
              (isOption)? styles.conditionSeletedButton: styles.conditionOptionButton]}
            onPress={() => handlePresentModalPress()}>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={(isOption)? styles.conditionSeletedButtonText:styles.conditionButtonText}>세부 조건</Text>
                <MaterialIcons style={{left:8, fontSize:15, color:colors[theme].GRAY_700}} name='keyboard-arrow-down'></MaterialIcons>
              </View>
          </TouchableOpacity>
        </View>

      <BottomSheetModalProvider>
      <View style={styles.bottomConditionContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <SafeAreaView>
          <View style={styles.contentOptionSecondContainer}>
            <Text style={{fontWeight: 'bold', fontSize:22, }}>세부 조건</Text>

            <ScrollView>
            <View style={{gap: 15}}>
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
              
              <View style={{gap: 15}}>
              <Text style={styles.optionTitle}>교통</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={bus? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("bus")}>
                <Text style={bus? styles.buttonText:styles.seletedButtonText}>정류장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={metro? styles.optionButton:styles.seletedButton}
                onPress={() => handlePressWhat("metro")}>
                <Text style={metro? styles.buttonText:styles.seletedButtonText}>지하철역</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View style={{gap: 15}}>
              <Text style={styles.optionTitle}>편의 시설</Text>
              <View>
              <View style={styles.optionList}>
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
                  style={phar? styles.optionButton:styles.seletedButton}
                  onPress={() => handlePressWhat("phar")}>
                  <Text style={phar? styles.buttonText:styles.seletedButtonText}>약국</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.optionList}>
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
              </View>
              </View>
              </ScrollView>
          </View>

          <View style={styles.modal}>
            <CustomButton label='초기화' size='medium' variant="outlined" style={styles.box} onPress={hadleReset}/>
            <CustomButton label='필터 적용' size='medium' variant="filled" style={styles.box} onPress={handlePresentModalButtonPress}/>
          </View>
          </SafeAreaView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

      <BottomSheetModalProvider>
      <View style={styles.bottomPriceContainer}>
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
                style={apart? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("apart")}>
                <Text style={apart? styles.seletedButtonText:styles.buttonText}>아파트</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={villa? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("villa")}>
                <Text style={villa? styles.seletedButtonText: styles.buttonText}>빌라</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              <View style={{gap: 10}}>
              <Text style={styles.optionTitle}>거래 방식</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={month?styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("month")}>
                <Text style={month?styles.seletedButtonText: styles.buttonText}>월세</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={deposit? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("deposit")}>
                <Text style={deposit? styles.seletedButtonText: styles.buttonText}>전세</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={mm? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("mm")}>
                <Text style={mm? styles.seletedButtonText: styles.buttonText}>매매</Text>
              </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
          </View>

          <View style={styles.first_modal}>
            <CustomButton label='초기화' size='medium' variant="outlined" onPress={hadleReset_2}/>
            <CustomButton label='필터 적용' size='medium' variant="filled" onPress={handlePresentPriceButtonPress}/>
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
    position: 'absolute',
    bottom: 30,
    left: Dimensions.get('screen').width/2 - 50,
  },
  bottomSheet:{
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
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
    marginBottom: 10,
  },
  contentOptionSecondContainer: {
    left: 20,
    gap: 20,
    marginBottom: 170,
  },
  optionList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 10,
    gap : 7,
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
  first_modal: {
    backgroundColor: colors[theme].WHITE, 
    flexDirection:'row', 
    justifyContent:'space-around', 
    bottom:1, 
    gap:40, 
    margin:60
  },
  modal: {
    width: Dimensions.get('screen').width,
    backgroundColor: colors[theme].WHITE, 
    flexDirection:'row', 
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 70,
  },
  box: {
    width: 150,
  },
}); 

export default MapHomeScreen;