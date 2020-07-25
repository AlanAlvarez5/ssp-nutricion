<template>
  <v-app>
    <Header v-if="estaActivo"></Header>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Header from './components/Header'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',

  components: {
    Header
  },
  methods: {
    ...mapActions(['leerToken'])
  },
  computed: {
    ...mapGetters(['estaActivo'])
  },
  created() {
    this.leerToken()
  },
};
</script>
