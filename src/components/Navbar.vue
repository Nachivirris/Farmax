<template>
  <b-navbar type="" shadow fixed-top class="">
    <template slot="start">
      <router-link to="/inicio">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Recurso_13.png?alt=media&token=13e6af75-a20b-449b-b986-6fbad6684f4e"
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
          <div class="m-3" v-if="usuarioAutenticado">
            <div class="title is-5">
              {{ "Usuario: " }}
            </div>
            {{ usuario.nombre }}
          </div>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
    ...mapState(["usuario"]),
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>

<style>
</style>