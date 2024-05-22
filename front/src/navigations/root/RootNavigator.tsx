import React, { useEffect } from "react";
import AuthStackNavigator from "../stack/AuthStackNavigator";
import useAuth from "@/hooks/queries/useAuth";
import MainStackNavigator from "../stack/MainStackNavigator";
import SplashScreen from "react-native-splash-screen";

function RootNavigator (){
    const {isLogin, isLoginLoading} = useAuth();
    // const isLoggedin = false;

    //로딩이 끝나면 스플래쉬를 숨김
    useEffect(()=>{
        if(!isLoginLoading){
            setTimeout(()=> {
            SplashScreen.hide();
        }, 500);
    }
    }, [isLoginLoading]);
    
    return <>{isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;