<template>
  <div class="mt-5 columns">
    <MenuDes tipoMenu="Inicio" class="column" />
    <div class="m-5 column">
      <div class="title has-text-primary is-four-fifths">BIENVENIDO A.</div>
      <!-- <div class="title is-3 ">Bienvenido a: </div> -->
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Farmax_LT.svg?alt=media&token=4fa00881-ac50-41d2-be91-be3e5e59256b"
          alt="IDK"
          width="500"
          height=""
          class="m-6"
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