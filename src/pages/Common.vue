<template>
  <div id="common">
    <page-header></page-header>
    <router-view id="common-body"></router-view>
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
#common {
  position: relative;
  min-height: 100%;
}
#common-body {
  height: 100%;
  padding-bottom: 150px;
}
</style>
