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
        {{ props.row.proveedor.laboratorio }}
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
        {{ props.row.total.toString() }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["compras"]),
  },
};
</script>

<style>
</style>