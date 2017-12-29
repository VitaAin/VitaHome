<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-lock" aria-hidden="true"></i> 修改个人信息</p>
    </div>

    <div class="body" v-if="user">
      <el-form action="" label-width="70px" :label-position="'left'" v-on:submit.prevent>
        <el-form-item prop="name" label="用户名" class="input-box">
          <el-input type="text" v-model="user.name" placeholder="" disabled></el-input>
        </el-form-item>
        
        <el-form-item prop="email" label="电子邮箱" class="input-box">
          <el-input type="text" v-model="user.email" placeholder="" disabled></el-input>
        </el-form-item>

        <el-form-item prop="real_name" label="真实姓名" class="input-box">
          <el-input type="text" v-model="user.real_name" placeholder=""></el-input>
        </el-form-item>

        <el-form-item prop="sex" label="性别" class="input-box">
          <el-radio-group v-model="user.sex" :disabled="user.sex!=null">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
          <p class="sex-hint">提示：性别选定后，将无法更改</p>
        </el-form-item>

        <el-form-item prop="qq" label="QQ" class="input-box">
          <el-input type="text" v-model="user.qq" placeholder=""></el-input>
        </el-form-item>

        <el-form-item prop="city" label="所在城市" class="input-box">
          <el-input type="text" v-model="user.city" placeholder=""></el-input>
        </el-form-item>

        <el-form-item prop="introduction" label="个人介绍" class="input-box">
          <el-input type="textarea" v-model="user.introduction" placeholder=""></el-input>
        </el-form-item>

        <div>
          <el-button class="submit-button" type="submit" @click="submit()">提交修改</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "../../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: null
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    this.user = this.auth.user;
    // this.getUser();
  },
  methods: {
    // getUser() {
    //   api.getUser(this.$route.params.id).then(res => {
    //     if (res.data.status == 1) {
    //       this.user = res.data.data;
    //     }
    //   });
    // },
    submit() {
      // console.log(this.user);
      api.editUserInfo(this.user).then(res => {
        if (res.data.status == 1) {
          this.$store.commit("ACCOUNT_EDIT_USER", res.data.data);
          this.message();
        }
      });
    },
    message() {
      this.$notify.success({
        title: "修改成功",
        message: "少侠的资料已送往藏书阁～",
        offset: 100
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  .title {
    border-bottom: 1px solid #ddd;
    p {
      font-size: 18px;
      padding: 20px 0;
    }
  }
  .body {
    padding: 24px 0;
    .input-box {
      margin: 16px;
      text-align: left;
    }
    .submit-button {
      cursor: pointer;
      width: 70%;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 8px 10px;
      border: 1px solid #00b5ad;
      border-radius: 100px;
      box-shadow: none;
      &:hover {
        color: tomato;
        border: 1px solid tomato;
        box-shadow: none;
        border-radius: 100px;
        background-color: #fff;
      }
    }
  }
}
.sex-hint{
  font-size: 10px;
}
</style>
