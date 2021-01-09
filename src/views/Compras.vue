<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Compras" class="column" />
    <div class="m-5 column">

        <div class="title is-1 has-text-primary  is-four-fifths">Compras.</div>
        <b-button  tag="router-link" to="/compras/crear" class="my-3" expanded type="is-primary" icon-left="arrow-right">Crear Compra</b-button>


      <div>
        <TablaComprasRecientes />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";
import TablaComprasRecientes from "../components/TablaComprasRecientes";

export default {
  components: {
    MenuDes,
    TablaComprasRecientes,
  },
  methods: {
    ...mapActions(["cargarCompras"]),
  },

  created() {
    this.cargarCompras();
  },
};
</script>

<style>
</style>