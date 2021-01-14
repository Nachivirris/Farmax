<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Usuarios" class="column" />
    <div class="m-5 column">
      <div class="title is-1 has-text-primary is-four-fifths">Usuarios.</div>
      <b-button
        tag="router-link"
        to="/usuarios/crear"
        class="my-3"
        expanded
        type="is-primary"
        icon-left="arrow-right"
        >Crear Usuario</b-button
      >

      <div>
        <TablaUsuarios />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";
import TablaUsuarios from "../components/TablaUsuarios";

export default {
  components: {
    MenuDes,
    TablaUsuarios,
  },
  methods: {
    ...mapActions(["cargarUsuarios"]),
  },

  created() {
    this.cargarUsuarios();
  },
};
</script>

<style>
</style>