<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="CrearCompra" class="column" />
    <div class="m-5 column">
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Compra.
      </div>

      <InputCompra/>


    </div>
  </div>
</template>

<script>

import MenuDes from "../components/MenuDes";
import InputCompra from "../components/InputCompra"

export default {
  components: {
    MenuDes, InputCompra

  },
  methods: {

  },

  created() {

  },
};
</script>

<style>
</style>