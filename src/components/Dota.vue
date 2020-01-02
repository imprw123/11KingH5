<template>
  <div class="dota">
    <div class="dotaBox" v-if="WeekFree != null">
      <div class="dotaTitle">本周试用</div>
      <div class="imgShow">

           <img :src="WeekFree.b_img" alt />
      </div>
      <p class="FlName">{{WeekFree.name}}</p>
      <p class="FlBtn">
        <a href="javascript:;" class="lq" v-if="rcv_flg == 0" @click="_RcvPkg(WeekFree.privilege_type,WeekFree.id)">立即领取</a>
        <a href="javascript:;" class="bklq" v-if="rcv_flg == -1" @click="_RcvPkg(WeekFree.privilege_type,WeekFree.id)">不可领取</a>
        <a href="javascript:;" class="ylq" v-if="rcv_flg == 1" @click="_RcvPkg(WeekFree.privilege_type,WeekFree.id)">已领取</a>
      </p>
      <p class="FlXh" v-show="WeekFree.privilege_type == 3">{{'消耗'+WeekFree.yd+'妖豆'}}</p>
      <p class="FlDh">每周限兑一次</p>
    </div>
    <div class="xian" v-if="WeekFree != null"></div>
    <div class="product">
      <div class="title">
        游戏道具
        <em>（每周限兑一次）</em>
      </div>
      <div class="rpgList">
        <mt-loadmore
          @top-status-change="handleTopChange"
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
          :auto-fill="false"
        >
          <ul>
            <li v-for="(item,index) in dotaLists" :key="index">
              <div class="left">
                <img :src="item.M_ITEM.b_img" alt />
              </div>
              <div class="rpgListRight">
                <p class="mapName">{{item.M_ITEM.name}}</p>
                <p class="typeName">
                  <em>{{item.M_ITEM.constraint}}</em>
                   <em>剩余:{{item.M_ITEM.total >=0 ? item.M_ITEM.total:'不限量' }}</em>
                </p>
                <p>
                  <a href="javascript:;" class="ljlq" v-if="item.M_ITEM.rcv_flg == 0" @click="_RcvPkg(item.M_ITEM.privilege_type,item.M_ITEM.id)">立即领取</a>
                  <a href="javascript:;" class="bklq" v-if="item.M_ITEM.rcv_flg == -1" @click="_RcvPkg(item.M_ITEM.privilege_type,item.M_ITEM.id)">不可领取</a>
                  <a href="javascript:;" class="ylq" v-if="item.M_ITEM.rcv_flg == 1" @click="_RcvPkg(item.M_ITEM.privilege_type,item.M_ITEM.id)">已领取</a>
                </p>
              </div>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </mt-loadmore>
      </div>
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
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      topStatus: "",
      dotaLists: [],
      pageCount: 0,
      token: window.localStorage.getItem("loginInfo"),
      WeekFree: "",
      rcv_flg: 0
    };
  },
  mounted() {
    this.$emit("getShopCode", "DOTA", "DOTA", false);
    this._GetDotaPkg();
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      // 加载更多数据
      this.pageIndex = 1;
      this._GetDotaPkg();
      this.allLoaded = false;
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载更多数据
      this.pageIndex++;
      console.log(this.pageIndex);
      //debugger;
      if (this.pageIndex > this.pageCount) {
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        Toast({
          message: "没有更多数据!",
          iconClass: "icon icon-success"
        });
      } else {
        this._GetDotaPkg();
        this.allLoaded = false;
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    _GetDotaPkg: function() {
      this.$axios("post", this.$ports.dota.GetDotaPkg, {
        st: this.token,
        page_index: this.pageIndex,
        page_size: this.pageSize
      })
        .then(res => {
          console.log(res);
          this.WeekFree = res.data.WeekFree;
          this.rcv_flg = res.data.WeekFree.rcv_flg;
          if (this.pageIndex == 1) {
            this.dotaLists = res.data.PkgLst;
          } else {
            if(!res.data.PkgLst){
               this.dotaLists = this.dotaLists.concat(res.data.PkgLst);
            }
          }
          this.pageCount = Math.ceil(Number(res.data.total) / this.pageSize);
        })
        .catch(error => {
          console.log(error);
        });
    },
     _RcvPkg: function(ptid,vid) {
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
          
        this._GetDotaPkg();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.dota {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
}
.dotaBox {
  width: 6.6rem;
  margin: 0 auto;
  margin-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.dotaTitle {
  width: 6.6rem;
  text-align: left;
  margin-bottom: 0.2rem;
  font-size: 0.28rem;
  color: #000000;
}
.imgShow {
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  margin-bottom: 0.2rem;
}
.imgShow img {
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
}
.FlName {
  width: 6.6rem;
  text-align: center;
  margin-bottom: 0.2rem;
}
.FlBtn {
  width: 6.6rem;
  text-align: center;
  margin-bottom: 0.2rem;
}
.FlBtn a {
  width: 1.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
  display: block;
  margin: 0 auto;
  color: #fff;
  border-radius: 0.08rem;
}
.FlXh {
  width: 6.6rem;
  text-align: center;
  margin-bottom: 0.08rem;
}
.FlDh {
  width: 6.6rem;
  text-align: center;
}
.xian {
  width: 7.2rem;
  height: 0.2rem;
  background-color: #eeeeee;
}
.product {
  width: 6.6rem;
  margin: 0 auto;
  padding-top: 0.2rem;
}
.product .title {
  font-size: 0.3rem;
  color: #000000;
  margin-bottom: 0.2rem;
}
.product .title em {
  font-size: 0.2rem;
}
.rpgList {
  width: 6.5rem;
  margin: 0 auto;
  padding-left: 0.1rem;
  overflow: hidden;
  zoom:1;
}
.rpgList ul li {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 0.25rem;
}
.rpgList .left {
  width: 1.1rem;
  height: 1.1rem;
  float: left;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
}
.rpgList .left img {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.1rem;
}
.rpgListRight {
  width: 5.2rem;
  border-bottom: 0.02rem solid #eeeeee;
  margin-left: 0.2rem;
  float: left;
  padding-bottom: 0.2rem;
}
.rpgListRight p {
  overflow: hidden;
  zoom: 1;
}
.rpgListRight .mapName {
  color: #826532;
  font-size: 0.22rem;
  margin-bottom: 0.15rem;
}
.typeName {
  color: #b9b9b9;
  font-size: 0.2rem;
  margin-bottom: 0.15rem;
}
.FlBtn a.ljlq {
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #d5b47e;
  display: block;
  border-radius: 0.08rem;
}
.FlBtn a.bklq {
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #a5a4a4;
  display: block;
  border-radius: 0.08rem;
}
.FlBtn a.ylq {
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #a5a4a4;
  display: block;
  border-radius: 0.08rem;
}
.rpgList ul li a.ljlq {
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #d5b47e;
  display: block;
  border-radius: 0.08rem;
}
.rpgList ul li a.bklq {
    width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #a5a4a4;
  display: block;
  border-radius: 0.08rem;
}
.rpgList ul li a.ylq {
  width: 1.5rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  color: #fff;
  background-color: #a5a4a4;
  display: block;
  border-radius: 0.08rem;
}
</style>