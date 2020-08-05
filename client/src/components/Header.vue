<template>
     <div>
          <v-app-bar
               color="primary"
               dense
               dark
               app
          >
               <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

               <v-toolbar-title>SISE Nutrición</v-toolbar-title>

          </v-app-bar>

          <v-navigation-drawer  dark color="primary" v-model="drawer" app>
               <v-row>
                    <v-col align="center">
                              <h3 class="mb-3 white--text">
                                   Bienvenido {{usuario.usuario.nombres}}
                              </h3>
                              <v-divider class="mx-5"></v-divider>
                    </v-col>
               </v-row>
               <v-list >
                    <!-- @click="drawer = !drawer"  -->
                    <v-list-item v-for="(item, index) in items" 
                    :key="index" :to="item.to">
                         <v-list-item-action>
                              <v-icon class="ml-3" >{{item.icon}}</v-icon>
                         </v-list-item-action>
                         <v-list-item-content>
                              <v-list-item-title class="ml-3 white--text">{{item.title}}</v-list-item-title>
                         </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="cerrarSesion" class="error" style="margin-top:20rem">
                         <v-list-item-action>
                              <v-icon class="ml-3">fas fa-sign-out-alt</v-icon>
                         </v-list-item-action>
                         <v-list-item-content>
                              <v-list-item-title class="ml-3 white--text">Salir</v-list-item-title>
                         </v-list-item-content>
                    </v-list-item>
               </v-list>
          </v-navigation-drawer>
     </div>
</template>

<script>

     import {mapActions, mapState} from 'vuex'

     export default {
          name: 'Header',
          methods: {
               ...mapActions(['cerrarSesion'])
          },
          data() {
               return {
                    drawer: 'true',
                    items: [
                         { title: 'Home', icon: 'fas fa-home', to: {name: 'Home'}},
                         { title: 'Pacientes', icon: 'fas fa-hospital-user', to: {name: 'Pacientes'}},
                         { title: 'Consultas', icon: 'fas fa-calendar-day', to: {name: 'Consultas'}},
                    ],
               }
          },
          computed: {
               ...mapState(['usuario'])
          },

     }
</script>