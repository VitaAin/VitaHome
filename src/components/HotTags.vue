<template>
  <div class="hot-tags">
    <p>热门标签</p>
    <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
    <div class="tag" v-for="tag in tags">
      <router-link :to="{name: 'Home', query: {tag: tag.name}}" id="btn-tag">
        {{tag.name}}
      </router-link>
    </div>
    <div style="clear: both; margin-bottom: 15px"></div>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "hot-tags",
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    this.getHotTags();
  },
  methods: {
    getHotTags() {
      api.getHotTags().then(res => {
        // console.log(
        //   "HotTags getHotTags: res:: " +
        //     res.data.status +
        //     ", " +
        //     res.data.data.length
        // );
        if (res.data.status == 1) {
          this.tags = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.hot-tags {
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  .tag {
    text-align: left;
    margin: 10px 5px 10px 10px;
  }
}

#btn-tag {
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #eee;
  padding: 5px 7px 5px;
  font-weight: 500;
  background-color: #eee;
  color: #00b5ad;
  float: left;
  margin: 5px 5px;
  height: 17px;
}

#btn-tag:hover {
  color: orangered;
  background-color: #dedede;
  border-radius: 4px;
  border: 1px solid #dedede;
  box-shadow: none;
  text-decoration: none;
}
</style>
