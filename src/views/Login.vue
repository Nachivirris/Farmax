<template>
  <div>
    <div class="hero is-primary is-fullheight is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <CardLogin />
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
