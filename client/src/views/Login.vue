<template>     
     <v-parallax
          dark
          height="100%"
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
     >
          <v-row align="center" justify="center">
               <v-col align="center" justify="center">
                    <v-card
                    class="mx-auto px-5 py-5"
                    max-width="344"
                    >
                         <v-card-text>
                              <h1>Iniciar Sesión</h1>
                         </v-card-text>
                         <v-card-actions>
                              <v-text-field v-model="correo" label="Correo Insitucional" :rules="emailRules" hide-details="auto"></v-text-field>
                         </v-card-actions>
                         <v-card-actions>
                              <v-text-field type="password" v-model="password" label="Contraseña" :rules="rules" hide-details="auto"></v-text-field>
                         </v-card-actions>
                         <v-btn @click="login()" :disabled="disabled" class="my-3" block small color="primary">Iniciar Sesión</v-btn>

                         <v-alert
                              v-model="alert"
                              dismissible
                              type="error"
                         >
                              {{mensaje}}
                         </v-alert>

                    </v-card>
               </v-col>
          </v-row>
     </v-parallax>
</template>

<script>

import { mapState, mapMutations, mapActions } from "vuex";
import router from '../router';

export default {
     name: 'Login',
     data: () => ({
          rules: [
               value => !!value || 'Requerido',                                                                
          ],
          emailRules: [ 
               value => !!value || 'Requerido',
               value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'El correo debe de ser valido'

          ],
          correo: 'usuario@mail.com',
          password: 'usuario',
          mensaje: '',
          alert: false,

     }),
     computed: {
          disabled: function () {
               if (this.password === '' || this.correo === '' || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.correo))){
                    return true
               } else {
                    return false
               }
          }
     },
     methods: {
          ...mapMutations(['obtenerUsuario']),
          ...mapActions(['guardarUsuario', 'leerToken', 'cerrarSesion']),
          login(){

               const body = {
                    correo: this.correo,
                    password: this.password
               }

               this.axios.post('http://localhost:3000/api/login', body )
                    .then( res => {
                         const token = res.data.token
                         this.guardarUsuario(token)
                    })
                    .catch( err => {
                         // console.log(err.response.data)
                         this.mensaje = err.response.data.mensaje
                         this.alert = true
                    })

          }
     },
}
</script>
