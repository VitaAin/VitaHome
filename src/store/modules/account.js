import Vue from "vue";
import api from "../../api";
import * as types from "../mutation-types";

let localStorage = global.localStorage;
let JSON = global.JSON;

const AUTH_TOKEN = "AuthToken";
const AUTH_ID = "AuthId";
const AUTH_USER = "AuthUser";

export default {
  state: {
    auth: {
      check() {
        return this.id != null && this.id != 0;
      },
      token: localStorage.getItem(AUTH_TOKEN),
      id: parseInt(localStorage.getItem(AUTH_ID)) || 0,
      user: JSON.parse(localStorage.getItem(AUTH_USER))
    },
    login: {
      status: false,
      message: null
    }
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, data) => {
      if (data.status == 1) {
        state.auth.token = data.token;
        state.auth.id = data.id;
        state.auth.user = data.user;
        localStorage.setItem(AUTH_TOKEN, data.token);
        localStorage.setItem(AUTH_ID, data.id + "");
        localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
        return;
      }
      state.auth.token = null;
      state.auth.id = 0;
      state.auth.user = null;
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_ID);
      localStorage.removeItem(AUTH_USER);
    },
    ACCOUNT_LOGIN_SUCCESS: (state) => {
      state.login.status = true;
      state.login.message = "OK";
    },
    ACCOUNT_LOGIN_FAILED: (state, msg) => {
      state.login.status = false;
      state.login.message = msg;
    }
  },
  actions: {
    accountLogin({
      commit
    }, params) {
      api.login(params).then(res => {
        if (res.data.status == 1) {
          commit(types.ACCOUNT_AUTH_STATUS_CHANGED, res.data);
          commit(types.ACCOUNT_LOGIN_SUCCESS);
          return;
        }
        commit(types.ACCOUNT_LOGIN_FAILED, res.data.message);
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
