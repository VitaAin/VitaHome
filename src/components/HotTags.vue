<template>
  <div class="hot-tags" v-if="tags && tags.length>0">
    <p>热门标签</p>
    <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
    <div class="tags">
      <div class="tag" v-for="tag in tags">
      <router-link :to="{name: 'Home', query: {tag: tag.name}}" id="btn-hot-tag">
        {{tag.name}}
      </router-link>
    </div>
    </div>
    
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
  .tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
    .tag {
      // text-align: left;
      margin: 8px 4px;
    }
  }
}

#btn-hot-tag {
  display: inline-block;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #eee;
  padding: 5px 7px;
  background-color: #eee;
  color: #00b5ad;
  margin: 0;
  height: 16px;
  line-height: 100%;
}

#btn-hot-tag:hover {
  color: orangered;
  background-color: #dedede;
  border-radius: 4px;
  border: 1px solid #dedede;
  box-shadow: none;
  text-decoration: none;
}
</style>
