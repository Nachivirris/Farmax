<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Clientes" class="column" />
    <div class="m-5 column">
      <div class="title is-1 has-text-primary is-four-fifths">Clientes.</div>
      <b-button
        tag="router-link"
        to="/clientes/crear"
        class="my-3"
        expanded
        type="is-primary"
        icon-left="arrow-right"
        >Crear Cliente</b-button
      >

      <div>
        <TablaClientes />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";
import TablaClientes from "../components/TablaClientes";

export default {
  components: {
    MenuDes,
    TablaClientes,
  },
  methods: {},

  created() {},
};
</script>

<style>
</style>