<template>
  <div>
    <el-row :gutter="25">
      <el-col :span="6" :offset="3">
        <div class="user-info">
          <ul>
            <li>
              <router-link :to="{name: 'EditUserInfo', params: {id: id}}" :style="[path == 'edit' ? active : '']">
                <i class="text-md fa fa-list-ul"></i> 个人资料
              </router-link>
            </li>

            <li>
              <router-link :to="{name: 'EditUserAvatar', params: {id: id}}" :style="[path == 'edit_avatar' ? active : '']">
                <i class="fa fa-picture-o" aria-hidden="true"></i> 更换头像
              </router-link>
            </li>

            <!-- <li>
              <router-link :to="{name: 'EditUserAvatar', params: {id: id}}" :style="[path == 'edit_avatar' ? active : '']">
                <i class="fa fa-picture-o" aria-hidden="true"></i> 账号安全
              </router-link>
            </li> -->

            <!-- <li>
              <router-link :to="{name: 'EditUserPassword', params: {id: id}}" :style="[path == 'edit_password' ? active : '']">
                <i class="fa fa-lock" aria-hidden="true"></i> 修改密码
              </router-link>
            </li> -->
          </ul>
        </div>
      </el-col>

      <el-col :span="12">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      active: {
        color: "#00b5ad"
      },
      path: ""
    };
  },
  computed: mapState({
    id: state => state.account.auth.id
  }),
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  text-align: center;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  ul {
    li {
      list-style: none;
      padding: 12px 0 12px;
      border-bottom: 1px solid #eee;
      a {
        color: #333;
        font-size: 14px;
        // &:hover,
        // &:active,
        // &:focus {
        //   color: #00b5ad;
        // }
      }
    }
  }
}
</style>
