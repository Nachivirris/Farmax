<template>
  <div class="columns">
    <MenuDes tipoMenu="Laboratorios" class="column" />
    <div class="m-5 column">
      <b-button
        tag="router-link"
        to="/laboratorios"
        class="my-3"
        type="is-primary"
        icon-left="arrow-left"
        >Laboratorio</b-button
      >
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Laboratorio.
      </div>

      <div class="columns">
        <div class="column">
          <section>
            <b-field label="Nombre del laboratorio">
              <b-input
                type="text"
                v-model="laboratorio.nombre"
                placeholder="Nombre del laboratorio"
              ></b-input>
            </b-field>
            <b-field label="Numero Telefonico">
              <b-input
                v-model.number="laboratorio.numero"
                type="number"
                placeholder="Numero Telefonico"
              ></b-input>
            </b-field>
          </section>
        </div>

        <div class="column">
          <b-field label="Direccion">
            <b-input
              v-model="laboratorio.direccion"
              type="textarea"
              placeholder="Direccion"
            ></b-input>
          </b-field>
        </div>
      </div>

      <div>
        <b-button
          expanded
          type="is-success"
          @click="enviarLaboratorio"
          :disabled="verificarDatos"
        >
          Guardar Laboratorio
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
    ...mapActions(["guardarLaboratorio"]),
    enviarLaboratorio() {
      const shortid = require("shortid");
      this.laboratorio.id = shortid.generate();
      this.guardarLaboratorio();
    },
    validarTexto(texto) {
      const re = /^[A-Za-z &]+$/;
      return re.test(String(texto).toLowerCase());
    },
  },
  computed: {
    ...mapState(["laboratorio"]),
    verificarDatos() {
      if (
        this.laboratorio.nombre.trim() !== "" &&
        this.validarTexto(this.laboratorio.nombre) &&
        this.laboratorio.numero.toString().length > 6 &&
        this.laboratorio.numero.toString().length < 9 &&
        this.laboratorio.direccion.trim() !== ""
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