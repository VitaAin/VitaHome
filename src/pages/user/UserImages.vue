<template>
  <div class="user-images-wrap">
    <div class="images-manager">
      <el-button type="primary" @click="clickManage()">{{manageState.text}}</el-button>
      <el-button type="primary" @click="clickCheckAll()" v-if="manageState.inManage">全选</el-button>
      <el-button type="primary" @click="clickDelete()" v-if="manageState.inManage">删除</el-button>
    </div>

    <div class="user-images-box">
      <div class="user-images" v-if="userImages && userImages.length>0">
        <div class="user-image" v-for="(image,index) in userImages" :key="image.id">
            <img class="user-image-show" :src="image.url" :alt="image.name" :title="image.name">
            <el-checkbox class="check-image" @change="onCheckedChange(index,$event)" v-if="manageState.inManage"></el-checkbox>
        </div>
      </div>

      <div v-if="!userImages || userImages.length==0">
        <div class="no-user-images">
          <p>少侠还没有上传过图片~~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      userImages: [],
      manageState: {
        inManage: false,
        text: "批量管理"
      },
      checkAll: false,
      checkedImageUrls: []
    };
  },
  mounted() {
    this.getUserImages();
  },
  methods: {
    getUserImages() {
      api.getUserImages(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.userImages = res.data.data;
        }
      });
    },
    onCheckedChange(pos, value) {
      if (value) {
        this.checkedImageUrls.push(this.userImages[pos].url);
      } else {
        var index = this.checkedImageUrls.indexOf(this.userImages[pos].url);
        if (index > -1) {
          this.checkedImageUrls.splice(index, 1);
        }
      }
      console.log(this.checkedImageUrls);
    },
    clickManage() {
      this.manageState.inManage = !this.manageState.inManage;
      this.manageState.text = this.manageState.inManage ? "退出管理" : "批量管理";
    },
    clickCheckAll() {
      this.checkAll = !this.checkAll;
    },
    clickDelete() {
      if (!this.checkedImageUrls || this.checkedImageUrls.length == 0) {
        this.$message.error("少侠还没有选择图片~");
        return;
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.user-images-wrap {
  margin-top: 40px;
}
.images-manager {
  text-align: left;
}
.user-images-box {
  margin-top: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px 8px;
  .user-images {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: space-between;
  }
}
.user-image {
  margin: 4px;
  display: inline-block;
  text-align: center;
  .user-image-show {
    max-width: 160px;
    max-height: 100px;
  }
  .check-image {
  }
}
.no-user-images {
  text-align: center;
  p {
    margin: 30px 0 30px;
  }
}
</style>
