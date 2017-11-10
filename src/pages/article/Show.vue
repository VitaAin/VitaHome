<template>
  <div v-if="article">
    <el-row :gutter="25">
      <el-col :span="10" :offset="5">
        <div class="article">
          <p>{{article.title}}</p>
          <!-- <div class="article-edit" v-if="auth.id == article.user.id"> -->
          <div class="article-edit" v-if="article.user.id">
            <router-link :to="{name: 'ArticleEdit', params: {id: this.$route.params.id}}">
              <span style="padding-left: 10px; font-size: larger">
                <i class="fa fa-edit"></i>
              </span>
            </router-link>
          </div>
          <div class="article-author">
            <router-link style="float: left" :to="{name: 'UserArticles', params: {slug: article.user.id}}">
              <img :src="article.user.avatar" alt="">
            </router-link>
            <div class="article-author-detail">
              <div>
                <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}" id="btn-topic">
                  作者
                </router-link>
                <span>{{article.user.name}}</span>
              </div>
              <div class="article-detail">
                <span>创作于 {{ article.created_at }}</span>
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
          <!-- <div class="article-comment" v-if="auth.check()"> -->
          <div class="article-comment">
            <!-- <img :src="auth.user.avatar" alt=""> -->
            <form action="">
              <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment">
              </el-input>
              <!-- <el-button type="submit" @click.prevent="submit">评 论</el-button> -->
              <el-button type="submit">评 论</el-button>
            </form>
          </div>
          <!-- <div v-if="! auth.check()" class="article-login">
            <p>
              <router-link :to="{path: '/user/login', query: { redirect_url: this.$route.path }}">
                登录参与评论
              </router-link>
            </p>
          </div> -->
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
              <div class="comment-author-detail">
                <div>
                  <router-link style="padding-top: 1px; font-size: 16px; color: #555" :to="{name: 'UserArticles', params: {slug: comment.user_id}}">
                    {{comment.user.name}}&nbsp;
                  </router-link>
                  <br>
                  <span># {{index + 1}} · 评论于 {{ comment.created_at }}</span>
                </div>
              </div>
              <div class="comment-detail">
                {{comment.body}}
              </div>
              <ChildComment :childComment="comment.id" :article_id="article.id"></ChildComment>
              <div style="border-bottom: 1px solid #eee; padding-top: 15px"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="sidebar-author">
          <p>作者： {{article.user.name}}</p>
          <div style="border-bottom: 1px solid #eee; padding-top: 0px"></div>
          <img :src="article.user.avatar" alt="">
          <el-row>
            <el-col :span="8">
              <h2>{{article.user.followers_count}}</h2>
              <p>关注</p>
            </el-col>
            <el-col :span="8">
              <h2>{{article.user.comments_count}}</h2>
              <p>评论</p>
            </el-col>
            <el-col :span="8">
              <h2>{{article.user.articles_count}}</h2>
              <p>文章</p>
            </el-col>
          </el-row>
          <!-- <el-button class="btn-define" @click.prevent="click_follow()"> -->
          <el-button class="btn-define">
            <span v-if="!follow">
              <i class="fa fa-plus"></i> 关注 Ta </span>
            <span v-if="follow">
              <i class="fa fa-minus"></i> 已关注 </span>
          </el-button>
          <!-- <el-button v-if="follow" class="btn-define" style="margin-top: 0" @click.prevent="click_follow()"> -->
          <el-button v-if="follow" class="btn-define" style="margin-top: 0">
            <span> <i class="fa fa-envelope-o"></i> 发送私信 </span>
          </el-button>
        </div>
        <hot-articles></hot-articles>
        <hot-tags></hot-tags>
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
  p {
    font-size: 30px;
    font-weight: bold;
    float: left;
    margin-bottom: 10px;
  }
  a {
    color: tomato;
  }
  .article-edit {
    padding-top: 5px;
  }
}

.article-author {
  clear: both;
  margin-top: 30px;
  position: relative;
  img {
    position: absolute;
    width: 48px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  .article-author-detail {
    padding-top: 10px;
    padding-left: 65px;
    .article-detail {
      padding-top: 6px;
      color: #999;
      font-size: 13px;
      span {
        padding-right: 5px;
      }
    }
  }
}

.article-body {
  padding-top: 35px;
  line-height: 25px;
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
  .comment-author-detail {
    padding-top: 6px;
    padding-left: 50px;
    color: #999;
    font-size: 13px;
  }
  .comment-detail {
    padding: 20px 0 10px;
    color: #555;
  }
}

#btn-topic {
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid orangered;
  padding: 2px 2px 2px 5px;
  margin-right: 12px;
  font-weight: 500;
  color: orangered;
}

.article-like {
  padding-top: 70px;
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
  padding-top: 30px;
  img {
    position: absolute;
    width: 36px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 5px;
  }
  form {
    padding-top: 8px;
    padding-left: 55px;
    button {
      margin-top: 15px;
      margin-bottom: 20px;
      float: right;
      background-color: #00b5ad;
      color: #fff;
      font-size: 17px;
      padding: 5px 15px 5px 15px;
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

.article-login {
  margin: 40px 0 40px;
  padding-top: 40px;
  border: 1px dashed #00b5ad;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  position: relative;
  a {
    position: absolute;
    font-size: smaller;
    left: 40%;
  }
}

.sidebar-author {
  text-align: center;
  margin-top: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  p {
    padding: 8px 0 8px 0;
    font-size: 15px;
  }
  img {
    width: 100px;
    border: 1px solid #aaa;
    border-radius: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  h2 {
    color: #00b5ad;
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