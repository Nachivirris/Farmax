<template>
  <div>
    Aqui puede crear una compra
    <div class="columns">
      <div class="column is-one-third">
        <b-field class="" label="¿Qué fecha y hora es?">
          <b-datetimepicker
            v-model="datetime"
            placeholder="Haga click para elegir la fecha..."
            :inline="!etapa1"
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
      <div class="column mt-3">
        <b-switch
          v-if="!etapa1"
          :disabled="proveedor.nombre !== '' ? true : false"
          v-model="nuevoProveedor"
        >
          Es un nuevo proveedor?
        </b-switch>
        <!-- NUEVO PROVEEDOR -->
        <div v-if="nuevoProveedor">
          <b-field label="Nombre">
            <b-input v-model="proveedor.nombre"></b-input>
          </b-field>
          <b-field label="Apellidos">
            <b-input v-model="proveedor.apellidos"></b-input>
          </b-field>
          <b-field label="Busque el Laboratorio">
            <div>
              Si no encuentra el Laboratorio y quiere crear uno, haga click
              <router-link to="/laboratorios/crear">aqui</router-link>
              <div>
                <b-autocomplete
                  rounded
                  v-model="proveedor.laboratorio"
                  :data="laboratoriosFiltrados"
                  placeholder="Ej. Nombre Laboratorio"
                  icon="magnify"
                  clearable
                  @select="(option) => (selected = option)"
                >
                  <template slot="empty"
                    >No se encontraron laboratorios
                  </template>
                </b-autocomplete>
              </div>
            </div>
          </b-field>
          <b-field label="Numero">
            <b-input v-model.number="proveedor.numero"></b-input>
          </b-field>

          {{ proveedor }}
        </div>
        <!-- PROVEEDOR EXISTENTE -->
        <div v-if="!nuevoProveedor">
          <section>
            <p  v-if="proveedorSeleccionado.nombre !==''"  class="content">
              <b> Proveedor: </b>
              {{
                proveedorSeleccionado.nombre +
                " " +
                proveedorSeleccionado.apellidos +
                " - " +
                proveedorSeleccionado.laboratorio.nombre
              }}
            </p>

            <b-field v-if="!etapa1" label="Busque un proveedor">
              <b-autocomplete
                rounded
                v-model="proveedor.nombre"
                placeholder="Ej. Nombre Apellido"
                :open-on-focus="true"
                :data="proveedoresFiltrados"
                field="nombre"
                clearable
                @select="(option) => (proveedorSeleccionado = option)"
              >
              </b-autocomplete>
            </b-field>
          </section>
        </div>
      </div>
    </div>

    <b-button
      v-if="!etapa1"
      @click="verificarFechaProveedor"
      type="is-primary"
      expanded
    >
      Siguiente paso
    </b-button>
    <b-button
      v-if="etapa1"
      @click="etapa1 = !etapa1"
      type="is-primary"
      :expanded="!etapa1"
      icon-left="arrow-left"
    >
      Volver
    </b-button>

    <div class="mt-3" v-if="etapa1">
      Añadir medicamento
      <br />

      <b-checkbox v-model="medicamentoNuevo">
        Es un medicamento nuevo?
      </b-checkbox>

      <!-- Medicamento Nuevo -->
      <div v-if="medicamentoNuevo" class="columns">
        <div class="column">
          <b-field label="Nombre del Medicamento">
            <b-input v-model="medicamento.nombre"></b-input>
          </b-field>
          <div class="columns">
            <b-field class="column" label="Cantidad">
              <b-numberinput
                min="1"
                v-model.number="medicamento.cantidad"
              ></b-numberinput>
            </b-field>
            <b-field class="column" label="Precio unitario">
              <b-numberinput
                step="0.5"
                min-step="0.1"
                min="0.1"
                v-model.number="medicamento.precio"
              ></b-numberinput>
            </b-field>
            <b-field class="column" label="Precio total">
              <div class="m-4">
                {{ medicamento.precio * medicamento.cantidad }} {{ " Bs" }}
              </div>
            </b-field>
          </div>
        </div>
        <div class="column">
          <b-field class="" label="Vencimiento del medicamento">
            <b-datepicker
              v-model="medicamento.vencimiento"
              placeholder="Haga click para elegir la fecha..."
            >
              <template slot="right">
                <button
                  class="button is-danger"
                  @click="medicamento.vencimiento = null"
                >
                  <b-icon icon="close"></b-icon>
                  <span>Borrar</span>
                </button>
              </template>
            </b-datepicker>
          </b-field>

          <b-field label="Numero de Lote">
            <b-input v-model="medicamento.lote"></b-input>
          </b-field>
        </div>
      </div>
      <!-- Medicamento Existente -->
      <div v-if="!medicamentoNuevo">
        <b-field label="Busque un Medicamento">
          <b-autocomplete
            class="my-3"
            rounded
            v-model="medicamentoSeleccionado.nombre"
            placeholder="Ej. Nombre medicamento"
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
          <b-field class="column" label="Cantidad a añadir">
            <b-numberinput
              min="1"
              v-model.number="cantidadAñadida"
            ></b-numberinput>
          </b-field>
          <b-field class="column" label="Stock Nuevo">
            <div class="">
              {{ medicamentoSeleccionado.cantidad + cantidadAñadida }}
              {{ " unidad" }}
            </div>
          </b-field>
          <b-field class="column" label="Precio Actual">
            <div class="">{{ medicamentoSeleccionado.precio }} {{ " Bs" }}</div>
          </b-field>
          <b-field class="column" label="Precio Nuevo">
            <b-input
              type="number"
              min="0"
              step="0.1"
              v-model.number="precioNuevo"
            >
            </b-input>
          </b-field>
        </div>
      </div>

      <b-button
        class="mt-3"
        :disabled="!verificarCamposMedicamentos"
        icon-right="check"
        type="is-primary"
        expanded
        @click="enviarMedicamentoLista"
      >
        Guardar Medicamento
      </b-button>

      <TablaMedicamentosCompra />

      <b-button type="is-success" expanded @click="enviarCompra"
        >Enviar</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import TablaMedicamentosCompra from "../components/TablaMedicamentosCompra";
