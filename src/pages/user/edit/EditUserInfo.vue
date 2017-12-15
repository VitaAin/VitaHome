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

        <el-form-item prop="city" label="所在城市" class="input-box">
          <el-input type="text" v-model="user.city" placeholder=""></el-input>
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
    submit(){
      api.editUserInfo(this.user).then((res) => {
        this.$store.commit('ACCOUNT_EDIT_USER', res.data.data);
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
    }
    .submit-button {
      cursor: pointer;
      width: 70%;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 5px 10px 5px 10px;
      border: 1px solid #00b5ad;
      border-radius: 100px;
      box-shadow: none;
      &:hover,
      &:focus,
      &:active {
        color: tomato;
        border: 1px solid tomato;
        box-shadow: none;
        border-radius: 100px;
        background-color: #fff;
      }
    }
  }
}
</style>
