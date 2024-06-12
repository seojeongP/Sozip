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
    SELET_REGION : 'SelectRegion',
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
    BANK_SELECTION: 'BankSelection',
    BANK_ITEM_LIST: 'BankItemList',
    BANK_ITEM_DETAIL: 'BankItemDetail',
    LTV_RESULT: 'LTVResult',
    LTV_MORE: 'LTVMore',
} as const;

const addiNavigations = {
    ADDI_HOME: 'AdditionalHome',
    ADDI_MORE: 'AdditionalMore',
    ADDI_MORE_DESC: 'AdditionalMoreDesc',
    ADDI_MORE_DESC2: 'AdditionalMoreDesc2',
    ADDI_MORE_DESC3: 'AdditionalMoreDesc3',
    ADDI_MORE_DESC4: 'AdditionalMoreDesc4',
    ADDI_MORE_DESC5: 'AdditionalMoreDesc5',
    ADDI_MORE_DESC6: 'AdditionalMoreDesc6',
    ADDI_MORE_DESC7: 'AdditionalMoreDesc7',
    ADDI_MORE_DESC8: 'AdditionalMoreDesc8',
} as const;

export {authNavigations, mainNavigations, mapNavigations, feedNavigations, loanNavigations, addiNavigations,settingNavigations}