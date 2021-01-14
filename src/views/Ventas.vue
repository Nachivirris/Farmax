<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Ventas" />
    <div class="m-5 column">
      <div class="title is-1 has-text-primary is-four-fifths">Ventas.</div>

      <TablaVentasRecientes/>
    </div>
  </div>
</template>

<script>
import MenuDes from "../components/MenuDes";
import TablaVentasRecientes from "../components/TablaVentasRecientes"

export default {
  components: {
    MenuDes,TablaVentasRecientes
  },
};
</script>

<style>
</style>