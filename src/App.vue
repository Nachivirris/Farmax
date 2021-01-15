<template>
  <div id="app">
    <div class="nav">
      <Navbar />
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from "./components/Navbar"

export default {
  components:{
    Navbar
  },
  methods:{
    ...mapActions(["verificarDatosAlmacenados","cargarDatosUsuario", "cargarUsuarios"]),
  },
  created(){
    this.verificarDatosAlmacenados()
    this.cargarUsuarios();
    this.cargarDatosUsuario();
  }
}
</script>

