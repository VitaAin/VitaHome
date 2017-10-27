<template>
  <div>
    <page-header></page-header>

    <div class="wrap">
      <div class="container">
        <div class="title">
          <span>
            <router-link to="/user/login" class="title-text">登录</router-link>
          </span>
          <span class="title-divider"> / </span>
          <span>
            <router-link to="/user/register" class="title-text">注册</router-link>
          </span>
        </div>

        <div class="login-box">
          <el-form status-icon :model="user" :rules="rules" ref="loginForm" :label-position="'left'" label-width="70px" class="login-form">
            <el-form-item prop="account" label="帐号">
              <el-input v-model="user.account" placeholder="用户名/邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <div class="login-failed" v-if="failure">
              <div class="header">{{failure.message}}</div>
              <ul class="list">
                <li v-for="error in failure.data">{{error[0]}}</li>
              </ul>
            </div>

            <div class="login-btn">
              <el-button class="btn-define" @click="submit('loginForm')">登录</el-button>
            </div>
          </el-form>

          <div class="github-login-btn">
            <el-button @click="githubLogin()">GitHub 登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../../components/PageHeader";
import api from "../../api";

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      rules: {
        account: [
          { required: true, message: "请输入帐号", trigger: "blur" },
          { min: 4, message: "请输入有效帐号，不少于4个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "请输入有效密码，不少于6位", trigger: "blur" }
        ]
      },
      user: {
        account: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log("Login valid: " + valid);
        if (valid) {
          this.login();
        }
      });
    },
    login() {
      api.login(user).then(res => {
        console.log("Login login res: " + res.data);
        if (res.data.status == 1) {
        } else {
        }
      });
    },
    githubLogin() {
      window.location.href = "https://api.laravue.org/github";
    }
  }
};
</script>

<style lang="scss">
.wrap {
  position: relative;
  margin-top: 5%;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    top: 10%;
    left: 38%;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}

.title {
  margin: 40px 0 20px;
  text-align: center;
  font-size: 25px;
  color: #555;
  .title-divider {
    padding: 0 20px 0 20px;
  }
  .title-text {
    color: #00b5ad;
    font-weight: bold;
  }
}

.login-box {
  width: 360px;
  padding: 40px;
  border-radius: 5px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 36px;
}

.btn-define {
  background-color: #00b5ad;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border-color: #f1f1f1;
  box-shadow: none;
}

.btn-define:hover,
.btn-define:active {
  background-color: #169e98;
  box-shadow: none;
}

.login-failed {
  padding: 10px 0 10px;
  border-radius: 4px;
  background-color: #ffeef0;
  margin-bottom: 20px;
  color: red;
  line-height: 1.6;
  text-align: left;
  .header {
    padding: 10px 0 0 35px;
    font-weight: bold;
  }
  .list {
    padding: 10px 0 0 35px;
  }
}

.github-login-btn {
  text-align: center;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  color: #00b5ad;
  font-size: 15px;
  font-weight: bold;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
}
</style>
