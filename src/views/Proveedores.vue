<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Proveedores" class="column" />
    <div class="m-5 column">
      <div class="title is-1 has-text-primary is-four-fifths">Proveedores.</div>
      <b-button
        tag="router-link"
        to="/proveedores/crear"
        class="my-3"
        expanded
        type="is-primary"
        icon-left="arrow-right"
        >Crear Proveedor</b-button
      >

      <div>
        <TablaProveedores />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";
import TablaProveedores from "../components/TablaProveedores";

export default {
  components: {
    MenuDes,
    TablaProveedores,
  },
  methods: {
    ...mapActions(["cargarProveedores"]),
  },

  created() {
    this.cargarProveedores();
  },
};
</script>

<style>
</style>