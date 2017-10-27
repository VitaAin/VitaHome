import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载
const Home = resolve => require(["../pages/Home"], resolve);
const Login = resolve => require(["../pages/account/Login"], resolve);
const Register = resolve => require(["../pages/account/Register"], resolve);
const About = resolve => require(["../pages/About"], resolve);
const Common = resolve => require(["../pages/Common"], resolve);
const ArticleShow = resolve => require(["../pages/article/Show"], resolve);
const ArticleEdit = resolve => require(["../pages/article/Edit"], resolve);
const ArticleCreate = resolve => require(["../pages/article/Create"], resolve);

export default new Router({
  routes: [{
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/user/login",
      name: "Login",
      component: Login
    },
    {
      path: "/user/register",
      name: "Register",
      component: Register
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
        },
        {
          path: "/article/create",
          name: "ArticleCreate",
          component: ArticleCreate
        },
        {
          path: "/article/:id",
          name: "ArticleShow",
          component: ArticleShow
        },
        {
          path: "/article/:id/edit",
          name: "ArticleEdit",
          component: ArticleEdit
        },
        {
          path: "/about",
          name: "About",
          component: About
        }
      ]
    }
  ]
})
