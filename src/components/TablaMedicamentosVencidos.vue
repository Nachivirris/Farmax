<template>
  <div class="mt-3">
    
    <b-table
      :data="medicamentos"
      :focusable="true"
      :mobile-cards="true"
      checkable
      :checked-rows.sync="checkedRows"
    >
      <b-table-column
        field="nombre"
        label="Nombre del Medicamento"
        numeric
        v-slot="props"
      >
        {{ props.row.nombre }}
      </b-table-column>

      <b-table-column field="cantidad" numeric label="Cantidad" v-slot="props">
        {{ props.row.cantidad }}
      </b-table-column>

      <b-table-column field="precio" label="Precio" numeric v-slot="props">
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
      
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
      ...mapActions("getVencidos")
    
  },
  data() {
    return {
      checkedRows: [],
    };
  },
  computed: {
    ...mapState(["medicamentos"]),
  },
  created(){
      this.getVencidos
  }
};
</script>

<style>
</style>