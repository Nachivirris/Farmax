<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Inicio" class="column" />
    <div class="m-5 column">
      <div class="title has-text-primary is-four-fifths">BIENVENIDO A.</div>
      <!-- <div class="title is-3 ">Bienvenido a: </div> -->
      <div class="">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Recurso_13.png?alt=media&token=13e6af75-a20b-449b-b986-6fbad6684f4e"
          alt="IDK"
          width="500"
          height=""
          class="m-6 "
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/undraw_medical_care_movn.png?alt=media&token=e2258b1e-6531-4a18-bb65-f9b20703e2e9"
          width="500"
          alt=""
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MenuDes from "../components/MenuDes";

export default {
  components: {
    MenuDes,
  },
};
</script>

<style>
</style>