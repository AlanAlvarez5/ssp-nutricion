<template>
     <v-container>
          <h1 >Pacientes</h1>
          <v-alert
               v-model="alert"
               dismissible
               :type="type"
          >
               {{mensaje}}
          </v-alert>
          <v-card>
               <v-card-title>
                    <v-text-field
                    v-model="search"
                    append-icon="fas fa-search"
                    label="Buscar"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn @click="nuevoPaciente = true" dark color="primary">
                         <v-icon class="mr-3">fas fa-user-plus</v-icon>
                         Nuevo Paciente
                    </v-btn>
               </v-card-title>
               <v-data-table
                    :headers="headers_table"
                    :items="pacientes"
                    :search="search"
                    :loading="loading" 
                    loading-text="Cargando datos..."
                    @click:row="perfilAlumno"
               >
                    <template v-slot:item.estado_nutri="{ item }">
                         <v-chip :color="estado_nutri(item.estado_nutri)" dark>{{ item.estado_nutri }}</v-chip>
                    </template>
               </v-data-table>
          </v-card>

          <!-- Agregar Paciente -->
          <v-dialog
               v-model="nuevoPaciente"
               persistent
               max-width="80%"
               scrollable
          >    
               <v-card>

                    <v-card-title class="white--text headline primary">
                         Nuevo Paciente
                    </v-card-title>
                    <v-card-text style="min-height:30rem">

                         <v-tabs
                              v-model="tab"
                              background-color="transparent"
                              color="primary"
                              grow
                         >
                              <v-tab :key="1" >
                                   <span :style="info_personal?`color:#4CAF50`:`color:#FF5252`">Información Personal</span>
                              </v-tab>
                              <v-tab :key="2">
                                  <span  :style="info_academica?`color:#4CAF50`:`color:#FF5252`"> Información Académica</span> 
                              </v-tab>
                              <v-tab :key="3" >
                                   <span :style="info_contacto?`color:#4CAF50`:`color:#FF5252`">Contacto de Emergencia</span> 
                              </v-tab>
                         </v-tabs>


                         <v-tabs-items v-model="tab">
                              <v-tab-item :key="1">
                                   <!-- Informacion personal -->
                                   <v-form v-model="info_personal">
                                        <v-container >
                                                  <v-row justify="center" align="center">
                                                       <v-col cols="3">
                                                            <v-text-field
                                                                 v-model="paciente.nombres"
                                                                 :rules="rules.required"
                                                                 label="Nombre(s)"
                                                                 required
                                                            ></v-text-field>
                                                       </v-col>
                                                       <v-col cols="3">
                                                            <v-text-field
                                                                 v-model="paciente.apellido_p"
                                                                 :rules="rules.required"
                                                                 label="Apellido Paterno"
                                                                 required
                                                            ></v-text-field>
                                                       </v-col >
                                                       <v-col cols="3">
                                                            <v-text-field
                                                                 v-model="paciente.apellido_m"
                                                                 :rules="rules.required"
                                                                 label="Apellido Materno"
                                                                 required
                                                            ></v-text-field>
                                                       </v-col>

                                                  </v-row>
                                                  <v-row justify="center" align="center">
                                                       <v-col cols="3">
                                                            <v-select
                                                            v-model="paciente.genero"
                                                            :items="['M', 'F', 'Otro']"
                                                            :rules="rules.required"
                                                            label="Género"
                                                            required
                                                            ></v-select>
                                                       </v-col>
                                                       <v-col cols="3">
                                                            <v-text-field
                                                            v-model="paciente.edad"
                                                            :rules="rules.edad"
                                                            label="Edad"
                                                            type="number"
                                                            min="1"
                                                            required
                                                            ></v-text-field>
                                                       </v-col>
                                                       <v-col cols="3">
                                                            <v-select
                                                            v-model="paciente.estado_civil"
                                                            :items="['Soltero/a', 'Comprometido/a', 'En relación', 'Casado/a', 'Union Libre', 'Separado/a', 'Divorciado/a', 'Viudo/a']"
                                                            :rules="rules.required"
                                                            label="Estado Civil"
                                                            required
                                                            ></v-select>
                                                       </v-col>

                                                  </v-row>
                                                  <v-row justify="center" align="center">
                                                       <v-col cols="3">
                                                            <v-menu
                                                            v-model="nacimiento"
                                                            :close-on-content-click="false"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                 <v-text-field
                                                                 v-model="paciente.fecha_nacimiento"
                                                                 label="Fecha de Nacimiento"
                                                                 prepend-icon="fas fa-calendar-alt"
                                                                 readonly
                                                                 v-bind="attrs"
                                                                 v-on="on"
                                                                 :rules="rules.required"
                                                                 ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                 v-model="paciente.fecha_nacimiento"
                                                                 :max="new Date().toISOString().substr(0, 10)"
                                                                 min="1950-01-01"
                                                            ></v-date-picker>
                                                            </v-menu>
                                                       </v-col>
                                                       <v-col cols="3">
                                                            <v-select
                                                            v-model="estado"
                                                            :items="estados"
                                                            :rules="rules.required"
                                                            label="Estado de Nacimiento"
                                                            ></v-select>
                                                       </v-col>
                                                       <v-col cols="3">
                                                            <v-select
                                                            v-model="paciente.ciudad_nacimiento"
                                                            :items="municipios"
                                                            :rules="rules.required"
                                                            label="Ciudad de Nacimiento"
                                                            :disabled="municipios_disable"
                                                            ></v-select>
                                                       </v-col>
                                                  </v-row>
                                                  <v-row justify="center" align="center">
                                                       <v-col cols="9">
                                                            <v-text-field
                                                                 v-model="paciente.domicilio_residencia"
                                                                 :rules="rules.required"
                                                                 label="Domicilio de residencia"
                                                                 required
                                                            ></v-text-field>
                                                            <v-text-field
                                                                 v-model="paciente.domicilio_origen"
                                                                 :rules="rules.required"
                                                                 label="Domicilio de origen"
                                                                 required
                                                            ></v-text-field>
                                                       </v-col>
                                                  </v-row>
                                        </v-container>
                                   </v-form>
                              </v-tab-item>
                              <v-tab-item :key="2">
                                   <!-- Informacion Académica -->
                                   <v-form v-model="info_academica" >
                                        <v-container>
                                             <v-row justify="center" align="center">
                                                  <v-col cols="9">
                                                       <v-text-field
                                                            v-model="paciente.nua"
                                                            :rules="rules.number"
                                                            label="NUA"
                                                            required
                                                            type="number"
                                                       ></v-text-field>
                                                  </v-col>
                                             </v-row>
                                             <v-row justify="center" align="center">
                                                  <v-col cols="3">
                                                       <v-text-field
                                                            v-model="paciente.nombre_division"
                                                            :rules="rules.required"
                                                            label="División"
                                                            disabled
                                                       ></v-text-field>
                                                  </v-col>
                                                  <v-col cols="3">
                                                            <v-select
                                                            v-model="paciente.programa_educativo"
                                                            :items="['Ing. en Sistemas Computacionales', 'Ing. Eléctrica', 'Ing. en Comunicaciones y Elecrónica', 'Ing. Mecánica', 'Ing. Mecatrónica', 'Artes Digitales', 'Gestión Empresarial']"
                                                            :rules="rules.required"
                                                            label="Programa Educativo"
                                                            ></v-select>
                                                  </v-col>
                                                  <v-col cols="3">
                                                       <v-text-field
                                                            v-model="periodo"
                                                            :rules="rules.required"
                                                            label="Periodo"
                                                            disabled
                                                       ></v-text-field>
                                                  </v-col>
                                             </v-row>
                                             <v-row justify="center" align="center">
                                                  <v-col cols="3">
                                                            <v-menu
                                                            v-model="ingreso"
                                                            :close-on-content-click="false"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                 <v-text-field
                                                                 v-model="paciente.fecha_ingreso"
                                                                 label="Fecha de Ingreso"
                                                                 prepend-icon="fas fa-calendar-alt"
                                                                 readonly
                                                                 v-bind="attrs"
                                                                 v-on="on"
                                                                 :rules="rules.required"
                                                                 ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                 v-model="paciente.fecha_ingreso"
                                                                 :max="new Date().toISOString().substr(0, 10)"
                                                                 min="1950-01-01"
                                                            ></v-date-picker>
                                                            </v-menu>
                                                       </v-col>
                                                       <v-col cols="6">
                                                            <v-text-field
                                                                 v-model="paciente.correo"
                                                                 :rules="rules.mail"
                                                                 label="Correo Institucional"
                                                            ></v-text-field>
                                                       </v-col>
                                             </v-row>
                                             <v-row justify="center" align="center">
                                                  <v-col cols="3">
                                                       <v-text-field
                                                                 v-model="paciente.descubrimiento"
                                                                 :rules="rules.required"
                                                                 required
                                                                 label="¿Cómo descubrió esto?"
                                                       ></v-text-field>
                                                  </v-col>
                                                  <v-col cols="6">
                                                       <v-text-field
                                                                 v-model="paciente.disponibilidad"
                                                                 :rules="rules.required"
                                                                 label="Disponibilidad"
                                                       ></v-text-field>
                                                  </v-col>
                                             </v-row>
                                        </v-container>
                                   </v-form>
                              </v-tab-item>
                              <v-tab-item :key="3">
                                   <!-- Informacion de contacto -->
                                   <v-form v-model="info_contacto">
                                        <v-row justify="center" align="center">
                                             <v-col cols="3">
                                                  <v-text-field
                                                       v-model="contacto.nombres"
                                                       :rules="rules.required"
                                                       label="Nombre(s)"
                                                       required
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="3">
                                                  <v-text-field
                                                       v-model="contacto.apellido_p"
                                                       :rules="rules.required"
                                                       label="Apellido Paterno"
                                                       required
                                                  ></v-text-field>
                                             </v-col >
                                             <v-col cols="3">
                                                  <v-text-field
                                                       v-model="contacto.apellido_m"
                                                       :rules="rules.required"
                                                       label="Apellido Materno"
                                                       required
                                                  ></v-text-field>
                                             </v-col>

                                        </v-row>     
                                        <v-row justify="center" align="center">
                                             <v-col cols="6">
                                                  <v-text-field
                                                       v-model="contacto.correo"
                                                       :rules="rules.mail"
                                                       label="Correo electrónico"
                                                       required
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="3">
                                                  <v-text-field
                                                       v-model="contacto.telefono"
                                                       :rules="rules.number"
                                                       label="Número de Teléfono"
                                                       required
                                                       type="number"
                                                  ></v-text-field>
                                             </v-col >
                                        </v-row>     
                                        <v-row justify="center" align="center">
                                             <v-col cols="6">
                                                  <v-text-field
                                                       v-model="contacto.direccion"
                                                       :rules="rules.required"
                                                       label="Dirección"
                                                       required
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="3">
                                                  <v-text-field
                                                       v-model="contacto.colonia"
                                                       :rules="rules.required"
                                                       label="Colonia"
                                                       required
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>    
                                        <v-row justify="center" align="center">
                                             <v-col cols="3">
                                                  <v-select
                                                  v-model="contacto_estado"
                                                  :items="estados"
                                                  :rules="rules.required"
                                                  label="Estado"
                                                  ></v-select>
                                             </v-col>
                                             <v-col cols="6">
                                                  <v-select
                                                  v-model="contacto.ciudad"
                                                  :items="contacto_municipios"
                                                  :rules="rules.required"
                                                  label="Ciudad"
                                                  :disabled="contacto_municipios_disable"
                                                  ></v-select>
                                             </v-col>

                                        </v-row>     
                                   </v-form>
                              </v-tab-item>
                         </v-tabs-items>

                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="error" text @click="cancelar ">
                         Cancelar
                         </v-btn>
                         <v-btn color="primary" text @click="agregarPaciente"
                         :disabled="!(info_academica && info_contacto && info_personal)"
                         >
                         Agregar
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-dialog>
     </v-container>     
