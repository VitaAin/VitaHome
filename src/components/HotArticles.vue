<template>
  <div class="hot-topics" v-if="articles && articles.length>0">
    <p>热门话题</p>
    <div style="border-bottom: 1px solid #eee;"></div>
    <ul v-for="article in articles">
      <router-link :to="{name: 'ArticleShow', params: {id: article.id}}">
        <li>• &nbsp;
          <span class="article-title">
            {{article.title}}
          </span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "hot-articles",
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.getHotArticles();
  },
  methods: {
    getHotArticles() {
      api.getHotArticles().then(res => {
        if (res.data.status == 1) {
          this.articles = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.hot-topics {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  li {
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0 0;
    margin-left: 15px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  a {
    color: #333;
    &:hover {
      color: orangered;
    }
  }
  .article-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
