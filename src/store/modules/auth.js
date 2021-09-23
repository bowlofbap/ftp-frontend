import toasts from './toasts'

/**
 * get the first instance of token if one already exists
 */
function getCurrentToken(){
    const token = localStorage.getItem('Authorization');
    return token;
}

/*
sets localstorage token key to the passed token to access later
*/
function setCurrentToken(token){
    localStorage.setItem('Authorization', token);
}

/** 
* destroys the current token to log out the current user
*/
function destroyCurrentToken(){
    localStorage.removeItem('Authorization');
}

/**
 * conversion of token to object with payload properties
 */
function parseToken(token){
    let user = null;
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const secondsSinceEpoch = new Date() / 1000;
        const parsedToken = JSON.parse(window.atob(base64));

        if (secondsSinceEpoch > parsedToken.exp) {
            destroyCurrentToken();
        } else {
            user = parsedToken;
        }
    }
    return user;
}

const state = {
    currentToken: getCurrentToken()
};

const getters = {
    getCurrentUser: (state) => parseToken(state.currentToken),
    getToken: (state) => state.currentToken
};

const actions = {
    loginUser({commit}, token){
        commit('setToken', token);
    },
    logoutUser({commit}){
        commit('destroyToken');
    }
};

const mutations = {
    setToken: (state, token) => {
        state.currentToken = token;
        setCurrentToken(token);
    },
    destroyToken: (state) => {
        toasts.mutations.removeToast(toasts.state, 'reactivated')
        state.currentToken = null;
        destroyCurrentToken();
    }
};

export default{
    state, 
    getters, 
    actions, 
    mutations
};