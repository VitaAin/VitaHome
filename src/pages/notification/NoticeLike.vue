<template>
  <div class="notice-like-box">
    <div v-if="likes && likes.length>0">
      <div v-for="like in likes" class="notice-like" :key="like.id">
        <router-link :to="{name: 'UserArticles', params: {id: like.data.user_id}}">
          <span class="like-user">{{like.data.name}}</span>
        </router-link>

        <span class="like-from">点赞了少侠的主题：
          <router-link :to="{name: 'ArticleShow', params: {id: like.data.title_id}}">
            <span class="like-article">{{like.data.title}}</span>
          </router-link>
        </span>
        
        <p class="create-time">{{like.created_at}}</p>
        <div class="divider"></div>
      </div>
    </div>
    <div v-if="!likes || likes.length==0">
      <div class="no-notice-like">
        <p>少侠，当前还没有人为你点赞，快去结交更多侠士吧~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      likes: []
    };
  },
  mounted() {
    this.getNoticeLike();
  },
  methods: {
    getNoticeLike() {
      api.getNoticeLike().then(res => {
        if (res.data.status == 1) {
          this.likes = res.data.data;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getNoticeLike();
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-like-box {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px 8px;
}
.notice-like {
  padding: 4px 10px;
  text-align: left;
  .like-user {
    font-size: 14px;
    color: #00b5ad;
    &:hover {
      color: tomato;
    }
  }
  .like-from {
    margin-top: 4px;
    font-size: 14px;
    .like-article {
      text-decoration: underline;
    }
  }
  .create-time {
    font-size: 12px;
    margin-top: 4px;
  }
  .divider {
    height: 0.8px;
    background: #eee;
    margin-top: 8px;
  }
}
.no-notice-like {
  text-align: center;
  p {
    margin: 30px 0 30px;
  }
}
</style>
