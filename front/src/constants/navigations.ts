const authNavigations ={
    AUTH_HOME: 'AuthHome',
    LOGIN: 'Login',
    SIGNUP: 'Signup',
} as const;

const mapNavigations = {
    MAIN_HOME: 'MainHome',
    MAP_HOME: 'MapHome',
    FEED: 'Feed',
    LOAN: 'Loan',
    ADD_POST: 'AddPost',
} as const;

export {authNavigations, mapNavigations}