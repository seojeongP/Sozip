import useThemeStore from "@/store/useThemStore"
import { ThemeMode } from "@/types"
import { getEncryptStorage, setEncryptStorage } from "@/utils"
import { useEffect } from "react";
import { useColorScheme } from "react-native";

function useThemeStorage() {
    const systemTheme = useColorScheme(); //시스템 모드 불러오기
    const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore()

    const setMode = async( mode: ThemeMode ) => {
        await setEncryptStorage('themeMode', mode)
        setTheme(mode); //전역 상태 변경
    };

    const setSystem = async (flag: boolean) => {
        await setEncryptStorage('themeSystem', flag);
        setSystemTheme(flag);
    };

    useEffect(()=>{
        (async ()=> {
            const mode = (await getEncryptStorage('themeMode')) ?? 'light';
            const systemMode = (await getEncryptStorage('themeSystem')) ?? 'false';
            const newMode = systemMode ? systemTheme : mode;
            setTheme(newMode);
            setSystemTheme(systemMode);
        })
    }, [setTheme, setSystemTheme, systemTheme]);
    
    return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;