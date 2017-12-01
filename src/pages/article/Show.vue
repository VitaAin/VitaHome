<template>
  <div v-if="article">
    <el-row :gutter="25">
      <el-col :span="18" :offset="3">
        <div class="article">
          <div class="title">
            <h2>{{article.title}}</h2>

            <div class="to-edit" v-if="auth.id == article.user.id">
              <router-link :to="{name: 'ArticleEdit', params: {id: this.$route.params.id}}">
                <span style="padding-left: 10px; font-size: larger">
                  <i class="fa fa-edit"></i>
                </span>
              </router-link>
            </div>
          </div>

          <div class="article-author">
            <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">
              <img :src="article.user.avatar" alt="">
            </router-link>

            <div class="author-details">
              <div>
                <router-link class="author-name" :to="{name: 'UserArticles', params: {slug: article.user.id}}">
                  <span>{{article.user.name}}</span>
                </router-link>
              </div>
              <div class="article-count">
                <span>{{ article.created_at }}</span>
                <span>阅读 {{ article.view_count }}</span>
                <span>评论 {{ article.comments_count }}</span>
                <span>点赞 {{ article.likes_count }}</span>
              </div>
            </div>
          </div>

          <div class="article-body">
            <!-- <vue-markdown class="markdown-body">{{article.body}}</vue-markdown> -->
            <!-- <div class="markdown-body">{{article.body}}</div> wrong -->
            <div class="markdown-body" v-html="article.body"></div>
          </div>

          <div class="article-like">
            <!-- <el-button type="submit" id="btn-like" @click.prevent="click_like()"> -->
            <el-button type="submit" id="btn-like">
              <span v-if="!like">
                <i class="fa fa-thumbs-o-up"></i> 点赞 </span>
              <span v-if="like">
                <i class="fa fa-thumbs-up"></i> 已赞 </span>
              <span style="padding: 0 4px 0 4px"> | </span> {{article.likes_count}}
            </el-button>
          </div>

          <div class="article-comment" v-if="auth.check()">
            <img :src="auth.user.avatar" alt="">
            <form action="">
              <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment">
              </el-input>
              <!-- <el-button type="submit" @click.prevent="submit">评 论</el-button> -->
              <div class="send-comment">
                <el-button type="submit">评 论</el-button>
              </div>
            </form>
          </div>

          <div v-if="!auth.check()" class="login-to-comment">
            <p>
              <router-link :to="{path: '/user/login', query: { redirect_url: this.$route.path }}">
                登录参与评论
              </router-link>
            </p>
          </div>
          <div style="clear: both">
            <h4>{{article.comments_count ? article.comments_count + ' 条' : '暂无'}}评论</h4>
          </div>

          <div style="border-bottom: 1px solid #ddd; padding-top: 20px"></div>
          <div v-for="(comment, index) in comments">
            <div class="comment-author">
              <div style="float: left">
                <router-link :to="{name: 'UserArticles', params: {slug: comment.user.id}}">
                  <img :src="comment.user.avatar" alt="">
                </router-link>
              </div>
              <div class="comment-author-details">
                <div>
                  <router-link style="padding-top: 1px; font-size: 16px; color: #555" :to="{name: 'UserArticles', params: {slug: comment.user_id}}">
                    {{comment.user.name}}&nbsp;
                  </router-link>
                  <br>
                  <span># {{index + 1}} · 评论于 {{ comment.created_at }}</span>
                </div>
              </div>
              <div class="comment-details">
                {{comment.body}}
              </div>
              <ChildComment :childComment="comment.id" :article_id="article.id"></ChildComment>
              <div style="border-bottom: 1px solid #eee; padding-top: 15px"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <popup v-show="showPreview" @closePreview="closePreview"></popup> -->
    <!-- <popup v-show="showPreview"></popup> -->
  </div>
</template>

<script>
// import VueMarkdown from "vue-markdown";
import Marked from "marked";
import HotArticles from "../../components/HotArticles";
import HotTags from "../../components/HotTags";
import api from "../../api";
import { mapState } from "vuex";

export default {
  components: {
    // VueMarkdown,
    HotArticles,
    HotTags
  },
  data() {
    return {
      article: null,
      like: false,
      follow: false,
      comment: "",
      comments: "",
      showPreview: false
    };
  },
  computed: mapState({
    auth: state => state.account.auth
  }),
  mounted() {
    Marked.setOptions({
      highlight: function(code) {
        return require("highlight.js").highlightAuto(code).value;
      }
    });
    this.getArticle();
  },
  methods: {
    getArticle() {
      console.log("Show getArticle: id:: " + this.$route.params.id);
      api.getArticle(this.$route.params.id).then(res => {
        console.log("Show getArticle: res:: " + res.data.data.title);
        if (res.data.status) {
          this.article = res.data.data;
          this.article.body = Marked(res.data.data.body);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/markdown.css";
@import "~highlight.js/styles/atom-one-light.css";
.article {
  margin-top: 40px;
  .title {
    text-align: left;
    h2 {
      display: inline-block;
    }
  }
  a {
    color: #333;
    :hover {
      color: orangered;
    }
  }
  .to-edit {
    display: inline-block;
    font-size: 12px;
  }
}

.article-author {
  text-align: left;
  vertical-align: middle;
  margin-top: 24px;
  img {
    float: left;
    width: 36px;
    height: 36px;
    border: 0.6px solid #aaa;
    border-radius: 50%;
  }
  .author-details {
    text-align: left;
    margin-left: 48px;
    .article-count {
      color: #999;
      font-size: 12px;
      span {
        padding-right: 5px;
      }
    }
  }
}

.article-body {
  margin: 56px 0;
  line-height: 25px;
}

.article-like {
  border-top: 0.8px solid #eee;
  padding-top: 32px;
  #btn-like {
    background-color: #fff;
    color: tomato;
    font-size: 18px;
    padding: 8px 20px 8px 20px;
    border-radius: 100px;
    box-shadow: none;
    border: 1px solid tomato;
    cursor: pointer;
  }
  #btn-like:hover,
  #btn-like:focus,
  #btn-like:active:focus,
  #btn-like:active {
    border-radius: 100px;
    color: #fff;
    box-shadow: none;
    background-color: tomato;
  }
}

.article-comment {
  text-align: left;
  margin-top: 32px;
  img {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 0.8px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  form {
    padding-top: 8px;
    margin-left: 48px;
    .send-comment {
      text-align: right;
    }
    button {
      margin: 16px 0;
      background-color: #00b5ad;
      color: #fff;
      font-size: 16px;
      padding: 4px 16px 4px 16px;
      border-radius: 100px;
      box-shadow: none;
      border: 1px solid #00b5ad;
      &:hover {
        color: tomato;
        box-shadow: none;
        background-color: #fff;
        border: 1px solid tomato;
      }
    }
  }
}

.comment-author {
  clear: both;
  margin-top: 15px;
  position: relative;
  img {
    position: absolute;
    width: 36px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  .comment-author-details {
    padding-top: 6px;
    padding-left: 50px;
    color: #999;
    font-size: 13px;
  }
  .comment-details {
    padding: 20px 0 10px;
    color: #555;
  }
}

.login-to-comment {
  margin: 48px 0;
  border: 1px dashed #00b5ad;
  text-align: center;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  p {
    line-height: 80px;
  }
}

.btn-define {
  width: 90%;
  margin: 15px 0 15px;
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
</style>
