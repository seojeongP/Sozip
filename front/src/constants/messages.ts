const errorMessages = {
    CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.'
} as const;

const alerts = {
    NOT_SELECTED_LOCATION: {
        TITLE: '추가할 위치를 선택해주세요.',
        DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
    },


} as const;

export {alerts, errorMessages};