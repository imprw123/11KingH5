<template>
  <div id="app">
    <mt-header fixed v-bind:title="pageName">
      <mt-button icon="back" slot="left" v-show="isShowBtn" @click="_back">返回</mt-button>
      <!-- <mt-button @click="handleClose">关闭</mt-button> -->

      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <transition name="fade" mode="out-in">
      <router-view @getShopCode="getShopCode" />
    </transition>

    <mt-tabbar
      fixed
      v-model="selected"
      v-if="pageName != '游戏礼包' && pageName != '会员福利' && pageName != '优惠券' && pageName != '热门活动'&& pageName != '礼包详情'&& pageName != '我的K值'&& pageName != '我的礼包'&& pageName != '绑定手机'&& pageName != '我的妖豆'&& pageName != '新闻详情'&& pageName != '下载11APP'&& pageName != '关注公众号'&& pageName != '热门'"
    >
      <mt-tab-item id="首页">
        <img
          slot="icon"
          v-bind:src="selected == '首页' ? 'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/homeCurrent.png':'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/home.png'"
        />
        首页
      </mt-tab-item>
      <mt-tab-item id="RPG">
        <img
          slot="icon"
          v-bind:src="selected == 'RPG' ? 'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/rpgCurrent.png':'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/rpg.png'"
        />
        RPG
      </mt-tab-item>
      <mt-tab-item id="妖豆">
        <img
          slot="icon"
          v-bind:src="selected == '妖豆' ? 'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/yaoCurrent.png':'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/yao.png'"
        />
        妖豆
      </mt-tab-item>
      <mt-tab-item id="DOTA">
        <img
          slot="icon"
          v-bind:src="selected == 'DOTA' ? 'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/dotaCurrent.png':'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/dota.png'"
        />
        DOTA
      </mt-tab-item>
      <mt-tab-item id="我">
        <img
          slot="icon"
          v-bind:src="selected == '我' ? 'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/myCurrent.png':'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/my.png'"
        />
        我
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Header } from "mint-ui";
import { Tabbar, TabItem } from "mint-ui";
export default {
  name: "App",
  data() {
    return {
      selected: "首页",
      pageName: "首页",
      isShowBtn: false
    };
  },
  mounted() {
    var _that=this;
    window.onresize = function() {
      _that.getRem(720, 100);
    };
    this.getRem(720, 100);
  },
  methods: {
    getRem: function(pwidth, prem) {
      var html = document.getElementsByTagName("html")[0];
      var oWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      html.style.fontSize = (oWidth / pwidth) * prem + "px";
    },
    getShopCode(pn, sel, istrue) {
      // console.log(pn)
      this.pageName = pn;
      this.selected = sel;
      this.isShowBtn = istrue;
    },
    _back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  },
  watch: {
    selected: function(newVal) {
      console.log(newVal);
      switch (newVal) {
        case "首页":
          this.$router.replace({ path: "/" });
          this.pageName = newVal;
          this.isShowBtn = false;
          break;
        case "RPG":
          this.$router.replace({ path: "/rpg" });
          this.pageName = newVal;
          this.isShowBtn = false;
          break;
        case "妖豆":
          this.$router.replace({ path: "/yao" });
          this.pageName = newVal;
          this.isShowBtn = false;
          break;
        case "DOTA":
          this.$router.replace({ path: "/dota" });
          this.pageName = newVal;
          this.isShowBtn = false;
          break;
        case "我":
          this.$router.replace({ path: "/my" });
          this.pageName = newVal;
          this.isShowBtn = false;
          break;
      }
    }
  }
};
</script>

<style>
body,
ul,
ol,
li,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
table,
td,
img,
div {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  font-size: 12px;
  font-family: "微软雅黑";
  background: #fff;
}

ul,
ol {
  list-style-type: none;
}
select,
input,
img,
select {
  vertical-align: middle;
}
em,
i {
  font-style: normal;
}
a {
  text-decoration: none;
  font-family: "Microsoft YaHei";
}
#app {
  margin: 0;
  border: 0;
  padding: 0;
  list-style: none;
  margin-top: 40px;
  margin-bottom: 55px;
}
.mint-tabbar {
  background-color: #282828 !important;
}
.mint-tab-item-label {
  color: #fff !important;
  font-size: 0.22rem !important;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #282828 !important;
}
.mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label {
  color: #e3bd84 !important;
}
.mint-header {
  background-color: #282828 !important;
}
.mint-header .mint-button {
  font-family: "微软雅黑" !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.noscroll {
  height: 100%;
  overflow: hidden;
}
</style>
