const authNavigations ={
    AUTH_HOME: 'AuthHome',
    LOGIN: 'Login',
    SIGNUP: 'Signup',
} as const;

const feedNavigations ={
    FEED_HOME: 'AuthHome',
    FEED_DETAIL: 'FeedDetail',
} as const;

const mapNavigations = {
    MAIN_HOME: 'MainHome',
    SELECT_REGION: 'SelectRegion',
    MAP_HOME: 'MapHome',
    FEED: 'FeedHome',
    LOAN: 'Loan',
    ADD_POST: 'AddPost',
} as const;

export {authNavigations, mapNavigations, feedNavigations}