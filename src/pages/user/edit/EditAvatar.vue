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

        <div class="upload-avatar-failed" v-if="failure">{{failure}}</div>
        <el-upload class="upload-avatar" drag :action="uploadAvatarUrl"  :headers="headers" :show-file-list="false"
          :on-success="onAvatarUploadSuccess" 
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过500KB</div>
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
      // uploadAvatarUrl: this.$http.options.root + "avatar/upload",
      uploadAvatarUrl: "http://admin.vitain.top/api/v1/" + "avatar/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failure: null
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    this.user = this.auth.user;
    console.log("uploadAvatarUrl:: " + this.uploadAvatarUrl);
  },
  methods: {
    beforeAvatarUpload(file) {
      const expectedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif"
      ];
      const isExpectedType = expectedTypes.includes(file.type);
      const isLt2M = file.size / 1024 < 500;

      if (!isExpectedType) {
        this.failure = "上传头像图片格式错误！";
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500KB ！");
      }
      return isExpectedType && isLt2M;
    },
    onAvatarUploadSuccess(response, file, fileList) {
      console.log(
        "EditAvatar onUploadSuccess: response:: " + JSON.stringify(response)
      );
      if (response.status == 1) {
        this.user.avatar = response.data.url;
        this.$store.commit("ACCOUNT_AVATAR_UPLOAD", response.data.url);
        this.failure = null;
      } else {
        this.failure = response.message;
      }
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
        height: 100px;
        border: 0.6px solid #ddd;
        border-radius: 50%;
      }
    }
  }
}
.upload-avatar-failed {
  font-size: 14px;
  color: red;
  margin: 8px;
}
</style>
