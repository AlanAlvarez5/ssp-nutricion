<template>
     <v-container>
          <h1>Consultas</h1>
          <Calendario :dashboard="false" :height="500"></Calendario>

     </v-container>
</template>

<script>
import NuevaConsulta from '../components/NuevaConsulta'
import Calendario from '../components/Calendario'
export default {
     name: 'Consultas',
     components:{
          NuevaConsulta,
          Calendario
     }
}
</script>