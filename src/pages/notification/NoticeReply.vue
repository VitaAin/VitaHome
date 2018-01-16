<template>
  <div class="notice-reply-box">
    <div v-if="replies && replies.length>0">
      <div v-for="reply in replies" class="notice-reply" :key="reply.id">
        <router-link :to="{name: 'UserArticles', params: {id: reply.data.user_id}}">
          <span class="reply-user">{{reply.data.name}}：</span>
        </router-link>

        <router-link :to="{name: 'ArticleShow', params: {id: reply.data.title_id}}">
          <span class="reply-comment" v-html="reply.data.comment"></span>
        </router-link>

        <p class="reply-from">主题：
          <router-link :to="{name: 'ArticleShow', params: {id: reply.data.title_id}}">
            <span class="reply-article">{{reply.data.title}}</span>
          </router-link>
        </p>
        
        <p class="create-time">{{reply.created_at}}</p>
        <div class="divider"></div>
      </div>
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
}
.notice-reply {
  padding: 4px 10px;
  text-align: left;
  .reply-user {
    font-size: 14px;
    color: #00b5ad;
    &:hover {
      color: tomato;
    }
  }
  .reply-comment {
    font-size: 14px;
    color: #00b5ad;
    &:hover {
      color: tomato;
    }
  }
  .reply-from {
    margin-top: 4px;
    font-size: 13px;
    .reply-article {
      text-decoration: underline;
    }
  }
  .create-time {
    font-size: 12px;
    margin-top: 4px;
  }
}
.divider {
  height: 0.8px;
  background: #eee;
  margin-top: 8px;
}
.no-notice-reply {
  text-align: center;
  p {
    margin: 30px 0 30px;
  }
}
</style>
