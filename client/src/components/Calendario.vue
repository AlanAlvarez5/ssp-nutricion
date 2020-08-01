<template>
     <div>
          <v-row class="fill-height">
               <v-col>
                    
                    <v-sheet height="64" v-if="!dashboard">
                         <v-toolbar flat color="white">
                         
                              <v-btn  class="mr-4" color="primary" dark @click="setToday">
                              Hoy
                              </v-btn>
                              <v-btn fab text small color="grey darken-2" @click="prev">
                                   <v-icon small>fas fa-arrow-left</v-icon>
                              </v-btn>
                              <v-btn fab text small color="grey darken-2" @click="next">
                                   <v-icon small>fas fa-arrow-right</v-icon>
                              </v-btn>
                              <v-toolbar-title v-if="$refs.calendar">
                              {{ $refs.calendar.title }}
                              </v-toolbar-title>
                              <v-spacer></v-spacer>
                              <NuevaConsulta class="mr-3"></NuevaConsulta>
                              <v-menu bottom right>
                              <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                   color="primary"
                                   v-bind="attrs"
                                   v-on="on"
                              >
                                   <v-icon left>fas fa-caret-down</v-icon>
                                   <span>{{ typeToLabel[type] }}</span>
                              </v-btn>
                              </template>
                              <v-list>
                              <v-list-item @click="type = 'day'">
                                   <v-list-item-title>Día</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = 'week'">
                                   <v-list-item-title>Semana</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = 'month'">
                                   <v-list-item-title>Mes</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="type = '4day'">
                                   <v-list-item-title>4 días</v-list-item-title>
                              </v-list-item>
                              </v-list>
                              </v-menu>
                         </v-toolbar>
                    </v-sheet>
                    <v-sheet :height="height">
                         <v-calendar
                              :dark="dark"
                              ref="calendar"
                              v-model="focus"
                              :color="dark?'blue':'primary'"
                              :events="events"
                              :event-color="getEventColor"
                              :type="dashboard?'day':type"
                              @click:event="showEvent"
                              @click:more="viewDay"
                              @click:date="viewDay"
                              @change="updateRange"
                              :weekdays="weekdays"
                              :first-time="'08:00:00'"
				          :interval-count="10"
                              :short-intervals="false"
				          :short-weekdays="false"
                         ></v-calendar>
                         <v-menu
                              v-model="selectedOpen"
                              :close-on-content-click="false"
                              :activator="selectedElement"
                              offset-x
                         >
                              <v-card
                              color="grey lighten-4"
                              min-width="350px"
                              flat
                              >
                              <v-toolbar
                              :color="selectedEvent.color"
                              dark
                              >
                                   <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                   <v-spacer></v-spacer>
                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                             icon
                                             dark
                                             :to="`/pacientes/${selectedEvent.nua}`"
                                             v-bind="attrs"
                                             v-on="on"
                                        >
                                        
                                             <v-icon>fas fa-address-card</v-icon>
                                        </v-btn>
                                        </template>
                                        <span>Ir al perfil</span>
                                   </v-tooltip>
                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                             icon
                                             dark
                                             @click="editarCita(selectedEvent)"
                                             v-bind="attrs"
                                             v-on="on"
                                        >
                                        
                                             <v-icon>fas fa-pencil-alt</v-icon>
                                        </v-btn>
                                        </template>
                                        <span>Reagendar</span>
                                   </v-tooltip>
                                   <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                             icon
                                             dark
                                             @click="cancelarConsulta(selectedEvent)"
                                             v-bind="attrs"
                                             v-on="on"
                                        >
                                        
                                             <v-icon>fas fa-trash-alt</v-icon>
                                        </v-btn>
                                        </template>
                                        <span>Cancelar</span>
                                   </v-tooltip>
                              </v-toolbar>
                              </v-card>
                         </v-menu>
                    </v-sheet>
               </v-col>
          </v-row>
          <v-row justify="end" align="center" class="mr-5">
               <span class="mr-3">Modo oscuro</span>
               <v-switch inset v-model="dark"></v-switch>
          </v-row>


          <!-- Editar Dialog -->
          <v-dialog
               v-model="editar_cita.status"
               persistent
               max-width="80%"
               scrollable
          >
                <v-card>

                    <v-card-title class="white--text headline primary lighten-2">
                         Reagendar Cita
                    </v-card-title>

                    <v-card-text>
                         <v-form v-model="editar_cita.form">
                              <v-row justify="center" align="center">
                                   <v-col cols="6" justify="center" align="center">
                                        <v-date-picker
                                             v-model="editar_cita.fecha"
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
                                                       v-model="editar_cita.nua"
                                                       :rules="rules.number"
                                                       label="NUA"
                                                       required
                                                       disabled
                                                       type="number"
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="4">
                                                  <v-text-field
                                                       v-model="editar_cita.nue"
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
                                                  :return-value.sync="editar_cita.hora_i"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="editar_cita.hora_i"
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
                                                            v-model="editar_cita.hora_i"
                                                            :max="'18:00'"
                                                            :min="'08:00'"
                                                            full-width
                                                            @click:minute="$refs.menu_start.save(editar_cita.hora_i)"
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
                                                  :return-value.sync="editar_cita.hora_f"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="editar_cita.hora_f"
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
                                                            v-model="editar_cita.hora_f"
                                                            :max="'18:00'"
                                                            :min="start"
                                                            full-width
                                                            @click:minute="$refs.menu_end.save(editar_cita.hora_f)"
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
                         <v-btn color="error" text @click="editar_cita.status = false">
                              Cancelar
                         </v-btn>
                         <v-btn color="primary" text @click="editarCitaOK()">
                              Reagendar
                         </v-btn>
                    </v-card-actions>
                </v-card>
          </v-dialog>


          <!-- Eliminar Dialog -->
          <v-row justify="center">
               <v-dialog v-model="cancelar_cita.status" persistent max-width="450px">
                    <v-card>
                    <v-card-title class="white--text headline error lighten-2">
                         <span class="headline">Eliminar consulta</span>
                    </v-card-title>
                    <v-card-text class="pa-5 ">
                         <v-row justify="center" align="center">
                              Se eliminará la cita del paciente {{cancelar_cita.paciente}} a las {{cancelar_cita.hora}} hrs. el día {{cancelar_cita.fecha}}
                         </v-row>
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="blue darken-1" text @click="cancelar_cita.status = false">Regresar</v-btn>
                         <v-btn color="red darken-1" text @click="eliminarConsulta(selectedEvent)">Confirmar</v-btn>
                    </v-card-actions>
                    </v-card>
               </v-dialog>
          </v-row>
     </div>
