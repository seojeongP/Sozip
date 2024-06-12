import Toast from 'react-native-toast-message';

export const showToast = (text: string, text2: string) => {
  Toast.show({
    type: 'selectedToast',
    text1: text,
    text2: text2,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export const showDescToast = (title: string, mean: string) => {
  // console.log('mean', mean);
  Toast.show({
    type: 'selectedToast_2',
    text1: title,
    text2: mean,
    position: 'bottom',
    visibilityTime: 3000,
  });
};