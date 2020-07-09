<template>
          <v-row align="center" justify="center">
               <v-col align="center">
                    <v-card
                    class="mx-auto px-5 py-5"
                    max-width="344"
                    >
                         <v-card-text>
                              <h1>Iniciar Sesión</h1>
                         </v-card-text>
                         <v-card-actions>
                              <v-text-field v-model="correo" label="Correo Insitucional" :rules="emailRules" hide-details="auto"></v-text-field>
                         </v-card-actions>
                         <v-card-actions>
                              <v-text-field type="password" v-model="password" label="Contraseña" :rules="rules" hide-details="auto"></v-text-field>
                         </v-card-actions>
                         <v-btn  :disabled="disabled" class="my-3" block small color="primary">Iniciar Sesión</v-btn>
                    </v-card>
               </v-col>
          </v-row>
</template>

<script>
export default {
     name: 'Login',
     data: () => ({
          rules: [
               value => !!value || 'Requerido',                                                                
          ],
          emailRules: [ 
               value => !!value || 'Requerido',
               value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'El correo debe de ser valido'

          ],
          correo: '',
          password: '',

     }),
     computed: {
          disabled: function () {
               
               if (this.password === '' || this.correo === '' || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.correo))){
                    return true
               } else {
                    return false
               }
          }
     }
}
</script>
