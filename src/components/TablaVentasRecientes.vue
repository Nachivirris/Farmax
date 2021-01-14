<template>
  <div>
    <b-table :data="ventas">
      <b-table-column
        sortable
        searchable
        field="cliente.nombre"
        label="Cliente"
        width="10"
        v-slot="props"
      >
        {{ props.row.cliente.razon }}
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
          <b-button class="mx-2" type="is-warning"> Editar </b-button>
        </router-link>
        <b-button
          label="Eliminar"
          type="is-danger"
          @click="borrarVenta(props.row)"
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
    ...mapActions(["eliminarVenta", "cargarVentas"]),

    borrarVenta(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar venta",
        message:
          "Esta seguro de que desea <b>eliminar</b> la venta, esta accion no puede ser desecha.",
        confirmText: "Borrar venta",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Venta Eliminada!");
          this.eliminarVenta(fila.id);
        },
      });
    },
  },
  computed: {
    ...mapState(["ventas"]),
  },
  created(){
      this.cargarVentas()

  }
};
</script>

<style>
</style>