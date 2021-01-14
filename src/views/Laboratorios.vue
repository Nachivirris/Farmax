<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Compras" class="column" />
    <div class="m-5 column">

        <div class="title is-1 has-text-primary  is-four-fifths">Laboratorios.</div>
        <b-button  tag="router-link" to="/laboratorios/crear" class="my-3" expanded type="is-primary" icon-left="arrow-right">Crear Laboratorio</b-button>


      <div>
        <TablaLaboratorios />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";
import TablaLaboratorios from "../components/TablaLaboratorios";

export default {
  components: {
    MenuDes,
    TablaLaboratorios,
  },
  methods: {
    ...mapActions(["cargarLaboratorios"]),
  },

  created() {
    this.cargarLaboratorios();
  },
};
</script>

<style>
</style>