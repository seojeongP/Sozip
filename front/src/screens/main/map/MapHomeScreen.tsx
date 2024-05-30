import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {StyleSheet, View, Alert, Pressable, Button, Text, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import MapView, { Callout, LatLng, LongPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import { CompositeNavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@/navigations/stack/MainStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6_Regular from 'react-native-vector-icons/FontAwesome6'
import CustomMarker from '@/components/common/CustomMarker';
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
import useGetOthers from '@/hooks/queries/useGetOthers';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import OtherMarker from '@/components/common/OtherMarker';

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

  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const {data:markers = []} = useGetMarkers();
  const {data:others = []} = useGetOthers();
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
  // console.log('buses', buses);


  const busList = [{"id": 0, "latitude": 126.8892689, "longitude": 37.51685884, "which": "bus"}, {"id": 1, "latitude": 127.002202, "longitude": 37.545795, "which": "bus"}, {"id": 2, "latitude": 126.9248157, "longitude": 37.52129043, "which": "bus"}, {"id": 3, "latitude": 126.9755366, "longitude": 37.56106678, "which": "bus"}, {"id": 4, "latitude": 127.07544, "longitude": 37.549752, "which": "bus"}, {"id": 5, "latitude": 127.1518429, "longitude": 37.5545613, "which": "bus"}, {"id": 6, "latitude": 126.8696103, "longitude": 37.53428779, "which": "bus"}, {"id": 7, "latitude": 127.1154171, "longitude": 37.50595672, "which": "bus"}, {"id": 8, "latitude": 127.1090264, "longitude": 37.55049601, "which": "bus"}, {"id": 9, "latitude": 127.0686842, "longitude": 37.5483289, "which": "bus"}, {"id": 10, "latitude": 127.0963953, "longitude": 37.5904649, "which": "bus"}, {"id": 11, "latitude": 127.0610138, "longitude": 37.50848985, "which": "bus"}, {"id": 12, "latitude": 126.9671194, "longitude": 37.52530577, "which": "bus"}, {"id": 13, "latitude": 127.0620209, "longitude": 37.60576191, "which": "bus"}, {"id": 14, "latitude": 126.9513962, "longitude": 37.5344941, "which": "bus"}, {"id": 15, "latitude": 127.0507511, "longitude": 37.47192069, "which": "bus"}, {"id": 16, "latitude": 126.9704189, "longitude": 37.54548616, "which": "bus"}, {"id": 17, "latitude": 127.0821222, "longitude": 37.48280463, "which": "bus"}, {"id": 18, "latitude": 126.9278043, "longitude": 37.63409454, "which": "bus"}, {"id": 19, "latitude": 127.174627, "longitude": 37.564251, "which": "bus"}, {"id": 20, "latitude": 127.1485868, "longitude": 37.48707131, "which": "bus"}, {"id": 21, "latitude": 126.951572, "longitude": 37.580686, "which": "bus"}, {"id": 22, "latitude": 127.0984014, "longitude": 37.59201745, "which": "bus"}, {"id": 23, "latitude": 126.8915088, "longitude": 37.45412149, "which": "bus"}, {"id": 24, "latitude": 127.0760329, "longitude": 37.55616091, "which": "bus"}, {"id": 25, "latitude": 127.074922, "longitude": 37.530768, "which": "bus"}, 
  {"id": 26, "latitude": 127.1291235, "longitude": 37.48066254, "which": "bus"}, {"id": 27, "latitude": 126.9713316, "longitude": 37.57911876, "which": "bus"}, {"id": 28, "latitude": 126.9710943, "longitude": 37.48458754, "which": "bus"}, {"id": 29, "latitude": 126.910085, "longitude": 37.50132384, "which": "bus"}, {"id": 30, "latitude": 127.126489, "longitude": 37.481838, "which": "bus"}, {"id": 31, "latitude": 127.0057137, "longitude": 37.57112723, "which": "bus"}, {"id": 32, "latitude": 126.9688468, "longitude": 37.55307791, "which": "bus"}, {"id": 33, "latitude": 127.0445412, "longitude": 37.65142456, "which": "bus"}, {"id": 34, "latitude": 127.0661615, "longitude": 37.4886502, "which": "bus"}, {"id": 35, "latitude": 127.0673309, "longitude": 37.57567723, "which": "bus"}, 
  {"id": 36, "latitude": 127.0961867, "longitude": 37.62819453, "which": "bus"}, {"id": 37, "latitude": 127.1076847, "longitude": 37.4760979, "which": "bus"}, {"id": 38, "latitude": 127.0604209, "longitude": 37.65110933, "which": "bus"}, {"id": 39, "latitude": 126.9073622, "longitude": 37.52549701, "which": "bus"}, {"id": 40, "latitude": 127.128978, "longitude": 37.491672, "which": "bus"}, {"id": 41, "latitude": 126.8551316, "longitude": 37.49717103, "which": "bus"}, {"id": 42, "latitude": 127.0383947, "longitude": 37.58192515, "which": "bus"}, {"id": 43, "latitude": 127.1138832, "longitude": 37.50387311, "which": "bus"},]
  

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

  useEffect(()=>{
    setIsFilter(apart||villa||deposit||month||mm);
  }, [apart, villa, deposit, month, mm])

  useEffect(()=>{
    setIsOption(elementary||middle||high||bus||metro||phar||convi||hospi||mart||lib||police||fire);
  }, [elementary, middle, high, metro, bus, phar,convi,hospi,mart,lib,police,fire])

  const handlePressWhat = (what: string) => {
    switch (what){
      case "apart": setApart(!apart); console.log('apart', apart);break;
      case "villa": setVilla(!villa); break;
      case "deposit": setDeposit(!deposit); break;
      case "month": setMonth(!month); break;
      case "mm": setMm(!mm); break;
      case "elementary": setElementary(!elementary); break;
      case "middle": setMiddle(!middle); break;
      case "high": setHigh(!high); break;
      case "bus": setBus(!bus); break;
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

      {bus&&others
        .filter(({ which }) => which === 'bus')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='directions-bus'
            color={'#115D30'}
          />
      ))}

      {metro&&others
        .filter(({ which }) => which === 'metro')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='directions-subway'
            color={colors[theme].BLUE_MAIN}
          />
      ))}

      {elementary&&others
        .filter(({ which }) => which === 'elementary')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='school'
            color={colors[theme].BLUE_700}
          />
      ))}

      {middle&&others
        .filter(({ which }) => which === 'middle')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='school'
            color={colors[theme].BLUE_700}
          />
      ))}

      {high&&others
        .filter(({ which }) => which === 'high')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='school'
            color={colors[theme].BLUE_700}
          />
      ))}

      {convi&&others
        .filter(({ which }) => which === 'conv')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='local-grocery-store'
            color={'#D16517'}
          />
      ))}

      {hospi&&others
        .filter(({ which }) => which === 'hospital')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='local-hospital'
            color={colors[theme].RED_700}
          />
      ))}

      {phar&&others
        .filter(({ which }) => which === 'pharmacy')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='medication'
            color={'#0D0540'}
          />
      ))}

    {lib&&others
        .filter(({ which }) => which === 'lib')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='menu-book'
            color={colors[theme].RED_700}
          />
      ))}

      {police&&others
        .filter(({ which }) => which === 'police')
        .map(({ id, which, ...coordinate}) => (
          <OtherMarker 
            key={id} 
            coordinate={coordinate} 
            category='local-police'
            color={'#0D0540'}
          />
      ))}

      

      {filteredMarkers.map(({id, category, payment, ...coordinate})  => {
          // console.log('CustomMarker created with id:', coordinate);
          return (
            <CustomMarker
            key={id}
            coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
            category='location-pin'
            onPress={() => handlePressMarker(id, coordinate)}
          />
          );
      })}
  
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
          {/* <FontAwesome6 name='user' color={colors[theme].WHITE} size={25}/> */}
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
                style={elementary? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("elementary")}>
                <Text style={elementary? styles.seletedButtonText: styles.buttonText}>초등학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={middle? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("middle")}>
                <Text style={middle? styles.seletedButtonText:styles.buttonText}>중학교</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={high? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("high")}>
                <Text style={high? styles.seletedButtonText:styles.buttonText}>고등학교</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              <View style={{gap: 15}}>
              <Text style={styles.optionTitle}>교통</Text>
            <View style={styles.optionList}>
              <TouchableOpacity
                style={bus? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("bus")}>
                <Text style={bus? styles.seletedButtonText:styles.buttonText}>정류장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={metro? styles.seletedButton: styles.optionButton}
                onPress={() => handlePressWhat("metro")}>
                <Text style={metro? styles.seletedButtonText:styles.buttonText}>지하철역</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View style={{gap: 15}}>
              <Text style={styles.optionTitle}>편의 시설</Text>
              <View>
              <View style={styles.optionList}>
                <TouchableOpacity
                  style={convi? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("convi")}>
                  <Text style={convi? styles.seletedButtonText:styles.buttonText}>편의점</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={mart? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("mart")}>
                  <Text style={mart? styles.seletedButtonText:styles.buttonText}>대형마트</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={hospi? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("hospi")}>
                  <Text style={hospi? styles.seletedButtonText:styles.buttonText}>병원</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={phar? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("phar")}>
                  <Text style={phar? styles.seletedButtonText:styles.buttonText}>약국</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.optionList}>
                <TouchableOpacity
                  style={lib? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("lib")}>
                  <Text style={lib? styles.seletedButtonText:styles.buttonText}>도서관</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={police? styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("police")}>
                  <Text style={police? styles.seletedButtonText:styles.buttonText}>경찰서</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={fire?styles.seletedButton: styles.optionButton}
                  onPress={() => handlePressWhat("fire")}>
                  <Text style={fire? styles.seletedButtonText:styles.buttonText}>소방서</Text>
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
    bottom: 50,
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
    backgroundColor: colors[theme].UNCHANGE_WHITE, 
    flexDirection:'row', 
    justifyContent:'space-around', 
    bottom:1, 
    gap:40, 
    margin:60
  },
  modal: {
    width: Dimensions.get('screen').width,
    backgroundColor: colors[theme].UNCHANGE_WHITE, 
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