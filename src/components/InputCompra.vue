<template>
  <div>
    Aqui puede crear una compra
    <div class="columns">
      <b-field class="column is-one-third" label="¿Qué fecha y hora es?">
        <b-datetimepicker
          v-model="datetime"
          placeholder="Haga click para elegir la fecha..."
          inline
        >
          <template slot="left">
            <button class="button is-primary" @click="datetime = new Date()">
              <b-icon icon="clock"></b-icon>
              <span>Ahora</span>
            </button>
          </template>
          <template slot="right">
            <button class="button is-danger" @click="datetime = null">
              <b-icon icon="close"></b-icon>
              <span>Borrar</span>
            </button>
          </template>
        </b-datetimepicker>
      </b-field>
      <div class="column mt-3">
        <b-checkbox v-model="nuevoProveedor">
          Es un nuevo proveedor?
        </b-checkbox>
        <!-- NUEVO PROVEEDOR -->
        <div v-if="nuevoProveedor">
          <b-field label="Nombre">
            <b-input v-model="proveedorNuevo.nombre"></b-input>
          </b-field>
          <b-field label="Apellidos">
            <b-input v-model="proveedorNuevo.apellidos"></b-input>
          </b-field>
          <b-field label="Busque el Laboratorio">
            <div class="">
              Si no encuentra el Laboratorio y quiere crear uno, haga click
              <router-link to="/">aqui</router-link>
            </div>
            <div>
              <b-autocomplete
                rounded
                v-model="proveedorNuevo.laboratorio"
                :data="laboratoriosFiltrados"
                placeholder="e.g. Bago"
                icon="magnify"
                clearable
                @select="(option) => (selected = option)"
              >
                <template slot="empty"
                  >No se encontraron laboratorios
                </template>
              </b-autocomplete>
            </div>
          </b-field>
          <b-field label="Numero">
            <b-input v-model="proveedorNuevo.numero"></b-input>
          </b-field>
        </div>
        <!-- PROVEEDOR EXISTENTE -->
        <div v-if="!nuevoProveedor">
          <section>
            <p class="content">
              <b> Proveedor: </b>
              {{ proveedorSeleccionado }}
            </p>
            <b-field label="Busque al proveedor">
              <b-autocomplete
                rounded
                v-model="proveedorSeleccionado"
                :data="proveedoresFiltrados"
                placeholder="e.g. Juan Carranza"
                icon="magnify"
                clearable
                @select="(option) => (selected = option)"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      datetime: new Date(),
      nuevoProveedor: false,
      proveedorSeleccionado: "",
      proveedorNuevo: {
        nombre: "",
        apellidos: "",
        laboratorio: "",
        numero: 71234567,
      },
    };
  },
  methods: {
    ...mapActions(["cargarProveedores", "cargarLaboratorios"]),
  },
  computed: {
    ...mapState(["proveedores", "laboratorios"]),
    proveedoresFiltrados() {
      const nombresProveedores = this.proveedores.map(function (prov) {
        return (
          prov.nombre +
          " " +
          prov.apellidos +
          " - " +
          prov.laboratorio +
          " - " +
          prov.numero
        );
      });

      return nombresProveedores.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.proveedorSeleccionado.toLowerCase()) >= 0
        );
      });
    },
    laboratoriosFiltrados() {
      const nombresLaboratorios = this.laboratorios.map(function (lab) {
        return lab.nombre;
      });

      return nombresLaboratorios.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.proveedorNuevo.laboratorio.toLowerCase()) >= 0
        );
      });
    },
  },
  created() {
    this.cargarProveedores();
    this.cargarLaboratorios();
  },
};
</script>

