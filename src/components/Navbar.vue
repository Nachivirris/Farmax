<template>
  <b-navbar type="" shadow fixed-top class="">
    <template slot="start">
      <!-- <img
        src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Recurso%208.svg?alt=media&token=105cee08-33c0-4a6e-88b6-4f8904897816"
        alt="IDK"
        width="150"
        height=""
        class="m-3"
      /> -->
      <div class="mt-2 ml-4 is-primary">
        <h1 class="title is-4 mt-1 mr-4">Farmacia Final Los Andes</h1>
      </div>
      <b-navbar-item href="/"> Inicio </b-navbar-item>
      <b-navbar-dropdown label="Informacion">
        <b-navbar-item href="/"> Acerca de </b-navbar-item>
        <b-navbar-item href="/"> Contacto </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Registrarse</strong>
          </a>
          <a class="button is-primary is-light"> Iniciar Sesion </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style>
</style>