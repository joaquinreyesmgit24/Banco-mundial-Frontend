import axios from "axios"
import BASE_URL from "../../api/api.js"
const state ={
    auth_token: null,
    user: {
        id: null,
        username: null,
        imgUrl:null,
        role:{
            id:null,
            name:null
        }
    },
    survey:{
        Q_S10:"",
        Q_S8:"",
        Q_S9:"",
        Q_S4:"",
        Q_S7:"",
        Q_A7:"",
        Q_A7A:"",
        A7A_cant_val:"",
        Q_A7B:"",
        Q_A11:"",
        Q_A7C:"",
        Q_A7D_address:"",
        Q_A7D_estab_name:"",
        Q_A9:"",
        Q_S12_date:"",
        Q_S12_hour:"",
        Q_S12_inter_name:"",
        Q_S12_inter_cargo:"",
    }
};
const getters = {
    getUsername(state){
        if(!state.user.username){
            state.user.username = JSON.parse(localStorage.getItem('user')).username
        }
        return state.user.username
    },
    getUserID(state){
        if(!state.user.id){
            state.user.id = JSON.parse(localStorage.getItem('user')).id
        }
        return state.user.id
    },
    getRolId(state){
        if(!state.user.role.id){
            state.user.role.id = JSON.parse(localStorage.getItem('user')).role.id
        }
        return state.user.role.id
    },
    getImgUrl(state){
        if(!state.user.imgUrl){
            state.user.imgUrl = JSON.parse(localStorage.getItem('user')).imgUrl
        }
        return state.user.imgUrl
    },
    getRolName(state){
    if(!state.user.role.name){
        state.user.role.name = JSON.parse(localStorage.getItem('user')).role.name
    }
    return state.user.role.name
    },  
    haveToken(state){
        if(!state.auth_token){
            state.auth_token = localStorage.getItem('auth_token')
        }
        return state.auth_token
    },
    getSurvey(state){
        console.log(state.survey)
        if(!state.survey){
            state.survey = JSON.parse(localStorage.getItem('survey'))
        }
        return state.survey
    }
}
const actions = {
    registerUser({ commit }, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/create-user`, payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    loginUser({ commit }, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/authenticate-user`, payload)
            .then(response => {
                commit('setUserInfo', response)
                resolve(response);
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    logoutUser({ commit }){
        new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/logout-user`)
            .then(response => {
                commit('resetUserInfo', response)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    updateStateSurvey({ commit }, payload){
        commit('setSurveyInfo', payload)
    },
}
const mutations = {
    setUserInfo(state, data){
        state.user.id = data.data.user.id
        state.user.username = data.data.user.username
        state.user.imgUrl = data.data.user.imgUrl
        state.auth_token = data.data.user.token
        state.user.role.id = data.data.user.role.id
        state.user.role.name = data.data.user.role.name
        localStorage.setItem('auth_token', data.data.user.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
    },
    resetUserInfo(state, data){
        state.user ={
            id: null,
            username: null,
            imgUrl:null,
            role:{
                id:null,
                name:null
            }
        }
        state.auth_token = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    },
    setSurveyInfo(state, data) {
        Object.keys(data.survey).forEach((key) => {
            if (state.survey.hasOwnProperty(key)) {
                state.survey[key] = data.survey[key];
            }
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}