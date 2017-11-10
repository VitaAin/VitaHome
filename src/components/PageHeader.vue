<template>
  <div>
    <el-menu :default-active="'1'" class="header" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" class="header-title">{{headTitle}}</el-menu-item>

      <div class="header-nav">
        <router-link to="/">
          <el-menu-item index="1">
          首页
          </el-menu-item>
        </router-link>

        <!-- <router-link to="/article/create"> -->
        <router-link :to="{name: 'ArticleCreate'}">
          <el-menu-item index="2">
            写文章
          </el-menu-item>
        </router-link>

        <!-- <router-link to="/about"> -->
        <router-link :to="{name: 'About'}">
          <el-menu-item index="3">
          关于
          </el-menu-item>
        </router-link>
      </div>
      
      <div class="operate-nav">
        <el-menu-item index="100" @click="colorDialogVisible = true">换肤</el-menu-item>
        <el-dialog title="换肤" :visible.sync="colorDialogVisible" width="30%" center>
          <el-color-picker v-model="color"></el-color-picker>
          <span slot="footer" class="dialog-footer">
            <el-button @click="colorDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeColor()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      
      <div class="user-nav">
        <!-- <router-link to="/user/login"> -->
        <router-link :to="{name: 'Login'}">
          <el-menu-item index="10">登录</el-menu-item>
        </router-link>
        <!-- <router-link to="/user/register"> -->
        <router-link :to="{name: 'Register'}">
          <el-menu-item index="11">注册</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headTitle: "Vita's Home",
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
    }
  }
};
</script>

<style lang="scss">
.header {
  background: lightskyblue;
  border-bottom: #ddd solid 1px;
  .header-title {
    font-size: 24px;
    font-weight: bold;
  }
  .user-nav {
    float: right;
  }
  .operate-nav {
    float: right;
  }
}
</style>
