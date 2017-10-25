<template>
  <div class="content-body">
    <router-link class="content-title" :to="{name: 'ArticleShow', params: {id: article.id}}">
      <h3>{{article.title}}</h3>
    </router-link>
    <div class="content-from">由
      <!-- <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">{{article.user.name}}</router-link>  -->
      {{article.user.name}}
      发表于 {{article.created_at}}
    </div>
    <div class="content-body-body">
      {{ article.abstract }} ...
    </div>
    <div style="padding-top: 15px">
      <div v-for="tag in article.tags" style="float: left">
        <a v-if="tag" :href="'/#/articles?tag=' + tag.name" id="btn-topic">
          # {{ tag.name }}
        </a>
      </div>
      <div class="content-count">
        <span style="padding-right: 4px">
          <i class="fa fa-eye"></i>
        </span>
        <span>{{ article.view_count }}</span>
        <span style="padding-right: 4px; margin-left: 10px">
          <i class="fa fa-comments"></i>
        </span>
        <span>{{ article.comments_count }}</span>
        <span style="padding-right: 4px; margin-left: 10px">
          <i class="fa fa-heart"></i>
        </span>
        <span>{{ article.likes_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-item",
  props: {
    index: Number,
    article: null
  },
  data() {
    return {
      // index: this.propIndex,
      // article: this.propArticle
    };
  },
  mounted() {
    // console.log("index: " + this.index + ", article: " + this.article.title);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content-body {
  width: 95%;
  margin-top: 30px;
  a {
    color: #bbb;
    &:hover {
      color: #00b5ad;
    }
  }
  .content-title {
    color: #222;
    &:hover {
      color: #00b5ad;
      text-decoration: underline;
    }
  }
  .content-body-body {
    padding-top: 12px;
    line-height: 25px;
  }
}
.content-count {
  float: left;
  font-size: 14px;
  padding-top: 2px;
  color: #999;
  padding-left: 5px;
}
#btn-topic {
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid orangered;
  padding: 2px 7px 2px;
  margin-right: 12px;
  font-weight: 500;
  color: orangered;
}
#btn-topic:hover {
  color: #00b5ad;
  border-radius: 4px;
  border: 1px solid #00b5ad;
  box-shadow: none;
  text-decoration: none;
}
</style>
