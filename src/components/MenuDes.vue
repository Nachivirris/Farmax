<template>
  <b-menu class="ml-5 mt-5 column is-one-fifth">
    <b-menu-list label="Menu">
      <b-menu-item
        icon="information-outline"
        label="Inicio"
        tag="router-link"
        to="/"
        :active="tipoMenu === 'Inicio' ? true : false"
      >
      </b-menu-item>

      <b-menu-item
        icon="cog"
        label="Administracion"
        tag="router-link"
        to="/administracion"
        :active="tipoMenu === 'Administracion' ? true : false"
      >
      </b-menu-item>

      <b-menu-item
        icon="cash"
        :active="
          tipoMenu === 'Compras' || tipoMenu === 'CrearCompra' ? true : false
        "
        :expanded="tipoMenu === 'CrearCompra' || tipoMenu === 'Compras'? true : false"
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
        label="Ventas"
        tag="router-link"
        to="/ventas"
        :active="tipoMenu === 'Ventas' ? true : false"
      ></b-menu-item>

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
export default {
  props: {
    tipoMenu: String,
  },
  computed: {},
};
</script>

<style>
</style>