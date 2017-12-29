<template>
  <div>
    <div id="register" class='wrap'>
      <div class="container">
        <div class="title">
          <span>
            <!-- <router-link to="/user/login" class="title-text">登录</router-link> -->
            <router-link :to="{name: 'Login'}" class="title-text title-login">登录</router-link>
          </span>
          <span class="title-divider"> / </span>
          <span>
            <!-- <router-link to="/user/register" class="title-text">注册</router-link> -->
            <router-link :to="{naem: 'Register'}" class="title-text title-register">注册</router-link>
          </span>
        </div>

        <div class="operate-box">
          <el-form status-icon :rules="rules" ref="registerForm" :model="params" :label-position="'left'" label-width="80px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="params.name" placeholder="至少4个字符"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="params.email" placeholder="请填写真实邮箱"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码">
              <el-input type="password" placeholder="至少6个字符" v-model="params.password"></el-input>
            </el-form-item>

            <el-form-item prop="password_confirmation" label="确认密码">
              <el-input type="password" placeholder="请再次输入密码" v-model="params.password_confirmation"></el-input>
            </el-form-item>

            <div class="failure" v-if="failure">
              <div class="failure-header">{{failure.message}}</div>
              <ul class="failure-list">
                <li v-for="error in failure.data">{{error[0]}}</li>
              </ul>
            </div>

            <div class="register-btn">
              <el-button class="btn-define" @click="submit('registerForm')">注 册</el-button>
            </div>
          </el-form>

          <!-- <div class="github-register">
            <el-button class="github-register-btn" @click="githubRegister()">GitHub 账号注册</el-button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../../components/PageHeader";
import api from "../../api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "register",
  components: {
    PageHeader
  },
  data() {
    var checkPwdConfirmation = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.params.password_confirmation) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, message: "请输入有效用户名，不少于4个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "请输入有效密码，不少于6位", trigger: "blur" }
        ],
        password_confirmation: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 6, message: "请输入有效密码，不少于6位", trigger: "blur" },
          {
            validator: checkPwdConfirmation,
            message: "两次密码输入不一致",
            trigger: "blur"
          }
        ]
      },
      params: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  computed: mapState({
    success: state => state.account.register.success,
    failure: state => state.account.register.failure
  }),
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log("Register valid: " + valid);
        if (valid) {
          this.register();
        }
      });
    },
    register() {
      this.$store.dispatch("accountRegister", this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        this.message();
        let self = this;
        setTimeout(function() {
          self.$router.push("/");
        }, 2000);
      }
    },
    message() {
      this.$notify.success({
        title: "注册成功",
        message: "感谢您对 Vita's Home 的支持，请先前往您的邮箱激活账号～～"
      });
    },
    githubRegister() {
      window.location.href = "https://api/laravue.org.github";
    },
  },
  watch: {
    success: "successWatcher"
  }
};
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 18px;
  text-align: center;
}

.wrap {
  margin-top: 10%;
  width: 100%;
  height: 100%;
  text-align: center;
  .container {
    width: 64%;
    max-width: 560px;
    margin: auto;
    max-height: 500px;
    margin: auto;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
}

.title {
  margin: 40px 0 0;
  text-align: center;
  font-size: 25px;
  color: #555;
  .title-divider {
    padding: 0 20px;
  }
  .title-text {
    font-weight: bold;
  }
  .title-login {
    color: #999;
  }
  .title-register {
    color: #00b5ad;
  }
}

.operate-box {
  padding: 40px;
  border-radius: 5px;
  .register-btn {
    text-align: center;
  }
  .register-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 36px;
  }
  .failure {
    border-radius: 4px;
    background-color: #ffeef0;
    margin-bottom: 10px;
    color: red;
    line-height: 1.2;
    font-size: 12px;
    text-align: left;
    .failure-header {
      padding: 4px 0 0;
    }
    .failure-list {
      padding: 4px 0 0;
    }
  }
  .github-register-btn {
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

.github-register {
  text-align: center;
}
</style>
