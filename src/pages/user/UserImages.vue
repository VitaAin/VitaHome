<template>
  <div class="user-images">
    <div v-if="followUsers && followUsers.length>0">
      <div class="follow-user" v-for="followUser in followUsers" :key="followUser.id">
        <router-link class="follow-user-info" :to="{name: 'UserArticles', params: {id: followUser.id}}">
          <img class="follow-user-avatar" :src="followUser.avatar" alt="">
          <span class="follow-user-name">{{followUser.name}}</span>
        </router-link>

        <div class="divider"></div>
      </div>
    </div>

    <div v-if="!followUsers || followUsers.length==0">
      <div class="no-user-images">
        <p>少侠还没有上传过图片~~</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      followUsers: []
    };
  },
  mounted() {
    this.getFollowUsers();
  },
  methods: {
    getFollowUsers() {
      api.getUserFollowUsers(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.followUsers = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-images {
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px 8px;
  .follow-user {
    padding: 10px;
    text-align: left;
    a {
      font-size: 16px;
      color: #00b5ad;
      &:hover {
        color: tomato;
      }
    }
    .divider {
      height: 0.8px;
      background: #eee;
      margin-top: 8px;
    }
  }
}
.follow-user-info {
  display: flex;
  .follow-user-avatar {
    width: 60px;
    height: 60px;
  }
  .follow-user-name {
    margin: auto 16px;
    font-size: 18px;
  }
}
.no-user-images {
  text-align: center;
  p {
    margin: 30px 0 30px;
  }
}
</style>
