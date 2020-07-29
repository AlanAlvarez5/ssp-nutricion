<template>
	<v-container>
		<h1>Dashboard</h1> 

	<v-row justify="end">
		<v-col cols="6" justify="end">
		<v-card>
			<v-card-title>
			Consultas de hoy
			<v-spacer></v-spacer>
			<NuevaConsulta></NuevaConsulta>
			</v-card-title>
			
			<v-card-text>
				<v-sheet height="450">
					<v-calendar
					:dark="dark"
					:short-intervals="false"
					:short-weekdays="false"
					:color="dark?'blue':'primary'"
					type="day"
					:events="events"
					:first-time="'08:00:00'"
					:interval-count="10"
					@click:event="showEvent"
					:event-color="getEventColor"
					>
					</v-calendar>
					<v-menu
						v-model="selectedOpen"
						:close-on-content-click="false"
						:activator="selectedElement"

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
							<!-- <v-btn icon>
								<v-icon>fas fa-heart</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>fas fa-ellipsis-v</v-icon>
							</v-btn> -->
							<v-btn color="primary" :to="`/pacientes/${selectedEvent.nua}`">
									Ir a perfil
							</v-btn>
						</v-toolbar>
						<v-card-text>
							<span v-html="selectedEvent.details"></span>
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
			</v-card-text>
			<v-row justify="end" align="center" class="mr-5">
               <span class="mr-3">Modo Oscuro</span>
               <v-switch inset v-model="dark"></v-switch>
          	</v-row>
		</v-card>
		</v-col>
	</v-row>
  </v-container>

</template>

<script>
import NuevaConsulta from '../components/NuevaConsulta'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
	  NuevaConsulta
  },
  data() {
    return {
		events: [],
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		dark: false
    }
  },
  computed: {
	  ...mapState(['token'])
  },
  created() {
	const config = {
		headers: {
			token: this.token
			}
		}
	const date = new Date
	date.toUTCString()
	// date.setUTCHours(-6)
	date.toISOString()
	const start = { date: date.toISOString().substr(0,10)}
	const end = start
	this.axios.post('http://localhost:3000/api/consulta/consultas-rango', {start, end}, config)
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
  methods: {
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
	getEventColor (event) {
		return event.color
	},
	test(event){

	}
		
  },
}
</script>
