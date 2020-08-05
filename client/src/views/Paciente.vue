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
               <v-col cols="4">
                    <v-card>
                         <v-card-title>
                              Historial de consultas
                         </v-card-title>
                         <v-data-table
                              :headers="consultas_headers"
                              :items="consultas"
                         
                         >

                              <template v-slot:item.fecha="{ item }">
                                   <v-chip :color="getConsultaColor(item)" dark>{{item.fecha.substring(0,10)}}</v-chip>
                              </template>
                              <template v-slot:item.actions="{ item }">

                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                             <v-icon
                                             small
                                             v-bind="attrs"
                                             v-on="on"
                                             class="mr-2"
                                             @click="consultaActions(item, 1)"
                                             >
                                             fas fa-check
                                             </v-icon>
                                        </template>
                                        <span>Asistencia</span>
                                   </v-tooltip>
                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                             <v-icon
                                             small
                                             v-bind="attrs"
                                             v-on="on"
                                             class="mr-2"
                                             @click="consultaActions(item, 2)"
                                             >
                                             fas fa-minus
                                             </v-icon>
                                        </template>
                                        <span>Justificar</span>
                                   </v-tooltip>
                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                             <v-icon
                                             small
                                             v-bind="attrs"
                                             v-on="on"
                                             class="mr-2"
                                             @click="consultaActions(item, 0)"
                                             >
                                             fas fa-times
                                             </v-icon>
                                        </template>
                                        <span>Falta</span>
                                   </v-tooltip>
                              </template>
                         </v-data-table>
                         <v-card-title>

                              Faltas totales: {{this.faltas}}
                         </v-card-title>
                    </v-card>

               </v-col>
          </v-row>
     </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
     name: 'Paciente',
     components: {

     },
     data() {
          return {
               paciente: {},
               pacienteInfo: [],
               meses: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
               headers: [
                    {text: 'Periodo', align: 'center', sortable: false, value: 'periodo'}
               ],
               consultas_headers: [
                    {text: 'Fecha', align: 'center', sortable: true, value: 'fecha'},
                    {text: 'Hora', align: 'center', sortable: false, value: 'hora_i'},
                    {text: 'Acciones', align: 'center', sortable: false, value: 'actions'},
               ],
               consultas: [],
               items: [],
               faltas: 0
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

          
          this.getConsultas()
          
     
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
          },
          consultaActions(item, n){

               let body = {
                    n,
                    fecha: item.fecha.substring(0,10),
                    hora_i: item.hora_i
               }
               this.axios.put(`http://localhost:3000/api/consulta/asistencia/${this.$route.params.nua}`, body, this.config)
               .then((res) => {
                    this.getConsultas()
                    this.getFaltas()
               })
               .catch((err) => {
                    console.log(err)
               })
          },
          getConsultas(){
               this.axios.get(`http://localhost:3000/api/consulta/consultas-nua/${this.$route.params.nua}`, this.config)
               .then((res) => {
                    this.consultas = res.data.consultas
                    this.getFaltas()
               })
               .catch((err) => {
                    console.log(err)
               })
          },
          getConsultaColor(item){
               if(item.asistencia == 0){
                    return 'red'
               } else if (item.asistencia == 1){
                    return 'green'
               } else if (item.asistencia == 2){
                    return 'orange'
               } else{
                    return 'gray'
               }
          },
          getFaltas(){
               this.faltas = 0
               this.consultas.forEach(element => {
                    if (element.asistencia == 0){
                         this.faltas = this.faltas + 1
                    }
               });
          }
     },
}
</script>