<template>     
     <v-parallax
          dark
          height="100%"
          src="../assets/nutricion.png"
     >
          <v-row align="center" justify="center">
               <v-col align="center" justify="center">
                    <v-card
                    class="mx-auto px-5 py-5"
                    max-width="344"
                    >
                         <v-card-title>
                              Sistema de Nutrición
                         </v-card-title>

                         <v-card-text>
                              <v-form v-model="login_form" >
                                   <v-text-field v-model="correo" label="Correo Insitucional" :rules="this.rules.mail" hide-details="auto"></v-text-field>
                                   <v-text-field type="password" v-model="password" label="Contraseña" :rules="this.rules.required" hide-details="auto"></v-text-field>
                              </v-form>
                         </v-card-text>

                         <v-card-actions>
                              <v-btn @click="login()" :disabled="!login_form" class="my-3" block small color="primary">Iniciar Sesión</v-btn>
                         </v-card-actions>

                         <v-alert
                              v-model="alert"
                              dismissible
                              type="warning"
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
          login_form: false,
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
          },
          ...mapState(['rules'])
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
                         this.mensaje = err.response.data.mensaje
                         this.alert = true
                    })

          }
     },
}
</script>