</template>


<script>
import { mapState } from 'vuex'
import NuevaConsulta from '../components/NuevaConsulta'
export default {
     name: 'Calendario',
     components:{
          NuevaConsulta
     },
     props:{
          dashboard: {
               type: Boolean,
               default: false
          },
          height:{
               type: Number,
          }
     },
     data: () => ({
          dark: false,
          focus: '',
          type: 'month',
          typeToLabel: {
               month: 'vista de Mes',
               week: 'vista de Semana',
               day: 'vista de Día',
               '4day': 'vista de 4 Días',
          },
          selectedEvent: {},
          selectedElement: null,
          selectedOpen: false,
          events: [],
          weekdays: [1,2,3,4,5],
          cancelar_cita: {
               status: false,
               fecha: '',
               hora: '',
               paciente: ''
          },
          editar_cita: {
               status: false,
               form: false,
               fecha: '',
               fecha_old: '',
               hora_i: '',
               hora_old: '',
               hora_f: '',
               nue: '',
               nua: ''
          },
          menu_start: false,
          menu_end: false,
     }),
     computed: {
          ...mapState(['token', 'config', 'rules'])
     },
     mounted () {
          this.$refs.calendar.checkChange()
     },
     methods: {
          viewDay ({ date }) {
               this.focus = date
               this.type = 'day'
          },
          getEventColor (event) {
               return event.color
          },
          setToday () {
               this.focus = ''
          },
          prev () {
               this.$refs.calendar.prev()
          },
          next () {
               this.$refs.calendar.next()
          },
          showEvent ({ nativeEvent, event }) {
               const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
               }

               if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
               } else {
                    open()
               }

               nativeEvent.stopPropagation()
          },
          updateRange ({ start, end }) {

               // console.log(start)
               const date = new Date
               date.toUTCString()
               // date.setUTCHours(-6)
               date.toISOString()
               const start2 = { date: date.toISOString().substr(0,10)}

               this.axios.post('http://localhost:3000/api/consulta/consultas-rango', {start: start2, end}, this.config)
                    .then(res => {
                         const consultas_data = res.data

                         const consultas = []
                         
                         consultas_data.forEach(item => {

						const full_date = item.fecha.substring(0,10)
						
						const date_i = new Date(full_date + 'T' +item.hora_i)
						const date_f = new Date(full_date + 'T' +item.hora_f)

                              consultas.push({
							name: item.paciente,
							nua: item.nua,
							nue: item.nue,
                                   fecha: full_date, 
                                   start: date_i, 
                                   hora: item.hora_i,
                                   hora_f: item.hora_f,
                                   end: date_f, 
                                   color: 'purple', 
                                   timed: true,
                              })
                         });
                         this.events = consultas

                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          cancelarConsulta(event){
               this.cancelar_cita.fecha = event.fecha
               this.cancelar_cita.hora = event.hora
               this.cancelar_cita.paciente = event.name
               this.cancelar_cita.status = true
          },
          eliminarConsulta(event){

               const body = {
                    fecha: event.fecha,
                    hora_i: event.hora,
                    nua: event.nua
               }
               // console.log(body)
               this.axios.post('http://localhost:3000/api/consulta/delete', body, this.config)
                    .then(res => {
                         // this.events = []
                         // this.$router.go()
                         this.$router.push({name: 'Consultas'})
                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          editarCita(event){
               this.editar_cita.nua = event.nua
               this.editar_cita.nue = event.nue
               this.editar_cita.hora_i = event.hora
               this.editar_cita.hora_old = event.hora
               this.editar_cita.hora_f = event.hora_f
               this.editar_cita.fecha = event.fecha
               this.editar_cita.fecha_old = event.fecha
               this.editar_cita.status = true
          },
          editarCitaOK(){
               this.axios.put('http://localhost:3000/api/consulta/reagendar', this.editar_cita, this.config)
                    .then(res => {
                         // this.events = []
                         // this.$router.go()
                         this.$router.push({name: 'Consultas'})
                    })
                    .catch(e => {
                         console.log(e)
                    })
          }
     },
}
</script>