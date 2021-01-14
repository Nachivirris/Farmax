<template>
  <div>
    <b-table :data="laboratorios">
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
        field="direccion"
        label="Direccion"
        width="40"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.direccion }}
      </b-table-column>

      

      <b-table-column
        field="acciones"
        label="Acciones"
        width="40"
        v-slot="props"
      >
        <router-link
          :to="{
            name: 'EditarLaboratorio',
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
          @click="borrarLaboratorio(props.row)"
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
    ...mapActions(["eliminarLaboratorio", "cargarLaboratorios"]),

    borrarLaboratorio(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar Laboratorio",
        message:
          "Esta seguro de que desea <b>eliminar</b> el Laboratorio, esta accion no puede ser desecha.",
        confirmText: "Borrar Laboratorio",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Laboratorio Eliminado!");
          this.eliminarLaboratorio(fila.id);

        },
      });
    },
  },
  computed: {
    ...mapState(["laboratorios"]),
  },
  created(){
      this.cargarLaboratorios()
  }
};
</script>

<style>
</style>