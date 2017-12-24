<template>
  <div class="user-articles">
    <div v-if="articles && articles.length>0">
      <div class="user-article" v-for="(article, index) in articles" :key="article.id">
        <router-link :to="{name: 'ArticleShow', params: {id: article.id}}">
          <span>{{article.title}}</span>
        </router-link>
        <span class="dex create-time">&nbsp;&nbsp;{{article.created_at}}</span>
          
        <div>
          <span class="dex"> · {{article.comments_count}} 条回复 · </span>
          <span class="dex">{{article.likes_count}} 人喜欢 ·</span>
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <div v-if="!articles || articles.length==0">
      <div class="no-article">
        <p>少侠还没有喜欢的文章~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.getUserLikeArticles();
  },
  methods: {
    getUserLikeArticles() {
      api.getUserLikeArticles(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.articles = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-articles {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px 8px;
  .user-article {
    padding: 10px 10px 0 20px;
    text-align: left;
    a {
      font-size: 16px;
      color: #00b5ad;
      &:hover {
        color: tomato;
      }
    }
    .dex {
      color: #999;
      font-size: 12px;
    }
    .create-time {
      font-size: 12px;
    }
    .divider {
      height: 0.8px;
      background: #eee;
      margin-top: 8px;
    }
  }
  .no-article {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>
