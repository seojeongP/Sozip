import { colors } from '@/constants';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { LatLng, MapMarkerProps, Marker } from 'react-native-maps';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface OtherMarkerProps extends MapMarkerProps {
    coordinate: LatLng;
    category: string;
    color: string;
}

function OtherMarker({coordinate, category='directions-bus', color, ...props}: OtherMarkerProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);

  return (
    <Marker coordinate={coordinate} {...props}>
        <View style={styles.container}>
                <MaterialIcons 
                    name={category} 
                    color={color}
                    size={15}
                />
        </View>
    </Marker>
  )
}

const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        height: 35,
        width: 32,
        alignItems: 'center',
    },
    marker: {
        transform: [{rotate: '45deg'}],
        width: 27,
        height: 27,
        borderRadius: 27,
        borderBottomRightRadius: 1,
        borderWidth: 1,
        borderColor: colors[theme].BLACK,
    },
});

export default OtherMarker;