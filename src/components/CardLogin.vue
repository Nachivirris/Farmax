<template>
  <div class="card">
    <div class="card-header mx-auto">
      <h1 class="card-header-title is-size-1-mobile has-text-primary">
        BIENVENIDO A

        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/Farmax_LT.svg?alt=media&token=4fa00881-ac50-41d2-be91-be3e5e59256b"
          alt="IDK"
          width="200"
          height=""
          class="m-4"
        />
      </h1>
    </div>
    <div class="card-content columns">
      <div class="has-text-left column">
        Si ya tiene una cuenta inicie sesion
        <b-notification v-if="error.tipo !== null " type="is-danger" has-icon role="alert">
          {{ error.mensaje}}
        </b-notification>
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
        <div class="card-footer mt-4">
          <b-button
            type="is-primary"
            :disabled="validarCampos"
            expanded
            @click="iniciarSesion(user)"
          >
            Inicia sesion
          </b-button>
        </div>

        
      </div>
      <div class="column">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/undraw_Login_re_4vu2.svg?alt=media&token=f2309965-349a-4049-a411-c7f3277bdd72"
          alt=""
        />
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["iniciarSesion"]),
    validarEmail(email) {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
  },
  computed: {
    ...mapState(["error"]),
    validarCampos() {
      try {
        if (
          this.user.email !== "" &&
          this.validarEmail(this.user.email) &&
          this.user.password !== "" &&
          this.user.password.length > 5
        ) {
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
  created() {},
};
</script>

<style>
</style>