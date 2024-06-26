const queryKeys = {
    AUTH: 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    GET_PROFILE: ' getProfile',
    MARKER: 'marker',
    GET_MARKERS: 'getMarkers',
    BUS: 'others',
    GET_BUSES: 'getOthers',
    ANALYSIS: 'analysis',
    GET_ANALYSIS: 'getAnalysis',
    POST: 'post',
    GET_POST: 'getPost',
    GET_POSTS: 'getPosts',
    FAVORITE: 'favorite',
    GET_FAVORITE_POSTS: 'getFavoritePosts',
} as const;

const storageKeys = {
    REFRESH_TOKEN: 'refreshToken',
    THEME_MODE: 'themeMode',
    THEME_SYSTEM: 'themeSystem',
    SHOW_LEGEND: 'ShowLegend'
} as const;

export {queryKeys, storageKeys}