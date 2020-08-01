<template>
     <v-container>
          <v-row align="center">
               <h1 class="my-5">Paciente {{ paciente.nombres }}</h1>
               <h4 class="ml-5" :style="estado_nutri(paciente.estado_nutri)">{{paciente.estado_nutri}}</h4>
               <v-spacer></v-spacer>
               <v-btn @click="$router.push('/pacientes/')" dark color="primary">
                         <v-icon class="mr-3">fas fa-arrow-left</v-icon>
                         Pacientes
               </v-btn>
               <NuevaConsulta :nua="paciente.nua"></NuevaConsulta>
               <a :href="`mailto:${paciente.correo}`" class="ml-3" :style="'text-decoration: none'">
                    <v-btn dark color="blue">
                              <v-icon class="mr-3">fas fa-envelope</v-icon>
                              Enviar <br> Correo
                    </v-btn>
               </a>
               <v-btn v-if="paciente.estado_nutri === 'Activo'" class="ml-3" @click="$router.push('/pacientes/')" dark color="error">
                    <v-icon class="mr-3">fas fa-times-circle</v-icon>
                    Finalizar <br>Tratamiento
               </v-btn>
               <v-btn v-else class="ml-3" @click="$router.push('/pacientes/')" dark color="success">
                    <v-icon class="mr-3">fas fa-check-circle</v-icon>
                    Continuar <br>Tratamiento
               </v-btn>
          </v-row>
          <v-row>
               <v-col cols="4">
                    <v-card>
                         <v-row  >
                              <v-card-title class="ml-3 pb-0">Información General</v-card-title>
                              <v-btn class="ml-3 mt-3" @click="$router.push('/pacientes/')" dark color="warning">
                                   <v-icon class="mr-1">fas fa-user-edit</v-icon>
                                   Editar
                              </v-btn>
                         </v-row>
                         <v-row class="pb-0 mb-0 mt-3">
                              <v-col cols="6" class="pb-0 mb-0">
                                   <v-card-subtitle class="pb-0 pt-0">Nombre completo</v-card-subtitle>
                                   <v-card-text>{{this.paciente.nombres + ' ' + this.paciente.apellido_p + ' ' + this.paciente.apellido_m}}</v-card-text>
                              </v-col>
                              <v-col cols="6" class="pb-0 mb-0">
                                   <v-card-subtitle class="pb-0 pt-0">NUA</v-card-subtitle>
                                   <v-card-text>{{this.paciente.nua}}</v-card-text>
                              </v-col>
                         </v-row>
                         <v-row class="pb-0 mb-0 mt-3">
                              <v-col cols="6" class="pb-0 mb-0">
                                   <v-card-subtitle class="pb-0 pt-0">Género y edad</v-card-subtitle>
                                   <v-card-text>{{this.paciente.genero === 'M'? 'Masculino,' + ' '+ this.paciente.edad + ' años' : 'Femenino,' + ' '+ this.paciente.edad + ' años'}}</v-card-text>
                              </v-col>
                              <v-col cols="6" class="pb-0 mb-0">
                                   <v-card-subtitle class="pb-0 pt-0">Estado civil</v-card-subtitle>
                                   <v-card-text>{{this.paciente.estado_civil}}</v-card-text>
                              </v-col>
                         </v-row>
                         <v-row>
                              <v-col>
                                   <div v-for="(item, index) in pacienteInfo" :key="index">
                                        <v-card-subtitle class="pb-0 pt-0">{{item.title}}</v-card-subtitle>
                                        <v-card-text>{{item.value}}</v-card-text>
                                        
                                   </div>
                              </v-col>
                         </v-row>
                    </v-card>
               </v-col>
               <v-col cols = "4">
                    <v-card>
                         <v-card-title>
                              Valoraciones de riesgo nutricio
                         </v-card-title>
                         <v-data-table 
                              :headers="headers"
                              :items="items"
                         >

                         </v-data-table>
                    </v-card>
               </v-col>
          </v-row>
     </v-container>
</template>

<script>
import { mapState } from 'vuex';
import NuevaConsulta from '../components/NuevaConsulta'
export default {
     name: 'Paciente',
     components: {
          NuevaConsulta
     },
     data() {
          return {
               paciente: {},
               pacienteInfo: [],
               meses: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
               headers: [
                    {text: 'Periodo', align: 'center', sortable: false, value: 'periodo'}
               ],
               items: []
          }
     },
     computed: {
          ...mapState(['token', 'config']),
     },
     created() {

          this.axios.get(`http://localhost:3000/api/alumno/${this.$route.params.nua}`, this.config)
               .then((result) => {
                    this.paciente = result.data[0]
                    this.pacienteInfo = [
                         {title: 'Programa educativo', value: this.paciente.programa_educativo },
                         {title: 'Fecha y lugar de nacimiento', value: 
                              this.paciente.fecha_nacimiento.substring(8,10)
                              + ' de ' +
                              this.meses[Number(this.paciente.fecha_nacimiento.substring(5,7)) - 1]
                              + ' de ' +
                              this.paciente.fecha_nacimiento.substring(0,4) 
                         + ' en ' + this.paciente.ciudad_nacimiento + ', ' + this.paciente.estado_nacimiento},
                         {title: 'Domicilio de residencia', value: this.paciente.domicilio_residencia},
                         {title: 'Domicilio de origen', value: this.paciente.domicilio_origen},
                    ]
               }).catch((err) => {
                    console.log(err)     
               });
     
          this.axios.get(`http://localhost:3000/api/riesgoNutricio/${this.$route.params.nua}`, this.config)
               .then((res) => {
                    this.items = res.data.lista

               }).catch((err) => {
                    console.log(err);
               })
     
     
     },
     methods: {
          estado_nutri(estado){
               if (estado == 'Activo'){
                    return `color:#4CAF50`
               } else if (estado == 'Alta') {
                    return `color:#4CAF50`
               } else if (estado == 'Canalización'){
                    return `color:#FF8000`
               } else if ( estado == 'Baja'){
                    return `color:#FF5252`
               }
          }
     },
}
</script>