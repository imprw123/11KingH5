<template>
  <div class="my">
    <div class="inMyBox">
      <div class="inMyBoxMain">
        <div class="unload" v-show="!userInforFlag" v-on:click="_login">登录</div>
        <div class="userTx" v-show="userInforFlag">
          <img v-bind:src="icon" alt />
          <p>{{user_name}}</p>
          <a href="javascript:;" class="_loginOut" v-on:click="_loginOut">退出</a>
        </div>
        <div class="myBrithday" @click="openPicker">
          <i class="brithdayIcon"></i>
          <span
            v-if="birthday == '' || birthday == null "
            v-html="birthday == '' || birthday == null  ? '设置我的生日':birthday"
          ></span>
          <span class="show_year">
            <p v-if="birthday !='' || birthday !=null ">{{birthday}}</p>
          </span>
        </div>
        <div class="dateCurrent">
          <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="pickerValue"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            :endDate="new Date()"
            :startDate="new Date('1960/1/1')"
            @confirm="handleConfirm"
            @cancel="checkinCancel"
          ></mt-datetime-picker>
        </div>
      </div>
    </div>

    <div class="myTab">
      <div class="inMyTab">
        <div class="tab">
          <router-link :to="{'path':'/mykk'}">
            <p>{{k_value}}</p>
            <p>我的K值</p>
          </router-link>
          <em></em>
        </div>
        <div class="tab">
          <router-link :to="{'path':'/myYaoDou'}">
            <p>{{yd_value}}</p>
            <p>我的妖豆</p>
          </router-link>
          <em></em>
        </div>
        <div class="tab">
          <div v-if="mobile != '0'" @click="_hasBindPhone">
            <p>{{mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
            <p>已绑定</p>
          </div>

          <router-link :to="{'path':'/bindPhone'}" v-if="mobile == '0'">
            <p>{{mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
            <p>绑定手机</p>
          </router-link>
        </div>
      </div>
    </div>

    <div class="activePage">
      <ul>
        <!-- <li>
          <i class="kk"></i>
          <span>我的K值</span>
        </li>-->
        <li>
          <i class="cards"></i>
          <span>
            <router-link :to="{'path':'/yhq'}">我的优惠券</router-link>
          </span>
        </li>
        <li>
          <i class="order"></i>
          <span>
            <router-link :to="{'path':'/giftRecordList'}">我的礼包</router-link>
          </span>
        </li>
        <li @click="wxOpen('active')">
          <i class="wz"></i>
          <span>妖妖KING章程</span>
        </li>
        <li>
          <a href="javascript:;" @click="wxOpen('wx')">
            <i class="focus"></i>
            <span>关注公众号</span>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="loadApp">
            <i class="app"></i>
            <span>11对战平台APP</span>
          </a>
        </li>
        <li>
          <i class="link"></i>
          <span>
            <a href="tel:021-23099155">联系客服</a>
          </span>
        </li>
      </ul>
      <mt-popup v-model="changeVisble1" position="center">
        <img v-lazy="'https://img.5211game.com/Base/bg/dingyue.jpg'" class="wxCode" />
      </mt-popup>

      <mt-popup v-model="changeVisble2" position="right">
        <div class="boxActive">
          <h2>妖妖KING细则</h2>
        <p>1.妖妖KING等级对照表</p>
        <p>K1 100000 K值</p>
        <p>K2 500000 K值</p>
        <p>K3 1500000 K值</p>
        <p>K4 5000000 K值</p>
        <p>K5 10000000 K值</p>
        <p>K6 20000000 K值</p>
        <p>2.每消费1RMB=100K值，在11平台进行消费的账号均可累计K值，有特殊说明的除外</p>
        <p>3.KING值有效期为365天，如您在2019年12月6日消费1元获得100K值，则该K值会365天后失效（具体变化可在会员中心查看K值记录）</p>
        <p>4.KING会员可领取对应等级的福利及礼包（详情见会员中心，依实际情况调整）</p>
        <p>5.不同等级KING会员，兑换部分礼包时，所享受的折扣价格不同</p>
        <p>6.KING会员可在会员中心设置生日，每年生日月可领取生日礼包，生日仅可设置一次</p>
        <p>7.KING会员等级在本账号累计，不可转让</p>
        <p>8.如使用赠送功能，则赠送者账号增加对应K值，被赠送者不可增加</p>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import $ from "jquery";
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      LoginUrl: "https://passport.9211.com/Login/IndexH5",
      LogoutUrl: "https://passport.9211.com/login/logout",
      SiteId: 50008,
      ServerId: 7,
      userInforFlag: false,
      k_value: 0,
      mobile: "",
      pickerValue: "",
      isClicked: false,
      year: "",
      birthday: "",
      changeVisble1:false,
      changeVisble2:false,
      popupVisible: false
    };
  },
  created() {
    if (this.$route.query.st) {
      window.localStorage.setItem("loginInfo", this.$route.query.st);
      window.location = window.location.href.substring(
        window.location.href.indexOf("?"),
        window.location.href.indexOf("&")
      );
      Toast({
        message: "登录成功!",
        iconClass: "icon icon-success"
      });
      this._GetUserInfo();
    }
  },
  mounted() {
    this.$emit("getShopCode", "我", "我", false);
    if (window.localStorage.getItem("loginInfo")) {
      this.userInforFlag = true;
    }
    this._GetUserInfo();
  },
  computed: {
    ...mapState({
      user_name: state => state.userName,
      icon: state => state.userImgSrc,
      yd_value: state => state.myYaoDou
    })
  },
  methods: {
    stringFormat: function() {
      if (arguments.length == 0) return null;
      var str = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        str = str.replace(re, arguments[i]);
      }
      return str;
    },
    _login: function() {
      window.location.href = this.stringFormat(
        "{0}?siteid={1}&returnUrl={2}&srvid={3}",
        this.LoginUrl,
        this.SiteId,
        escape(window.location.href),
        this.ServerId
      );
    },
    _loginOut: function() {
      window.location.href = this.stringFormat(
        "{0}?returnurl={1}",
        this.LogoutUrl,
        escape(window.location.href)
      );
      window.localStorage.removeItem("loginInfo", "");
    },
    _GetUserInfo: function() {
      var _that = this;
      this.$axios("post", this.$ports.my.GetUserInfo, {
        st: window.localStorage.getItem("loginInfo")
      })
        .then(function(response) {
          //  debugger;
          console.log(response.data);
          _that.$store.dispatch("USERNAME", response.data.user_name);
          _that.$store.dispatch("USERIMGSRC", response.data.icon);
          _that.birthday = response.data.birthday;
          _that.$store.dispatch("MYYAODOU", response.data.yd_value);
          var num =
            Number(response.data.yd_value) - Number(response.data.yd_free);
          _that.$store.dispatch("REALYYAODOU", num);
          _that.k_value = response.data.k_value;
          // debugger;
          if (!response.data.mobile) {
            _that.mobile = "0";
          } else {
            _that.mobile = response.data.mobile;
          }
        })
        .catch(function(error) {
          console.log(error.toString());
        });
    },
    //已绑定手机提示
    _hasBindPhone: function() {
      Toast({
        message: "您已经绑定手机请去网页5211中心修改!",
        iconClass: "icon icon-success"
      });
    },
    openPicker() {
      if (!window.localStorage.getItem("loginInfo")) {
        Toast({
          message: "请先去登陆!",
          iconClass: "icon icon-success"
        });
        return false;
      }
      if (this.birthday == "" || this.birthday == null) {
        $("html,body").toggleClass("noscroll");
        this.$refs.picker.open();
      } else {
        Toast({
          message: "您已经设置过生日了!",
          iconClass: "icon icon-success"
        });
      }
    },
    handleConfirm(value) {
      console.log(value);
      $("html,body").toggleClass("noscroll");
      const d = new Date(value);
      this.year =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this._BindBirthday(this.year);
      this.isClicked = true;
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    checkinCancel() {
      console.log("aa");
      $("html,body").toggleClass("noscroll");
      this.$refs.picker.close();
    },
    _BindBirthday: function(val) {
      this.$axios("post", this.$ports.my.BindBirthday, {
        st: window.localStorage.getItem("loginInfo"),
        tm: val
      })
        .then(response => {
          console.log(response);
          this._GetUserInfo();
        })
        .catch(error => {
          console.log(error);
        });
    },
    wxOpen: function(val) {
      if(val == 'wx'){
         this.changeVisble1 = this.popupVisible=true;
      }else if(val == 'active'){
          this.changeVisble2 = this.popupVisible=true;
      }
      
      // var ua = navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) != "micromessenger") {

      // } else {
      //   Toast({
      //     message: "仅支持在微信浏览器内打开!",
      //     iconClass: "icon icon-success"
      //   });
      // }
    },
    loadApp: function() {
      this.$router.push({ path: "/loadApp" });
    }
  }
};
</script>


<style  scoped>
.my {
  width: 7.2rem;
  background-color: #eeeeee;
  padding-bottom: 1.5rem;
}
.inMyBox {
  width: 7.2rem;
  height: 2rem;
  background: #282828;
  position: relative;
  margin-bottom: 1.38rem;
}
._loginOut {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  color: red;
  font-size: 0.22rem;
  font-family: "微软雅黑";
}
.inMyBoxMain {
  width: 6.6rem;
  height: 3rem;
  background-color: #fff;
  border-radius: 0.15rem;
  position: absolute;
  top: 0.2rem;
  left: 50%;
  margin-left: -3.3rem;
}
.myTab {
  width: 6.6rem;
  height: 1.4rem;
  background: #fff;
  border-radius: 0.15rem;
  margin: 0 auto;
  margin-bottom: 0.18rem;
}
.unload {
  width: 2rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #d5b47e;
  text-align: center;
  font-size: 0.3rem;
  margin: 0 auto;
  margin-top: 1rem;
  color: #fff;
  border-radius: 0.1rem;
}
.inMyTab {
  width: 5.4rem;
  height: 1.4rem;
  margin: 0 auto;
  display: flex;
}
.inMyTab .tab {
  flex: 1;
  text-align: center;
  position: relative;
  padding-top: 0.1rem;
}
.inMyTab .tab a {
  color: #000;
  font-family: "微软雅黑";
}
.inMyTab .tab p {
  height: 0.5rem;
  line-height: 0.6rem;
}
.inMyTab .tab em {
  width: 0.02rem;
  height: 0.64rem;
  background-color: #eeeeee;
  position: absolute;
  top: 0.4rem;
  right: 0rem;
}
.activePage {
  width: 6.1rem;
  background-color: #fff;
  border-radius: 0.15rem;
  margin: 0 auto;
  padding: 0.36rem 0.25rem 0rem 0.25rem;
  overflow: hidden;
  zoom: 1;
}
.activePage span {
  font-size: 0.26rem;
  color: #1d1d1d;
}
.activePage span a {
  display: inline-block;
  width: 100%;
  font-size: 0.26rem;
  color: #1d1d1d;
}
.activePage ul li {
  margin-bottom: 0.45rem;
  padding-left: 0.55rem;
  position: relative;
}
.activePage ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.activePage ul li i {
  position: absolute;
  top: 0px;
  left: 0px;
}
.activePage ul li i.kk {
  width: 0.32rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/k.png);
  background-size: cover;
}
.activePage ul li i.cards {
  width: 0.31rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/card.png);
  background-size: cover;
}
.activePage ul li i.order {
  width: 0.27rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/order.png);
  background-size: cover;
}
.activePage ul li i.wz {
  width: 0.29rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/zhangcheng.png);
  background-size: cover;
}
.activePage ul li i.focus {
  width: 0.32rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/focus.png);
  background-size: cover;
}
.activePage ul li i.app {
  width: 0.28rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/11app.png);
  background-size: cover;
}

.activePage ul li i.link {
  width: 0.28rem;
  height: 0.31rem;
  display: inline-block;
  background: url(../assets/link.png);
  background-size: cover;
}
.inMyBoxMain .userTx {
  width: 1.4rem;
  height: 1.9rem;
  margin: 0 auto;
  margin-top: 0.5rem;
}
.inMyBoxMain .userTx img {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.inMyBoxMain .userTx p {
  height: 0.5rem;
  line-height: 0.65rem;
  text-align: center;
  font-size: 0.22rem;
  font-weight: bold;
  color: #000;
}
.myBrithday {
  text-align: center;
  width: 3.6rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.myBrithday i.brithdayIcon {
  width: 0.21rem;
  height: 0.22rem;
  background: url(../assets/brithday.png);
  background-size: cover;
  display: inline-block;
  position: relative;
  top: 0.035rem;
  margin-right: 0.1rem;
}
.myBrithday span {
  display: inline-block;
}
.wxCode {
  width: 5rem;
  height: 5rem;
}
.boxActive{
  width:5.6rem;
  padding: 0.5rem;
  text-align: center;
}
.boxActive p{
  line-height: 0.4rem;
  text-align: justify;
}
</style>