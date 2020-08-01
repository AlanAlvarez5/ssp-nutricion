<template>
     <div>
          <v-btn class="ml-3" @click="openDialog = true" dark color="purple">
               <v-icon class="mr-3">fas fa-calendar-plus</v-icon>
               Nueva<br>Consulta
          </v-btn>
          <v-dialog
               v-model="openDialog"
               persistent
               max-width="80%"
               scrollable
          >
                <v-card>

                    <v-card-title class="white--text headline primary lighten-2">
                         Nueva Cita
                    </v-card-title>
                    <!-- Alerta -->
                    <v-container>
                         <v-alert v-model="alert" dismissible :type="type">
                              {{mensaje}}
                         </v-alert>
                    </v-container>
                    <!-- Formulario -->
                    <v-card-text>
                         <v-form v-model="nuevaConsulta">
                              <v-row justify="center" align="center">
                                   <v-col cols="6" justify="center" align="center">
                                        <v-date-picker
                                             v-model="date"
                                             full-width
                                             :landscape="$vuetify.breakpoint.smAndUp"
                                             class="mt-4"
                                             :min="new Date().toISOString().substr(0, 10)"
                                        ></v-date-picker>
                                   </v-col>
                                   <v-col cols="6">
                                        <v-row justify="space-around" align="center">
                                             <v-col cols="4">
                                                  <v-text-field
                                                       v-if="nua === ''"
                                                       v-model="data_nua"
                                                       :rules="rules.number"
                                                       label="NUA"
                                                       required
                                                       type="number"
                                                  ></v-text-field>
                                                  <v-text-field
                                                       v-if="nua !== ''"
                                                       v-model="nua"
                                                       :rules="rules.number"
                                                       label="NUA"
                                                       required
                                                       disabled
                                                       type="number"
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="4">
                                                  <v-text-field
                                                       v-model="usuario.usuario.nue"
                                                       :rules="rules.number"
                                                       label="NUE"
                                                       required
                                                       disabled
                                                  ></v-text-field>
                                             </v-col>
                                        </v-row>
                                        <v-row justify="space-around" align="center">
                                             <v-col cols="4">
                                                  <v-menu
                                                  ref="menu_start"
                                                  v-model="menu_start"
                                                  :close-on-content-click="false"
                                                  :nudge-right="40"
                                                  :return-value.sync="start"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="start"
                                                            label="Inicio"
                                                            prepend-icon="fas fa-clock"
                                                            required
                                                            :rules="rules.required"
                                                            readonly
                                                            color="primary"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></v-text-field>
                                                       </template>
                                                       <v-time-picker
                                                            v-if="menu_start"
                                                            v-model="start"
                                                            :max="'18:00'"
                                                            :min="'08:00'"
                                                            full-width
                                                            @click:minute="$refs.menu_start.save(start)"
                                                            :allowed-minutes="[30, 0]"
                                                            format="24hr"
                                                       ></v-time-picker>
                                                  </v-menu>
                                             </v-col>
                                             <v-col cols="4">
                                                  <v-menu
                                                  ref="menu_end"
                                                  v-model="menu_end"
                                                  :close-on-content-click="false"
                                                  :nudge-right="40"
                                                  :return-value.sync="end"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="end"
                                                            label="Final"
                                                            prepend-icon="fas fa-clock"
                                                            required
                                                            :rules="rules.required"
                                                            readonly
                                                            color="primary"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></v-text-field>
                                                       </template>
                                                       <v-time-picker
                                                            v-if="menu_end"
                                                            v-model="end"
                                                            :max="'18:00'"
                                                            :min="start"
                                                            full-width
                                                            @click:minute="$refs.menu_end.save(end)"
                                                            :allowed-minutes="[30, 0]"
                                                            format="24hr"
                                                       ></v-time-picker>
                                                  </v-menu>
                                             </v-col>
                                        </v-row>
                                   </v-col>
                              </v-row>
                         </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="error" text @click="cancelar">
                              Cancelar
                         </v-btn>
                         <v-btn color="primary" text @click="agregar()" :disabled="decision">
                              Agregar
                         </v-btn>
                    </v-card-actions>
                </v-card>
          </v-dialog>
     </div>
</template>

<script>

     import { mapState } from 'vuex'

     export default {
          name: 'NuevaConsulta',
          data() {
               return {
                    nuevaConsulta: false,
                    menu_start: false,
                    menu_end: false,
                    openDialog: false,
                    date: '',
                    start: '',
                    end: '',
                    data_nua: '',
                    mensaje: '',
                    alert: false,
                    type: 'success'
               }
          },
          computed: {
               ...mapState(['usuario', 'token', 'rules', 'config']),
               decision: function(){
                    if (this.nuevaConsulta && this.date !== ''){
                         return false
                    }else{
                         return true
                    }
               }
          },
          props: {
               nua: {
                    type: String,
                    default:''
               }
          },
          methods: {
               cancelar(){
                    this.date = ''
                    this.start = ''
                    this.end = ''
                    this.data_nua = ''
                    this.mensaje = ''
                    this.alert = false
                    this.openDialog = false
               },
               agregar(){

                    const body = {
                         fecha: this.date,
                         hora_i: this.start,
                         hora_f: this.end,
                         nua: this.nua !== ''? this.nua: this.data_nua,
                         nue: this.usuario.usuario.nue,
                    }
                    this.axios.post('http://localhost:3000/api/consulta/nuevo', body, this.config)
                         .then(res => {
                              // console.log('mensaje', res.data.mensaje)
                              if (res.data.mensaje == 'Consulta Existente'){
                                   this.mensaje = 'Horario no disponible'
                                   this.alert = true
                                   this.type = 'error'

                              }else{
                                   this.mensaje = 'Consulta agregada'
                                   this.alert = true
                                   this.type = 'success'
                                   setTimeout(() => {
                                        
                                        this.cancelar()
                                        // this.$router.push({name: 'Consultas'})
                                        this.$router.go()
                                   }, 1500)
                              }
                         })
                         .catch(e => {
                              this.mensaje = `Error de conexión. Imposible agregar.`
                              this.alert = true
                              this.type = 'error'
                         })
               },

          },
     }
</script>