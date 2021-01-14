<template>
  <div class="columns">
    <MenuDes tipoMenu="Clientes" class="column" />
    <div class="m-5 column">
      <b-button
        tag="router-link"
        to="/compras"
        class="my-3"
        type="is-primary"
        icon-left="arrow-left"
        >Clientes</b-button
      >
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Clientes.
      </div>

      <div class="columns">
        <div class="column">
          <section>
            <b-field label="Razon Social ">
              <b-input
                v-model="cliente.razon"
                placeholder="Razon social del Cliente"
              ></b-input>
            </b-field>
            <b-field label="Nit/CI ">
              <b-input v-model="cliente.nit" placeholder="Nit/CI"></b-input>
            </b-field>
          </section>
        </div>
      </div>
      <div>
        <b-button expanded type="is-success" @click="enviarCliente">
          Guardar Cliente
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MenuDes from "../components/MenuDes";

export default {
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["guardarCliente"]),
    enviarCliente() {
      const shortid = require("shortid");
      this.cliente.id = shortid.generate();
      this.guardarCliente();
    },
  },
  computed: {
    ...mapState(["cliente"]),
  },
  created() {},
};
</script>

<style>
</style>