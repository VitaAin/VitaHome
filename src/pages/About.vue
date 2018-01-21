<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="about" v-if="about">
          <p class="about-title">关于</p>

          <h3>苍澜阁</h3>
          <div class="divider"></div>
          <p class="about-summary" v-html="about.summary"></p>

          <h3>项目地址</h3>
          <div class="divider"></div>
          <p>
            <a :href="about.github" target="_blank">GitHub地址</a>
          </p>

          <h3>个人标签</h3>
          <div class="divider"></div>
          <p>
            {{about.author.name}} &nbsp; {{about.author.sex}} &nbsp; 现居于 {{about.author.city}}, {{about.author.country}}
            <br>
             <span class="tag" v-for="tag in about.author.tags" :key="tag">{{tag}}</span>
          </p>

          <h3>兴趣爱好</h3>
          <div class="divider"></div>
          <p>
            <span class="hobby" v-for="hobby in about.author.hobbies" :key="hobby">{{hobby}}</span>
          </p>

          <h3>教育经历</h3>
          <div class="divider"></div>
          <p>
            <ul>
              <li v-for="edu in about.author.education" :key="edu.start">
                {{edu.start}} ~ {{edu.end}} &nbsp; {{edu.degree}} &nbsp; {{edu.school}} &nbsp; {{edu.subject}}
              </li>
            </ul>
          </p>

          <h3>技能介绍</h3>
          <div class="divider"></div>
          <p>
            <ul>
              <li>计算机技能
                <ul>
                  <li v-for="itSkill in about.author.skills.it" :key="itSkill">{{itSkill}}</li>
                </ul>
              </li>
              <li>其他技能
                <ul>
                  <li v-for="otherSkill in about.author.skills.other" :key="otherSkill">{{otherSkill}}</li>
                </ul>
              </li>
            </ul>
          </p>

          <h3>联系方式</h3>
          <div class="divider"></div>
          <p>
            <ul>
              <li>邮箱：{{about.author.email}}</li>
              <li>主页：
                <a :href="about.address" target="_blank">{{about.address}}</a>
              </li>
            </ul>
          </p>

          <h3>打赏一下</h3>
          <div class="divider"></div>
          <div class="payment">
            <p>感谢各位少侠~~~</p>
            <img src="../assets/pay_weixin.png" alt="">
            <img src="../assets/pay_ali.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      about: null
    };
  },
  mounted() {
    this.getSummary();
  },
  methods: {
    getSummary() {
      api.getAbout().then(res => {
        if (res.data.status == 1) {
          this.about = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  color: #555;
  line-height: 30px;
  text-align: left;
  .about-title {
    text-align: center;
    font-size: 25px;
    padding: 40px 0 40px;
  }
  p {
    padding: 10px 0 10px 20px;
  }
  a {
    color: #00b5ad;
  }
  h3 {
    margin-top: 10px;
    font-weight: bolder;
  }
  ul {
    padding-left: 20px;
  }
  .about-summary {
    text-align: justify;
  }
  .hobby,
  .tag {
    margin-right: 8px;
  }
  .payment {
    text-align: center;
    img {
      width: 160px;
      margin: 0 8px;
    }
  }
}
.divider {
  width: 100%;
  border-top: 1px solid #ddd;
  clear: both;
}
</style>