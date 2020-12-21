<template>
  <div id="app">
    <div class="nav">
      <Navbar />
    </div>

    <router-view />
  </div>
</template>

<script>

import Navbar from "./components/Navbar"

export default {
  components:{
    Navbar
  }
}
</script>

