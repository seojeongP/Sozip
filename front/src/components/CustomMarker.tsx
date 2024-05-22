import { colors } from '@/constants';
import { symbols } from '@/constants/symbols';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { MarkerColor, MarkerSymbol } from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { LatLng, MapMarkerProps, Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomMarkerProps extends MapMarkerProps {
    coordinate: LatLng;
    color: MarkerColor;
    symbol?: MarkerSymbol;
    score?: number;
}

const symbolList = {
    APART: symbols.APART,
    VILLA: symbols.VILLA,
    BUS_STOP: symbols.BUS_STOP,
    METRO: symbols.METRO,
    CONV_STORE: symbols.CONV_STORE,
    PHARMACY: symbols.PHARMACY,
    string: symbols.string
}

function CustomMarker({coordinate, color, symbol='string', score=5, ...props}: CustomMarkerProps) {
    const {theme} = useThemeStore();
    const styles = styling(theme);
  return (
    <Marker coordinate={coordinate} {...props}>
        <View style={styles.container}>
            {/* <View style={[styles.marker, {backgroundColor: colorHex[color]}]}> */}
                <MaterialIcons name={symbolList[symbol]} color={colors[theme].BLACK} size={25}/>
            {/* </View> */}
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

export default CustomMarker;