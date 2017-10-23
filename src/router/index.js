import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/Home'

Vue.use(Router)

//懒加载
const Home = resolve => require(["../pages/Home"], resolve);
const Common = resolve => require(["../pages/Common"], resolve);
const ArticleShow = resolve => require(["../pages/article/Show"], resolve);
const ArticleEdit = resolve => require(["../pages/article/Edit"], resolve);

export default new Router({
  routes: [{
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/",
      // name:""
      component: Common,
      children: [{
          path: "/",
          component: Home
        },
        {
          path: "/article",
          name: "Articles",
          component: Home
        }, {
          path: "/article/:id",
          name: "ArticleShow",
          component: ArticleShow
        }, {
          path: "/article/:id/edit",
          name: "ArticleEdit",
          component: ArticleEdit
        }
      ]
    }
  ]
})
