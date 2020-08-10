<template>
     <v-container>
          <v-row align="center">
               <h1 class="my-5">Paciente: {{ paciente.nombres }} </h1>
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

          <!-- // Tarjetas pricipales -->
          <v-row>


               <!-- Información general del paciente -->

               <v-col cols="4">
                    <v-card>
                         <v-row align="center" justify="space-between">
                              <v-col cols="4">
                                   <v-card-title class="ml-3">Información General</v-card-title>
                              </v-col>
                              <v-col align="end" justify="end">
                                   <v-btn class="mr-3" @click="contactoDialog = true" dark color="purple">
                                        <v-icon class="mr-1">fas fa-address-book</v-icon>
                                        Contacto
                                   </v-btn>
                                   <v-btn class="mr-3" @click="$router.push('/pacientes/')" dark color="warning">
                                        <v-icon class="mr-1">fas fa-user-edit</v-icon>
                                        Editar
                                   </v-btn>
                              </v-col>
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

               <!-- Historial de Consultas -->
               <v-col cols="4">
                    <v-card>
                         <v-card-title>
                              Historial de consultas
                         </v-card-title>
                         <v-data-table
                              :headers="consultas_headers"
                              :items="consultas"
                              :items-per-page="5"
                         
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
                                             class="mr-3"
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
                                             class="mr-3"
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
                                             class="mr-3"
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



               <!-- Riesgo Nutricio  -->
               <v-col cols = "4">
                    <v-card>
                         <v-row align="center">
                              <v-col cols="8">
                                   <v-card-title>
                                        Valoraciones de Riesgo Nutricio
                                   </v-card-title>
                              </v-col>
                              <!-- <v-spacer></v-spacer> -->
                              <v-col align="end">
                                   <v-btn 
                                        @click="nuevoRiesgo = true" 
                                        class="ma-3 white--text" 
                                        color="black">
                                        <v-icon class="mr-2">fas fa-utensils</v-icon>
                                        Nuevo <br/> Registro
                                   </v-btn>
                              </v-col>
                         </v-row>
                         <v-data-table 
                              :headers="headers"
                              :items="items"
                              @click:row="routerRiesgoNutricio"
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
                    <v-card-text style="min-height:30rem">
                         <v-row >
                              <v-col justify="center" align="center" cols="12">
                                   <div id="nav">
                                        <a @click="nav = 1" :style="ante_patologicos?`color:#4CAF50`:`color:#FF5252`"> Información Personal</a> |
                                        <a @click="nav = 2" :style="habitos_alimentarios?`color:#4CAF50`:`color:#FF5252`"> Habitos Alimentarios </a> |
                                        <a @click="nav = 3" :style="criterios?`color:#4CAF50`:`color:#FF5252`"> Criterio</a>
                                   </div>
                              </v-col>
                         </v-row>

                         <v-form v-model="ante_patologicos" v-if="nav==1">
                              <h2>Antecedentes personales patológicos</h2>
                              <h1 class="my-5">Paciente: {{ paciente.nombres }}.</h1>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required label="NUA" v-model="items.nua"></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required label="Período"></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="10">
                                             <v-text-field :rules="rules.required" required label="Padecimiento actual diagnósticado por un médico"></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col  cols="10">
                                             <v-text-field :rules="rules.required" required label="Cirugías y/o traumatismos recientes(1 a 6 meses)"></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col  cols="10">
                                             <v-text-field :rules="rules.required" required label="Tratamiento médico actual"></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>

                         <v-form v-model="habitos_alimentarios" v-if="nav==2">
                              <h2>
                                   Hábitos Alimencios 
                              </h2>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="6">
                                             <v-text-field :rules="rules.required" required type="number" min='1' label="¿Cuántas comidas realizas en un día?" ></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Desayuno"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Comida"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Cena"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Colaciones"></v-checkbox>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="2">
                                             <v-checkbox :rules="rules.required" required label="¿Comidas en horarios fijos?"></v-checkbox>
                                        </v-col>
                                        <v-col cols="8">
                                             <v-text-field :rules="rules.required" required label="¿A qué hora sientes más apetito?"></v-text-field>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-text-field :rules="rules.required" required label="Lugar donde acostumbras a comer regularmente"></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                             <v-text-field :rules="rules.required" required label="¿Quién prepara tus alimentos?"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                             <v-checkbox :rules="rules.required" required label="¿Dónde vives cuentas con los servicios básicos para preparar tus alimentos?"></v-checkbox>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required type="number" min='0' label="Cantidad de agua simple que consume al día(litros)"></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required type="number" label="Cantidad de bebidas azucaradas al dìa"></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="¿Fuma?"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                             <v-text-field label="Cantidad"></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox label="¿Consume alcohol?"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                             <v-text-field :rules="rules.required" required  label="Cantidad"></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>

                         <v-form v-model="criterios" v-if="nav==3">
                              <h2>
                                   Si el estudiante cumple por lo menos uno de los siguientes criterios, será candidato a iniciar proceso de orienteación alimentaria individual
                              </h2>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Presenta algún tipo y/o enfermedad que pnga en riesgo su estado de nutrición y comprometa su salud">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Su IMC se encuentra por arriba o por debajo del rango de normalidad">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="El priegue tricipital se encuentra en us valor por arriba o por debajo del rango de normalidad">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Su perímetro abominal se encuentra arriba de lo normal">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Los hábitos actuales de alimentación representan un factor de riesgo en el estado de salud">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-textarea label="Diagnóstico"></v-textarea>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-text-field label="Institución(Hospital)"></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>
                        
                         
                    </v-card-text>
               </v-card>
          </v-dialog>
          

          <v-dialog 
               v-model="prueba1"
               max-width="80%"
               scrollable>
               <v-card>
                    <v-card-title class="white--text primary headline ligthen-2">
                         Nuevo Registro de Riesgo Nutricio
                    </v-card-title>
                    <v-card-text style="min-height:30rem">
                         <v-row >
                              <v-col justify="center" align="center" cols="12">
                                   <div id="nav">
                                        <a @click="nav = 1" :style="ante_patologicos?`color:#4CAF50`:`color:#FF5252`"> Información Personal</a> |
                                        <a @click="nav = 2" :style="habitos_alimentarios?`color:#4CAF50`:`color:#FF5252`"> Habitos Alimentarios </a> |
                                        <a @click="nav = 3" :style="criterios?`color:#4CAF50`:`color:#FF5252`"> Criterio</a>
                                   </div>
                              </v-col>
                         </v-row>

                         <v-form v-model="ante_patologicos" v-if="nav==1">
                              <h2>Antecedentes personales patológicos</h2>
                              <h1 class="my-5">Paciente: {{ paciente.nombres }}.</h1>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required label="NUA" v-model="riesgoNutricio.nua" disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required label="Período" v-model="riesgoNutricio.periodo" disabled></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="10">
                                             <v-text-field :rules="rules.required" required label="Padecimiento actual diagnósticado por un médico" v-model="riesgoNutricio.padecimiento_actual" disabled></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col  cols="10">
                                             <v-text-field :rules="rules.required" required label="Cirugías y/o traumatismos recientes(1 a 6 meses)" v-model="riesgoNutricio.cirugias" disabled></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col  cols="10">
                                             <v-text-field :rules="rules.required" required label="Tratamiento médico actual" v-model="riesgoNutricio.tratamiento" disabled></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>

                         <v-form v-model="habitos_alimentarios" v-if="nav==2">
                              <h2>
                                   Hábitos Alimencios 
                              </h2>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="6">
                                             <v-text-field :rules="rules.required" required type="number" min='1' label="¿Cuántas comidas realizas en un día?" v-model="riesgoNutricio.n_comidas" disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Desayuno" v-model="riesgoNutricio.desayuno"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Comida" v-model="riesgoNutricio.comida"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Cena" v-model="riesgoNutricio.cena"></v-checkbox>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="Colaciones" v-model="riesgoNutricio.colaciones"></v-checkbox>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="2">
                                             <v-checkbox :rules="rules.required" required label="¿Comidas en horarios fijos?"></v-checkbox>
                                        </v-col>
                                        <v-col cols="8">
                                             <v-text-field :rules="rules.required" required label="¿A qué hora sientes más apetito?" v-model="riesgoNutricio.hora_apetito" disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-text-field :rules="rules.required" required label="Lugar donde acostumbras a comer regularmente" v-model="riesgoNutricio.lugar_comida"></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                             <v-text-field :rules="rules.required" required label="¿Quién prepara tus alimentos?" v-model="riesgoNutricio.cocinero"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                             <v-checkbox :rules="rules.required" required label="¿Dónde vives cuentas con los servicios básicos para preparar tus alimentos?" v-model="riesgoNutricio.servicios_basicos" ></v-checkbox>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required type="number" min='0' label="Cantidad de agua simple que consume al día(litros)" v-model="riesgoNutricio.cantidad_agua"></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                             <v-text-field :rules="rules.required" required type="number" label="Cantidad de bebidas azucaradas al dìa" v-model="riesgoNutricio.cantidad_azucar"></v-text-field>
                                        </v-col>
                                   </v-row>
                                   <v-row justify="center" align="center">
                                        <v-col cols="1">
                                             <v-checkbox :rules="rules.required" required label="¿Fuma?" v-model="riesgoNutricio.consumo_tablaco"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                             <v-text-field label="Cantidad" v-model="riesgoNutricio.cantidad_tabaco"></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                             <v-checkbox label="¿Consume alcohol?" v-model="riesgoNutricio.consumo_alcohol"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                             <v-text-field :rules="rules.required" required  label="Cantidad" v-model="riesgoNutricio.cantidad_alcohol"></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>

                         <v-form v-model="criterios" v-if="nav==3">
                              <h2>
                                   Si el estudiante cumple por lo menos uno de los siguientes criterios, será candidato a iniciar proceso de orienteación alimentaria individual
                              </h2>
                              <v-container>
                                   <v-row justify="center" align="center">
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Presenta algún tipo y/o enfermedad que pnga en riesgo su estado de nutrición y comprometa su salud" v-model="riesgoNutricio.criterio1">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Su IMC se encuentra por arriba o por debajo del rango de normalidad" v-model="riesgoNutricio.criterio2">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="El priegue tricipital se encuentra en us valor por arriba o por debajo del rango de normalidad" v-model="riesgoNutricio.criterio3">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Su perímetro abominal se encuentra arriba de lo normal" v-model="riesgoNutricio.criterio4">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-checkbox 
                                                  label="Los hábitos actuales de alimentación representan un factor de riesgo en el estado de salud" v-model="riesgoNutricio.criterio5">
                                             </v-checkbox>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-textarea label="Diagnóstico" v-model="riesgoNutricio.diagnostico"></v-textarea>
                                        </v-col>
                                        <v-col cols="10">
                                             <v-text-field label="Institución(Hospital)" v-model="riesgoNutricio.institucion"></v-text-field>
                                        </v-col>
                                   </v-row>
                              </v-container>
                         </v-form>
                        {{riesgoNutricio}}
                         
                    </v-card-text>
               </v-card>
          </v-dialog>

     </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Contacto from '../components/Contacto'
