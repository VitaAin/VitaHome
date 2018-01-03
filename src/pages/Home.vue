<template>
  <div>
    <el-carousel :interval="4000" height="300px" v-if="bannerList && bannerList.length > 0">
      <el-carousel-item v-for="banner in bannerList" :key="banner.title">
        <p>{{ banner.desc }}</p>
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="25">
      <el-col :span="12" :offset="3" v-if="articleList && articleList.length>0">
        <div style="border: 1px solid #fff;padding-top: 10px"></div>

        <div class="content" v-for="(article, index) in articleList" :key="article.id">
          <article-item v-bind:index="index" v-bind:article="article"></article-item>
        </div>

        <div class="pagination-box" v-if="total">
          <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
      
      <el-col :span="6" class="side-bar" v-if="articleList && articleList.length>0">
        <hot-articles></hot-articles>
        <hot-tags></hot-tags>
      </el-col>

      <el-col :span="18" :offset="3" v-if="!articleList || articleList.length==0">
        <div class="no-article">
          少侠，还没有文章呐！<br>赶快去创建吧！～～
        </div>
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
      pageSize: 10
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.tagName = to.query.tag;
    console.log(
      "Home beforeRouteUpdate tagName: " + JSON.stringify(this.tagName)
    );
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.tagName = to.query.tag;
    console.log(
      "Home beforeRouteLeave tagName: " + JSON.stringify(this.tagName)
    );
    next();
  },
  mounted() {
    console.log("Home mounted");
    this.checkUserValidate();

    let options = {
      target: document.querySelector("#app"),
      text: "我正在玩儿命加载中......"
    };
    loadingInstance = Loading.service(options);

    // this.getBanners();
    this.getArticles();
  },
  methods: {
    checkUserValidate() {
      let validateUser = this.$route.query.validate;
      if (validateUser) {
        if (validateUser == "yes") {
          this.message(true);
        } else {
          this.message(false);
        }
      }
    },
    message(isOk) {
      this.$notify.success({
        title: isOk ? "激活成功" : "激活失败",
        message: isOk
          ? "感谢支持 苍澜阁，少侠快去登录吧！"
          : "请联系管理员(service@www.vitain.top)激活用户！",
        offset: 100
      });
    },
    getBanners() {
      api.getHomeBanners().then(res => {
        console.log("Home getBanners: res:: " + JSON.stringify(res.data));
        if (res.data.status == 1) {
          this.bannerList = res.data.data;
        }
      });
    },
    getArticles(page = null) {
      if (this.$route.query.tag) {
        this.tagName = this.$route.query.tag;
      }
      let params = {
        page: page,
        tag: this.tagName
      };
      console.log("params:: " + JSON.stringify(params));
      api.getArticles(params).then(res => {
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
  },
  watch: {
    tagName: function() {
      this.getArticles(null);
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

.no-article {
  font-size: 24px;
  color: #888;
  margin-top: 20%;
  text-align: center;
}
.pagination-box {
  text-align: right;
  margin-top: 20px;
}
.side-bar {
  margin-top: 20px;
}
</style>
