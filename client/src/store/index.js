import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'
import decode from 'jwt-decode'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    token: '',
    usuario: '',
  },
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload
      if( payload === ''){
        state.usuario = ''
      } else{
        state.usuario = decode(payload)
        router.push({name: 'Home'})
      }
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      localStorage.setItem('token', payload)
      commit('obtenerUsuario', payload)
    },
    leerToken({commit}){
      const token = localStorage.getItem('token')
      if(token){
        commit('obtenerUsuario', token)
      }else{
        commit('obtenerUsuario', '')
      }
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', '')
      localStorage.removeItem('token')
      router.push({name: 'Login'})
    }
  },
  modules: {

  },
  getters: {
    estaActivo: state => !!state.token
  }
  
})
