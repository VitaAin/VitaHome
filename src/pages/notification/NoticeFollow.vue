<template>
  <div class="notice-follow-box">
    <div v-if="follows && follows.length>0">
      <div v-for="follow in follows" class="notice-reply" :key="follow.id">
        <router-link :to="{name: 'ArticleShow', params: {id: follow.id}}">
          <span>{{follow.title}}</span>
        </router-link>
        <span class="dex create-time">&nbsp;&nbsp;{{follow.created_at}}</span>
          
        <div>
          <span class="dex"> · {{follow.comments_count}} 条回复 · </span>
          <span class="dex">{{follow.likes_count}} 人喜欢 ·</span>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <div v-if="!follows || follows.length==0">
      <div class="no-notice-follow">
        <p>少侠，当前还没有人关注你，快去结交更多侠士吧~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      follows: []
    };
  },
  mounted() {
    this.getNoticeFollow();
  },
  methods: {
    getNoticeFollow() {
      api.getNoticeFollow().then(res => {
        if (res.data.status == 1) {
          this.follows = res.data.data;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getNoticeFollow();
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-follow-box {
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
  .no-notice-follow {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>
