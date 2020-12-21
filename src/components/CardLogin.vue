<template>
  <div class="card">
    <div class="card-header">
      <h1
        class="card-header-title title is-1 has-text-weight-bold has-text-primary"
      >
        BIENVENIDO A FARMAX
      </h1>
    </div>
    <div class="card-content has-text-left">
      Si ya tiene una cuenta inicie sesion
      <section class="has-text-black mt-5">
        <b-field label="Correo electronico">
          <b-input
            placeholder="Ingrese su Email"
            type="email"
            v-model="user.email"
          ></b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input
            password-reveal
            placeholder="Ingrese su contraseña"
            type="password"
            v-model="user.password"
          >
          </b-input>
        </b-field>
      </section>
    </div>
    <div class="card-footer m-2">
      <b-button type="is-primary" expanded> Inicia sesion </b-button>
    </div>
    <div class="has-text-centered m-3">
      Si no tiene una cuenta, haga click
      <a href="/">aqui</a>
    </div>

    <p>
        {{user}}
    </p>
  </div>
</template>

<script>


export default {
  components: {

  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>

<style>
</style>