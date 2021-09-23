function getStoredToasts(){
    const toasts = localStorage.getItem('Toasts');
    return toasts ? JSON.parse(toasts) : [];
}

function setStoredToasts(toasts){
    localStorage.setItem('Toasts', JSON.stringify(toasts));
}

const state = {
    toasts: getStoredToasts()
};

const getters = {
    allToasts: (state) => state.toasts
};

const actions = {
    addToast({commit}, toast){
        commit('addToast', toast);
    },
    removeToast({commit}, toast){
        commit('removeToast', toast);
    }
};

const mutations = {
    addToast: (state, toast) => {
        state.toasts.push(toast);
        setStoredToasts(state.toasts);
    },
    removeToast: (state, toast) => {
        console.log(state.toasts)
        state.toasts = state.toasts.filter(t=>t!=toast);
        setStoredToasts(state.toasts);
    }
};

export default{
    state, 
    getters, 
    actions, 
    mutations
};