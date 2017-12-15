import Vue from "vue";
import api from "../../api";
import * as types from "../mutation-types";

const AUTH_ACCESS_TOKEN = "AuthAccessToken";
const AUTH_USER_ID = "AuthUserId";
const AUTH_USER = "AuthUser";

let localStorage = global.localStorage;
let JSON = global.JSON;

export default {
  state: {
    auth: {
      check() {
        return this.id != null && this.id != 0;
      },
      access_token: localStorage.getItem(AUTH_ACCESS_TOKEN),
      id: parseInt(localStorage.getItem(AUTH_USER_ID)) || 0,
      user: JSON.parse(localStorage.getItem(AUTH_USER))
    },
    register: {
      success: false,
      failure: null
    },
    login: {
      success: false,
      failure: null
    }
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, data) => {
      if (data.status == 1) {
        state.auth.access_token = data["access_token"];
        state.auth.id = data["id"];
        state.auth.user = data["user"];
        localStorage.setItem(AUTH_ACCESS_TOKEN, data.data.jwt_token.access_token);
        localStorage.setItem(AUTH_USER_ID, data.data.id);
        localStorage.setItem(AUTH_USER, JSON.stringify(data.data));
        return;
      }
      state.auth.access_token = null;
      state.auth.id = 0;
      state.auth.user = null;
      localStorage.removeItem(AUTH_ACCESS_TOKEN);
      localStorage.removeItem(AUTH_USER_ID);
      localStorage.removeItem(AUTH_USER);
    },
    ACCOUNT_REGISTER_SUCCESS: (state) => {
      state.register.success = true;
    },
    ACCOUNT_REGISTER_FAILED: (state, data) => {
      state.register.success = false;
      state.register.failure = data;
    },
    ACCOUNT_LOGIN_SUCCESS: (state) => {
      state.login.success = true;
    },
    ACCOUNT_LOGIN_FAILED: (state, data) => {
      state.login.success = false;
      state.login.failure = data;
    },
    ACCOUNT_EDIT_USER: (state, data) => {
      let user = JSON.parse(localStorage.getItem(AUTH_USER));
      user.real_name = data.real_name;
      user.city = data.city;
      localStorage.removeItem(AUTH_USER);
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
    },
    ACCOUNT_AVATAR_UPLOAD: (state, data) => {
      let user = JSON.parse(localStorage.getItem(AUTH_USER));
      user.avatar = data;
      localStorage.removeItem(AUTH_USER);
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
    }
  },
  actions: {
    accountRegister({
      commit
    }, params) {
      api.register(params).then(res => {
        if (res.data.status == 1) {
          commit(types.ACCOUNT_REGISTER_SUCCESS);
          return;
        }
        commit(types.ACCOUNT_REGISTER_FAILED, res.data);
      });
    },
    accountLogin({
      commit
    }, params) {
      api.login(params).then(res => {
        if (res.data.status == 1) {
          commit(types.ACCOUNT_AUTH_STATUS_CHANGED, res.data);
          commit(types.ACCOUNT_LOGIN_SUCCESS);
          return;
        }
        commit(types.ACCOUNT_LOGIN_FAILED, res.data);
      });
    },
    accountLogout({
      commit
    }) {
      api.logout().then(res => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, {
          status: 0
        });
      })
    }
  }
}
