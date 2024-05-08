import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from './HeaderButton';

function AddPostHeaderRight(title="등록", onSubmit: ()=>void) {
  return (
    <HeaderButton labelText={title} onPress={onSubmit}/>
  )
}

const styles = StyleSheet.create({});

export default AddPostHeaderRight;