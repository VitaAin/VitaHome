<template>
  <div class="follow-users">
    <div v-if="comments && comments.length>0">
      <div class="user-article" v-for="(comment, index) in comments" :key="comment.id">
        <router-link :to="{name: 'ArticleShow', params: {id: comment.commentable.id}}">
          <span style="font-size: 15px">{{comment.commentable.title}}</span>
        </router-link>
        <span class="dex create-time">&nbsp;&nbsp;{{comment.created_at}}</span>

        <div>
          <span class="dex"> · {{comment.commentable.comments_count}} 条回复 ·</span>
          <span class="dex">{{comment.commentable.likes_count}} 人关注 ·</span>
        </div>
        
        <p style="padding-top: 10px; font-size: 15px">{{comment.body}}</p>

        <div class="divider"></div>
      </div>
    </div>

    <div v-if="!comments || comments.length==0">
      <div class="no-article">
        <p>没有任何数据~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    this.getUserReplies();
  },
  methods: {
    getUserReplies() {
      api.getUserReplies(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.comments = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.follow-users {
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
