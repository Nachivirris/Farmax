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
      v-if="usuario.rol === 'admin'"
        field="acciones"
        label="Acciones"
        width="300"
        v-slot="props"
      >
        <router-link
          :to="{
            name: 'EditarMedicamento',
            params: { id: props.row.id },
          }"
        >
          <b-button
            class="mx-2"
            type="is-warning"
            
          >
            Editar
          </b-button>
        </router-link>
        <b-button
          label="Eliminar"
          type="is-danger"
          @click="borrarMedicamentoInventario(props.row)"
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
    ...mapActions(["eliminarMedicamentoInventario", "cargarInventario"]),
    
    borrarMedicamentoInventario(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar Medicamento",
        message:
          "Esta seguro de que desea <b>eliminar</b> el medicamento, esta accion no puede ser desecha.",
        confirmText: "Borrar registro",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Medicamento eliminado!");
          this.eliminarMedicamentoInventario(fila.id);

        },
      });
    },
  },
  computed: {
    ...mapState(["inventario","usuario"]),
  },
  created() {
    this.cargarInventario();
  },
};
</script>

<style>
</style>