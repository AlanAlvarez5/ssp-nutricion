<template>
  <v-app >
    <Header v-if="estaActivo"></Header>
    <v-main>
        <router-view v-if="!estaActivo" style="height:100vh"></router-view>
        <router-view v-if="estaActivo"></router-view>
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
