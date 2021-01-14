import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: {
      tipo: null,
      mensaje: "",
    },
    user: {},
    usuario: {
      id: "",
      email: "",
      rol: "",
      nombre: "",
      apellidos: "",
    },
    usuarios: [],
    proveedor: {
      nombre: "",
      apellidos: "",
      laboratorio: {
        nombre: "",
        numero: "",
        direccion: "",
        id: "",
      },
      numero: 0,
      id: "",
    },
    proveedores: [],
    laboratorio: {
      nombre: "",
      numero: "",
      direccion: "",
      id: "",
    },
    laboratorios: [],
    compra: {
      id: "",
      proveedor: "",
      fecha: new Date(),
      medicamentos: [],
      total: 0,
    },
    compras: [],
    venta: {
      id: "",
      regente: {},
      fecha: new Date(),
      medicamentos: [],
      cliente: {},
      total: 0,
    },
    ventas: [],
    inventario: [],
    medicamentos: [],
    medicamento: {
      id: "",
      nombre: "",
      cantidad: 1,
      precio: 1,
      vencimiento: new Date(),
      lote: "",
    },
    cliente: {
      id: "",
      razon: "",
      nit: "",
    },
    clientes: [],
    local:""
  },
  mutations: {
    setError(state, payload) {
      // RESTART
      if (payload === null) {
        return (state.error = { tipo: null, mensaje: "" });
      }
      // LOGIN
      else if (payload === "EMAIL_NOT_FOUND") {
        return (state.error = {
          tipo: "email",
          mensaje: "Correo electronico no encontrado",
        });
      }

      // LOGIN
      else if (payload === "INVALID_PASSWORD") {
        return (state.error = {
          tipo: "password",
          mensaje: "Contraseña no válida",
        });
      }
      //LOGIN
      else if (payload === "USER_DISABLED") {
        return (state.error = {
          tipo: "password",
          mensaje:
            "La cuenta de usuario ha sido inhabilitada por un administrador",
        });
      } else if (
        payload ===
        "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      ) {
        return (state.error = {
          tipo: "attempts",
          mensaje: "Demasiados intentos de ingreso, intente mas tarde",
        });
      }
      // REGISTER
      else if (payload === "EMAIL_EXISTS") {
        return (state.error = {
          tipo: "email",
          mensaje: "Correo electronico ya registrado",
        });
      }
      // REGISTER
      else if (payload === "INVALID_EMAIL") {
        return (state.error = {
          tipo: "email",
          mensaje: "Formato email no válido",
        });
      } else if (payload === "Auth token is expired") {
        state.user = null;
        router.push("/login");
        localStorage.removeItem("user");

        return (state.error = {
          tipo: "time",
          mensaje: "La sesion a terminado, vuelva a ingresar",
        });
      } else if (payload === "CAMPO_MEDICAMENTO_INCORRECTO") {
        return (state.error = {
          tipo: "field",
          mensaje: "Campo de nombre de medicamento no llenado correctamente",
        });
      }
      //console.log(state.error.message);
    },
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setUsuarios(state, payload) {
      state.usuarios = payload;
    },
    setCompras(state, payload) {
      state.compras = payload;
    },
    eliminarCompra(state, payload) {
      state.compras = state.compras.filter((item) => item.id !== payload);
    },
    getCompra(state, payload) {
      if (!state.compras.find((item) => item.id === payload)) {
        router.push("/compras");

        return;
      }

      state.compra = state.compras.find((item) => item.id === payload);
    },
    setVentas(state, payload) {
      state.ventas = payload;
    },
    eliminarVenta(state, payload) {
      state.ventas = state.ventas.filter((item) => item.id !== payload);
    },
    getVenta(state, payload) {
      if (!state.ventas.find((item) => item.id === payload)) {
        router.push("/ventas");

        return;
      }

      state.compra = state.compras.find((item) => item.id === payload);
    },
    setProveedores(state, payload) {
      state.proveedores = payload;
    },
    eliminarProveedor(state, payload) {
      state.proveedores = state.proveedores.filter(
        (item) => item.id !== payload
      );
    },
    setLaboratorios(state, payload) {
      state.laboratorios = payload;
    },
    eliminarLaboratorio(state, payload) {
      state.laboratorios = state.laboratorios.filter(
        (item) => item.id !== payload
      );
    },
    setMedicamentos(state, payload) {
      state.medicamentos = payload;
    },
    setInventario(state, payload) {
      state.inventario = payload;
    },
    getInventario(state, payload) {
      if (!state.inventario.find((item) => item.id === payload)) {
        router.push("/inventario");

        return;
      }

      state.medicamento = state.inventario.find((item) => item.id === payload);
    },
    setClientes(state, payload) {
      state.clientes = payload;
    },
    eliminarCliente(state, payload) {
      state.clientes = state.clientes.filter((item) => item.id !== payload);
    },
    eliminarCliente(state, payload) {
      state.inventario = state.inventario.filter((item) => item.id !== payload);
    },
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
              returnSecureToken: true,
            }),
          }
        );

        const dataDB = await res.json();
        // console.log(dataDB);

        if (dataDB.error) {
          //console.log(dataDB.error.message);
          return commit("setError", dataDB.error.message);
        }
        commit("setUser", dataDB);
        // console.log(state.user);
        //cargarDatosUsuario();
        //console.log("inicio");
        router.push("/");
      } catch (error) {
        //console.log(error);
      }
    },
    async cargarDatosUsuario({ commit, state }) {
      try {
        console.log("exitos");
        const respuesta = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/usuarios/${state.user.localId}.json?auth=${state.user.idToken}`
        );
        const userDB = await respuesta.json();

        if (userDB.error) {
          //console.log(dataDB);
          return commit("setError", userDB.error);
        }

        // console.log(userDB);
        commit("setUsuario", userDB);

      } catch (error) {
        //console.log(error);
      }
    },
    async cargarUsuarios({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/usuarios.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayUsuarios = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayUsuarios.push(dataDB[id]);
        }
        //console.log(arrayCompras);
        commit("setUsuarios", arrayUsuarios);
      } catch (error) {
        //console.log(error);
      }
    },
    async registroUsuario({ commit,state }, user) {
      //console.log(user);

      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh37mmPaCWQF2osXVXPpWQ02kNz2YWMP0`,
          {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }),
          }
        );

        const userDB = await res.json();
        console.log("NuevoUsuario",userDB);
        if (userDB.error) {
          console.log("NuevoUsuario",userDB);
          return commit("setError", userDB.error.message);
        }
        //state.local = userDB.localId
        commit("setError", null);

        
      } catch (error) {
        //console.log(error);
      }

      

    },
    async guardarUsuario({ commit,state}, user) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }
      //user.id = state.local
      try {
        console.log("Firebase guardar usuario");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/usuarios/${user.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/usuarios");

      } catch (error) {
        //console.log(error);
      }
    },
    cerrarSesion({ commit }) {
      commit("setUser", null);
      router.push("/login");
      localStorage.removeItem("user");
    },
    setError({ commit }, error) {
      if (error.tipo !== null && error.mensaje !== "") {
        commit("setError");
      }
    },
    verificarDatosAlmacenados({ commit, state }) {
      if (localStorage.getItem("user")) {
        // //console.log("local",localStorage.getItem("user"));
        commit("setUser", JSON.parse(localStorage.getItem("user")));
        router.push("/");
      } else {
        commit("setUser", null);
      }
    },
    async cargarCompras({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/compras.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayCompras = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayCompras.push(dataDB[id]);
        }
        //console.log(arrayCompras);
        commit("setCompras", arrayCompras);
      } catch (error) {
        //console.log(error);
      }
    },
    async guardarCompra({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase compra");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/compras/${state.compra.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(state.compra),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/compras");
        location.reload();
      } catch (error) {
        //console.log(error);
      }
    },
    async editarCompra({ commit, state }) {},
    async eliminarCompra({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/compras/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarCompra", id);
      } catch (error) {
        //console.log(error);
      }
    },
    getCompra({ commit }, id) {
      commit("getCompra", id);
    },
    async cargarVentas({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/ventas.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayVentas = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayVentas.push(dataDB[id]);
        }
        //console.log(arrayCompras);
        commit("setVentas", arrayVentas);
      } catch (error) {
        //console.log(error);
      }
    },
    async guardarVenta({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase compra");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/ventas/${state.venta.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(state.venta),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/ventas");
        location.reload();
      } catch (error) {
        //console.log(error);
      }
    },
    async editarVenta({ commit, state }) {},
    async eliminarVenta({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/ventas/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarVenta", id);
      } catch (error) {
        //console.log(error);
      }
    },
    getVenta({ commit }, id) {
      commit("getVenta", id);
    },

    añadirMedicamentoLista({ commit, state }) {
      state.medicamentos.push(state.medicamento);
      state.medicamento = {
        id: "",
        nombre: "",
        cantidad: 1,
        precio: 1,
        vencimiento: new Date(),
        lote: "",
      };
    },
    actualizarMedicamentoLista({ commit, state }, checkedRows) {
      //console.log("entro");
      commit(
        "setMedicamentos",

        state.medicamentos.filter(function(e) {
          return this.indexOf(e) < 0;
        }, checkedRows)
      );
    },

    async cargarProveedores({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/proveedor.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayProveedores = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayProveedores.push(dataDB[id]);
        }
        //console.log(arrayProveedores);
        commit("setProveedores", arrayProveedores);
      } catch (error) {
        //console.log(error);
      }
    },
    async eliminarProveedor({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/proveedor/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarProveedor", id);
      } catch (error) {
        //console.log(error);
      }
    },
    async guardarProveedor({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase compra");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/proveedor/${state.proveedor.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(state.proveedor),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/proveedores");
        location.reload();
      } catch (error) {
        //console.log(error);
      }
    },
    async cargarLaboratorios({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/laboratorios.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayLaboratorios = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayLaboratorios.push(dataDB[id]);
        }
        //console.log(arrayLaboratorios);
        commit("setLaboratorios", arrayLaboratorios);
      } catch (error) {
        //console.log(error);
      }
    },
    async eliminarLaboratorio({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/laboratorios/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarLaboratorio", id);
      } catch (error) {
        //console.log(error);
      }
    },
    async guardarLaboratorio({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase compra");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/laboratorios/${state.laboratorio.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(state.laboratorio),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/laboratorios");
        location.reload();
      } catch (error) {
        //console.log(error);
      }
    },
    async cargarInventario({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/inventario.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayInventario = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayInventario.push(dataDB[id]);
        }
        //console.log(arrayInventario);
        commit("setInventario", arrayInventario);
      } catch (error) {
        //console.log(error);
      }
    },
    async guardarMedicamentoInventario({ commit, state }, medicamento) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase inventario");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/inventario/${medicamento.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(medicamento),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
      } catch (error) {
        //console.log(error);
      }
    },
    async editarMedicamentoInventario({ commit, state }, medicamento) {
      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/inventario/${medicamento.id}.json?auth=${state.user.idToken}`,
          {
            method: "PATCH",
            body: JSON.stringify(medicamento),
          }
        );

        const dataDB = await res.json();
        location.reload();
        //console.log(dataDB);
        // commit("actualizarInventario", dataDB);
        
      } catch (error) {
        //console.log(error);
      }
    },
    async eliminarMedicamentoInventario({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/inventario/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarMedicamento", id);
      } catch (error) {
        //console.log(error);
      }
    },
    getInventario({ commit }, id) {
      commit("getInventario", id);
    },
    async guardarCliente({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        //console.log("Firebase compra");
        //console.log(state.compra);
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/clientes/${state.cliente.id}.json?auth=${state.user.idToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(state.cliente),
          }
        );

        const dataDB = await res.json();
        //console.log(dataDB);

        // commit("setCompra", dataDB);
        router.push("/clientes");
        location.reload();
      } catch (error) {
        //console.log(error);
      }
    },
    async cargarClientes({ commit, state }) {
      if (localStorage.getItem("user")) {
        commit("setUser", JSON.parse(localStorage.getItem("user")));
      } else {
        return commit("setUser", null);
      }

      try {
        const res = await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/clientes.json?auth=${state.user.idToken}`
        );
        const dataDB = await res.json();
        const arrayClientes = [];

        if (dataDB.error) {
          //console.log(dataDB);
          return commit("setError", dataDB.error);
        }

        for (let id in dataDB) {
          //console.log(id);
          //console.log(dataDB[id]);
          arrayClientes.push(dataDB[id]);
        }
        //console.log(arrayInventario);
        commit("setClientes", arrayClientes);
      } catch (error) {
        //console.log(error);
      }
    },
    async eliminarCliente({ commit, state }, id) {
      try {
        await fetch(
          `https://farmaxip-default-rtdb.firebaseio.com/clientes/${id}.json?auth=${state.user.idToken}`,
          {
            method: "DELETE",
          }
        );

        commit("eliminarCliente", id);
      } catch (error) {
        //console.log(error);
      }
    },
  },
  modules: {},
  getters: {
    usuarioAutenticado(state) {
      try {
        if (state.user.registered) {
          return state.user.registered;
        } else {
          return false;
        }
      } catch (error) {
        //console.log("dad");
        return false;
      }
    },
    calcularTotalCompras(state) {
      const totales = state.medicamentos.map((med) => {
        return med.cantidad * med.precio;
      });
      let suma = 0;
      totales.forEach((element) => {
        suma += element;
      });

      return suma;
    },
  },
});
