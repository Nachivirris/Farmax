<template>
  <div class="mt-5">
      {{compra}}

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["compra", ]),
  },
  methods: {
    ...mapActions(["getCompra", "cargarCompras"]),
  },
  created() {
    this.cargarCompras();
    this.getCompra(this.$route.params.id);
  },
};
</script>