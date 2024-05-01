import { useMutation, useQuery, } from "@tanstack/react-query";
import { getAccessToken, getProfile, logout, postLogin, postSignup } from "@/api/auth";
import { UseQueryCustomOptions, UseMutationCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils";
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect } from "react";
import { numbers, queryKeys, storageKeys } from "@/constants";
import queryClient from "@/api/queryClient";

// useQuery와 useMutation을 모두 다루는 훅 만들기

// 회원가입 훅
function useSignup(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: postSignup,
        ...mutationOptions,
    });
}

// 로그인 훅
function useLogin(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: postLogin,
        //성공 시 실행
        onSuccess: ({accessToken, refreshToken}) => {
            setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
        //성공실패와 상관없이 실행
        onSettled: () => {
            queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE]});
        },
        ...mutationOptions,
    });
}

//refresh토큰으로 access토큰을 다시 갱신하는 훅
function useGetRefreshToken(){
    const {isSuccess,data, isError} = useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, //유효시간 30분
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, 
        refetchOnReconnect: true,
        refetchIntervalInBackground: true, //다시 연결되거나 백그라운드에서 refetch될 수 있도록
    });

    // 요청이 성공했을 때
    useEffect(()=> {
        if(isSuccess){
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess]);

    // 요청이 실패했을 때
    useEffect(()=>{
        if(isError){
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        }
    }, [isError]);

    return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions){
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions,
    });
}

function useLogout(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        },
        onSettled: ()=>{
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
        },
        ...mutationOptions
    });
}

function useAuth(){
    const signupMutation = useSignup()
    const refreshTokenQuery = useGetRefreshToken()
    const getProfileQuery = useGetProfile({
        //이 부분이 true일 때 실행하는 옵션
        enabled: refreshTokenQuery.isSuccess,
    })
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {signupMutation, loginMutation, isLogin, getProfileQuery, logoutMutation};
}

export default useAuth