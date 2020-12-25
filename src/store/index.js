import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: {
      type: null,
      message: ""
    },
    user: {
      email: "",
      password: "",
      role: "",
      nombre: "",
      apellidos: ""
    }
  },
  mutations: {
    setError(state, payload) {
      // RESTART
      if (payload === null) {
        return (state.error = { tipo: null, mensaje: "" });
      }
      // LOGIN
      if (payload === "EMAIL_NOT_FOUND") {
        return (state.error = {
          type: "email",
          message: "Correo electronico no encontrado"
        });
      }

      // LOGIN
      if (payload === "INVALID_PASSWORD") {
        return (state.error = {
          tipo: "password",
          mensaje: "Contraseña no válida"
        });
      }
      //LOGIN
      if (payload === "USER_DISABLED") {
        return (state.error = {
          tipo: "password",
          mensaje:
            "La cuenta de usuario ha sido inhabilitada por un administrador"
        });
      }
      if (
        payload ===
        "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      ) {
        return (state.error = {
          tipo: "attempts",
          mensaje: "Demasiados intentos de ingreso, intente mas tarde"
        });
      }
      // REGISTER
      if (payload === "EMAIL_EXISTS") {
        return (state.error = {
          tipo: "email",
          mensaje: "Correo electronico ya registrado"
        });
      }
      // REGISTER
      if (payload === "INVALID_EMAIL") {
        return (state.error = {
          tipo: "email",
          mensaje: "Formato email no válido"
        });
      }

      console.log(state.error.message);
    },
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    }
  },
  actions: {
    async iniciarSesion({ commit }, user) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh37mmPaCWQF2osXVXPpWQ02kNz2YWMP0",
          {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true
            })
          }
        );

        const dataDB = await res.json();

        console.log(dataDB);

        if (dataDB.error) {
          console.log(dataDB.error.message);
          commit("setError", dataDB.error.message);
        }
        commit("setUser", user);
        router.push("/menu");
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {}
});
