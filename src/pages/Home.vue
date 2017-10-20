<template>
  <div>
    <page-header></page-header>
    <el-carousel :interval="4000" height="300px" v-if="bannerList && bannerList.length > 0">
      <el-carousel-item v-for="banner in bannerList" :key="banner.title">
        <p>{{ banner.desc }}</p>
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="25">
      <el-col :span="10" :offset="5">
        <div style="border: 1px solid #fff;padding-top: 10px"></div>
        <div class="content" v-for="(article, index) in articleList">
          <!-- <article-item i="index" atc="article"></article-item> -->

          <div class="content-body">
            <router-link class="content-title" :to="{name: 'ArticleShow', params: {slug: article.id}}">
              <h3>{{article.title}}</h3>
            </router-link>
            <div style="padding-top: 5px; font-size: 13px; color: #bbb">由
              <router-link :to="{name: 'UserArticles', params: {slug: article.user.id}}">{{article.user.name}}</router-link> 发表于 {{article.created_at}}</div>
            <div class="content-body-body">
              {{ article.abstract }} ...
            </div>
            <div style="padding-top: 15px">
              <div v-for="tag in article.tags" style="float: left">
                <a v-if="tag" :href="'/#/articles?tag=' + tag.name" id="btn-topic">
                  # {{ tag.name }}
                </a>
              </div>
              <div class="content-count">
                <span style="padding-right: 4px">
                  <i class="fa fa-eye"></i>
                </span>
                <span>{{ article.view_count }}</span>
                <span style="padding-right: 4px; margin-left: 10px">
                  <i class="fa fa-comments"></i>
                </span>
                <span>{{ article.comments_count }}</span>
                <span style="padding-right: 4px; margin-left: 10px">
                  <i class="fa fa-heart"></i>
                </span>
                <span>{{ article.likes_count }}</span>
              </div>
            </div>
          </div>
          <!-- <div style="border-bottom: 1px solid #ddd; padding-top: 50px"></div> -->
        </div>
        <div style="text-align: right; margin-top: 20px">
          <el-pagination layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="4" style="margin-top: 20px;">
        <!-- <hot-topics></hot-topics> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import PageHeader from "../components/PageHeader";
import ArticleItem from "../components/ArticleItem";
import api from "../api";
let loadingInstance;

export default {
  name: "home",
  components: {
    PageHeader,
    ArticleItem
  },
  data() {
    return {
      bannerList: [],
      articleList: [],
      total: null,
      page_size: 15
    };
  },
  mounted() {
    console.log("Home mounted");

    let options = {
      target: document.querySelector("#app"),
      text: "玩儿命加载中......"
    };
    loadingInstance = Loading.service(options);

    // this.getBanners();
    this.getArticles();
  },
  methods: {
    getBanners() {
      api.getHomeBanners().then(res => {
        console.log("Home getBanners: res:: " + JSON.stringify(res.data));
        if (res.data.status) {
          this.bannerList = res.data.banners;
        }
      });
    },
    getArticles() {
      api.getArticles().then(res => {
        console.log(
          "Home getArticles: res:: " +
            res.data.data.articles.length +
            ", " +
            res.data.status
        );
        if (res.data.status) {
          this.articleList = res.data.data.articles;
          for (let index in this.articleList) {
            this.articleList[index].abstract = this.articleList[index].body
              .substring(0, 150)
              .replace(/<\/?.+?>/g, "")
              .replace(/ /g, "")
              .replace(/&nbsp;/g, " ")
              .replace(/#/g, "");
          }
          loadingInstance.close();
        }
      });
    },
    handleCurrentChange(page) {
      // this.get_articles(page);
    },
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item p {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

// .content-body {
//   width: 95%;
//   margin-top: 30px;
//   a {
//     color: #bbb;
//     &:hover {
//       color: #00b5ad;
//     }
//   }
//   .content-title {
//     color: #222;
//     &:hover {
//       color: #00b5ad;
//       text-decoration: underline;
//     }
//   }
//   .content-body-body {
//     padding-top: 12px;
//     line-height: 25px;
//   }
// }
// .content-count {
//   float: left;
//   font-size: 14px;
//   padding-top: 2px;
//   color: #999;
//   padding-left: 5px;
// }
// #btn-topic {
//   border-radius: 4px;
//   font-size: 13px;
//   border: 1px solid orangered;
//   padding: 2px 7px 2px;
//   margin-right: 12px;
//   font-weight: 500;
//   color: orangered;
// }
// #btn-topic:hover {
//   color: #00b5ad;
//   border-radius: 4px;
//   border: 1px solid #00b5ad;
//   box-shadow: none;
//   text-decoration: none;
// }
</style>
