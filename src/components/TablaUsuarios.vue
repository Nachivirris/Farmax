<template>
  <div>
    <b-table :data="usuarios">
      <b-table-column
        sortable
        searchable
        field="nombre"
        label="Nombre"
        v-slot="props"
      >
        {{ props.row.nombre }}
      </b-table-column>
      <b-table-column
        sortable
        searchable
        field="apellidos"
        label="Apellidos"
        v-slot="props"
      >
        {{ props.row.apellidos }}
      </b-table-column>
      <b-table-column
        field="rol"
        label="Rol"
        searchable
        sortable
        v-slot="props"
      >
        {{ props.row.rol === "admin" ? 'Administrador' : 'Empleado' }}
      </b-table-column>

      <b-table-column field="acciones" label="Acciones" v-slot="props">
        <!-- <router-link
          :to="{
            name: 'EditarCliente',
            params: { id: props.row.id },
          }"
        >
          <b-button class="mx-2" type="is-warning"> Editar </b-button>
        </router-link> -->
        <b-button
          label="Eliminar"
          type="is-danger"
          @click="borrarCliente(props.row)"
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
    ...mapActions(["eliminarUsuario", "cargarUsuarios"]),

    borrarCliente(fila) {
      this.$buefy.dialog.confirm({
        title: "Borrar Cliente",
        message:
          "Esta seguro de que desea <b>eliminar</b> el Cliente, esta accion no puede ser desecha.",
        confirmText: "Borrar Cliente",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open("Cliente Eliminado!");
          this.eliminarCliente(fila.id);
        },
      });
    },
  },
  computed: {
    ...mapState(["usuarios"]),
  },
  created() {
    this.cargarUsuarios();
    console.log("usuarios", this.usuarios);
  },
};
</script>

<style>
</style>