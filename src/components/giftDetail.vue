<template>
  <div class="giftDetail">
    <div class="ingiftDetail">
      <div class="giftDetailBanner">
        <img :src="b_img" alt />
      </div>
      <p class="jinfen">
        <!-- <b>50000</b>积分 -->
      </p>
      <p class="gift_name">{{show_name}}</p>
    </div>

    <div class="giftInfor">
      <div class="box">
        <p class="titleName">礼包内容</p>
        <p class="context">{{show_desc}}</p>
      </div>

      <div class="box">
        <p class="titleName">兑换条件</p>
        <p class="context">{{constraint}}</p>
      </div>

      <div class="box">
        <p class="titleName">使用方法</p>
        <p class="context" v-show="ptId == 2 || ptId == 3">领取成功后直接放入背包，请前往背包对应分类查看</p>
        <p class="context" v-show="ptId == 1">领取成功后，可在我——我的礼包查看，请前往平台背包兑换，点击左下角蓝色图标（背包）——CDKey兑换</p>
      </div>
    </div>
    <div class="pay">
      <span v-show="ptId == 3">消耗{{yd}}妖豆</span>
      <a href="JavaScript:;" class="payNoBtn"  v-show="rcv_flg == -1" @click="_RcvPkg()">不可兑换</a>
      <a href="JavaScript:;" class="payNoBtn" v-show="rcv_flg == 1" @click="_RcvPkg()">已兑换</a>
      <a href="JavaScript:;" class="payBtn"  v-show="rcv_flg == 0" @click="_RcvPkg()">立即兑换</a>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      b_img: "",
      show_name: "",
      show_desc: "",
      constraint: "",
      ptId:this.$route.query.pt,
      yd: 0,
      rcv_flg: "",
      token:window.localStorage.getItem("loginInfo"),
      pt:0,
      id:0,
      pageName:this.$route.query.pageTxt
    };
  },
  mounted() {
    //debugger;
    this.$emit("getShopCode", "礼包详情", "${pageName}", true);
    this.pt=this.$route.query.pt;
    this.id=this.$route.query.id;
    this._PkgDetail();
  },
  methods: {
    _PkgDetail: function() {
      this.$axios("post", this.$ports.gifts.PkgDetail, {
        st: this.token,
        pt: this.pt,
        id: this.id
      })
        .then(response => {
          console.log(response);
          this.b_img = response.data.b_img;
          this.show_name = response.data.show_name;
          this.show_desc = response.data.show_desc;
          this.constraint = response.data.constraint;
          this.yd = response.data.yd;
          this.rcv_flg = response.data.rcv_flg;
        })
        .catch(error => {
          console.log(error);
        });
    },
    _RcvPkg: function() {
      if (!this.token) {
        Toast({
          message: "请先登录!",
          iconClass: "icon icon-success"
        });
      }
      this.$axios("post", this.$ports.gifts.RcvPkg, {
        st: this.token,
        pt: this.$route.query.pt,
        id: this.$route.query.id
      })
        .then(response => {
          console.log(response);
          if(response.errCode == 0){
             Toast({
          message: '兑换成功!',
          iconClass: "icon icon-success"
        });
          }else{
              Toast({
          message:response.msg,
          iconClass: "icon icon-success"
        });
          }
          
        this._PkgDetail();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.giftDetail {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
}
.ingiftDetail {
  padding: 0.28rem 0.3rem;
  width: 6.6rem;
  margin: 0 auto;
  border-bottom: 0.1rem solid #eeeeee;
}
.giftDetailBanner {
  width: 6.6rem;
  height: 3.48rem;
  background: #000;
  margin-bottom: 0.38rem;
   border-radius: 0.3rem;
}
.giftDetailBanner img {
  width: 6.6rem;
  height: 3.48rem;
  background-size: cover;
  border-radius: 0.3rem;
}
.jinfen {
  font-size: 0.28rem;
  color: #000;
  margin-bottom: 0.1rem;
}
.jinfen b {
  color: #ab7f4b;
  margin-right: 5px;
}
.gift_name {
  font-size: 0.28rem;
  color: #000;
}
.giftInfor {
  padding: 0.28rem 0.3rem;
  width: 6.6rem;
  margin: 0 auto;
  border-bottom: 0.1rem solid #eeeeee;
}
.box {
  margin-bottom: 0.25rem;
}
.box .titleName {
  font-size: 0.28rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.15rem;
  font-family: "微软雅黑";
}
.box .context {
  color: #8a8a8a;
}
.pay {
  width: 6.6rem;
  margin: 0 auto;
  height: 1.28rem;
  line-height: 1.28rem;
}
.pay span {
  font-size: 0.32rem;
  color: #ff0000;
}
.payBtn {
  width: 2.22rem;
  height: 0.67rem;
  line-height: 0.67rem;
  text-align: center;
  color: #fff;
  background-color: #d5b47e;
  border-radius: 0.1rem;
  float: right;
  margin-top: 0.3rem;
}
.payNoBtn {
  width: 2.22rem;
  height: 0.67rem;
  line-height: 0.67rem;
  text-align: center;
  color: #fff;
  background-color: #5a5c6a;
  border-radius: 0.1rem;
  float: right;
  margin-top: 0.3rem;
}
</style>