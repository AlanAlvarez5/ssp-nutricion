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
                              <v-btn @click="test(selectedEvent)" icon>
                                   <v-icon>fas fa-pencil-alt</v-icon>
                              </v-btn>
                              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                   <v-spacer></v-spacer>
                                   <v-btn color="primary" :to="`/pacientes/${selectedEvent.nua}`">
                                        Ir a perfil
                                   </v-btn>
                                   <!-- <v-btn icon>
                                        <v-icon>fas fa-heart</v-icon>
                                   </v-btn>
                                   <v-btn icon>
                                        <v-icon>fas fa-ellipsis-v</v-icon>
                                   </v-btn> -->
                              </v-toolbar>
                              <v-card-text>
                                   <span v-html="selectedEvent.details"></span>
                                   <br>
                                   
                              </v-card-text>
                              <v-card-actions>
                              <v-btn
                                   text
                                   color="secondary"
                                   @click="selectedOpen = false"
                              >
                                   Cancel
                              </v-btn>
                              </v-card-actions>
                              </v-card>
                         </v-menu>
                    </v-sheet>
               </v-col>
          </v-row>
          <v-row justify="end" align="center" class="mr-5">
               <span class="mr-3">Modo oscuro</span>
               <v-switch inset v-model="dark"></v-switch>
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
          colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
          weekdays: [1,2,3,4,5]
     }),
     computed: {
          ...mapState(['token', 'config'])
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
                         // console.log(consultas)

                         const consultas = []
                         
                         consultas_data.forEach(item => {


						// console.log(new Date(item.fecha.substr(0,4), item.fecha.substr(5,2), item.fecha.substr(8,2), item.hora_i.substring(0,2),0,0).getTime())
						// const anio = Number(item.fecha.substr(0,4))
						// const mes = Number(item.fecha.substr(5,2))
						// const dia = Number(item.fecha.substr(8,2))
						// const hora_i = Number(item.hora_i.substring(0,2))
						// const hora_f = Number(item.hora_f.substring(0,2))

						const full_date = item.fecha.substring(0,10)
						

						// const date_i = new Date(anio, mes, dia, hora_i)
						// const date_f = new Date(anio, mes, dia, hora_f)
						const date_i = new Date(full_date + 'T' +item.hora_i)
						const date_f = new Date(full_date + 'T' +item.hora_f)
						// console.log(date_f.getHours())

						let color 
                              if(item.asistencia){
                                   if( item.asistencia == true){
                                        color = 'green'
                                   }else{
                                        color = 'red'
                                   }
                              }else{
                                   color = 'purple'
                              }

						// console.log(item.nue)
                              consultas.push({
							name: item.paciente,
							nua: item.nua,
							nue: item.nue,
                                   // start: item.fecha.substr(0,10) + ' ' + item.hora_i.substring(0,5), 
                                   // end: item.fecha.substr(0,10) + ' ' + item.hora_f.substring(0,5), 
                                   start: date_i, 
                                   end: date_f, 
                                   color, 
                                   timed: true, 
                                   // details: '<h3>Paciente:</h3> NUA: '+item.nua + '<br>Nombre: ' + item.paciente +'<br><h3>Empleado:</h3> ' + item.admin,
                              })
                         });

                         this.events = consultas

                    })
                    .catch(e => {
                         console.log(e)
                    })
          },
          test(event){
          }
     },
}
</script>