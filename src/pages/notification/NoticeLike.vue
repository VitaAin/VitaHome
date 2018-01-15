<template>
  <div class="notice-like-box">
    <div v-if="likes && likes.length>0">
      <div v-for="like in likes" class="notice-reply" :key="like.id">
        <router-link :to="{name: 'ArticleShow', params: {id: like.id}}">
          <span>{{like.title}}</span>
        </router-link>
        <span class="dex create-time">&nbsp;&nbsp;{{like.created_at}}</span>
          
        <div>
          <span class="dex"> · {{like.comments_count}} 条回复 · </span>
          <span class="dex">{{like.likes_count}} 人喜欢 ·</span>
        </div>
      </div>
      <div class="divider"></div>
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
  .notice-reply {
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
  .no-notice-like {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>
