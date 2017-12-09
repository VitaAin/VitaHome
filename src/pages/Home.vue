<template>
  <div>
    <page-header></page-header>

    <el-carousel :interval="4000" height="300px" v-if="bannerList && bannerList.length > 0">
      <el-carousel-item v-for="banner in bannerList" :key="banner.title">
        <p>{{ banner.desc }}</p>
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="25">
      <el-col :span="12" :offset="3">
        <div style="border: 1px solid #fff;padding-top: 10px"></div>

        <div class="content" v-for="(article, index) in articleList" :key="article.id">
          <article-item v-bind:index="index" v-bind:article="article"></article-item>
        </div>

        <div style="text-align: right; margin-top: 20px">
          <el-pagination layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
      
      <el-col :span="6" style="margin-top: 20px;">
        <hot-articles></hot-articles>
        <hot-tags></hot-tags>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { mapMutations } from "vuex";
import PageHeader from "../components/PageHeader";
import ArticleItem from "../components/ArticleItem";
import HotArticles from "../components/HotArticles";
import HotTags from "../components/HotTags";
import api from "../api";
let loadingInstance;

export default {
  name: "home",
  components: {
    PageHeader,
    ArticleItem,
    HotArticles,
    HotTags
  },
  data() {
    return {
      bannerList: [],
      articleList: [],
      total: null,
      tagName: "",
      page_size: 15
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.tagName = to.query;
  //   console.log("Home beforeRouteUpdate tagName: " + JSON.stringify(tagName));
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.tagName = to.query;
  //   console.log("Home beforeRouteLeave tagName: " + JSON.stringify(tagName));
  //   next();
  // },
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
        if (res.data.status == 1) {
          this.bannerList = res.data.data;
        }
      });
    },
    getArticles(page = null) {
      let params = {
        page: page,
        tag: this.tagName.tag
      };
      api.getArticles().then(res => {
        if (res.data.status == 1) {
          this.articleList = res.data.data.data;
          this.total = Number(res.data.data.total);
          for (let index in this.articleList) {
            this.articleList[index].abstract = this.articleList[index].body
              .trim()
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
      this.getArticles(page);
    }
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
</style>
