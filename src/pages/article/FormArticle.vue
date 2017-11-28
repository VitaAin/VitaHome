<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <el-form status-icon :rules="rules" ref="params" :model="params" :label-position="'left'" label-width="80px">
            <el-form-item prop="title" label="标题" class="article-create">
              <el-input v-model="params.title" class="el-input" placeholder="至少4个字符"></el-input>
            </el-form-item>

            <el-form-item prop="category" label="文章类别" class="article-create">
              <el-select v-model="params.category" class="el-input" placeholder="请选择">
                <el-option v-for="category in allCategories" :key="category.id" :label="category.name" :value="category.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="tags" label="文章标签" class="article-create">
              <el-select v-model="params.tags" multiple filterable allow-create class="el-input" placeholder="请选择">
                <el-option v-for="tag in allTags" :key="tag.if" :label="tag.name" :value="tag.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="body" label="内容" class="article-create">
              <markdown-editor v-model="params.body" class="md-editor" ref="markdownEditor" :configs="configs" :highlight="true" :custom-theme="true"></markdown-editor>
              <!-- <el-upload drag :action="uploadUrl" :on-success="uploadCallback" :show-file-list="true" list-type="picture-card" :multiple="true" :headers="headers">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
            </el-form-item>

            <el-form-item prop="is_public" label="允许评论" class="article-create">
              <el-select v-model="params.is_public" class="el-input" placeholder="请选择">
                <el-option v-for="item in allowCommentsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <div>
              <button type="submit" class="article-btn" @click="submit($event, 'params')">提交</button>
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
        is_public: 1,
        tags: []
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
      }
    };
  },
  mounted() {
    this.getAllTags();
    this.getAllCategories();

    console.log("FormArticle type: " + this.type);
    if (this.type != "create_article") {
      this.getArticle();
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
        for (var index in res.data.data.tags) {
          this.params.tags.push(res.data.data.tags[index].id);
        }
        this.params = res.data.data;
        this.params.category = res.data.data.category_id;
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
        let form = {
          tag: this.params.tags,
          is_public: this.params.is_public,
          title: this.params.title,
          body: this.params.body,
          category: this.params.category
        };
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
          this.failure = "error";
        }
      });
    },
    editArticle() {
      api.editArticle(this.$route.params.id, this.$refs.params).then(res => {
        if (res.data.status == 1) {
          this.$router.push({
            name: "ArticleShow",
            params: { id: res.data.data.id }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~simplemde/dist/simplemde.min.css";
.grid-content {
  width: 100%;
  margin-top: 60px;
  .article-create {
    margin-bottom: 20px;
    padding: auto 10px;
    dt {
      color: #555;
      padding-top: 5px;
      width: 15%;
      text-align: right;
      float: left;
    }
  }
  .article-btn {
    cursor: pointer;
    width: 70%;
    margin-left: 17%;
    background-color: #00b5ad;
    color: #fff;
    font-size: 17px;
    padding: 5px 10px 5px 10px;
    border: 1px solid #00b5ad;
    border-radius: 100px;
    box-shadow: none;
    &:hover,
    // &:focus,
    &:active {
      color: tomato;
      border: 1px solid tomato;
      box-shadow: none;
      border-radius: 100px;
      background-color: #fff;
    }
  }
}
</style>
