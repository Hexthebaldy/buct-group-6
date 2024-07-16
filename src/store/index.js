import { createStore } from 'vuex';


export default createStore({
  state: {
    isLoggedIn: false,//管理登陆状态

    playersInfo:[],//主页选手数据

  },


  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },

    setPlayersInfo(state,payload){
      state.playersInfo = payload;
    },

  },

  
  actions: {
    login({ commit }) {
        //登陆逻辑待填
        commit('setLoggedIn',true)
    },
    
    updatePlayersInfo({commit},newArray){
      commit('setPlayersInfo',newArray);
    },

  },


  getters:{
    getArray:(state) => state.playersInfo, 
  },
  



});
