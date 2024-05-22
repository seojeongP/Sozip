import { MutationFunction, useMutation, useQuery, } from "@tanstack/react-query";
import { ResponseProfile, ResponseToken, appleLogin, deleteAccount, editCategory, editProfile, getAccessToken, getProfile, kakaoLogin, logout, postLogin, postSignup } from "@/api/auth";
import { UseQueryCustomOptions, UseMutationCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils";
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect } from "react";
import { numbers, queryKeys, storageKeys } from "@/constants";
import queryClient from "@/api/queryClient";
import { Category, Profile } from "@/types";

// useQuery와 useMutation을 모두 다루는 훅 만들기

// 회원가입 훅
function useSignup(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: postSignup,
        ...mutationOptions,
    });
}

// 로그인 훅
function useLogin<T>(loginAPI: MutationFunction<ResponseToken, T>, mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: loginAPI,
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

// 로그인 훅
function useEmailLogin(mutationOptions?: UseMutationCustomOptions){
    return useLogin(postLogin, mutationOptions);
}

// 카카오 로그인 훅
function useKakaoLogin(mutationOptions?: UseMutationCustomOptions){
    return useLogin(kakaoLogin, mutationOptions);
}

// 애플 로그인 훅
function useAppleLogin(mutationOptions?: UseMutationCustomOptions){
    return useLogin(appleLogin, mutationOptions);
}


//refresh토큰으로 access토큰을 다시 갱신하는 훅
function useGetRefreshToken(){
    const {isSuccess,data, isError, isPending} = useQuery({
        queryFn: getAccessToken,
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
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

    return {isSuccess, isError, isPending};
}


type ResponseSelectProfile = {categories: Category} & Profile 

// 객체를 하나로 합쳐서 전송하기 위한 함수
const transformProfileCategory = (data: ResponseProfile): ResponseSelectProfile => {
    const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
    const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

    return {categories, ...rest};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>){
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        select: transformProfileCategory,
        ...queryOptions,
    });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: editCategory,
        onSuccess: (newProfile) => {
            queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_PROFILE], newProfile);
        },
        ...mutationOptions,
    });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: editProfile,
        onSuccess: (newProfile) => {
            queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_PROFILE], newProfile);
        },
        ...mutationOptions,
    });
}

function useLogout(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
            queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
        },
        ...mutationOptions,
    });
}

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: deleteAccount,
        ...mutationOptions,
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
    const loginMutation = useEmailLogin();
    const kakaoLoginMutation = useKakaoLogin();
    const appleLoginMutation = useAppleLogin();
    const logoutMutation = useLogout();
    const profileMutation = useUpdateProfile();
    const deleteAccountMutation = useMutateDeleteAccount({
        onSuccess: ()=>logoutMutation.mutate(null),
    });
    const categoryMutation = useMutateCategory();
    const isLoginLoading = refreshTokenQuery.isPending;

    return {
        signupMutation, 
        loginMutation, 
        isLogin, 
        getProfileQuery, 
        logoutMutation, 
        kakaoLoginMutation, 
        appleLoginMutation, 
        profileMutation,
        deleteAccountMutation,
        categoryMutation,
        isLoginLoading,
    };
}

export default useAuth