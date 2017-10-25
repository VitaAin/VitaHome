<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <form action="" v-on:submit.prevent>
            <div class="article-create">
              <dt>标题：</dt>
              <el-input v-model="params.title" class="el-input" placeholder="至少4个字符"></el-input>
            </div>

            <div class="article-create">
              <dt>文章类别：</dt>
              <el-select v-model="params.category" class="el-input" placeholder="请选择">
                <el-option v-for="category in allCategories" :key="category.id" :label="category.name" :value="category.id"></el-option>
              </el-select>
            </div>

            <div class="article-create">
              <dt>文章标签：</dt>
              <el-select v-model="tags" multiple filterable allow-create class="el-input" placeholder="请选择">
                <el-option v-for="tag in allTags" :key="tag.if" :label="tag.name" :value="tag.id"></el-option>
              </el-select>
            </div>

            <div class="article-create">
              <dt>内容：</dt>
              <markdown-editor class="md-editor" ref="markdownEditor"></markdown-editor>
            </div>

            <div class="article-create">
              <dt>是否允许评论：</dt>
              <el-select v-model="params.isHidden" class="el-input" placeholder="请选择">
                <el-option v-for="item in allowCommentsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>

            <div>
              <button type="submit" class="article-btn" @click="submit($event)">提交</button>
            </div>
          </form>
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
      params: {
        title: "",
        body: "",
        category: "",
        isHidden: "F"
      },
      allowCommentsOptions: [
        { value: "F", label: "否" },
        { value: "T", label: "是" }
      ],
      tags: [],
      allTags: [],
      allCategories: [],
      failure: ""
    };
  },
  mounted() {
    this.getAllTags();
    this.getAllCategories();

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
          this.tags.push(res.data.data.tags[index].id);
        }
        this.params = res.data.data;
        this.params.category = res.data.data.category_id;
      });
    },
    submit(ev) {
      // 判断是否为按了Enter键，防止在输入标签时被提交
      if (ev != null && ev.keyCode == 13) {
        return;
      }
      if (this.type == "create_article") {
        this.params.tags = this.tags;
        this.createArticle();
      } else {
        let form = {
          tag: this.tags,
          isHidden: this.params.is_hidden,
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
      api.editArticle(this.$route.params.id, form).then(res => {
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
    dt {
      color: #555;
      padding-top: 5px;
      width: 15%;
      text-align: right;
      float: left;
    }
    .el-input {
      width: 70%;
      margin-left: 2%;
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
</style>
