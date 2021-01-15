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
            <div class="columns">
              <b-field class="column" label="Nit/CI">
                <b-input
                  v-model="cliente.nit"
                  placeholder="Nit/CI"
                  type="number"
                ></b-input>
              </b-field>
              <b-field class="column" label="Complemento ">
                <b-input
                  v-model="complemento"
                  placeholder="Deje en blanco si no lo tiene"
                ></b-input>
              </b-field>
            </div>
          </section>
        </div>
      </div>
      <div>
        <b-button
          expanded
          type="is-success"
          @click="enviarCliente"
          :disabled="verificarDatos"
        >
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
  data() {
    return {
      complemento: "",
    };
  },
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["guardarCliente"]),
    enviarCliente() {
      const shortid = require("shortid");
      this.cliente.id = shortid.generate();

      this.cliente.nit = this.cliente.nit + this.complemento

      this.guardarCliente();
    },
    validarTexto(texto) {
      const re = /^[A-Za-z &]+$/;
      return re.test(String(texto).toLowerCase());
    },
  },
  computed: {
    ...mapState(["cliente"]),
    verificarDatos() {
      if (
        this.cliente.razon.trim() !== "" &&
        this.validarTexto(this.cliente.razon) &&
        this.cliente.nit.toString().length > 6 &&
        (this.complemento === "" || this.complemento.trim().length < 2)
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {},
};
</script>

<style>
</style>