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
        <b-checkbox
          v-if="!etapa1"
          :disabled="proveedor.nombre !== '' ? true : false"
          v-model="nuevoProveedor"
        >
          Es un nuevo proveedor?
        </b-checkbox>
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
              <router-link to="/">aqui</router-link>
              <div>
                <b-autocomplete
                  rounded
                  v-model="proveedor.laboratorio"
                  :data="laboratoriosFiltrados"
                  placeholder="e.g. Bago"
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
            <p class="content">
              <b> Proveedor: </b>
              {{
                proveedorSeleccionado.nombre +
                " " +
                proveedorSeleccionado.apellidos +
                " - " +
                proveedorSeleccionado.laboratorio
              }}
            </p>

            <b-field v-if="!etapa1" label="Busque un proveedor">
              <b-autocomplete
                rounded
                v-model="proveedor.nombre"
                placeholder="e.g. Juan Carranza"
                keep-first
                :open-on-focus="true"
                :data="proveedoresFiltrados"
                field="nombre"
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
      {{ medicamento }}
      <div class="columns">
        <div class="column">
          <b-field label="Nombre del Medicamento">
            <b-input v-model="medicamento.nombre"></b-input>
          </b-field>
          <div class="columns">
            <b-field  class="column" label="Cantidad">
              <b-input v-model="medicamento.cantidad"></b-input>
            </b-field>
            <b-field class="column" label="Precio del medicamento">
              <b-input v-model="medicamento.precio"></b-input>
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
      <b-button icon-right="check" type="is-primary" expanded>
        Guardar Medicamento
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      etapa1: true,
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
    ...mapActions(["cargarProveedores", "cargarLaboratorios"]),
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
      if (!this.nuevoProveedor) {
        if (this.datetime !== null && this.proveedor !== null) {
          if (this.proveedor.nombre.trim() !== "") {
            this.etapa1 = true;
          } else {
            this.alertCustom("Proveedor no valido");
          }
        } else {
          this.alertCustom("Proveedor no valido");
        }
      } else {
        if (this.datetime !== null && this.proveedorSeleccionado !== null) {
          if (
            (this.proveedorSeleccionado.nombre.trim() !== "" &&
              this.proveedorSeleccionado.apellidos.trim() !== "" &&
              this.proveedorSeleccionado.laboratorio.trim() !== "") 
          ) {
            this.etapa1 = true;
          } else {
            this.alertCustom("Proveedor no valido");
          }
        } else {
          this.alertCustom("Proveedor no valido");
        }
      }
    },
  },
  computed: {
    ...mapState(["proveedores", "laboratorios", "medicamento"]),
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
  },
  created() {
    this.cargarProveedores();
    this.cargarLaboratorios();
  },
};
</script>

