<template>
  <div class="yhq">
    <div class="inYhq">
      <div class="tab_yh">
        <p :class="{'current':flag == true}" @click="changeShow(0)">最近领取</p>
        <p :class="{'current':flag01 == true}" @click="changeShow(1)">已使用</p>
        <p :class="{'current':flag02 == true}" @click="changeShow(2)">已失效</p>
      </div>
    </div>
    <div class="yhqBox" v-show="flag">
      <ul>
        <li v-for="item in recentLQ" :key="item.id">
          <div class="yhqBg">
            <i class="count" v-show="item.pt == 8 || item.pt == 5 "></i>
            <i class="saleBtn" v-show="item.pt == 7 || item.pt == 6"></i>
            <div class="left">
              <p>{{'￥'+item.param1}}</p>
            </div>
            <div class="right">
              <h2>{{item.show_desc}}</h2>
              <p class="tm">{{item.duration_time}}</p>
              <span class="tip">满{{'￥'+item.param2}}元可用</span>
              <p class="title">不可叠加 请在平台结算时选择</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="yhqBox" v-show="flag01">
      <ul>
        <li v-for="item in recentLQ" :key="item.id">
          <div class="yhqBg hasUseBg">
            <i class="countHasUse" v-show="item.pt == 5 || item.pt == 8"></i>
            <i class="hasSale" v-show="item.pt == 6 || item.pt == 7"></i>
            <div class="left">
              <p>{{'￥'+item.param1}}</p>
            </div>
            <div class="right">
              <h2>{{item.show_desc}}</h2>
              <p class="tm">{{item.duration_time}}</p>
              <span class="tip">满{{'￥'+item.param2}}元可用</span>
              <p class="title">不可叠加 请在平台结算时选择</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="yhqBox" v-show="flag02">
      <ul>
        <li v-for="item in recentLQ" :key="item.id">
          <div class="yhqBg hasUseBg lostBg">
            <i class="countHasUse" v-show="item.pt == 5 || item.pt == 8"></i>
            <i class="hasSale" v-show="item.pt == 6 || item.pt == 7"></i>
            <div class="left">
              <p>{{'￥'+item.param1}}</p>
            </div>
            <div class="right">
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
export default {
  name: "index",
  data() {
    return {
      msg: "",
      flag: true,
      flag01: false,
      flag02: false,
      token: window.localStorage.getItem("loginInfo"),
      recentLQ: [],
      pt: 1
    };
  },
  mounted() {
    this.$emit("getShopCode", "优惠券", "我的", true);
    this._MyLtLog();
  },
  methods: {
    changeShow: function(val) {
      switch (val) {
        case 0:
          this.flag = true;
          this.flag01 = false;
          this.flag02 = false;
          this.pt = 1;
          this._MyLtLog();
          break;
        case 1:
          this.flag = false;
          this.flag01 = true;
          this.flag02 = false;
          this.pt = 2;
          this._MyLtLog();
          break;
        case 2:
          this.flag = false;
          this.flag01 = false;
          this.flag02 = true;
          this.pt = 3;
          this._MyLtLog();
          break;
      }
    },
    _MyLtLog: function() {
         this.recentLQ = [];
      this.$axios("post", this.$ports.my.MyLtLog, {
        st: this.token,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        pt: this.pt
      })
        .then(response => {
          console.log(response);
          this.recentLQ = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
.inYhq {
  overflow: hidden;
  zoom: 1;
  padding-bottom: 0.2rem;
}
.tab_yh {
  background-color: #fff;
  padding: 0 0.78rem;
  display: flex;
  height: 0.9rem;
  border-bottom: 0.2rem solid #eeeeee;
}
.tab_yh p {
  flex: 1;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.02rem solid #fff;
  text-align: center;
  margin: 0 0.1rem;
  color: #b9b9b9;
}
.tab_yh p.current {
  border-bottom: 0.02rem solid #ffc257;
  color: #ffc257;
  font-weight: bold;
}
.yhqBox {
  width: 6.6rem;
  margin: 0 auto;
  overflow: hidden;
  zoom: 1;
}
.yhqBox ul li {
  width: 6.32rem;
  height: 2.67rem;
  border-bottom: 0.02rem solid #eeeeee;
  padding: 0.22rem 0.14rem 0.28rem 0.14rem;
}
.yhqBg {
  width: 6.32rem;
  height: 2.67rem;
  background: url(../assets/quan.png);
  background-size: cover;
  position: relative;
}
.hasUseBg {
  background: url(../assets/hasUser.png);
  background-size: cover;
}
.lostBg {
  background: url(../assets/lost.png);
  background-size: cover;
}
.yhqBg .count {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/count.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}
.yhqBg .saleBtn {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/saleBtn.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}
.countHasUse {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/countHasUse.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}
.hasSale {
  width: 1.19rem;
  height: 0.92rem;
  background: url(../assets/hasSale.png);
  background-size: cover;
  display: block;
  position: absolute;
  top: -0.01rem;
  left: 0px;
}

.yhqBg .left {
  width: 2.5rem;
  height: 2rem;
  float: left;
  margin-top: 0.05rem;
  padding-top: 0.5rem;
}
.yhqBg .right {
  width: 3.6rem;
  height: 1.9rem;
  float: left;
  margin-top: 0.05rem;
  padding-top: 0.34rem;
  border-bottom: 0px;
}
.yhqBg .left p {
  font-size: 0.76rem;
  font-family: "微软雅黑";
  text-align: center;
  color: #ffd38f;
  margin-bottom: 0.1rem;
}
.hasUseBg .left p {
  color: #b9b9b9;
}
.yhqBg .left a.ljlq {
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

.yhqBg .left a.bklq {
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

.yhqBg .left a.ylq {
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
.yhqBg .right h2 {
  color: #ffd38f;
  font-size: 0.22rem;
}
.hasUseBg .right h2 {
  color: #b9b9b9;
}
.yhqBg .right p.tm {
  color: #ffd38f;
  font-size: 0.16rem;
  margin: 0.1rem 0.1rem 0.1rem 0;
}
.hasUseBg .right p.tm {
  color: #b9b9b9;
}
.yhqBg .right .tip {
  font-size: 0.38rem;
  padding: 0.02rem 0.05rem;
  background-color: #ffd38f;
  color: #323232;
  display: inline-block;
  margin-bottom: 0.1rem;
  border-radius: 0.04rem;
}
.hasUseBg .right .tip {
  background-color: #b9b9b9;
  color: #000;
}
.yhqBg .right p.title {
  color: #fff;
  font-size: 0.18rem;
}
.hasUseBg .right p.title {
  color: #b9b9b9;
}
</style>