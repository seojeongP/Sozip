type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type MarkerSymbol = 'APART' | 'VILLA' | 'CONV_STORE' | 'PHARMACY' | 'BUS_STOP' | 'METRO' | 'string' ;

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  // which: string;
}

interface Post extends Marker {
  title: string;
  address: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  // age: number;
  // hasJob: boolean;
  // income: number;
  // country: 'Korean' | 'other';
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type {MarkerColor, MarkerSymbol, Category, ImageUri, Marker, Post, Profile}