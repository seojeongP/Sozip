import HeaderButton from '@/components/common/HeaderButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';

function EditCategoryHeaderRight(onSubmit: ()=>void) {
  return (
    <HeaderButton labelText='저장' onPress={onSubmit}/>
  )
}

const styles = StyleSheet.create({});

export default EditCategoryHeaderRight;