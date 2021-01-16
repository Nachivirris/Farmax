<template>
  <div class="m-5">
    <div class="title is-1 has-text-primary is-four-fifths">
      Editar Medicamento.
    </div>
    <b-button
      tag="router-link"
      to="/inventario"
      class="my-3"
      type="is-primary"
      icon-left="arrow-left"
      >Volver</b-button
    >

    <div class="columns">
      <div class="column">
        <b-field label="Nombre del Medicamento">
          <b-input v-model="medicamento.nombre"></b-input>
        </b-field>
      </div>
      <div class="column">
        <!-- <b-field class="" label="Vencimiento del medicamento">
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
        </b-field> -->

        <b-field label="Numero de Lote">
          <b-input v-model="medicamento.lote"></b-input>
        </b-field>
      </div>
    </div>
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
    <b-button expanded type="is-success" icon-left="check" @click="enviarMedicamento">Editar Medicamento</b-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["medicamento"]),
  },
  methods: {
    ...mapActions(["getInventario", "cargarInventario", "editarMedicamentoInventario"]),
    enviarMedicamento(){
        
        this.editarMedicamentoInventario(this.medicamento)
        
    }
  },
  created() {
    this.cargarInventario();
    this.getInventario(this.$route.params.id);
  },
};
</script>