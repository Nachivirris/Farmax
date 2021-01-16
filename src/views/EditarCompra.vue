<template>
  <div class="m-5">
    <b-button
      tag="router-link"
      to="/compras"
      class="my-3"
      type="is-primary"
      icon-left="arrow-left"
      >Compras</b-button
    >
    <div class="title is-1 has-text-primary is-four-fifths">Editar Compra.</div>


    <div class="columns">
      <div class="column">
        <b-field label="Fecha">
          <b-datetimepicker
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            v-model="compra.fecha"
            horizontal-time-picker
          >
          </b-datetimepicker>
        </b-field>
        <br />
        <div class="columns">
          <div class="column">
            <b-field class="" label="Nombre Proveedor">
              <b-input v-model="compra.proveedor.nombre"></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Apellidos Proveedor">
              <b-input v-model="compra.proveedor.apellidos"></b-input>
            </b-field>
          </div>
        </div>
        <b-field label="Numero">
          <b-input v-model.number="compra.proveedor.numero"></b-input>
        </b-field>
        <br />

        <div class="columns">
          <div class="column">
            <b-field label="Nombre Laboratorio">
              <b-input v-model="compra.proveedor.laboratorio.nombre"></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Direccion">
              <b-input
                v-model="compra.proveedor.laboratorio.direccion"
              ></b-input>
            </b-field>
            <b-field label="Numero Telefonico">
              <b-input v-model="compra.proveedor.laboratorio.numero"></b-input>
            </b-field>
          </div>
        </div>
      </div>

      <div class="column is-two-thirds">
        <div>
          <b-table
            :data="compra.medicamentos"
            :focusable="true"
            :mobile-cards="true"
          >
            <b-table-column
              field="nombre"
              label="Nombre del Medicamento"
              v-slot="props"
            >
              {{ props.row.nombre }}
            </b-table-column>

            <b-table-column
              field="cantidad"
              numeric
              label="Cantidad"
              v-slot="props"
            >
              {{ props.row.cantidad }}
            </b-table-column>

            <b-table-column
              field="precio"
              label="Precio"
              numeric
              v-slot="props"
            >
              {{ props.row.precio }}
            </b-table-column>

            <b-table-column field="total" label="Total" numeric v-slot="props">
              {{ props.row.precio * props.row.cantidad }} {{ "Bs" }}
            </b-table-column>

            <b-table-column
              field="vencimiento"
              label="Fecha Vencimiento"
              centered
              v-slot="props"
            >
              <span class="tag is-success">
                {{ new Date(props.row.vencimiento).toLocaleDateString() }}
              </span>
            </b-table-column>

            <b-table-column label="Lote" v-slot="props">
              {{ props.row.lote }}
            </b-table-column>
            <template #footer>
              <div class="has-text-right">
                <div class="mt-3">
                  {{ "Precio Total:" }} {{ calcularTotal() }} {{ " Bs" }}
                </div>
                <!-- <div class="mt-3 is-align-content-end title is-4">
            {{ "Precio Final:" }}
            {{ calcularTotal() - calcularTotal()  }}
            {{ " Bs" }}
          </div> -->
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <b-button expanded type="is-success" @click="enviarCompra">
        Guardar compra
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["compra"]),
  },
  methods: {
    ...mapActions(["getCompra", "cargarCompras", "editarCompra"]),
    calcularTotal() {
      const totales = this.compra.medicamentos.map((med) => {
        return med.cantidad * med.precio;
      });
      let suma = 0;
      totales.forEach((element) => {
        suma += element;
      });

      return suma;
    },
    enviarCompra(){
      this.editarCompra(this.compra)
      
    }
  },
  created() {
    this.cargarCompras();
    this.getCompra(this.$route.params.id);
    this.compra.fecha = new Date(this.compra.fecha);
  },
};
</script>