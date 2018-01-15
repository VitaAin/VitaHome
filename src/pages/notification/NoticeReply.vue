<template>
  <div class="notice-reply-box">
    <div v-if="replies && replies.length>0">
      <div v-for="reply in replies" class="notice-reply" :key="reply.id">
        <router-link :to="{name: 'ArticleShow', params: {id: reply.id}}">
          <span>{{reply.title}}</span>
        </router-link>
        <span class="dex create-time">&nbsp;&nbsp;{{reply.created_at}}</span>
          
        <div>
          <span class="dex"> · {{reply.comments_count}} 条回复 · </span>
          <span class="dex">{{reply.likes_count}} 人喜欢 ·</span>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <div v-if="!replies || replies.length==0">
      <div class="no-notice-reply">
        <p>少侠，当前还没有人回复你，快去结交更多侠士吧~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      replies: []
    };
  },
  mounted() {
    this.getNoticeReply();
  },
  methods: {
    getNoticeReply() {
      api.getNoticeReply().then(res => {
        if (res.data.status == 1) {
          this.replies = res.data.data;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getNoticeReply();
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-reply-box {
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
  .no-notice-reply {
    text-align: center;
    p {
      margin: 30px 0 30px;
    }
  }
}
</style>
