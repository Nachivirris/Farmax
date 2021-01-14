<template>
  <div>
    <b-table :data="compras">
      <b-table-column
        sortable
        searchable
        field="id"
        label="ID"
        width="10"
        v-slot="props"
      >
        {{ props.row.id }}
      </b-table-column>

      <b-table-column
        field="proveedor.laboratorio"
        label="Laboratorio"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.proveedor.laboratorio.nombre }}
      </b-table-column>

      <b-table-column
        field="proveedor.nombre"
        label="Nombre Proveedor"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.proveedor.nombre }}
      </b-table-column>

      <b-table-column
        field="props.row.medicamentos[0].nombre"
        label="Medicamentos"
        width="40"
        sortable
        searchable
        v-slot="props"
      >
        {{ props.row.medicamentos[0].nombre }}

        {{ props.row.medicamentos.length > 1 ? "" : "y ..." }}
      </b-table-column>

      <b-table-column
        field="fecha"
        label="Fecha"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        <span class="tag is-success">
          {{ new Date(props.row.fecha).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column
        field="total"
        label="Total"
        width="40"
        searchable
        v-slot="props"
      >
        {{ props.row.total.toString() }} {{ " Bs" }}
      </b-table-column>

      <b-table-column
        field="acciones"
        label="Acciones"
        width="40"
        v-slot="props"
      >
        <router-link
          :to="{
            name: 'EditarCompra',
            params: { id: props.row.id },
          }"
        >
          <!-- <b-button
            class="mx-2"
            type="is-warning"
            
          >
            Editar
          </b-button> -->
        </router-link>
        <b-button
          label="Eliminar"
          type="is-danger"
          @click="borrarCompra(props.row)"
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
    ...mapActions(["eliminarCompra"]),

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

        },
      });
    },
  },
  computed: {
    ...mapState(["compras"]),
  },
};
</script>

<style>
</style>