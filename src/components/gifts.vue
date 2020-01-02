<template>
  <div class="gift">
    <div class="giftsBox" v-show="giftsLists.length !=0 && giftsLists != null ">
      <mt-loadmore
        @top-status-change="handleTopChange"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
       :auto-fill="false"
      >
        <ul>
          <li v-for="item in giftsLists" :key="item.id">
            <router-link :to="{'path':'/giftdetail',query:{'pt':item.M_ITEM.privilege_type,'id':item.M_ITEM.id,'pageTxt':'首页'}}">
              <div class="giftsBox-left">
                <img
                  v-lazy="item.M_ITEM.b_img"
                />
              </div>
              <div class="giftsBox-right">
                <p class="giftsName">{{item.M_ITEM.name}}</p>
                <p class="giftsInfor">{{item.M_ITEM.constraint}}</p>
                <div class="btnBOx">
                  <a href="javascript:;" class="lq" v-if="item.M_ITEM.rcv_flg == 0">立即领取</a>
                   <a href="javascript:;" class="bklq" v-if="item.M_ITEM.rcv_flg == -1">不可领取</a>
                    <a href="javascript:;" class="ylq" v-if="item.M_ITEM.rcv_flg == 1">已领取</a>
                  <span>剩余:{{item.M_ITEM.total >=0 ? item.M_ITEM.total:'不限量'}}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>

    <div class="noListbg" v-show="giftsLists.length ==0 || giftsLists == null ">
        <img src="../assets/nolist.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "",  
      allLoaded: false,
      topStatus: "",
      giftsLists:[],
      pageCount:0,
      pageIndex:1,
      pageSize:10,
      token:window.localStorage.getItem("loginInfo")
    };
  },
  mounted() {
    this.$emit("getShopCode", "游戏礼包", "首页", true);
    this._GetGamePkg();
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      // 加载更多数据
      this.pageIndex=1;
      this._GetGamePkg();
       this.allLoaded = false; 
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载更多数据
       this.pageIndex++;
       console.log(this.pageIndex);
       console.log('aa',this.pageCount);
       //debugger;
      if(this.pageIndex>this.pageCount){
           this.allLoaded = true; 
           this.$refs.loadmore.onBottomLoaded();
            // this._GetGamePkg();
          Toast({
          message: "没有更多数据!",
          iconClass: "icon icon-success"
        });
      }else{
          this._GetGamePkg();
        this.allLoaded = false; 
      this.$refs.loadmore.onBottomLoaded();
      }
     
      
    },
    _GetGamePkg: function() {
      var _that=this;
      this.$axios("post", this.$ports.gifts.GetGamePkg, {
        st: this.token,
        page_index:this.pageIndex,
        page_size:this.pageSize
      })
        .then(function(response) {
          console.log(response);
         if(_that.pageIndex == 1){
          _that.giftsLists=response.data;
         }else{
           if(!response.data){
              _that.giftsLists= _that.giftsLists.concat(response.data);
           }
         }
          _that.pageCount=Math.ceil( Number(response.total ) / _that.pageSize);
         // console.log( _that.pageCount);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.gift{
  position: relative;
  min-height: 11rem;
}
.giftsBox {
  padding-left: 0.45rem;
  height: 11rem;
  overflow: scroll;
}
.giftsBox ul li {
  width: 6.15rem;
  border-bottom: 0.02rem solid #eeeeee;
  margin-top: 0.4rem;
  overflow: hidden;
  zoom: 1;
}
.giftsBox-left {
  width: 1.5rem;
  height: 1.5rem;
  float: left;
}
.giftsBox-left img {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  border-radius: 0.2rem;
}
.giftsBox-right {
  width: 4.4rem;
  height: 1.8rem;
  float: left;
  padding-left: 0.25rem;
}
.giftsName {
  color: #826532;
  font-size: 0.3rem;
  margin-bottom: 0.15rem;
}
.giftsInfor {
  color: #b9b9b9;
}
.btnBOx {
  margin-top: 0.3rem;
}
.btnBOx a.lq {
  width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  background-color: #d5b47e;
  display: inline-block;
  border-radius: 0.05rem;
}
.btnBOx a.bklq{
   width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 0.05rem;
  background-color:#A5A4A4;
}
.btnBOx a.ylq{
   width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 0.05rem;
  background-color:#7D7878;
}
.btnBOx span {
  font-size: 0.18rem;
  color: #b9b9b9;
  margin-left: 0.1rem;
}
.noListbg{
  position: absolute;
  width:6rem;
  height: 4.5rem;
  top:50%;
  left: 50%;
  margin-left: -3rem;
  margin-top:-2.25rem;
}
.noListbg img{
  width:6rem;
  height: 4.5rem;
}
</style>