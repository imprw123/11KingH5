<template>
  <div class="myYaoDou">
    <div class="myInfor">
      <!-- <div class="signRecord">
                   <span>签到记录</span>
      </div>-->
      <!-- <div class="activeRlue">
                   活动规则
      </div>-->
      <div class="imgtx">
        <img v-lazy="icon" alt />
        <p class="name">{{name}}</p>
      </div>
      <div class="yaoIocn">
        <i></i>
        <span>{{yaodou}}</span>
      </div>
      <div class="ydInfor">{{realyyaodou}}妖豆永久有效</div>
    </div>

    <div class="change">
      <h2>此处仅显示30天的妖豆变化</h2>
      <!-- <div class="dateTimer">
        <i class="timer">2019-09</i>
        <em class="rd rdCurrent"></em>
      </div>-->
      <ul>
        <li v-for="(item,index) in myYDlists" :key="index">
          <i class="timer">{{item.LogDateTime | myDateFilter}}</i>
          <em class="rd"></em>
          <div class="listInfor">
            <b>{{item.Amount | changeIsNumer}}</b>
            <p class="payName">{{item.Desc}}</p>
            <p>{{item.LogDateTime | ChangeDateFormat}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      token: window.localStorage.getItem("loginInfo"),
      myYDlists: []
    };
  },
  mounted() {
    this.$emit("getShopCode", "我的妖豆", "我的", true);
    this._MyYdHistory();
    console.log(this.$store.state.userName);
  },
  computed:{
       ...mapGetters({
           name:'getuserName',
           icon:'getuserImgSrc',
           yaodou:'getmyYaoDou',
           realyyaodou:'getRealyYaoDou'
       })
  },
  filters: {
    ChangeDateFormat: function(timestamp) {
      var date = new Date(
        parseInt(timestamp.replace("/Date(", "").replace(")/", ""), 10)
      );
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D+h+m+s;
    },
    changeIsNumer(val){
        if(val>=0){
            return '+ '+val+' ';
        }else{
            return val;
        }
    }
  },
  methods: {
    _MyYdHistory: function() {
      this.$axios("post", this.$ports.myYaoDou.MyYdHistory, {
        st: this.token
      })
        .then(res => {
          console.log(res);
          this.myYDlists = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.myYaoDou {
  background: #eeeeee;
  padding-top: 0.26rem;
  padding-bottom: 0.5rem;
}
.myInfor {
  width: 6.6rem;
  height: 3rem;
  background-color: #fff;
  border-radius: 0.1rem;
  margin: 0 auto;
  padding-top: 0.2rem;
  position: relative;
}
.signRecord {
  position: absolute;
  top: 0.15rem;
  left: 0.15rem;
  color: #ab7f4b;
}
.activeRlue {
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  color: #ab7f4b;
}
.imgtx {
  width: 1.4rem;
  height: 1.9rem;
  margin: 0 auto;
  text-align: center;
}
.imgtx img {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.imgtx p.name {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.22rem;
}
.yaoIocn {
  text-align: center;
  overflow: hidden;
  zoom: 1;
  margin-bottom: 0.15rem;
}
.yaoIocn i {
  width: 0.32rem;
  height: 0.34rem;
  background: url(../assets/yaoIcon.png);
  display: inline-block;
  background-size: cover;
  position: relative;
  top: 0.1rem;
}
.yaoIocn span {
  display: inline-block;
  height: 0.34rem;
  line-height: 0.34rem;
  color: #aa7f4b;
}
.sign {
  width: 1.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #d7b278;
  display: block;
  margin: 0 auto;
  border-radius: 0.1rem;
  text-align: center;
  color: #fff;
  margin-bottom: 0.15rem;
}
.ydInfor {
  width: 100%;
  text-align: center;
  color: #aa7f4b;
}
.change {
  width: 6.6rem;
  min-height: 11.4rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.1rem;
  margin-top: 0.15rem;
  padding-top: 0.16rem;
  padding-bottom: 0.5rem;
}
.change h2 {
  text-align: center;
  color: #8a8a8a;
  font-size: 0.22rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  margin-top:0.2rem;
}
.dateTimer {
  margin-left: 1.2rem;
  min-height: 1.2rem;
  border-left: 0.05rem solid #dadada;
  position: relative;
}
.dateTimer em.rd {
  width: 0.22rem;
  height: 0.22rem;
  background-color: #dadada;
  border-radius: 50%;
  position: absolute;
  top: -0.1rem;
  left: -0.14rem;
}
.change ul li {
  margin-left: 1.2rem;
  min-height: 1.5rem;
  border-left: 0.05rem solid #dadada;
  position: relative;
}
.change ul li em.rd {
  width: 0.22rem;
  height: 0.22rem;
  background-color: #dadada;
  border-radius: 50%;
  position: absolute;
  top: -0.1rem;
  left: -0.14rem;
}
.dateTimer em.rdCurrent {
  background-color: #e0b980;
}
.listInfor {
  position: absolute;
  overflow: hidden;
  zoom: 1;
  top: 0;
  left: 0.25rem;
}
.listInfor b {
  font-size: 0.24rem;
  color: #ab7f4b;
  margin-bottom: 0.1rem;
  display: block;
}
.listInfor p {
  color: #8a8a8a;
}
.listInfor p.payName {
  color: #ab7f4b;
  margin-bottom: 0.05rem;
}
.timer {
  position: absolute;
  overflow: hidden;
  zoom: 1;
  top: -0.15rem;
  left: -1.12rem;
}
.change ul li .timer {
  position: absolute;
  overflow: hidden;
  zoom: 1;
  top: -0.15rem;
  left: -1.1rem;
}
</style>