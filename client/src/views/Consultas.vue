<template>
     <v-container>
          <h1>Consultas</h1>
          <Calendario :dashboard="false" :height="550"></Calendario>

     </v-container>
</template>

<script>

import Calendario from '../components/Calendario'
export default {
     name: 'Consultas',
     components:{

          Calendario
     }
}
</script>