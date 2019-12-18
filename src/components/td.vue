<template>
  <div class="tdProduct">
    <div class="inTdProduct">
      <ul>
        <li v-for="item in tdLists" :key="item.id">
          <div class="inTdProductBg">
            <i class="count" v-show="item.pt == 7"></i>
            <i class="mjCount" v-show="item.pt == 8"></i>
            <div class="left">
              <p>{{'￥'+item.param1}}</p>
              <a href="javascript:;" class="ljlq" v-if="item.rcv_flg == 0" @click="_RcvPkg(item.pt,item.id)">立即领取</a>
              <a href="javascript:;" class="bklq" v-if="item.rcv_flg == -1" @click="_RcvPkg(item.pt,item.id)">不可领取</a>
              <a href="javascript:;" class="ylq" v-if="item.rcv_flg == 1" @click="_RcvPkg(item.pt,item.id)">已领取</a>
            </div>
            <div class="right">
              <div class="tdName">仅可在11平台商城购买</div>
              <h2>{{item.show_desc}}</h2>
              <p class="tm">{{item.duration_time}}</p>
              <span class="tip">满{{'￥'+item.param2}}元可用</span>
              <p class="title">不可叠加 请在平台结算时选择</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "",
      tdLists: [],
      token: window.localStorage.getItem("loginInfo")
    };
  },
  mounted() {
    this.$emit("getShopCode", "指定商品券", "首页", true);
    // this._GetLTPkg();
  },
  methods: {
    _getLtpkg: function() {
      this._GetLTPkg();
    },
    _GetLTPkg: function() {
      this.$axios("post", this.$ports.yhq.GetLTPkg, {
        st: this.token,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        pt: 9
      })
        .then(response => {
          console.log("特定", response);
          this.tdLists = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    _RcvPkg: function(ptid, vid) {
      if (!this.token) {
        Toast({
          message: "请先登录!",
          iconClass: "icon icon-success"
        });
      }
      this.$axios("post", this.$ports.gifts.RcvPkg, {
        st: this.token,
        pt: ptid,
        id: vid
      })
        .then(response => {
          console.log(response);
          if (response.errCode == 0) {
            Toast({
              message: "兑换成功!",
              iconClass: "icon icon-success"
            });
          } else {
            Toast({
              message: response.msg,
              iconClass: "icon icon-success"
            });
          }
          this._GetLTPkg();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.inTdProduct {
  width: 6.6rem;
  margin: 0 auto;
}
.inTdProduct ul li {
  width: 6.32rem;
  height: 2.67rem;
  border-bottom: 0.02rem solid #eeeeee;
  padding: 0.22rem 0.14rem 0.28rem 0.14rem;
}
.inTdProductBg {
  width: 6.32rem;
  height: 2.67rem;
  background: url(../assets/quan.png);
  background-size: cover;
  position: relative;
}
.count {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/saleBtn.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}
.mjCount {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/count.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}
.inTdProductBg .left {
  width: 2.5rem;
  height: 2rem;
  float: left;

  margin-top: 0.05rem;
  padding-top: 0.5rem;
}
.inTdProductBg .right {
  width: 3.6rem;
  height: 1.9rem;
  float: left;
  margin-top: 0.05rem;
  padding-top: 0.6rem;
  position: relative;
  border-bottom: 0px;
}
.tdName {
  position: absolute;
  top: 0.2rem;
  left: 0px;
  color: #ff0000;
  font-size: 0.2rem;
}
.inTdProductBg .left p {
  font-size: 0.76rem;
  font-family: "微软雅黑";
  text-align: center;
  color: #ffd38f;
  margin-bottom: 0.1rem;
}
.inTdProductBg .left a.ljlq {
  width: 1.67rem;
  height: 0.4rem;
  background-color: #facd89;
  color: #5f0000;
  display: block;
  border-radius: 0.2rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.4rem;
  font-family: "微软雅黑";
}
.inTdProductBg .left a.bklq {
  width: 1.67rem;
  height: 0.4rem;
  background-color: #a5a4a4;
  color: #fff;
  display: block;
  border-radius: 0.2rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.4rem;
  font-family: "微软雅黑";
}
.inTdProductBg .left a.ylq {
  width: 1.67rem;
  height: 0.4rem;
  background-color: #7d7878;
  color: #fff;
  display: block;
  border-radius: 0.2rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.4rem;
  font-family: "微软雅黑";
}
.inTdProductBg .right h2 {
  color: #ffd38f;
  font-size: 0.22rem;
  font-weight: normal;
}
.inTdProductBg .right p.tm {
  color: #ffd38f;
  font-size: 0.16rem;
  margin: 0.1rem 0.1rem 0.1rem 0;
}
.inTdProductBg .right .tip {
  font-size: 0.38rem;
  padding: 0.02rem 0.05rem;
  background-color: #ffd38f;
  color: #323232;
  display: inline-block;
  margin-bottom: 0.1rem;
  border-radius: 0.04rem;
}
.inTdProductBg .right p.title {
  color: #fff;
  font-size: 0.18rem;
}
</style>  