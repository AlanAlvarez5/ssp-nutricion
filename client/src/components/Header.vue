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
               <v-spacer></v-spacer>
               <v-toolbar-item>
                    <v-icon class="mr-3">fas fa-user</v-icon>
                    {{usuario.usuario.nombres + ' ' + usuario.usuario.apellido_p}}
               </v-toolbar-item>


          </v-app-bar>

          <v-navigation-drawer  dark color="primary" v-model="drawer" app>
               <v-row>
                    <v-col align="center">
                              <h3 class=" white--text">
                                   Menú
                              </h3>
                    </v-col>
               </v-row>
               <v-list >
                    <!-- @click="drawer = !drawer"  -->
                    <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
                         <v-list-item-icon>
                              <v-icon class="ml-3" >{{item.icon}}</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content>
                              <v-list-item-title class=" white--text">{{item.title}}</v-list-item-title>
                         </v-list-item-content>
                    </v-list-item>

                    <v-list-item @click="cerrarSesion" class="error mt-5">
                         <v-list-item-icon>
                              <v-icon class="ml-3">fas fa-sign-out-alt</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content>
                              <v-list-item-title class="white--text">Cerrar Sesión</v-list-item-title>
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
                         { title: 'Consultas', icon: 'fas fa-calendar-day', to: {name: 'Consultas'}},
                         { title: 'Pacientes', icon: 'fas fa-hospital-user', to: {name: 'Pacientes'}},
                    ],
               }
          },
          computed: {
               ...mapState(['usuario'])
          },

     }
</script>