export default {
     name: 'Paciente',
     components: {
          Contacto
     },
     data() {
          return {
               paciente: {},
               riesgoNutricio: {},
               pacienteInfo: [],
               meses: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
               headers: [
                    {text: 'Periodo', align: 'center', sortable: false, value: 'periodo'}
               ],
               consultas_headers: [
                    {text: 'Fecha', align: 'center', sortable: true, value: 'fecha'},
                    {text: 'Hora', align: 'center', sortable: false, value: 'hora_i'},
                    {text: 'Nutriologo', align: 'center', sortable: false, value: 'nue'},
                    {text: 'Acciones', align: 'center', sortable: false, value: 'actions'},
               ],
               consultas: [],
               items: [],
               faltas: 0,

               // Agregar Riesgo Nutricio
               prueba1: false,
               nuevoRiesgo: false,
               nav: 1,
               ante_patologicos: false,
               habitos_alimentarios: false,
               criterios: false,
               contactoDialog: false,
          }
     },
     computed: {
          ...mapState(['token', 'rules','config']),
     },
     created() {
          // console.log(this.$route)
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
                    console.log(this.items)

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
          },
          routerRiesgoNutricio(value){
               // console.log(value.params)
               // this.$router.push(`/riesgoNutricio/${value.nua}/${value.periodo}`)
               console.log(value);
               this.riesgoNutricio = value
               console.log(this.riesgoNutricio);
               this.prueba1 = true

          },
          getRiesgoNutricio(value){
               this.axios.get(`http://localhost:3000/api/riesgoNutricio/${this.$route.params.nua}/${this.$route.params.periodo}`, this.config)
               .then((res) => {
                    this.riesgoNutricio = res.data.lista
                    console.log(this.riesgoNutricio)

               }).catch((err) => {
                    console.log(err)
               });
          }
     },
}
</script>