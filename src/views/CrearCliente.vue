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
                <b-input v-model="cliente.nit" placeholder="Nit/CI"></b-input>
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
    return {};
  },
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["guardarCliente", "cargarClientes"]),
    enviarCliente() {
      const shortid = require("shortid");
      this.cliente.id = shortid.generate();
      this.cliente.nit = this.cliente.nit;

      if (this.buscarNit() === this.cliente.nit) {
        this.nitExistente();
      } else {
        this.guardarCliente();
      }
    },
    validarTexto(texto, espaciado) {
      if (espaciado) {
        const re = /^[A-Za-z0-9 &.]+$/;
        return re.test(String(texto).toLowerCase());
      } else {
        const re = /^[A-Za-z0-9]+$/;
        return re.test(String(texto).toLowerCase());
      }
    },
    buscarNit() {
      let nuevoNit = "";
      this.clientes.forEach((element) => {
        if (this.cliente.nit === element.nit) {
          nuevoNit = element.nit;
        }
      });

      return nuevoNit;
    },
    nitExistente() {
      this.$buefy.dialog.alert({
        title: "Error",
        message:
          "Este Nit ya existe en el registro, intente con otro por favor",
        type: "is-danger",
      });
    },
  },
  computed: {
    ...mapState(["cliente", "clientes"]),
    verificarDatos() {
      if (
        this.cliente !== null &&
        this.cliente.razon.trim() !== "" &&
        this.validarTexto(this.cliente.razon, true) &&
        this.cliente.nit.toString().length > 6 &&
        this.cliente.razon.toString().length > 6 &&
        this.validarTexto(this.cliente.nit.toString(), false)
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.cargarClientes();
  },
};
</script>

<style>
</style>