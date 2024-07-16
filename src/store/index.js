import { createStore } from 'vuex';


export default createStore({
  state: {
    isLoggedIn: false,
  },


  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },



  },

  
  actions: {
    login({ commit }) {
        //登陆逻辑待填
        commit('setLoggedIn',true)
    },
    


  },
  



});
