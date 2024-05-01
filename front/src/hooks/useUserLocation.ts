import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";


function useUserLocation(){

    const [userLocation, setUserLocation] = useState<LatLng>({
        latitude: 37.5516032365118,
        longitude: 126.9898962602019,
      })
      const [isUserLocationError, setIsUserLocationError] = useState(false);

    useEffect(()=>{
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords
        setUserLocation({latitude, longitude})
        setIsUserLocationError(false)
      },
      () => {
        setIsUserLocationError(true);
      },{
        enableHighAccuracy: true,
      }
    )
  }, []);
  return {userLocation, isUserLocationError};
}

export default useUserLocation;