<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="CrearVenta" class="column" />
    <div class="m-5 column">
      <b-button  tag="router-link" to="/ventas" class="my-3"  type="is-primary" icon-left="arrow-left">Ventas</b-button>
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Venta.
      </div>

        <InputVenta/>
      


    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import MenuDes from "../components/MenuDes";
import InputVenta from "../components/InputVenta"


export default {
  components: {
    MenuDes, InputVenta

  },
  methods: {
...mapActions(["cargarDatosUsuario"])
  },

  created() {
      this.cargarDatosUsuario();
  },
};
</script>

<style>
</style>