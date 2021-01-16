<template>
  <b-menu class="ml-5 mt-5 column is-one-fifth" v-if="usuario.rol !== ''">
    <b-menu-list label="Menu">
      <b-menu-item
        icon="information-outline"
        label="Inicio"
        tag="router-link"
        to="/inicio"
        :active="tipoMenu === 'Inicio' ? true : false"
      >
      </b-menu-item>

      <b-menu-item
        v-if="usuario.rol === 'admin'"
        icon="cog"
        :active="
          tipoMenu === 'Laboratorios' ||
          tipoMenu === 'Proveedores' ||
          tipoMenu === 'Clientes' ||
          tipoMenu === 'Usuarios'
            ? true
            : false
        "
        :expanded="
          tipoMenu === 'Laboratorios' ||
          tipoMenu === 'Proveedores' ||
          tipoMenu === 'Clientes' ||
          tipoMenu === 'Usuarios'
            ? true
            : false
        "
      >
        <template slot="label" slot-scope="props">
          Administracion
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          >
          </b-icon>
        </template>
        <b-menu-item
          tag="router-link"
          to="/laboratorios"
          icon="cash"
          label="Laboratorio"
          :active="tipoMenu === 'Laboratorios' ? true : false"
        >
        </b-menu-item>
        <b-menu-item
          tag="router-link"
          to="/proveedores"
          icon="cash"
          label="Proveedor"
          :active="tipoMenu === 'Proveedores' ? true : false"
        >
        </b-menu-item>
        <b-menu-item
          tag="router-link"
          to="/clientes"
          icon="cash"
          label="Clientes"
          :active="tipoMenu === 'Clientes' ? true : false"
        >
        </b-menu-item>
        <b-menu-item
          tag="router-link"
          to="/usuarios"
          icon="cash"
          label="Usuarios"
          :active="tipoMenu === 'Usuarios' ? true : false"
        >
        </b-menu-item>
      </b-menu-item>

      <b-menu-item
        v-if="usuario.rol === 'admin'"
        icon="cash"
        :active="
          tipoMenu === 'Compras' || tipoMenu === 'CrearCompra' ? true : false
        "
        :expanded="
          tipoMenu === 'CrearCompra' || tipoMenu === 'Compras' ? true : false
        "
      >
        <template slot="label" slot-scope="props">
          Compras
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          >
          </b-icon>
        </template>
        <b-menu-item
          tag="router-link"
          to="/compras"
          icon="cash"
          label="General"
          :active="tipoMenu === 'Compras' ? true : false"
        >
        </b-menu-item>
        <b-menu-item
          tag="router-link"
          to="/compras/crear"
          icon="account"
          label="Crear Compra"
          :active="tipoMenu === 'CrearCompra' ? true : false"
        >
        </b-menu-item>
      </b-menu-item>

      <b-menu-item
        icon="printer-pos"
        :active="
          tipoMenu === 'Ventas' || tipoMenu === 'CrearVenta' ? true : false
        "
        :expanded="
          tipoMenu === 'CrearVenta' || tipoMenu === 'Ventas' ? true : false
        "
      >
        <template slot="label" slot-scope="props">
          Ventas
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          >
          </b-icon>
        </template>
        <b-menu-item
          tag="router-link"
          to="/ventas"
          icon="cash"
          label="General"
          :active="tipoMenu === 'Ventas' ? true : false"
        >
        </b-menu-item>
        <b-menu-item
          tag="router-link"
          to="/ventas/crear"
          icon="account"
          label="Crear ventas"
          :active="tipoMenu === 'CrearVenta' ? true : false"
        >
        </b-menu-item>
      </b-menu-item>

      <b-menu-item
        icon="clipboard-list"
        label="Inventario"
        tag="router-link"
        to="/inventario"
        :active="tipoMenu === 'Inventario' ? true : false"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    tipoMenu: String,
  },
  methods: {
    ...mapActions(["cargarDatosUsuario", "cargarUsuarios"]),
  },
  computed: { ...mapState(["usuario"]) },
  created() {
    this.cargarUsuarios();
    this.cargarDatosUsuario();
    
  },
};
</script>

<style>
</style>