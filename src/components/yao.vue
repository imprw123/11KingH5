<template>
  <div class="yao">
    <div class="inYao">
      <div class="YaoNumber">{{yd}}</div>
      <a
        href="javascript:;"
        class="sign"
        v-text="today_signed == false? '未签到':'已签到'"
        @click="_Sign"
      ></a>
      <div class="yaoTitle">签可获得K值及妖豆，连续签到有惊喜哦</div>
    </div>
    <div class="tabchange">
      <div class="tabchangeBox">
        <p class="tabNumber">{{yd_yestoday_get}}</p>
        <p>昨日或得妖豆</p>
        <em></em>
      </div>
      <div class="tabchangeBox">
        <p class="tabNumber">{{yd_yestoday_use}}</p>
        <p>昨日消耗妖豆</p>
        <em></em>
      </div>
      <div class="tabchangeBox">
        <p class="tabNumber">{{yd_expired}}</p>
        <p>即将过期的妖豆</p>
      </div>
    </div>
    <div class="pag">
      <ul>
        <li>
          <img src="../assets/zhekou.png" alt />
        </li>
        <li class="current">
          <img src="../assets/manjian.png" alt />
        </li>
        <li>
          <img src="../assets/tdproduct.png" alt />
        </li>
        <li class="current">
          <img src="../assets/jqqd.png" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "dota",
  data() {
    return {
      msg: "",
      yd_expired: 0,
      yd_yestoday_get: 0,
      yd_yestoday_use: 0,
      yd: 0,
      today_signed: false
    };
  },
  mounted() {
    this.$emit("getShopCode", "妖豆", "妖豆", false);
    this._GetMyYd();
  },
  methods: {
    _GetMyYd() {
      this.$axios("post", this.$ports.yd.GetMyYd, {
        st: window.localStorage.getItem("loginInfo")
      })
        .then(response => {
          console.log(response);
          if (response.errCode == 0) {
            this.yd_expired = response.data.yd_expired;
            this.yd_yestoday_get = response.data.yd_yestoday_get;
            this.yd_yestoday_use = response.data.yd_yestoday_use;
            this.yd = response.data.yd;
            this.today_signed = response.data.today_signed;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    _Sign() {
      this.$axios("post", this.$ports.yd.Sign, {
        st: window.localStorage.getItem("loginInfo")
      })
        .then(response => {
          console.log(response);
          if (response.errCode == 0) {
            this._GetMyYd();
          } else {
            Toast({
              message: response.msg,
              iconClass: "icon icon-success"
            });
            this._GetMyYd();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.yao {
  width: 7.2rem;
  background-color: #eeeeee;
  padding-bottom: 2rem;
}
.inYao {
  width: 7.2rem;
  height: 2.5rem;
  background-color: #282828;
}
.YaoNumber {
  width: 100%;
  color: #c1975c;
  text-align: center;
  font-size: 0.62rem;
}
.sign {
  background-color: #5a5c6a;
  width: 3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  display: block;
  margin: 0 auto;
  text-align: center;
  border-radius: 0.3rem;
  color: #fff;
  font-size: 0.26rem;
  margin-top: 0.1rem;
}
.yaoTitle {
  font-size: 0.2rem;
  text-align: center;
  color: #fff;
  margin-top: 0.3rem;
}
.tabchange {
  width: 6.2rem;
  height: 1.02rem;
  background-color: #fff;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  display: flex;
  padding: 0.24rem 0.2rem;
}
.tabchangeBox {
  flex: 1;
  text-align: center;
  position: relative;
}
.tabchangeBox em {
  width: 0.02rem;
  height: 1.02rem;
  background-color: #826532;
  position: absolute;
  top: 0px;
  right: 0px;
}
.tabchangeBox p {
  height: 0.501rem;
  line-height: 0.501rem;
}
.tabchangeBox p.tabNumber {
  color: #826532;
  font-weight: bold;
}
.pag {
  width: 4.76rem;
  height: 4.56rem;
  margin: 0 auto;
  margin-top: 0.6rem;
}
.pag ul li {
  width: 1.98rem;
  height: 1.98rem;
  float: left;
  margin-right: 0.8rem;
  margin-bottom: 0.6rem;
  border-radius: 50%;
}
.pag ul li img {
  border-radius: 50%;
  width: 1.98rem;
  height: 1.98rem;
}
.pag ul li.current {
  margin-right: 0rem;
}
</style>