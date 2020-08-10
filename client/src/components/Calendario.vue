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
                              <v-btn class="mr-3" @click="cita.agregar = true; cita.editar = true" dark color="purple">
                                   <v-icon class="mr-3">fas fa-calendar-plus</v-icon>
                                   Nueva<br>Consulta
                              </v-btn>
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
                              offset-y
                              max-width="350px"
                         >
                              <v-card
                              color="grey lighten-4"
                              max-width="350px"
                              flat
                              >
                                   <v-toolbar
                                   :color="selectedEvent.color"
                                   dark
                                   >
                                        <v-toolbar-title>
                                             {{selectedEvent.name}}
                                        </v-toolbar-title>
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
                                                  @click="editarCitaDialog(selectedEvent)"
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
                                                  @click="cancelarConsultaDialog(selectedEvent)"
                                                  v-bind="attrs"
                                                  v-on="on"
                                             >
                                             
                                                  <v-icon>fas fa-trash-alt</v-icon>
                                             </v-btn>
                                             </template>
                                             <span>Cancelar</span>
                                        </v-tooltip>
                                   </v-toolbar>
                                   <v-card-text>
                                        Horario: {{selectedEvent.hora}} - {{selectedEvent.hora_f}} hrs.
                                        <br/> 
                                        NUE del Nutriologo: {{selectedEvent.nue}}
                                   </v-card-text>
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
               v-model="cita.editar"
               persistent
               max-width="80%"
               scrollable
          >
                <v-card>

                    <v-card-title class="white--text headline primary lighten-2">
                         Reagendar Cita
                    </v-card-title>

                    <v-card-text>
                         <v-form v-model="cita.form">
                              <v-row justify="center" align="center">
                                   <v-col cols="6" justify="center" align="center">
                                        <v-date-picker
                                             v-model="cita.fecha"
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
                                                       v-model="cita.nua"
                                                       :rules="rules.number"
                                                       label="NUA"
                                                       required
                                                       type="number"
                                                  ></v-text-field>
                                             </v-col>
                                             <v-col cols="4">
                                                  <v-text-field
                                                       v-if="cita.editar && cita.agregar"
                                                       v-model="usuario.usuario.nue"
                                                       :rules="rules.number"
                                                       label="NUE"
                                                       required
                                                       disabled
                                                  ></v-text-field>
                                                  <v-text-field
                                                       v-if="cita.editar && !cita.agregar"
                                                       v-model="cita.nue"
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
                                                  :return-value.sync="cita.hora_i"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="cita.hora_i"
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
                                                            v-model="cita.hora_i"
                                                            :max="'18:00'"
                                                            :min="'08:00'"
                                                            full-width
                                                            @click:minute="$refs.menu_start.save(cita.hora_i)"
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
                                                  :return-value.sync="cita.hora_f"
                                                  transition="scale-transition"
                                                  offset-y
                                                  max-width="290px"
                                                  min-width="290px"
                                                  >
                                                       <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                            v-model="cita.hora_f"
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
                                                            v-model="cita.hora_f"
                                                            :max="'18:00'"
                                                            :min="cita.hora_i"
                                                            full-width
                                                            @click:minute="$refs.menu_end.save(cita.hora_f)"
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
                         <v-btn v-if="cita.editar && !cita.agregar" color="error" text @click="cancelar">
                              Cancelar
                         </v-btn>
                         <v-btn v-if="cita.editar && cita.agregar" color="error" text @click="cancelar">
                              Cancelar
                         </v-btn>
                         <v-btn v-if="cita.editar && !cita.agregar" color="primary" text @click="editarCita()">
                              Reagendar
                         </v-btn>
                         <v-btn v-if="cita.editar && cita.agregar" color="primary" text @click="agregarCita()">
                              Agregar
                         </v-btn>
                    </v-card-actions>
                </v-card>
          </v-dialog>


          <!-- Eliminar Dialog -->
          <v-row justify="center">
               <v-dialog v-model="cita.eliminar" persistent max-width="450px">
                    <v-card>
                    <v-card-title class="white--text error">
                         Eliminar
                    </v-card-title>
                    <v-card-text class="pa-5 ">
                         Se eliminará la cita del paciente {{cita.paciente}}
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="primary darken-1" text @click="cita.eliminar = false">Regresar</v-btn>
                         <v-btn color="red darken-1" text @click="eliminarConsulta(selectedEvent)">Confirmar</v-btn>
                    </v-card-actions>
                    </v-card>
               </v-dialog>
          </v-row>
     </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
     name: 'Calendario',
     components:{
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
          cita: {
               editar: false,
               eliminar: false,
               agregar: false,
               paciente: '',
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
          calendar_start: '',
          calendar_end: ''
     }),
     computed: {
          ...mapState(['token', 'config', 'rules', 'usuario'])
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
               this.calendar_start = start
               this.calendar_end = end
               const date = new Date
               date.toUTCString()
               // date.setUTCHours(-6)
               date.toISOString()

               this.axios.post('http://localhost:3000/api/consulta/consultas-rango', {start: { date: date.toISOString().substr(0,10)}, end}, this.config)
                    .then(res => {
                         const consultas_data = res.data

                         const consultas = []
                         
                         consultas_data.forEach(item => {

						const full_date = item.fecha.substring(0,10)
						
						const date_i = new Date(full_date + 'T' +item.hora_i)
						const date_f = new Date(full_date + 'T' +item.hora_f)
                              let color = item.nue == this.usuario.usuario.nue ? 'green': 'primary'
                              consultas.push({
							name: item.paciente,
							nua: item.nua,
							nue: item.nue,
                                   fecha: full_date, 
                                   start: date_i, 
                                   hora: item.hora_i,
                                   hora_f: item.hora_f,
                                   end: date_f, 
                                   color,
                                   timed: true,
                              })
                         });
                         this.events = consultas

                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          cancelarConsultaDialog(event){
               this.cita.fecha = event.fecha
               this.cita.hora_i = event.hora
               this.cita.paciente = event.name
               this.cita.eliminar = true
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
                         this.updateRange({start : this.calendar_start, end : this.calendar_end})
                         this.cita.eliminar = false
                         // this.$router.push({name: 'Consultas'}).catch(() => {})
                         // vm.$forceUpdate();
                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          editarCitaDialog(event){
               this.cita.nua = event.nua
               this.cita.nue = event.nue
               this.cita.hora_i = event.hora
               this.cita.hora_old = event.hora
               this.cita.hora_f = event.hora_f
               this.cita.fecha = event.fecha
               this.cita.fecha_old = event.fecha
               this.cita.editar = true
          },
          editarCita(){
               this.axios.put('http://localhost:3000/api/consulta/reagendar', this.cita, this.config)
                    .then(res => {

                         this.updateRange({start : this.calendar_start, end : this.calendar_end})
                         this.cita.editar = false
                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          cancelar(){
                    this.cita.fecha = ''
                    this.cita.hora_i = ''
                    this.cita.hora_f = ''
                    this.cita.nua = ''
                    this.cita.agregar = false
                    this.cita.editar = false
                    // this.mensaje = ''
                    // this.alert = false
                    // this.openDialog = false
               },
          agregarCita(){

               const body = {
                    fecha: this.cita.fecha,
                    hora_i: this.cita.hora_i,
                    hora_f: this.cita.hora_f,
                    nua: this.cita.nua,
                    nue: this.usuario.usuario.nue,
               }
               this.axios.post('http://localhost:3000/api/consulta/nuevo', body, this.config)
                    .then(res => {
                         // console.log('mensaje', res.data.mensaje)
                         // if (res.data.mensaje == 'Consulta Existente'){
                         //      this.mensaje = 'Horario no disponible'
                         //      this.alert = true
                         //      this.type = 'error'

                         // }else{
                         //      this.mensaje = 'Consulta agregada'
                         //      this.alert = true
                         //      this.type = 'success'
                         //      setTimeout(() => {
                                   
                         //           this.cancelar()
                         //           // this.$router.push({name: 'Consultas'})
                         //           this.$router.go()
                         //      }, 1500)
                         // }
                         this.cita.agregar = false
                         this.cita.editar = false
                         this.updateRange({start : this.calendar_start, end : this.calendar_end})
                         this.cancelar()
                    })
                    .catch(e => {
                         // this.mensaje = `Error de conexión. Imposible agregar.`
                         // this.alert = true
                         // this.type = 'error'
                         console.log(e)
                    })
          },
     },
}
</script>