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
          <b-autocomplete
            rounded
            v-model="cliente.nit"
            :data="clientesFiltrados"
            placeholder="Ej. Numero de Carnet"
            icon="magnify"
            :open-on-focus="true"
            clearable
            field="nit"
            @select="(option) => (clienteNuevo = option)"
          >
            <template slot="empty">No se encontraron clientes </template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Razon Social">
          <b-input type="text" v-model="clienteNuevo.razon"></b-input>
        </b-field>

      </div>
    </div>
    <div>
      <b-field label="Busque un Medicamento">
        <b-autocomplete
          class="my-3"
          rounded
          v-model="medicamentoSeleccionado.nombre"
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
            {{ medicamentoSeleccionado.cantidad }} {{ " unidad" }}
          </div>
        </b-field>
        <b-field class="column" label="Cantidad a vender">
          <b-numberinput
            min="1"
            :max="medicamentoSeleccionado.cantidad"
            v-model.number="cantidadDisminuida"
          ></b-numberinput>
        </b-field>
        <b-field class="column" label="Stock Nuevo">
          <div class="">
            {{ medicamentoSeleccionado.cantidad - cantidadDisminuida }}
            {{ " unidad" }}
          </div>
        </b-field>

        <b-field class="column" label="Precio">
          <div class="">{{ medicamentoSeleccionado.precio }} {{ " Bs" }}</div>
        </b-field>
      </div>
      <b-button
        class="mt-3"
        icon-right="check"
        type="is-primary"
        expanded
        @click="enviarMedicamentoLista"
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
      datetime: new Date(),
      clienteNuevo: "",
      medicamentoSeleccionado: {
        id: "",
        nombre: "",
        cantidad: 0,
        precio: 1,
        vencimiento: new Date(),
        lote: "",
      },
      cantidadDisminuida: 1,
    };
  },
  methods: {
    ...mapActions([
      "cargarClientes",
      "cargarInventario",
      "añadirMedicamentoLista",
      "guardarVenta",
      "editarMedicamentoInventario",
    ]),
    enviarMedicamentoLista() {
      this.medicamento.cantidad = this.cantidadDisminuida;
      this.medicamento.id = this.medicamentoSeleccionado.id;
      this.medicamento.precio = this.medicamentoSeleccionado.precio;
      this.medicamento.nombre = this.medicamentoSeleccionado.nombre;
      this.medicamento.vencimiento = this.medicamentoSeleccionado.vencimiento;
      this.medicamento.lote = this.medicamentoSeleccionado.lote;
      this.añadirMedicamentoLista(this.medicamento);
    },
    enviarVenta() {
      const shortid = require("shortid");

      this.venta.cliente = this.clienteNuevo;
      this.venta.fecha = this.datetime;
      this.venta.medicamentos = this.medicamentos;
      this.venta.total = this.calcularTotalCompras;
      this.venta.id = shortid.generate();
      this.venta.regente = this.usuario;
      //   this.guardarCompra(this.venta);

      this.guardarVenta();
      this.enviarMedicamento();
      // this.medicamentos.splice(0, this.medicamentos.length);
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
            .indexOf(this.medicamento.nombre.toLowerCase()) >= 0
        );
      });
    },
  },
  created() {
    this.cargarClientes();
    this.cargarInventario();
  },
};
</script>


       