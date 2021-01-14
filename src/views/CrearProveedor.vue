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
          <b-field  label="Busque un Laboratorio">
              <b-autocomplete
                rounded
                v-model="proveedor.laboratorio.nombre"
                placeholder="e.g. Bago"
                :open-on-focus="true"
                :data="laboratoriosFiltrados"
                icon="magnify"
                field="nombre"
                @select="(option) => (proveedor.laboratorio = option)"
              >
              </b-autocomplete>
            </b-field>
        </div>
      </div>
      <div>
        <b-button expanded type="is-success" @click="enviarProveedor">
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
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["guardarProveedor", "cargarLaboratorios"]),
    enviarProveedor() {
      const shortid = require("shortid");
      this.proveedor.id = shortid.generate();
      this.guardarProveedor();
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
            .indexOf(this.proveedor.laboratorio.nombre.toLowerCase()) >= 0
        );
      });
    },
  },
  created() {
    this.cargarLaboratorios();
  },
};
</script>

<style>
</style>