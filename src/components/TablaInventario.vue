<template>
  <div>
    <b-table :data="inventario">
      <b-table-column sortable searchable field="id" label="ID" v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column
        field="nombre"
        label="Nombre"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.nombre }}
      </b-table-column>

      <b-table-column
        field="precio"
        label="Precio"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.precio }}
      </b-table-column>

      <b-table-column
        field="cantidad"
        label="Cantidad"
        sortable
        searchable
        v-slot="props"
      >
        {{ props.row.cantidad }}
      </b-table-column>

      <b-table-column
        field="vencimiento"
        label="Vencimiento"
        width="10"
        searchable
        sortable
        v-slot="props"
      >
        <span class="tag is-success">
          {{ new Date(props.row.vencimiento).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column
        field="acciones"
        label="Acciones"
        v-slot="props"
        width="250"
      >
        <div>
          <b-button
            class="mx-2"
            type="is-warning"
            @click="editarCompra(props.row)"
          >
            Editar
          </b-button>
          <b-button
            label="Eliminar"
            type="is-danger"
            @click="borrarCompra(props.row)"
          >
          </b-button>
        </div>
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
    ...mapActions(["eliminarCompra", "cargarInventario"]),
    editarCompra(fila) {
      console.log(fila);
    },
    borrarCompra(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar compra",
        message:
          "Esta seguro de que desea <b>eliminar</b> la compra, esta accion no puede ser desecha.",
        confirmText: "Borrar compra",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Compra Eliminada!");
          this.eliminarCompra(fila.id);
          console.log(fila);
        },
      });
    },
  },
  computed: {
    ...mapState(["inventario"]),
  },
  created() {
    this.cargarInventario();
  },
};
</script>

<style>
</style>