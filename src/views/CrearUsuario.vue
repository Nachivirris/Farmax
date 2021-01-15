<template>
  <div class="columns">
    <MenuDes tipoMenu="Usuarios" class="column" />
    <div class="m-5 column">
      <b-button
        tag="router-link"
        to="/usuarios"
        class="my-3"
        type="is-primary"
        icon-left="arrow-left"
        >Usuarios</b-button
      >
      <div class="title is-1 has-text-primary is-four-fifths">
        Crear Usuario.
      </div>

      <div class="columns">
        <div class="column">
          <section>
            <b-field label="Nombre ">
              <b-input
                v-model="usuario.nombre"
                placeholder="Nombre del usuario"
              ></b-input>
            </b-field>
            <b-field label="Apellidos ">
              <b-input
                v-model="usuario.apellidos"
                placeholder="Apellidos del usuario"
              ></b-input>
            </b-field>
            <b-field label="Contraseña">
              <b-input
                type="password"
                v-model="usuario.password"
                password-reveal
              >
              </b-input>
            </b-field>
          </section>
        </div>
        <div class="column">
          <section>
            <b-field label="Email">
              <b-input type="email" v-model="usuario.email" maxlength="30">
              </b-input>
            </b-field>
            <b-field label="Rol">
              <b-select placeholder="Seleccione un rol" v-model="usuario.rol">
                <option value="admin">Administrador</option>
                <option value="empleado">Empleado</option>
              </b-select>
            </b-field>
          </section>
        </div>
      </div>

      <b-button
        icon-left="arrow-right"
        type="is-success"
        expanded
        :disabled="verificarCampos"
        @click="enviarUsuario"
        >Guardar Usuario</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MenuDes from "../components/MenuDes";

export default {
  data() {
    return {
      usuario: {
        id: "",
        email: "",
        rol: "",
        nombre: "",
        apellidos: "",
        password: "",
      },
    };
  },
  components: {
    MenuDes,
  },
  methods: {
    ...mapActions(["registroUsuario", "guardarUsuario"]),
    enviarUsuario() {
      const shortid = require("shortid");
      this.usuario.id = shortid.generate();
      this.registroUsuario(this.usuario);
      this.usuario.password = "";
      this.guardarUsuario(this.usuario);
    },
    validarEmail(email) {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
  },
  computed: {
    verificarCampos() {
      if (
        this.usuario.nombre.trim() !== "" &&
        this.usuario.apellidos.trim() !== "" &&
        this.usuario.email.trim() !== null &&
        this.validarEmail(this.usuario.email) && 
        this.usuario.rol !== ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {},
};
</script>

<style>
</style>