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
                         <v-btn 
                              @click="nuevoRiesgo = true" 
                              class="ma-3 white--text" 
                              color="black">
                              <v-icon class="mr-2">fas fa-utensils</v-icon>
                              Nuevo Registro
                         </v-btn>
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

          <!-- Agregar riesgo nutricio -->
          <v-dialog 
               v-model="nuevoRiesgo"
               max-width="80%"
               scrollable>
               <v-card>
                    <v-card-title class="white--text primary headline ligthen-2">
                         Nuevo Registro de Riesgo Nutricio
                    </v-card-title>
                    <v-card-text>
                         <v-row >
                              <v-col  justify="center" align="center" cols="12">
                                   <div id="nav">
                                        <a @click="nav = 1" :style="ante_patologicos?`color:#4CAF50`:`color:#FF5252`"> Información Personal</a> |
                                        <a @click="nav = 2" :style="habitos_alimentarios?`color:#4CAF50`:`color:#FF5252`"> Habitos Alimentarios </a> |
                                        <!-- <a @click="nav = 3" :style="info_contacto?`color:#4CAF50`:`color:#FF5252`"> Contacto de Emergencia</a> -->
                                   </div>
                              </v-col>
                         </v-row>

                         <v-form v-model="ante_patologicos" v-if="nav==1">
                              <h2>Antecedentes personales patologicos</h2>
                              <v-container>
                                   <v-text-field :rules="rules.required" required label="NUA"></v-text-field>
                                   <v-text-field :rules="rules.required"  required label="Periodo"></v-text-field>
                                   <v-text-field :rules="rules.required"  required label="Padecimiento actual diagnosticado por un medico"></v-text-field>
                                   <v-text-field :rules="rules.required"  required label="Cirugias y/o traumatismos recientes(1 a 6 meses)"></v-text-field>
                                   <v-text-field :rules="rules.required"  required label="Tratamiento medico actual"></v-text-field>
                              </v-container>
                         </v-form>

                         <v-form v-model="habitos_alimentarios" v-if="nav==2">
                              <h2>
                                   Habitos Alimencios 
                              </h2>
                              <v-container>
                                   <v-text-field :rules="rules.required" required type="number" min='1' label="¿Cuántas comidas realizas en un día?" ></v-text-field>
                                   <v-checkbox :rules="rules.required" required label="Desayuno"></v-checkbox>
                                   <v-checkbox :rules="rules.required" required label="Comida"></v-checkbox>
                                   <v-checkbox :rules="rules.required" required label="Cena"></v-checkbox>
                                   <v-checkbox :rules="rules.required" required label="Colaciones"></v-checkbox>
                                   <v-checkbox :rules="rules.required" required label="Comidas en horarios fijos(Marcar == Si)"></v-checkbox>
                                   <v-text-field :rules="rules.required" required label="¿A qué hora sientes más apetito?"></v-text-field>
                                   <v-text-field :rules="rules.required" required label="Lugar donde acostumbras a comer regularmente"></v-text-field>
                                   <v-text-field :rules="rules.required" required label="¿Quién prepara tus alimentos?"></v-text-field>
                                   <v-checbox :rules="rules.required" required label="¿Donde vives, cuentes con los servicios basicos para preparar tus alimentos?"></v-checbox>
                                   <v-text-field :rules="rules.required" required type="number" min='0' label="Cantidad de agua simple que consume al día(litros)"></v-text-field>
                                   <v-checkbox :rules="rules.required" required label="¿Fuma?"></v-checkbox>
                                   <v-text-field label="Cantidad"></v-text-field>
                                   <v-checkbox label="¿Consume alcohol?"></v-checkbox>
                                   <v-text-field :rules="rules.required" required  label="Cantidad"></v-text-field>
                                   <v-text-field :rules="rules.required" required type="number" label="Cantidad de bebidas azucaradas al dìa"></v-text-field>
                              </v-container>
                         </v-form>
                        
                         
                    </v-card-text>
               </v-card>
          </v-dialog>
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
               items: [],

               // Agregar Riesgo Nutricio
               nuevoRiesgo: false,
               nav: 1,
               ante_patologicos: false,
               habitos_alimentarios: false,
          }
     },
     computed: {
          ...mapState(['token', 'rules','config']),
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