export default {
  components: {
    TablaMedicamentosCompra,
  },
  data() {
    return {
      precioNuevo: 0,
      cantidadAñadida: 0,
      medicamentoNuevo: false,
      medicamentoSeleccionado: {
        id: "",
        nombre: "",
        cantidad: 0,
        precio: 1,
        vencimiento: new Date(),
        lote: "",
      },
      etapa1: false,
      datetime: new Date(),
      nuevoProveedor: false,
      proveedorSeleccionado: {
        nombre: "",
        apellidos: "",
        laboratorio: "",
        numero: 71234567,
      },
      proveedor: {
        nombre: "",
        apellidos: "",
        laboratorio: "",
        numero: 77777777,
      },
    };
  },
  methods: {
    ...mapActions([
      "cargarProveedores",
      "cargarLaboratorios",
      "añadirMedicamentoLista",
      "cargarInventario",
      "guardarCompra",
      "guardarMedicamentoInventario",
      "editarMedicamentoInventario",
    ]),
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
    verificarFechaProveedor() {
      if (this.nuevoProveedor !== null) {
        if (this.datetime !== null && this.proveedor !== null) {
          if (this.proveedor.nombre.trim() !== "") {
            this.etapa1 = true;
          } else {
            this.alertCustom("Proveedor no valido");
          }
        } else {
          this.alertCustom("Proveedor no valido");
        }
      } else if (this.proveedorSeleccionado !== null) {
        if (this.datetime !== null && this.proveedorSeleccionado !== null) {
          if (
            this.proveedorSeleccionado.nombre.trim() !== "" &&
            this.proveedorSeleccionado.apellidos.trim() !== "" &&
            this.proveedorSeleccionado.laboratorio.trim() !== ""
          ) {
            this.etapa1 = true;
          } else {
            this.alertCustom("Proveedor no valido");
          }
        } else {
          this.alertCustom("Proveedor no valido");
        }
      } else {
        //console.log("Ok");
      }
    },
    enviarMedicamentoLista() {
      const shortid = require("shortid");
      //Medicamento Nuevo
      if (this.medicamento.nombre !== "" && this.medicamentoNuevo) {
        this.medicamento.id = shortid.generate();
        this.añadirMedicamentoLista();
      } // medicamento Existente
      else if (
        this.medicamentoSeleccionado.nombre !== "" &&
        this.medicamentoNuevo === false
      ) {
        this.medicamento.id = this.medicamentoSeleccionado.id;
        this.medicamento.nombre = this.medicamentoSeleccionado.nombre;
        this.medicamento.cantidad = this.cantidadAñadida;
        this.medicamento.precio =
          this.precioNuevo === 0
            ? this.medicamentoSeleccionado.precio
            : this.precioNuevo;
        this.medicamento.vencimiento = this.medicamentoSeleccionado.vencimiento;
        this.medicamento.lote = this.medicamentoSeleccionado.lote;
        this.añadirMedicamentoLista();
        // this.medicamentoSeleccionado = {
        //   id: "",
        //   nombre: "",
        //   cantidad: 0,
        //   precio: 1,
        //   vencimiento: new Date(),
        //   lote: "",
        // };

        // this.medicamentoSeleccionado.nombre = ""
        // this.medicamentoSeleccionado.cantidad = 0
        // this.medicamentoSeleccionado.precio = 0
        this.precioNuevo = 0;
        this.cantidadAñadida = 1;
      }
    },
    enviarCompra() {
      const shortid = require("shortid");


      this.compra.proveedor = this.nuevoProveedor
        ? this.proveedor
        : this.proveedorSeleccionado;
      this.compra.fecha = this.datetime;
      this.compra.medicamentos = this.medicamentos;
      this.compra.total = this.calcularTotalCompras;
      this.compra.id = shortid.generate();
      this.guardarCompra(this.compra);
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

          med.cantidad = med.cantidad + nuevaCantidad;
          this.editarMedicamentoInventario(med);
        } else {
          this.guardarMedicamentoInventario(med);
        }
      });
    },
  },
  computed: {
    ...mapState([
      "proveedores",
      "laboratorios",
      "medicamento",
      "medicamentos",
      "inventario",
      "compra",
    ]),
    ...mapGetters(["calcularTotalCompras"]),
    laboratoriosFiltrados() {
      const nombresLaboratorios = this.laboratorios.map(function (lab) {
        return lab.nombre;
      });

      return nombresLaboratorios.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.proveedor.laboratorio.toLowerCase()) >= 0
        );
      });
    },
    proveedoresFiltrados() {
      return this.proveedores.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.proveedor.nombre.toLowerCase()) >= 0
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
    verificarCamposMedicamentos() {
      // if (this.medicamento === null || this.medicamentoSeleccionado === null) {
      //   return false;
      // }
      // else if (this.cantidadAñadida === 0 || this.precioNuevo === 0) {
      //   return true;
      // }
      // else if(this.medicamento.nombre === "" || this.medicamentoSeleccionado.nombre === ""){
      //   return true
      // }
      // else if (
      //   this.medicamento.nombre.trim() !== "" &&
      //   this.medicamento.cantidad > 0 &&
      //   this.medicamento.precio > 0 &&
      //   this.medicamento.lote.trim() !== "" &&
      //   this.medicamento.vencimiento > new Date()
      // ) {
      //   return true;
      // } else if (this.medicamentoSeleccionado.nombre !== "") {
      //   return true;
      // } else {
      //   return false;
      // }
      return true;
    },
  },
  created() {
    this.cargarProveedores();
    this.cargarLaboratorios();
    this.cargarInventario();
  },
};
</script>

