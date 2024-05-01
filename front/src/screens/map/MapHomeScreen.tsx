import useAuth from '@/hooks/queries/useAuth';
import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, Pressable, Alert} from 'react-native';
import MapView, { Callout, LatLng, LongPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { colors, mapNavigations } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  StackNavigationProp<MapStackParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const mapRef = useRef<MapView | null>(null)
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
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
      return Alert.alert('추가할 위치를 선택해 주세요.', '지도를 길게 누르면 위치가 선택됩니다.');
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation
    });
    setSelectLocation(null)
  }

  const handlePressUserLocation = () => {
    if(isUserLocationError){
      return 
    }
    moveMapView(userLocation)
  }

  const handlePressMarker = (coordinate:LatLng) => {
    moveMapView(coordinate)
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
      >
        {/* <CustomMarker 
            color="GREEN"
            coordinate={{
            latitude: 37.5516032365118,
            longitude: 126.9898962602019,
          }}
        /> */}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
        <Marker 
        coordinate={{
            latitude: 37.53217277,
            longitude: 126.833118}}
          />
        <Marker coordinate={{
            latitude: 37.49596692,
            longitude: 126.845408291671,
          }} />
        <Marker coordinate={{
            latitude: 37.47397996,
            longitude: 126.9415063,
          }} />
        <Marker coordinate={{
            latitude: 37.4951754878752,
            longitude: 127.034669237479,
          }} />
        <Marker coordinate={{
            latitude: 37.50401311,
            longitude: 126.9533222,
          }} />
        <Marker coordinate={{
            latitude: 37.5429485708229,
            longitude: 126.963254559815,
          }} />
        <Marker coordinate={{
            latitude: 37.553922376454,
            longitude: 127.071524213732,
          }} />
        <Marker coordinate={{
            latitude: 37.5969545104027,
            longitude: 127.07254046013,
          }} />
        <Marker coordinate={{
            latitude: 37.6084129038544,
            longitude: 127.046775532556,
          }} />
        <Marker coordinate={{
            latitude: 37.5989375573805,
            longitude: 126.919222635458,
          }} />
      </MapView>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25}/>
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25}/>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.BLUE_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width:1, height:1},
    shadowOpacity: 0.5,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.BLUE_500,
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
});

export default MapHomeScreen;