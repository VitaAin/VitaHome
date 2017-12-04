<template>
  <div class="content">
    <router-link class="content-title" :to="{name: 'ArticleShow', params: {id: article.id}}">
      <h4>{{article.title}}</h4>
    </router-link>

    <div class="content-from">
      <img :src="article.user.avatar" alt="">
      <div class="info">
        <router-link class="author-name" :to="{name: 'UserArticles', params: {id: article.user.id}}">
          {{article.user.name}}
        </router-link> 
        <span class="created-at">
          {{article.created_at}}
        </span>
      </div>
      
    </div>

    <div class="content-body">
       {{ article.abstract }} 
    </div>

    <div class="content-attr">
      <a v-for="tag in article.tags" :href="'/#/articles?tag=' + tag.name" id="btn-tag">
        # {{ tag.name }}
      </a>
      
      <div class="content-count">
        <span class="count-icon">
          <i class="fa fa-eye"></i>
           {{ article.view_count }}
        </span>
        <span class="count-icon">
          <i class="fa fa-comments"></i>
           {{ article.comments_count }}
        </span>
        <span class="count-icon">
          <i class="fa fa-heart"></i>
           {{ article.likes_count }}
        </span>
      </div>
    </div>

    <div class="content-divider"></div>
  </div>
</template>

<script>
export default {
  name: "article-item",
  props: {
    index: Number,
    article: null
  },
  data() {
    return {
    };
  },
  mounted() {
    // console.log("index: " + this.index + ", article: " + this.article.title);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 30px;
  a {
    color: #bbb;
    &:hover {
      color: orangered;
    }
  }
  .content-title {
    color: #222;
    text-align: left;
    letter-spacing: 1.2px;
    &:hover {
      color: orangered;
      text-decoration: underline;
    }
  }
  .content-from {
    margin-top: 6px;
    text-align: left;
    font-size: 12px;
    vertical-align: middle;
    img {
      float: left;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 0.6px solid #ccc;
    }
    .info{
      margin-left: 8px;
      display: inline-block;
      margin-top: 10px;
    }
    .author-name {
      color: #333;
      font-size: 14px;
      &:hover {
        color: orangered;
      }
    }
    .created-at {
      color: #aaa;
      margin-left: 8px;
    }
  }
  .content-body {
    width: 100%;
    margin-top: 14px;
    line-height: 25px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-attr {
    text-align: left;
    .content-count {
      display: inline-block;
      height: 100%;
      font-size: 12px;
      padding: 2px 8px;
      color: #999;
      text-align: left;
      .count-icon {
        margin-left: 8px;
      }
    }
  }
  .content-divider {
    width: 100%;
    height: 1px;
    background: #ddd;
    margin-top: 16px;
  }
}
#btn-tag {
  margin: 0;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid orangered;
  padding: 1px 4px;
  color: orangered;
  background: #fff;
  margin-right: 8px;
  line-height: 100%;
}
#btn-tag:hover {
  background: #eee;
  box-shadow: none;
  text-decoration: none;
}
</style>
