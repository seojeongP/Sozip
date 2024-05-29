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
  category: string;
  payment: string;
}

interface Others {
  id: number;
  which: string;
  latitude: number;
  longitude: number;
}

interface Analysis {
  id: number;
  num: number;
  check: string;
  option: string;
  min: number;
  Q1: number;
  median: number;
  Q3: number;
  max: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  si: string;
  gu: string;
  dong: string;
  age: number;
  area: number;
  price: number;
  rent: number;
  bus: string;
  dis_bus: number;
  metro: string;
  dis_metro: number;
  elementary: string;
  dis_elementary: number;
  middle: string;
  dis_middle: number;
  high: string;
  dis_high: number;
  lib: number;
  police: number;
  fire: number;
  mart: number;
  conv: number;
  pharmacy: number;
  hospital: number;
  isFavorite: boolean;
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

export type {MarkerColor, MarkerSymbol, Category, ImageUri, Marker, Post, Profile, Others, Analysis}