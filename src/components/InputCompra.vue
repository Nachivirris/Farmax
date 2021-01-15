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
      <div class="column">
        <b-switch
          v-if="!etapa1"
          :disabled="proveedor.nombre !== '' ? true : false"
          v-model="nuevoProveedor"
        >
          Es un nuevo proveedor?
        </b-switch>
        <!-- NUEVO PROVEEDOR -->
        <div v-if="nuevoProveedor" :class="etapa1 ? 'columns' : ''">
          <b-field label="Nombre" :class="etapa1 ? 'column' : ''">
            <b-input v-model="proveedor.nombre"></b-input>
          </b-field>
          <b-field label="Apellidos" :class="etapa1 ? 'column' : ''">
            <b-input v-model="proveedor.apellidos"></b-input>
          </b-field>
          <b-field v-if="!etapa1" label="Busque el Laboratorio">
            <div>
              Si no encuentra el Laboratorio y quiere crear uno, haga click
              <router-link to="/laboratorios/crear">aqui</router-link>
              <div>
                <b-autocomplete
                  rounded
                  v-model="autoLabo"
                  placeholder="Ej. Nombre Laboratorio"
                  :open-on-focus="true"
                  :data="laboratoriosFiltrados"
                  icon="magnify"
                  field="nombre"
                  clearable
                  @select="(option) => (laboratorio = option)"
                >
                </b-autocomplete>
              </div>
            </div>
          </b-field>
          <b-field v-if="!etapa1" label="Numero">
            <b-input v-model.number="proveedor.numero"></b-input>
          </b-field>
        </div>
        <!-- PROVEEDOR EXISTENTE -->
        <div v-if="!nuevoProveedor">
          <section>
            <b-field v-if="!etapa1" label="Busque un proveedor">
              <b-autocomplete
                rounded
                v-model="autoProv"
                placeholder="Ej. Nombre Apellido"
                :open-on-focus="true"
                :data="proveedoresFiltrados"
                field="nombre"
                clearable
                @select="(option) => (proveedorSeleccionado = option)"
              >
              </b-autocomplete>
            </b-field>
            <p
              v-if="
                proveedorSeleccionado !== null &&
                proveedorSeleccionado.nombre !== ''
              "
              class="content"
            >
              <b> Proveedor: </b>
              {{
                proveedorSeleccionado.nombre +
                " " +
                proveedorSeleccionado.apellidos +
                " - " +
                proveedorSeleccionado.laboratorio.nombre
              }}
            </p>
          </section>
        </div>
      </div>
    </div>

    <b-button
      v-if="!etapa1"
      :disabled="verificarFechaProveedor"
      type="is-primary"
      expanded
      @click="etapa1 = !etapa1"
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
      <div class="title m-0">Busque un medicamento</div>
      <br />

      <b-switch v-model="medicamentoNuevo"> Es un medicamento nuevo? </b-switch>

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
        <b-field>
          <b-autocomplete
            class="my-3"
            rounded
            v-model="autoMedi"
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
              {{
                medicamentoSeleccionado !== null
                  ? medicamentoSeleccionado.cantidad
                  : "-"
              }}
              {{ " unidad" }}
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
              {{
                medicamentoSeleccionado !== null
                  ? medicamentoSeleccionado.cantidad + cantidadAñadida
                  : "-"
              }}
              {{ " unidad" }}
            </div>
          </b-field>
          <b-field class="column" label="Precio Actual">
            <div class="">
              {{
                medicamentoSeleccionado !== null
                  ? medicamentoSeleccionado.precio
                  : "-"
              }}
              {{ " Bs" }}
            </div>
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
        :disabled="verificarCamposMedicamentos"
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

      <b-loading is-full-page v-model="isLoading"></b-loading>
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
      isLoading: false,
      autoLabo: "",
      autoMedi: "",
      autoProv: "",
      laboratorio: {
        nombre: "",
        numero: "",
        direccion: "",
        id: "",
      },
      precioNuevo: 0,
      cantidadAñadida: 1,
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
        numero: 0,
        id: "",
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
      "guardarProveedor",
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

        this.precioNuevo = 0;
        this.cantidadAñadida = 1;
      }
    },
    enviarCompra() {
      const shortid = require("shortid");
      if (this.medicamentos !== null && this.medicamentos.length > 0) {
        this.proveedor.laboratorio = this.laboratorio;
        this.proveedor.id = shortid.generate();
        this.compra.proveedor = this.nuevoProveedor
          ? this.proveedor
          : this.proveedorSeleccionado;
        this.compra.fecha = this.datetime;
        this.compra.medicamentos = this.medicamentos;
        this.compra.total = this.calcularTotalCompras;
        this.compra.id = shortid.generate();
        this.guardarCompra(this.compra);
        this.enviarMedicamento();
        if (this.nuevoProveedor) {
          this.guardarProveedor(this.proveedor);
        }

        this.openLoading()
      } else {
        this.alertCustom("Error al enviar la compra");
      }

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
    validarTexto(texto) {
      const re = /^[A-Za-z &]+$/;
      return re.test(String(texto).toLowerCase());
    },
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.medicamentos.splice(0, this.medicamentos.length);
      }, 3 * 1000);
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
      return this.laboratorios.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.autoLabo.toLowerCase()) >= 0
        );
      });
    },
    proveedoresFiltrados() {
      return this.proveedores.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.autoProv.toLowerCase()) >= 0
        );
      });
    },
    medicamentosFiltrados() {
      return this.inventario.filter((option) => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.autoMedi.toLowerCase()) >= 0
        );
      });
    },
    verificarCamposMedicamentos() {
      if (!this.medicamentoNuevo) {
        if (
          this.medicamentoSeleccionado !== null &&
          this.medicamentoSeleccionado.nombre !== ""
        ) {
          if (
            this.cantidadAñadida >= 1 &&
            (this.precioNuevo > 0 || this.precioNuevo === 0)
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        if (
          this.medicamento !== null &&
          this.medicamento.nombre.trim() !== "" &&
          this.medicamento.vencimiento > new Date() &&
          this.medicamento.lote.trim() !== ""
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    verificarFechaProveedor() {
      if (
        this.datetime !== null &&
        this.proveedorSeleccionado !== null &&
        this.proveedor != null
      ) {
        if (!this.nuevoProveedor && this.proveedorSeleccionado.nombre !== "") {
          return false;
        }
        if (this.nuevoProveedor) {
          if (
            this.laboratorio !== null &&
            this.laboratorio.nombre !== "" &&
            this.proveedor.nombre.trim() !== "" &&
            this.validarTexto(this.proveedor.nombre) &&
            this.proveedor.apellidos.trim() !== "" &&
            this.validarTexto(this.proveedor.apellidos) &&
            this.proveedor.numero.toString().length > 6 &&
            this.proveedor.numero.toString().length < 9
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  created() {
    this.cargarProveedores();
    this.cargarLaboratorios();
    this.cargarInventario();
  },
};
</script>

