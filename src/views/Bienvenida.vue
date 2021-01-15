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
              <div class="columns">

              <img class="column"
                src="https://firebasestorage.googleapis.com/v0/b/farmaxip.appspot.com/o/undraw_doctors_hwty.svg?alt=media&token=c6787570-1466-4219-b062-981598e58dfe"
                width="500"
                alt=""
              />
              <div class="column">
                <p>
                  Haga click en el boton 
                </p>
              </div>
              </div>
              <b-button tag="router-link" expanded icon-right="arrow-right" type="is-primary" to="/inicio">Inicio</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardLogin from "../components/CardLogin";
export default {
  name: "Home",
  components: {
    CardLogin,
  },
};
</script>
