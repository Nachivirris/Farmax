<template>
  <div class="columns">
    <MenuDes tipoMenu="Proveedores" class="column" />
    <div class="m-5 column">
      <b-button
        tag="router-link"
        to="/laboratorios"
        class="my-3"
        type="is-primary"
        icon-left="arrow-left"
        >Proveedores</b-button
      >
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Proveeedor.
      </div>

      <div class="columns">
        <div class="column">
          <section>
            <b-field label="Nombre ">
              <b-input
                v-model="proveedor.nombre"
                placeholder="Nombre del proveedor"
              ></b-input>
            </b-field>
            <b-field label="Apellidos ">
              <b-input
                v-model="proveedor.apellidos"
                placeholder="Apellidos del proveedor"
              ></b-input>
            </b-field>
            <b-field label="Numero Telefonico">
              <b-input
                v-model.number="proveedor.numero"
                type="number"
                placeholder="Numero Telefonico"
              ></b-input>
            </b-field>
          </section>
        </div>

        <div class="column">
          <!-- Roound  -->
          <!-- <b-field label="Busque el Laboratorio">
            <div>
              Si no encuentra el Laboratorio y quiere crear uno, haga click
              <router-link to="/laboratorios/crear">aqui</router-link>
              <div>
                <b-autocomplete
                  rounded
                  v-model="proveedor.laboratorio"
                  :data="laboratoriosFiltrados"
                  placeholder="e.g. Bago"
                  
                  clearable
                  @select="(option) => (selected = option)"
                >
                  <template slot="empty"
                    >No se encontraron laboratorios
                  </template>
                </b-autocomplete>
              </div>
            </div>
          </b-field> -->
          <b-field label="Busque un Laboratorio">
            <b-autocomplete
              rounded
              v-model="name"
              placeholder="Ej. Nombre Laboratorio"
              :open-on-focus="true"
              :data="laboratoriosFiltrados"
              icon="magnify"
              field="nombre"
              clearable
              @select="(option) => (laboratorio = option)"
            >
            </b-autocomplete>
          </b-field>
        </div>
      </div>
      
      <div>
        <b-button
          expanded
          :disabled="verificarDatos"
          type="is-success"
          @click="enviarProveedor"
        >
          Guardar Proveedor
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
      name:"",
      laboratorio: {
        nombre: "",
        numero: "",
        direccion: "",
        id: "",
      },
    };
  },
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["guardarProveedor", "cargarLaboratorios"]),
    enviarProveedor() {
      const shortid = require("shortid");
      this.proveedor.id = shortid.generate();
      this.proveedor.laboratorio = this.laboratorio;

      this.guardarProveedor();
    },
    validarTexto(texto) {
      const re = /^[A-Za-z &.]+$/;
      return re.test(String(texto).toLowerCase());
    },
  },
  computed: {
    ...mapState(["proveedor", "laboratorios"]),
    laboratoriosFiltrados() {
      return this.laboratorios.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
    verificarDatos() {
      if (
        this.proveedor.nombre.trim() !== "" &&
        this.proveedor.apellidos.trim() !== "" &&
        this.validarTexto(this.proveedor.nombre) &&
        this.validarTexto(this.proveedor.apellidos) &&
        this.proveedor.numero.toString().length > 6 &&
        this.proveedor.numero.toString().length < 9 &&
        this.laboratorio !== null &&
        this.laboratorio.nombre.trim() !== ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.cargarLaboratorios();
  },
};
</script>

<style>
</style>