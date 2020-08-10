import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		usuario: '',
		config: {
			headers: {
				token: ''
			}
		},
		rules: {
			required: [v => !!v || 'Requerido',],
			number: [v => !!v || 'Requerido', v => (Number(v) > 0 && Number(v) <= 9999999999) || 'Ingresa una número valido'],
			edad: [v => !!v || 'Requerido', v => Number(v) > 0 || 'Ingresa una número valido', v => Number(v) < 99 || 'Ingresa una número valido'],
			mail: [v => !!v || 'Requerido', v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo debe de ser valido']
		}
	},
	mutations: {
		obtenerUsuario(state, payload) {
			state.token = payload
			state.config.headers.token = payload
			if (payload === '') {
				state.usuario = ''
			} else {
				state.usuario = decode(payload)
				router.push({ name: 'Consultas' })
			}
		}
	},
	actions: {
		guardarUsuario({ commit }, payload) {
			localStorage.setItem('token', payload)
			commit('obtenerUsuario', payload)
		},
		leerToken({ commit }) {
			const token = localStorage.getItem('token')
			if (token) {
				commit('obtenerUsuario', token)
			} else {
				commit('obtenerUsuario', '')
			}
		},
		cerrarSesion({ commit }) {
			commit('obtenerUsuario', '')
			localStorage.removeItem('token')
			router.push({ name: 'Login' })
		}
	},
	modules: {

	},
	getters: {
		estaActivo: state => !!state.token
	}

})
