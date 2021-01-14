<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Inventario" />
    <div>
      <div class="mt-5 title is-1 has-text-primary">INVENTARIO</div>
      <div>
        <TablaInventario/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuDes from "../components/MenuDes";
import TablaInventario from "../components/TablaInventario"

export default {
  components: {
    MenuDes, TablaInventario
  },
};
</script>

<style>
</style>