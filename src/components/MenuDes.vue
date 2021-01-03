<template>
  <b-menu class="ml-5 mt-5 column is-one-fifth">
    <b-menu-list label="Menu">
      <router-link to="/">
        <b-menu-item
          icon="information-outline"
          label="Inicio"
          :active="tipoMenu === 'Inicio'"
        >
        </b-menu-item>
      </router-link>
      <b-menu-item icon="cog" label="Administracion">
        <template slot="label"> </template>
      </b-menu-item>
      <router-link to="/compras">
        <b-menu-item icon="cash" label="Compras" :active="tipoMenu === 'Compras' "></b-menu-item>
      </router-link>

      <b-menu-item icon="printer-pos" label="Ventas"></b-menu-item>
      <b-menu-item icon="clipboard-list" label="Inventario"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  props: {
    tipoMenu: String,
  },
  computed: {
   
  },
};
</script>

<style>
</style>