<template>
     <div>
          <v-app-bar
               color="primary"
               dense
               dark
          >
               <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

               <v-toolbar-title>SISE Nutricion</v-toolbar-title>


               <v-spacer></v-spacer>

               <v-btn @click="cerrarSesion" tex-icon dark color="error">
                    Salir
                    <v-icon class="ml-3">fas fa-sign-out-alt</v-icon>
               </v-btn>

               <!-- <v-menu
               left
               bottom
               >
               <template v-slot:activator="{ on, attrs }">
               <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
               >
                    <v-icon>mdi-dots-vertical</v-icon>
               </v-btn>
               </template>

               <v-list>
               <v-list-item
                    v-for="n in 5"
                    :key="n"
                    @click="() => {}"
               >
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
               </v-list-item>
               </v-list>
               </v-menu> -->
          </v-app-bar>
     </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
     name: 'Header',
     methods: {
          ...mapActions(['cerrarSesion'])
     },

}
</script>