import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import route from './modules/route';
import toasts from './modules/toasts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        route,
        toasts
    }
})