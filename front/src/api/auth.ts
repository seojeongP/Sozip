import axios from 'axios'
import axiosInstance from './axios';
import { Category, Profile } from '../types/domain';
import { getEncryptStorage } from '../utils';

type RequestUser = {
    email: string;
    password: string;
};

// Email과 password를 넘김
const postSignup = async({email, password}: RequestUser): Promise<void> => {
    const {data} = await axiosInstance.post('/auth/signup', {email, password});

    return data;
};

type ResponseToken = {
    accessToken: string;
    refreshToken: string;
};

// Email과 password를 넘기면 AccessToken과 RefreshToken 반환
const postLogin = async({email, password}:RequestUser):Promise<ResponseToken> => {
    const {data} = await axiosInstance.post('/auth/signin', {
        email, password,
    });

    return data;
};

type ResponseProfile = Profile & Category; //types>domain.ts에 정의되어 있음

// 로그인한 유저의 정보를 가져옴
const getProfile = async():Promise<ResponseProfile> => {
    const {data} = await axiosInstance.get('/auth/me');

    return data;
}

//Token Refresh
const getAccessToken = async(): Promise<ResponseToken> => {
    const refreshToken = await getEncryptStorage('refreshToken')
    const {data} = await axiosInstance.get('/auth/refresh', {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    return data;
}

const logout = async() =>{
    await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};

export type {RequestUser, ResponseToken, ResponseProfile, }