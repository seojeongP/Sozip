import React from "react";
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";
import AuthStackNavigator from "../stack/AuthStackNavigator";
import useAuth from "@/hooks/queries/useAuth";
import MapStackNavigator from "../stack/MapStackNavigator";

function RootNavigator (){
    const {isLogin} = useAuth();
    // const isLoggedin = true;
    
    return <>{isLogin ? <MapStackNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;