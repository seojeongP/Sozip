const authNavigations ={
    AUTH_HOME: 'AuthHome',
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    KAKAO: 'Kakao',
} as const;

const feedNavigations ={
    FEED_HOME: 'FeedHome',
    FEED_DETAIL: 'FeedDetail',
    IMAGE_ZOOM: 'ImageZoom',
    FEED_FAVORITE: 'FeedFavorite',
    ANALYSIS: 'Analysis',
} as const;

const mainNavigations = {
    MAIN_HOME: 'MainHome',
    MAP: 'Map',
    FEED: 'Feed',
    LOAN: 'Loan',
    ADDI: 'Add',
    PROFILE: 'Setting',
} as const;

const mapNavigations = {
    MAP_HOME: 'MapHome',
    ADD_POST: 'AddPost',
    SEARCH_LOCATION: 'SearchLocation'
} as const;

const settingNavigations = {
    SETTING_HOME: 'SettingHome',
    EDIT_PROFILE: 'EditProfile',
    DELETE_ACCOUNT: 'DeleteAccount',
    EDIT_CATEGORY: 'EditCategory',
} as const;

const loanNavigations = {
    LOAN_HOME: 'LoanHome',
    LTV_HOME: 'LTVHome',
    VERIFY: 'VerifyHome',
    LTV_RESULT: 'LTVResult',
    LTV_MORE: 'LTVMore',
} as const;

const addiNavigations = {
    ADDI_HOME: 'AdditionalHome',
    ADDI_MORE: 'AdditionalMore',
    ADDI_MORE_DESC: 'AdditionalMoreDesc',
} as const;

export {authNavigations, mainNavigations, mapNavigations, feedNavigations, loanNavigations, addiNavigations,settingNavigations}