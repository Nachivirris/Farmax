<template>
  <div>
    <b-table :data="proveedores">
      <b-table-column
        sortable
        searchable
        field="nombre"
        label="Nombre"
        width="10"
        v-slot="props"
      >
        {{ props.row.nombre }}
      </b-table-column>

      <b-table-column
        field="apellidos"
        label="Apellidos"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.apellidos }}
      </b-table-column>

      <b-table-column
        field="numero"
        label="Numero"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.numero }}
      </b-table-column>

      <b-table-column
        field="laboratorio.nombre"
        label="Laboratorio"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.laboratorio.nombre }}
      </b-table-column>

      <b-table-column
        field="acciones"
        label="Acciones"
        width="40"
        v-slot="props"
      >
        <router-link
          :to="{
            name: 'EditarProveedor',
            params: { id: props.row.id },
          }"
        >
          <b-button class="mx-2" type="is-warning"> Editar </b-button>
        </router-link>
        <b-button
          label="Eliminar"
          type="is-danger"
          @click="borrarProveedor(props.row)"
        >
        </b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["eliminarProveedor", "cargarProveedores"]),

    borrarProveedor(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar Proveedor",
        message:
          "Esta seguro de que desea <b>eliminar</b> el Proveedor, esta accion no puede ser desecha.",
        confirmText: "Borrar Proveedor",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Proveedor Eliminado!");
          this.eliminarProveedor(fila.id);
        },
      });
    },
  },
  computed: {
    ...mapState(["proveedores"]),
  },
  created() {
    this.cargarProveedores();
  },
};
</script>

<style>
</style>