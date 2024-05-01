import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

function usePermission() {
    useEffect(()=> {
        (async () => {
            const permissionOS = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
            const checked = await check(permissionOS);

            switch(checked){
                case RESULTS.DENIED:
                    await request(permissionOS);
                    break;
                case RESULTS.BLOCKED:
                case RESULTS.LIMITED:
                    Alert.alert('위치 권한 허용이 필요합니다.', '설정 화면에서 위치 권한을 허용해주세요.',
                    [
                        {
                            text: '설정하기',
                            onPress: () => Linking.openSettings(),
                        },
                        {
                            text: '취소',
                            style: 'cancel',
                        }
                    ]
                    )
                    break;
                default:
                    break;
            }
        })()
    }, [])

}

export default usePermission;