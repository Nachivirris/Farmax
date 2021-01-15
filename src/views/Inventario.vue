<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Inventario" class="column"/>
    <div class="m-5 column">
      <div class="title is-1 has-text-primary  is-four-fifths">Inventario.</div>
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