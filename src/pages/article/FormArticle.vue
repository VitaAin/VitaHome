<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="form-article-content">
          <el-form status-icon :rules="rules" ref="params" :model="params" :label-position="'left'" label-width="16%">
            <el-form-item prop="title" label="标题" class="form-item">
              <el-input v-model="params.title" placeholder="至少4个字符"></el-input>
            </el-form-item>

            <el-form-item prop="category" label="文章类别" class="form-item">
              <el-select v-model="params.category" clearable filterable allow-create class="el-input select-sth" placeholder="请选择">
                <el-option v-for="category in allCategories" :key="category.id" :label="category.name" :value="category.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="tags" label="文章标签" class="form-item">
              <el-select v-model="params.tags" multiple clearable filterable allow-create class="el-input select-sth" placeholder="请选择">
                <el-option v-for="tag in allTags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="body" label="内容" class="form-item">
              <markdown-editor v-model="params.body" class="md-editor" ref="markdownEditor" :configs="configs" :highlight="true" :custom-theme="true"></markdown-editor>
            </el-form-item>

            <el-form-item prop="is_public" class="form-item set-is-public">
              <el-checkbox v-model="params.is_public">公开</el-checkbox>
            </el-form-item>

            <el-form-item prop="images" label="插入图片" class="form-item upload-images">
              <div class="upload-images-failed" v-if="failure">{{failure}}</div>
              <el-upload class="upload-image" :action="uploadImageUrl" :headers="headers" 
                :show-file-list="true" :list-type="'picture-card'"  
                :on-success="onUploadImageSuccess" 
                :on-preview="onImagePreview" 
                :on-remove="onImageRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <div>
              <el-button class="article-btn" @click="submit($event, 'params')">提交</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { markdownEditor } from "vue-simplemde";
import api from "../../api";
import store from "../../store";

const accessToken = store.state.account.auth.access_token;

export default {
  components: {
    markdownEditor
  },
  props: {
    type: String
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        body: [{ required: true, message: "请输入文章内容", trigger: "blur" }]
      },
      params: {
        title: "",
        body: "",
        category: "",
        is_public: true,
        tags: [],
        images: []
      },
      allowCommentsOptions: [
        { value: 1, label: "是" },
        { value: 0, label: "否" }
      ],
      allTags: [],
      allCategories: [],
      failure: "",
      configs: {
        status: false,
        // initialValue: '请输入内容',
        renderingConfig: {
          codeSyntaxHighlighting: true,
          highlightingTheme: "tomorrow"
        }
      },
      uploadImageUrl:
        "http://admin.vitain.top/api/v1/" + "article_image/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    console.log("FormArticle type: " + this.type);
    if (this.type == "create_article") {
      this.getAllTags();
      this.getAllCategories();
    } else {
      api.getAllTags().then(res => {
        this.allTags = res.data.data;
        api.getAllCategories().then(res => {
          this.allCategories = res.data.data;
          this.getArticle();
        });
      });
    }

    // this.getAllTags();
    // this.getAllCategories();

    // console.log("FormArticle type: " + this.type);
    // if (this.type != "create_article") {
    //   this.getArticle();
    // }
  },
  methods: {
    getAllTags() {
      api.getAllTags().then(res => {
        if (res.data.status == 1) {
          this.allTags = res.data.data;
        }
      });
    },
    getAllCategories() {
      api.getAllCategories().then(res => {
        if (res.data.status == 1) {
          this.allCategories = res.data.data;
        }
      });
    },
    getArticle() {
      api.getArticle(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          // for (var index in res.data.data.tags) {
          //   this.params.tags.push(res.data.data.tags[index].id);
          // }
          this.params = res.data.data;
          this.params.category = res.data.data.category_id;

          this.getArticleImages();
        }
      });
    },
    getArticleImages() {
      api.getArticleImages(this.$route.params.id).then(res => {
        if (res.data.status == 1) {
          this.params.images = res.data.data;
        }
      });
    },
    submit(ev, formName) {
      // 判断是否为按了Enter键，防止在输入标签时被提交
      if (ev != null && ev.keyCode == 13) {
        return;
      }

      // console.log("FormArticle form: " + this.$refs[formName]);
      // this.$refs.params.validate(valid => {
      //   console.log("FormArticle valid: " + valid);
      //   if (valid) {
      //     alert("submit");
      this.afterSubmit();
      //   } else {
      //     alert("提交的数据不正确，请重新提交！");
      //     return false;
      //   }
      // });
    },
    afterSubmit() {
      if (this.type == "create_article") {
        this.createArticle();
      } else {
        this.editArticle();
      }
    },
    createArticle() {
      api.createArticle(this.params).then(res => {
        if (res.data.status == 1) {
          this.$router.push({
            name: "ArticleShow",
            params: { id: res.data.data.id }
          });
        } else {
          this.failure = res.data;
        }
      });
    },
    editArticle() {
      api.editArticle(this.$route.params.id, this.params).then(res => {
        if (res.data.status == 1) {
          this.$router.push({
            name: "ArticleShow",
            params: { id: res.data.data.id }
          });
        } else {
          this.failure = res.data;
        }
      });
    },
    onImageRemove(file, fileList) {
      console.log("************** onImageRemove start ****************");
      console.log(JSON.stringify(file));
      console.log("-----------");
      console.log(JSON.stringify(fileList));
      // this.params.images = fileList;
      this.params.images = this.formatImageFileList(fileList);
      console.log(JSON.stringify(this.params.images));
      console.log("************** onImageRemove end ****************");
      api.deleteArticleImage({ url: file.response.data.url }).then(res => {
        console.log("delete:: " + JSON.stringify(res));
      });
    },
    onImagePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onUploadImageSuccess(response, file, fileList) {
      console.log("************** onUploadImageSuccess start ****************");
      console.log(
        "FormArticle onUploadImageSuccess: reponse:: " +
          JSON.stringify(response)
      );
      console.log("--------------");
      console.log(file);
      console.log("--------------");
      console.log(fileList);
      console.log("************** onUploadImageSuccess end ****************");
      if (response.status == 1) {
        // this.params.images = fileList;
        this.params.images = this.formatImageFileList(fileList);
        console.log(this.params.images);
        console.log("************** onUploadImageSuccess end ****************");
        this.params.body += `![${file.name}](${response.data.url})`;
      }
    },
    formatImageFileList(fileList) {
      let imageList = [];
      fileList.forEach(function(afile) {
        imageList.push({
          type: "ArticleImage",
          article_id: this.$route.params.id,
          uid: afile.uid,
          name: afile.name,
          url: afile.response.data.url,
          size: afile.size
        });
      }, this);
      return imageList;
    }
  }
};
</script>

<style lang="scss">
@import "~simplemde/dist/simplemde.min.css";
.form-article-content {
  width: 100%;
  margin-top: 60px;
  .form-item {
    margin-bottom: 16px;
  }
  .set-is-public {
    text-align: left;
  }
  .upload-image {
    text-align: left;
  }
  .article-btn {
    cursor: pointer;
    width: 70%;
    margin: 16px 0 56px 16%;
    background-color: #00b5ad;
    color: #fff;
    font-size: 16px;
    padding: 6px 0;
    border: 1px solid #00b5ad;
    border-radius: 100px;
    box-shadow: none;
    &:hover,
    // &:focus,
    &:active {
      color: tomato;
      border: 1px solid tomato;
      box-shadow: none;
      background-color: #fff;
    }
  }
}
.upload-images-failed {
  font-size: 14px;
  color: red;
  margin: 8px;
}
.upload-image {
  margin: 16px;
}
</style>
