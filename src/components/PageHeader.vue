<template>
  <div>
    <el-menu :default-active="'1'" class="header" 
        mode="horizontal" 
        @select="handleSelect"
        unique-opened>
        <div>
          <router-link to="/">
            <el-menu-item index="0" class="header-title head-item">{{homeName}}</el-menu-item>
          </router-link>
        </div>

      <div class="header-nav">
        <router-link to="/">
          <el-menu-item index="1" class="head-item">首页</el-menu-item>
        </router-link>

        <!-- <router-link to="/article/create"> -->
        <router-link :to="{name: 'ArticleCreate'}" v-if="auth.check()">
          <el-menu-item index="2" class="head-item">写文章</el-menu-item>
        </router-link>

        <!-- <router-link to="/about"> -->
        <router-link :to="{name: 'About'}">
          <el-menu-item index="3" class="head-item">关于</el-menu-item>
        </router-link>
      </div>
      
      <!-- <div class="operate-nav">
        <el-menu-item index="100" @click="colorDialogVisible = true">换肤</el-menu-item>
        <el-dialog title="换肤" :visible.sync="colorDialogVisible" width="30%" center>
          <el-color-picker v-model="color"></el-color-picker>
          <span slot="footer" class="dialog-footer">
            <el-button @click="colorDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeColor()">确 定</el-button>
          </span>
        </el-dialog>
      </div> -->
      
      <div class="user-nav">
        <el-submenu index="77" v-if="auth.check()">
          <template slot="title" class="user-nav-item">
            <img :src="auth.user.avatar" alt="">
            {{auth.user.name}}
          </template>
          <router-link :to="{name: 'UserArticles', params: {id: auth.user.id}}">
            <el-menu-item index="77-1" class="user-item">个人中心</el-menu-item>
          </router-link>
          <router-link :to="{name: 'EditUserInfo', params: {id: auth.user.id}}">
            <el-menu-item index="77-2" class="user-item">编辑资料</el-menu-item>
          </router-link>
          <el-menu-item index="77-3" class="user-item" @click="logout()">退出</el-menu-item>
        </el-submenu>

        <!-- <router-link to="/user/login"> -->
        <router-link v-if="!auth.check()" :to="{name: 'Login'}">
          <el-menu-item index="10" class="head-item">登录</el-menu-item>
        </router-link>
        <!-- <router-link to="/user/register"> -->
        <router-link  v-if="!auth.check()" :to="{name: 'Register'}">
          <el-menu-item index="11" class="head-item">注册</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    auth: state => state.account.auth
  }),
  data() {
    return {
      homeName: "苍澜阁",
      colorDialogVisible: false,
      color: "#409EFF"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeColor() {
      console.log("color: " + this.color);
      this.colorDialogVisible = false;
    },
    logout() {
      this.$store.dispatch("accountLogout").then(res => {
        this.$router.push("/");
      });
    }
  },
  watch: {
    $route(to, from) {
      this.path = this.$route.path.split("/")[1];
    }
  }
};
</script>

<style lang="scss">
.header {
  background: #1f2122;
  color: white;
  border-bottom: #ddd solid 1px;
  padding-left: 10%;
  padding-right: 10%;
  * {
    color: white;
  }
  .header-title {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 4px;
    &:hover {
      background: transparent;
      color: white;
    }
  }
  .user-nav {
    float: right;
  }
  .operate-nav {
    float: right;
  }
}
.head-item {
  &:hover {
    background: transparent !important;
    color: #0371cb;
  }
}
.user-nav {
  .user-nav-item {
    &:hover {
      background: black !important;
      color: black;
    }
  }
  img {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border: 0.8px solid #aaa;
    border-radius: 50%;
  }
  .user-item {
    color: #333;
    &:hover {
      background: #ebe8e8;
      color: #0371cb;
    }
  }
}
</style>
