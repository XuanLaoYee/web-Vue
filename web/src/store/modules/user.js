export default {
    state: {
        user: "",//用户账号信息
        showLogin: false,
        user_kind:""
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getShowLogin(state) {
            return state.showLogin
        },
        getUserKind(state){
            return state.user_kind
        },
        getIsBuyer(state){
            if(state.user_kind ==='buyer'){
                return state.user_kind
            }else {
                return ''
            }
        },
        getIsSeller(state){
            if(state.user_kind ==='seller'){
                return state.user_kind
            }else {
                return ''
            }
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setShowLogin(state, data) {
            state.showLogin = data;
        },
        setUserKind(state,data){
            state.user_kind = data;
        }
    },
    actions: {
        setUser({commit}, data) {
            commit('setUser', data);
        },
        setShowLogin({commit}, data) {
            commit('setShowLogin', data);
        },
        setUserKind({commit},data){
            commit('setUserKind',data);
        }
    }
}
