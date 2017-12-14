<template>
  <div class="edit">
    <div class="title">
      <p><i class="fa fa-picture-o" aria-hidden="true"></i> 更换头像</p>
    </div>

    <div class="body">
      <div class="upload-container">
        <div class="avatar">
          <img :src="auth.user.avatar" alt="">
        </div>

        <el-upload class="upload-avatar" drag :action="uploadUrl" :on-success="onUploadSuccess" :show-file-list="false" :headers="headers">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api";
import { mapState } from "vuex";
import store from "../../../store";

const accessToken = store.state.account.auth.access_token;

export default {
  data() {
    return {
      user: null,
      // uploadUrl: this.$http.options.root + "avatar/upload",
      uploadUrl: "http://admin.vitain.top/api/v1/" + "avatar/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    this.user = this.auth.user;
    console.log("uploadUrl:: " + this.uploadUrl);
  },
  methods: {
    onUploadSuccess(response, file, fileList) {
      console.log(
        "EditAvatar onUploadSuccess: response:: " + JSON.stringify(response)
      );
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
    padding: 30px 0;
    text-align: center;
    .avatar {
      margin-bottom: 30px;
      img {
        width: 100px;
        border: 0.6px solid #ddd;
        border-radius: 50%;
      }
    }
  }
}
</style>
