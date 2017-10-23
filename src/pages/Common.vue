<template>
  <div id="common">
    <page-header></page-header>
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";

export default {
  name: "common",
  components: {
    PageHeader
  }
}
</script>

<style>

</style>
