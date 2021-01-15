<template>
  <div>
    <div class="hero is-primary is-fullheight is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="card">
            <div class="title mt-5 is-1 has-text-primary is-four-fifths">
              Bienvenido a Farmax
            </div>
            <div class="m-3">
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/undraw_doctors_hwty.svg?alt=media&token=c6787570-1466-4219-b062-981598e58dfe"
                  width="600"
                  alt=""
                />
              </div>

              <b-loading
                :is-full-page="isFullPage"
                v-model="isLoading"
                :can-cancel="true"
              ></b-loading>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// @ is an alias to /src
import CardLogin from "../components/CardLogin";
import router from "../router";
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: true,
    };
  },
  methods: {
    ...mapActions(["cargarUsuarios","cargarDatosUsuario"]),
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        router.push("/inicio");
      },  3 * 1000);
    },
  },
  name: "Home",
  components: {
    CardLogin,
  },
  created() {
    this.openLoading();
    this.cargarUsuarios();
    this.cargarDatosUsuario();
  },
};
</script>
