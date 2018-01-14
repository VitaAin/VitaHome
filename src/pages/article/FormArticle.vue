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
              <el-select v-model="params.category" clearable filterable class="el-input select-sth" placeholder="请选择">
                <el-option v-for="category in allCategories" :key="category.id" :label="category.name" :value="category.id"></el-option>
              </el-select>
              <div class="create-new-btn-box">
                <el-button type="text" class="create-new-btn" @click="showCreateCategoryDialog=true">创建</el-button>
              </div>
            </el-form-item>

            <el-form-item prop="tags" label="文章标签" class="form-item">
              <el-select v-model="tags" multiple clearable filterable class="el-input select-sth" placeholder="请选择">
                <el-option v-for="tag in allTags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
              </el-select>
              <div class="create-new-btn-box">
                <el-button type="text" class="create-new-btn" @click="showCreateTagDialog=true">创建</el-button>
              </div>
            </el-form-item>

            <el-form-item prop="cover" label="封面图片" class="form-item">
              <div class="upload-images-failed" v-if="failure">{{failure}}</div>
              <el-upload class="upload-image"
                        :action="uploadImageUrl" :headers="headers"
                        :show-file-list="true" :list-type="'picture-card'"
                        :on-success="onUploadCoverSuccess"
                        :on-preview="onImagePreview" 
                        :on-remove="onImageRemove">
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-dialog :visible.sync="showBigImageDialog" size="tiny">
                <img width="100%" :src="bigImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item prop="body" label="内容" class="form-item">
              <markdown-editor v-model="params.body" class="md-editor" ref="markdownEditor" :configs="configs" :highlight="true" :custom-theme="true"></markdown-editor>
            </el-form-item>

            <el-form-item prop="is_public" class="form-item set-is-public">
              <el-checkbox v-model="params.is_public">公开</el-checkbox>
            </el-form-item>

            <el-form-item prop="images" label="插入图片" class="form-item upload-images">
              <div class="upload-images-failed" v-if="failure">{{failure}}</div>
              <el-upload class="upload-image" 
                :action="uploadImageUrl" :headers="headers" 
                :show-file-list="true" :list-type="'picture-card'"  
                :on-success="onUploadImageSuccess" 
                :on-preview="onImagePreview" 
                :on-remove="onImageRemove">
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-dialog :visible.sync="showBigImageDialog" size="tiny">
                <img width="100%" :src="bigImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <div>
              <el-button class="article-btn" @click="submit($event, 'params')">提交</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="创建新分类" :visible.sync="showCreateCategoryDialog" center>
      <el-form ref="categoryForm" :model="newCategory" :label-width="'90px'" :label-position="'left'">
        <el-form-item label="分类名称">
          <el-input v-model="newCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="newCategory.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateCategoryDialog=false">取 消</el-button>
        <el-button type="primary" @click="createNewCategoryOrTag('category')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建新标签" :visible.sync="showCreateTagDialog" center>
      <el-form ref="tagForm" :model="newTag" :label-width="'90px'" :label-position="'left'">
        <el-form-item label="标签名称">
          <el-input v-model="newTag.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input v-model="newTag.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateTagDialog=false">取 消</el-button>
        <el-button type="primary" @click="createNewCategoryOrTag('tag')">确 定</el-button>
      </div>
    </el-dialog>
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
        body: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      params: {
        title: "",
        cover_url: "",
        body: "",
        category: "",
        is_public: true,
        tags: [],
        images: []
      },
      tags: [],
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
      // "http://api.vitain.top/api/v1/" + "article_image/upload",
      uploadImageUrl: "http://api.vitain.top/api/v1/" + "user_image/upload",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      bigImageUrl: "",
      showBigImageDialog: false,
      showCreateCategoryDialog: false,
      showImgMask: false,
      showCreateTagDialog: false,
      newCategory: {
        name: "",
        description: ""
      },
      newTag: {
        name: "",
        description: ""
      }
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
          this.params = res.data.data;
          this.params.category = res.data.data.category_id;
          this.params.images = [];
          for (let index in res.data.data.tags) {
            this.tags.push(res.data.data.tags[index].id);
          }
        }
      });
    },
    createNewCategoryOrTag(type) {
      if (type == "category") {
        this.showCreateCategoryDialog = false;
        console.log("newCategory: " + JSON.stringify(this.newCategory));
        api.createCategory(this.newCategory).then(res => {
          if (res.data.status == 1) {
            this.allCategories.push(res.data.data);
          }
        });
      } else if (type == "tag") {
        this.showCreateTagDialog = false;
        console.log("newTag: " + JSON.stringify(this.newTag));
        api.createTag(this.newTag).then(res => {
          if (res.data.status == 1) {
            this.allTags.push(res.data.data);
          }
        });
      }
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
      this.params.tags = this.tags;
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
      this.params.images = this.formatImageFileList(fileList);
      api.deleteUserImage({ url: file.response.data.url }).then(res => {
        console.log("delete:: " + JSON.stringify(res));
      });
    },
    onImagePreview(file) {
      this.bigImageUrl = file.url;
      this.showBigImageDialog = true;
    },
    onUploadImageSuccess(response, file, fileList) {
      if (response.status == 1) {
        this.params.images = this.formatImageFileList(fileList);
        console.log(this.params.images);
        this.params.body += `![${file.name}](${response.data.url})`;
      }
    },
    onUploadCoverSuccess(response, file, fileList) {
      console.log("------------------");
      console.log(fileList);
      if (response.status == 1) {
        this.params.cover_url = response.data.url;
        let img = {
          uid: file.uid,
          name: file.name,
          url: file.response.data.url,
          size: file.size,
          is_cover: true
        };
        api.addUserImage({ image: img }).then(res => {
          console.log("add:: " + JSON.stringify(res));
        });
      }
    },
    formatImageFileList(fileList) {
      let imageList = [];
      fileList.forEach(function(afile) {
        imageList.push({
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
.create-new-btn-box {
  text-align: right;
  .create-new-btn {
    padding: 4px;
    margin: 0;
  }
}
.upload-images-failed {
  font-size: 14px;
  color: red;
  margin: 8px;
}
.upload-image {
  // margin: 16px;
}
</style>
