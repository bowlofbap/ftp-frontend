const state = {
    currentRoute: ''
};

const getters = {
    getCurrentRoute: (state) => state.currentRoute
};

const actions = {
    moveTo({commit}, route){
        commit('setCurrentRoute', route);
    },
};

const mutations = {
    setCurrentRoute: (state, route) => {
        state.currentRoute = route;
    },
};

export default{
    state, 
    getters, 
    actions, 
    mutations
};