</template>

<script>
import { mapState } from 'vuex'
export default {
     name: 'Pacientes',
     created() {
          this.loading = true
               
          this.axios.get('http://localhost:3000/api/alumno', this.config)
               .then(res => {
                    // console.log(res.data)
                    this.pacientes = res.data;
                    
               })
               .catch(e => {
                    this.mensaje = `Error de conexión. Regargar sitio.`
                    this.alert = true
                    this.type = 'error'
                    // setTimeout(this.cancel_alert, 10000);
               })

          this.axios.get('https://api-sepomex.hckdrk.mx/query/get_estados')
               .then(res => {
                    this.estados = res.data.response.estado
               })
               .catch(e => {
                         this.mensaje = `Error de conexión a internet.`
                         this.alert = true
                         this.type = 'warning'
                         // setTimeout(this.cancel_alert, 10000);
               })

          this.loading = false

     },
     data() {
          return {
               // Tabla de pacientes
               search: '',
               headers_table: [
                    { text: 'NUA', align: 'start', sortable: false, value: 'nua',},
                    { text: 'Nombres', align: 'center', sortable: true, value: 'nombres',},
                    { text: 'Apellido Paterno', align: 'center', sortable: true, value: 'apellido_p',},
                    { text: 'Apellido Materno', align: 'center', sortable: true, value: 'apellido_m',},
                    { text: 'Programa Educativo', align: 'center', sortable: true, value: 'programa_educativo',},
                    { text: 'Estado', align: 'center', sortable: true, value: 'estado_nutri',},
               ],
               pacientes: [],
               loading: false,

               // Agregar Paciente
               tab: null,
               info_personal: false,
               info_academica: false,
               info_contacto: false,
               nuevoPaciente: false,
               estados: [],
               municipios: [],
               contacto_municipios: [],
               paciente: {
                    nua                 : '390638',
                    contacto_id         : 1,
                    nombres             : 'Alan Antonio',
                    apellido_p          : 'Alvarez',
                    apellido_m          : 'Sanchez',
                    genero              : 'M',
                    edad                : '22',
                    estado_civil        : 'Soltero/a',
                    fecha_nacimiento    : '1998-08-03',
                    ciudad_nacimiento   : '' ,
                    estado_nacimiento   : '',
                    domicilio_residencia: 'Juan Rojas Gzl. 228 col. Humanista',
                    domicilio_origen    : 'Juan Rojas Gzl. 228 col. Humanista',
                    nombre_division     : 'DICIS',
                    programa_educativo  : '',
                    periodo             : '',
                    fecha_ingreso       : '2020-01-01',
                    correo              : 'alan@mail.com',
                    descubrimiento      : 'Amigo',
                    disponibilidad      : 'Siempre',
                    estado_nutri        : 'Activo',
                    fecha_cierre        : null,
                    causas_cierre       : null
               },
               estado: '',
               contacto_estado: '',
               contacto: {
                    nombres   : 'J Antonio',
                    apellido_p: 'Alvarez',
                    apellido_m: 'Jaime',
                    telefono  : '4646461251',
                    correo    : 'antonio@mail.com',
                    direccion : 'Juan Rojas Gzl. 228',
                    colonia   : 'Humanista 1',
                    ciudad    : '',
                    estado    : ''
               },
               nacimiento: false,
               ingreso: false,
               municipios_disable: true,
               contacto_municipios_disable: true,
               alert: false,
               type: 'success',
               mensaje: '',

          }
     },
     computed: {
          ...mapState(['token', 'rules', 'config']),
          periodo: function (){
               if(Number(new Date().toISOString().substr(5, 2)) <= 7){
                    return 'Ene-Jun '+ new Date().toISOString().substr(0, 4)
               }else{
                    return 'Ago-Dic '+ new Date().toISOString().substr(0, 4)
               }
          }
     },
     methods: {
          agregarPaciente(){
               // Agregar Estado de nacimiento y periodo, contacto_estado
               this.paciente.estado_nacimiento = this.estado
               this.paciente.periodo = this.periodo
               this.contacto.estado = this.contacto_estado
               this.nuevoPaciente = false


               const body = {
                    alumno: this.paciente,
                    contacto: this.contacto
               }
               this.axios.post('http://localhost:3000/api/alumno/nuevo', body, this.config)
                    .then(res => {
                         
                         this.pacientes.push(res.data.paciente)
                         this.mensaje = `Paciente ${res.data.paciente.nombres} agregado correctamente.`
                         this.alert = true
                         this.type = 'success'
                         setTimeout(this.cancel_alert, 3000);
                         this.cancelar()
                    })
                    .catch(e => {
                         this.mensaje = `Imposible agregar al paciente. Volver a intentar`
                         this.alert = true
                         this.type = 'error'
                         setTimeout(this.cancel_alert, 5000);
                    })

          },
          cancelar(){
               this.paciente = {
                    nua                 : '',
                    contacto_id         : 0,
                    nombres             : '',
                    apellido_p          : '',
                    apellido_m          : '',
                    genero              : '',
                    edad                : '',
                    estado_civil        : '',
                    fecha_nacimiento    : '',
                    ciudad_nacimiento   : '' ,
                    estado_nacimiento   : '',
                    domicilio_residencia: '',
                    domicilio_origen    : '',
                    nombre_division     : 'DICIS',
                    programa_educativo  : '',
                    periodo             : '',
                    fecha_ingreso       : '',
                    correo              : '',
                    descubrimiento      : '',
                    disponibilidad      : '',
                    estado_nutri        : 'Activo',
                    fecha_cierre        : null,
                    causas_cierre       : null
               }
               this.contacto = {
                    id        : '',
                    nombres   : '',
                    apellido_p: '',
                    apellido_m: '',
                    telefono  : '',
                    correo    : '',
                    direccion : '',
                    colonia   : '',
                    ciudad    : '',
                    estado    : ''
               }
               this.estado = '',
               this.contacto_estado = ''
               this.nuevoPaciente = false
          },
          cancel_alert(){
               this.alert = false
          },
          perfilAlumno(value){
               console.log(value.nua)
               this.$router.push(`/pacientes/${value.nua}`)
          },
          estado_nutri(estado){
               if (estado == 'Activo'){
                    return 'green'
               } else if (estado == 'Alta') {
                    return 'green'
               } else if (estado == 'Canalización'){
                    return 'orange'
               } else if ( estado == 'Baja'){
                    return 'red'
               }
          }
     },
     watch: {
          estado: function(val){
               if(val !== ''){
                    this.axios.get(`https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${val}/`)
                    .then(res => {
                         // this.municipios = res.data.response.estado
                         this.municipios = res.data.response.municipios.sort()
                         this.municipios_disable = false

                    })
                    .catch(e => {
                         console.log(e.response);
                    })
               }
          },
          contacto_estado: function(val){
               if(val !== ''){
                    this.axios.get(`https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${val}/`)
                    .then(res => {
                         // this.municipios = res.data.response.estado
                         this.contacto_municipios = res.data.response.municipios.sort()
                         this.contacto_municipios_disable = false

                    })
                    .catch(e => {
                         console.log(e.response);
                    })
               }
          }
     },
}
</script>

<style scoped>
#nav a {
  font-weight: bold;
}
#nav a.router-link-exact-active {
     text-decoration: underline;
}
</style>