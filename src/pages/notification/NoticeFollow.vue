<template>
  <div class="notice-follow-box">
    <div v-if="follows && follows.length>0">
      <div v-for="follow in follows" class="notice-follow" :key="follow.id">
        <router-link :to="{name: 'UserArticles', params: {id: follow.data.user_id}}">
          <span class="follow-user">{{follow.data.name}}</span> 关注了少侠
        </router-link>

        <p class="create-time">{{follow.created_at}}</p>
        <div class="divider"></div>
      </div>
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
}
.notice-follow {
  padding: 4px 10px;
  text-align: left;
  .follow-user {
    font-size: 14px;
    color: #00b5ad;
    &:hover {
      color: tomato;
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
.no-notice-follow {
  text-align: center;
  p {
    margin: 30px 0 30px;
  }
}
</style>
