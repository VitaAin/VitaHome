<template>
  <div id="common">
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

export default {
  name: "common",
  components: {
    PageHeader,
    PageFooter
  }
};
</script>

<style>

</style>
