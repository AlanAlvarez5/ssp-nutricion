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
				<Calendario :dashboard="true" :height="450"></Calendario>
				
			</v-card-text>
		</v-card>
		</v-col>
	</v-row>
  </v-container>

</template>

<script>

import NuevaConsulta from '../components/NuevaConsulta'
import Calendario from '../components/Calendario'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
	  NuevaConsulta,
	  Calendario
  },
}
</script>
