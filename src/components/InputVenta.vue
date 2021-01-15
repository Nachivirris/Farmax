<template>
  <div>
    Aqui puede crear una venta
    <div class="columns">
      <div class="column is-one-third">
        <b-field class="" label="¿Qué fecha y hora es?">
          <b-datetimepicker
            v-model="datetime"
            placeholder="Haga click para elegir la fecha..."
          >
            <template slot="left">
              <button class="button is-primary" @click="datetime = new Date()">
                <b-icon icon="clock"></b-icon>
                <span>Ahora</span>
              </button>
            </template>
            <template slot="right">
              <button class="button is-danger" @click="datetime = null">
                <b-icon icon="close"></b-icon>
                <span>Borrar</span>
              </button>
            </template>
          </b-datetimepicker>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Busque un Nit">
          <b-input v-model="clienteNuevo.nit"> </b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Razon Social">
          <b-input
            type="text"
            :value="buscarNit"
            v-model="clienteNuevo.razon"
          ></b-input>
        </b-field>
      </div>
    </div>
    {{ clienteNuevo }}
    <div>
      <b-field label="Busque un Medicamento">
        <b-autocomplete
          class="my-3"
          rounded
          v-model="auto"
          placeholder="Ej. Nombre Medicamento"
          keep-first
          :open-on-focus="true"
          :data="medicamentosFiltrados"
          field="nombre"
          @select="(option) => (medicamentoSeleccionado = option)"
        >
        </b-autocomplete>
      </b-field>
      <div class="columns">
        <b-field class="column" label="Stock Actual">
          <div class="">
            {{
              medicamentoSeleccionado !== null
                ? medicamentoSeleccionado.cantidad
                : "-"
            }}
            {{ " unidad" }}
          </div>
        </b-field>
        <b-field class="column" label="Cantidad a vender">
          <b-numberinput
            min="1"
            :max="
              medicamentoSeleccionado !== null
                ? medicamentoSeleccionado.cantidad
                : 0
            "
            v-model.number="cantidadDisminuida"
          ></b-numberinput>
        </b-field>
        <b-field class="column" label="Stock Nuevo">
          <div class="">
            {{
              medicamentoSeleccionado !== null
                ? medicamentoSeleccionado.cantidad - cantidadDisminuida
                : "-"
            }}
            {{ " unidad" }}
          </div>
        </b-field>

        <b-field class="column" label="Precio">
          <div class="">
            {{
              medicamentoSeleccionado !== null
                ? medicamentoSeleccionado.precio
                : "-"
            }}
            {{ " Bs" }}
          </div>
        </b-field>
      </div>
      <b-button
        class="mt-3"
        icon-right="check"
        type="is-primary"
        expanded
        @click="enviarMedicamentoLista"
        :disabled="verificarCamposMedicamentos"
      >
        Guardar Medicamento
      </b-button>

      <TablaMedicamentosVenta cliente="clienteSeleccionado" />

      <b-button type="is-success" expanded @click="enviarVenta"
        >Enviar Venta</b-button
      >
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import TablaMedicamentosVenta from "../components/TablaMedicamentosVenta";
export default {
  components: {
    TablaMedicamentosVenta,
  },
  data() {
    return {
      autonit: "",
      auto: "",
      datetime: new Date(),
      clienteNuevo: {
        id: "",
        razon: "",
        nit: "",
      },
      medicamentoSeleccionado: {
        id: "",
        nombre: "",
        cantidad: 0,
        precio: 1,
        vencimiento: new Date(),
        lote: "",
      },
      cantidadDisminuida: 1,
      error: "ff",
    };
  },
  methods: {
    ...mapActions([
      "cargarClientes",
      "cargarInventario",
      "añadirMedicamentoLista",
      "guardarVenta",
      "editarMedicamentoInventario",
      "reset","guardarCliente"
    ]),
    enviarMedicamentoLista() {
      this.medicamento.cantidad = this.cantidadDisminuida;
      this.medicamento.id = this.medicamentoSeleccionado.id;
      this.medicamento.precio = this.medicamentoSeleccionado.precio;
      this.medicamento.nombre = this.medicamentoSeleccionado.nombre;
      this.medicamento.vencimiento = this.medicamentoSeleccionado.vencimiento;
      this.medicamento.lote = this.medicamentoSeleccionado.lote;
      this.añadirMedicamentoLista(this.medicamento);
      this.medicamentoSeleccionado = null;
      this.auto = "";
    },
    enviarVenta() {
      const shortid = require("shortid");
      if (
        this.clienteNuevo !== null &&
        this.medicamentos !== null &&
        this.medicamentos.length > 0 &&
        this.clienteNuevo.nit !== "" &&
        this.validarTexto(this.clienteNuevo.nit, false) &&
        this.validarTexto(this.clienteNuevo.razon, true) &&
        this.clienteNuevo.razon.trim() !== ""
      ) {
        if (this.clienteNuevo.id === "") {
          this.clienteNuevo.id = shortid.generate();
          this.venta.cliente = this.clienteNuevo;
          this.venta.fecha = this.datetime;
          this.venta.medicamentos = this.medicamentos;
          this.venta.total = this.calcularTotalCompras;
          this.venta.id = shortid.generate();
          this.venta.regente = this.usuario;
          this.guardarVenta();
          this.guardarCliente();
        }else{
          this.clienteNuevo.id = shortid.generate();
          this.venta.cliente = this.clienteNuevo;
          this.venta.fecha = this.datetime;
          this.venta.medicamentos = this.medicamentos;
          this.venta.total = this.calcularTotalCompras;
          this.venta.id = shortid.generate();
          this.venta.regente = this.usuario;
          this.guardarVenta();
        }

        console.log(this.venta);
        //   this.guardarCompra(this.venta);

        this.enviarMedicamento();
        // this.medicamentos.splice(0, this.medicamentos.length);
      } else {
        this.alertCustom("Error al enviar la Venta");
      }
    },
    enviarMedicamento() {
      let nuevaCantidad = 0;
      this.medicamentos.forEach((med) => {
        if (this.inventario.find((item) => item.id === med.id)) {
          this.inventario.forEach((i) => {
            if (i.id == med.id) {
              nuevaCantidad = i.cantidad;
            }
          });

          med.cantidad = nuevaCantidad - med.cantidad;
          this.editarMedicamentoInventario(med);
        } else {
          // console.log("Error");
        }
      });
    },
    alertCustom(mensaje) {
      this.$buefy.dialog.alert({
        title: "Error",
        message: mensaje,
        type: "is-danger",
        hasIcon: true,
        icon: "times-circle",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true,
      });
    },
    validarTexto(texto, espaciado) {
      if (espaciado) {
        const re = /^[A-Za-z0-9 &]+$/;
        return re.test(String(texto).toLowerCase());
      } else {
        const re = /^[A-Za-z0-9]+$/;
        return re.test(String(texto).toLowerCase());
      }
    },
  },
  computed: {
    ...mapState([
      "clientes",
      "cliente",
      "inventario",
      "medicamentos",
      "medicamento",
      "venta",
      "usuario",
    ]),
    ...mapGetters(["calcularTotalCompras"]),
    clientesFiltrados() {
      return this.clientes.filter((option) => {
        return (
          option.nit
            .toString()
            .toLowerCase()
            .indexOf(this.cliente.nit.toLowerCase()) >= 0
          // console.log(option.razon, this.cliente.razon)
        );
      });
    },
    medicamentosFiltrados() {
      return this.inventario.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.auto.toLowerCase()) >= 0
        );
      });
    },
    verificarCamposMedicamentos() {
      if (
        this.medicamentoSeleccionado !== null &&
        this.medicamentoSeleccionado.nombre !== ""
      ) {
        if (this.cantidadDisminuida >= 1) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    buscarNit() {
      let razon = "";
      let id = "";
      this.clientes.forEach((element) => {
        if (element.nit === this.clienteNuevo.nit) {
          console.log("si coincide");
          razon = element.razon;
          id = element.id;
        }

        this.clienteNuevo.razon = razon;
        this.clienteNuevo.id = id;
      });
    },
  },
  created() {
    this.cargarClientes();
    this.cargarInventario();
  },
  destroyed () {
    this.medicamentos.splice(0, this.medicamentos.length);
  },
};
</script>


       