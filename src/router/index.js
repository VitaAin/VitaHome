import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router)

//懒加载
const Home = resolve => require(["../pages/Home"], resolve);
const Login = resolve => require(["../pages/account/Login"], resolve);
const Register = resolve => require(["../pages/account/Register"], resolve);
const VerifyEmail = resolve => require(["../pages/account/VerifyEmail"], resolve);
const About = resolve => require(["../pages/About"], resolve);
const Common = resolve => require(["../pages/Common"], resolve);
const ArticleShow = resolve => require(["../pages/article/Show"], resolve);
const ArticleEdit = resolve => require(["../pages/article/Edit"], resolve);
const ArticleCreate = resolve => require(["../pages/article/Create"], resolve);
const UserOverview = resolve => require(["../pages/user/UserOverview"], resolve);
const UserArticles = resolve => require(["../pages/user/UserArticles"], resolve);
const UserReplies = resolve => require(["../pages/user/UserReplies"], resolve);
const UserFollowUsers = resolve => require(["../pages/user/UserFollowUsers"], resolve);
const UserLikeArticles = resolve => require(["../pages/user/UserLikeArticles"], resolve);
const UserImages = resolve => require(["../pages/user/UserImages"], resolve);
const EditCommon = resolve => require(["../pages/user/edit/EditCommon"], resolve);
const EditUserInfo = resolve => require(["../pages/user/edit/EditUserInfo"], resolve);
const EditUserAvatar = resolve => require(["../pages/user/edit/EditAvatar"], resolve);
const EditUserPassword = resolve => require(["../pages/user/edit/EditPassword"], resolve);
const Search = resolve => require(["../pages/Search"], resolve);
const NotificationsShow = resolve => require(["../pages/notification/NotificationsShow"], resolve);
const NoticeReply = resolve => require(["../pages/notification/NoticeReply"], resolve);
const NoticeFollow = resolve => require(["../pages/notification/NoticeFollow"], resolve);
const NoticeLike = resolve => require(["../pages/notification/NoticeLike"], resolve);
const Mobile = resolve => require(["../pages/Mobile"], resolve);

const router = new Router({
  routes: [{
    path: "/",
    component: Common,
    children: [{
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
        path: '/verify_email/:slug',
        name: 'VerifyEmail',
        component: VerifyEmail
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      },
      {
        path: "/mobile",
        name: "Mobile",
        component: Mobile
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
        path: "/user/:id",
        component: UserOverview,
        children: [{
            path: "/",
            component: UserArticles
          },
          {
            path: "articles",
            name: "UserArticles",
            component: UserArticles
          },
          {
            path: "replies",
            name: "UserReplies",
            component: UserReplies
          }, {
            path: "follows_users",
            name: "UserFollowUsers",
            component: UserFollowUsers
          }, {
            path: "likes_articles",
            name: "UserLikeArticles",
            component: UserLikeArticles
          }, {
            path: "images",
            name: "UserImages",
            component: UserImages
          }
        ]
      },
      {
        path: "/user/:id",
        component: EditCommon,
        children: [{
            path: "/",
            component: EditUserInfo
          },
          {
            path: "/edit_info",
            name: "EditUserInfo",
            component: EditUserInfo
          },
          {
            path: "/edit_avatar",
            name: "EditUserAvatar",
            component: EditUserAvatar
          }, {
            path: "/edit_password",
            name: "EditUserPassword",
            component: EditUserPassword
          }
        ]
      },
      {
        path: "/about",
        name: "About",
        component: About
      },
      {
        path: "/user/:id",
        component: NotificationsShow,
        children: [{
            path: "/",
            component: NoticeReply
          },
          {
            path: "notice_reply",
            name: "NoticeReply",
            component: NoticeReply
          },
          {
            path: "notice_follow",
            name: "NoticeFollow",
            component: NoticeFollow
          }, {
            path: "notice_like",
            name: "NoticeLike",
            component: NoticeLike
          }
        ]
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.requireAuth)) {
    const auth = store.state.account.auth;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.check()) {
      next({
        path: '/user/login',
        query: {
          redirect_url: to.fullPath
        }
      });
      return;
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
