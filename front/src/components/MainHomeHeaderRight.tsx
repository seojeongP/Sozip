import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from './common/HeaderButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function MainHomeHeaderLeft(onSubmit: ()=>void) {
    const person_icon = <MaterialIcons name='person' size={20}/>
    return (
      <HeaderButton labelText='0' icon={person_icon} onPress={onSubmit}/>
    )
  }

const styles = StyleSheet.create({});

export default MainHomeHeaderLeft;