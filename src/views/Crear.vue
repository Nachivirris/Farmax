<template>
  <div class=" columns">
    <MenuDes tipoMenu="Laboratorios" class="column" />
    <div class="m-5 column">
      <b-button  tag="router-link" to="/compras" class="my-3"  type="is-primary" icon-left="arrow-left">Compras</b-button>
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Laboratorio.
      </div>

      


    </div>
  </div>
</template>

<script>

import MenuDes from "../components/MenuDes";


export default {
  components: {
    MenuDes, 

  },
  methods: {

  },

  created() {

  },
};
</script>

<style>
</style>