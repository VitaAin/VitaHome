<template>
  <form-article :type="'create_article'"></form-article>
</template>

<script>
import FormArticle from "./FormArticle";

export default {
  components: {
    FormArticle
  },
  mounted(){
    console.log("Create mounted");
  }
};
</script>

<style>

</style>
