<template>
     <v-card>
          <v-card-title class="white--text primary headline ligthen-2">
               Contacto de Emergencia
          </v-card-title>

          <v-container>
               <v-row justify="center" align="center">
                    <v-col cols="6">
                         <v-card-subtitle class="py-0">Nombre completo:</v-card-subtitle>
                         <v-card-text>{{contacto.nombres + ' ' + contacto.apellido_p + ' ' + contacto.apellido_m}}</v-card-text>

                    </v-col>
                    <v-col>
                         <v-card-subtitle class="py-0">Teléfono:</v-card-subtitle>
                         <v-card-text>{{contacto.telefono}}</v-card-text>
                    </v-col>
                    <v-col>
                         <v-card-subtitle class="py-0">Correo electónico:</v-card-subtitle>
                         <v-card-text>{{contacto.correo}}</v-card-text>
                    </v-col>

               </v-row>
               <v-row>
                    <v-col cols="6">
                         <v-card-subtitle class="py-0">Dirección:</v-card-subtitle>
                         <v-card-text>{{contacto.direccion + ' ' + contacto.colonia}}</v-card-text>
                    </v-col>
                    <v-col>
                         <v-card-subtitle class="py-0">Ciudad:</v-card-subtitle>
                         <v-card-text>{{contacto.ciudad}}</v-card-text>
                    </v-col>
                    <v-col>
                         <v-card-subtitle class="py-0">Estado:</v-card-subtitle>
                         <v-card-text>{{contacto.estado}}</v-card-text>
                    </v-col>
               </v-row>
          </v-container>


          <!-- {{contacto}} -->
     </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
     name: 'Contacto',
     data: () => ({
          contacto: {}
     }),
     computed: {
          ...mapState(['config'])
     },
     props: {
          id: String,
     },
     methods: {
          async getData(){
               let contacto = await this.axios.get('http://localhost:3000/api/contacto/' + this.id, this.config)
               this.contacto = contacto.data
          }
     },
     created(){
          this.getData()
     }
}
</script>