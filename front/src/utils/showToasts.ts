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