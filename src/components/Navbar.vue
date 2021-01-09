<template>
  <b-navbar type="" shadow fixed-top class="">
    <template slot="start">
      <router-link to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Farmax_LT.svg?alt=media&token=4fa00881-ac50-41d2-be91-be3e5e59256b"
          alt="IDK"
          width="100"
          height=""
          class="m-4"
        />
      </router-link>
      <!-- <div class="mt-2 ml-4 is-primary">
        <h1 class="title is-4 mt-1 mr-4">Farmacia Final Los Andes</h1>
      </div> -->
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          
          <!-- <a class="button is-primary is-light"> Iniciar Sesion </a> -->
          <router-link to="/login">
            <b-button type="is-primary is-light" v-if="!usuarioAutenticado">
              <strong> Iniciar Sesion </strong>
            </b-button>
          </router-link>

          <b-button
            type="is-danger"
            v-if="usuarioAutenticado"
            @click="cerrarSesion"
            >Cerrar sesion</b-button
          >
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>

<style>
</style>