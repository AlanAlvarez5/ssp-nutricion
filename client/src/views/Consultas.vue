<template>
     <v-container>
          <h1>Consultas</h1>
          <v-row class="fill-height">
               <v-col>
                    <v-sheet height="64">
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
                                   <span>{{ typeToLabel[type] }}</span>
                                   <v-icon right>mdi-menu-down</v-icon>
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
                    <v-sheet height="500">
                         <v-calendar
                              :dark="dark"
                              ref="calendar"
                              v-model="focus"
                              :color="dark?'blue':'primary'"
                              :events="events"
                              :event-color="getEventColor"
                              :type="type"
                              @click:event="showEvent"
                              @click:more="viewDay"
                              @click:date="viewDay"
                              @change="updateRange"
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
     </v-container>
</template>

<script>
import { mapState } from 'vuex'
import NuevaConsulta from '../components/NuevaConsulta'
export default {
     name: 'Consultas',
     components:{
          NuevaConsulta
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
     }),
     computed: {
          ...mapState(['token'])
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

               const config = {
               headers: {
                    token: this.token
                    }
               }

               // console.log(start)
               const date = new Date
               date.toUTCString()
               date.setUTCHours(-6)
               date.toISOString()
               const start2 = { date: date.toISOString().substr(0,10)}

               this.axios.post('http://localhost:3000/api/consulta/consultas-rango', {start: start2, end}, config)
                    .then(res => {
                         const consultas_data = res.data
                         // console.log(consultas)

                         const consultas = []
                         
                         consultas_data.forEach(item => {
                              
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

                              consultas.push({
                                   name: item.paciente, 
                                   start: item.fecha.substr(0,10) + ' ' + item.hora_i, 
                                   end: item.fecha.substr(0,10) + ' ' + item.hora_f, 
                                   color, 
                                   timed: true, 
                                   details: '<h3>Paciente:</h3> NUA: '+item.nua + '<br>Nombre: ' + item.paciente +'<br><h3>Empleado:</h3> ' + item.admin,
                                   nua: item.nua
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