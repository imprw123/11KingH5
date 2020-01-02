<template>
  <div class="fuli">
    <div class="inFuli">
      <div class="changeYhqCenter">
        <p @click="test('tab-container1')" v-bind:class="{'current':active == 'tab-container1'}">精选</p>
        <p @click="test('tab-container2')" v-bind:class="{'current':active == 'tab-container2'}">节日</p>
        <p @click="test('tab-container3')" v-bind:class="{'current':active == 'tab-container3'}">生日</p>
      </div>
      <div
        class="page-tab-container"
        v-show="festivalFeatured.length !=0 && festivalFeatured != null"
      >
        <div class="giftsBoxFuli">
          <mt-loadmore
            @top-status-change="handleTopChange"
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            ref="loadmore"
            :auto-fill="false"
          >
            <ul>
              <li v-for="(item,index) in festivalFeatured" :key="index">
                <div class="giftsBox-left">
                  <img
                    v-lazy="item.b_img == null || item.b_img == '' ? 'https://img.5211game.com/Base/bg/smalldefault.png': item.b_img"
                    alt
                  />
                </div>
                <div class="giftsBoxRight">
                  <p class="giftsName">{{item.name}}</p>
                  <p class="giftsInfor">
                    领取条件:
                    <em v-show="active == 'tab-container3'">{{'生日当月可领取'}}</em>
                     <em v-show="active != 'tab-container3'">{{item.constraint}}</em>
                  </p>
                  <p class="giftsInfor">
                    有效期:
                    <em>{{item.show_time}}</em>
                  </p>
                  <div class="btnBOx">
                    <a
                      href="javascript:;"
                      class="lq"
                      v-if="item.rcv_flg == 0"
                      @click="_RcvFestivalPkg(item.privilege_type,item.pid,item.id)"
                    >{{item.privilege_type == 3?'立即兑换':'立即领取'}}</a>
                    <a
                      href="javascript:;"
                      class="bklq"
                      v-if="item.rcv_flg == -1"
                      @click="_RcvFestivalPkg(item.privilege_type,item.pid,item.id)"
                    >{{item.privilege_type == 3?'不可兑换':'不可领取'}}</a>
                    <a
                      href="javascript:;"
                      class="ylq"
                      v-if="item.rcv_flg == 1"
                      @click="_RcvFestivalPkg(item.privilege_type,item.pid,item.id)"
                    >{{item.privilege_type == 3?'已兑换':'已领取'}}</a>
                    <span>剩余:{{item.total>=0?item.total:'不限量'}}</span>
                  </div>
                  <div class="infor">
                    <span>每个账号限兑1次</span>
                  </div>
                </div>
              </li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
              <span
                v-show="topStatus !== 'loading'"
                :class="{ 'rotate': topStatus === 'drop' }"
              >下拉刷新</span>
              <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </div>
    <div class="noListbg" v-show="festivalFeatured.length ==0 || festivalFeatured == null">
      <img src="../assets/nolist.jpg" alt />
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
      active: "tab-container1",
      swipeable: true,
      pageIndex: 1,
      pageSize: 4,
      festivalFeatured: [],
      pageCount: "",
      allLoaded: false,
      topStatus: "",
      sp: 601,
      token: window.localStorage.getItem("loginInfo")
    };
  },
  mounted() {
    this.$emit("getShopCode", "会员福利", "首页", true);
    this._GetFestivalLst();
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      // 加载更多数据
      this.pageIndex = 1;
      this._GetFestivalLst();
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
        this._GetFestivalLst();
        this.allLoaded = false;
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    test(id) {
      this.active = id;
      if (id == "tab-container1") {
        this.pageIndex = 1;
        this.sp = 601;
        this.allLoaded = false;
        this._GetFestivalLst();
      } else if (id == "tab-container2") {
        this.pageIndex = 1;
        this.sp = 600;
        this.allLoaded = false;
        this._GetFestivalLst();
      } else if (id == "tab-container3") {
        this.pageIndex = 1;
        this.sp = 602;
        this.allLoaded = false;
        this._GetFestivalLst();
      }
    },
    _GetFestivalLst: function() {
      this.$axios("post", this.$ports.fuli.GetFestivalLst, {
        sp: this.sp,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        st:this.token
      })
        .then(response => {
          console.log(response);
          if (this.pageIndex == 1) {
            this.festivalFeatured = response.data;
          } else {
             this.festivalFeatured = this.festivalFeatured.concat(response.data);
              console.log(this.festivalFeatured)
          }
          this.pageCount = Math.ceil(Number(response.total) / this.pageSize);
        })
        .catch(error => {
          console.log(res);
        });
    },
    //生日领取
    _RcvFestivalPkg: function(ptid, val, id) {
      if (this.sp == 602) {
        this.$axios("post", this.$ports.fuli.RcvFestivalPkg, {
          id: val,
          st: this.token
        })
          .then(response => {
            console.log(response);
            Toast({
              message: response.msg,
              iconClass: "icon icon-success"
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this._RcvPkg(ptid, val, id);
      }
    },
    //其他领取
    _RcvPkg: function(ptid, val, id) {
      if (!this.token) {
        Toast({
          message: "请先登录!",
          iconClass: "icon icon-success"
        });
        return;
      }
      this.$axios("post", this.$ports.gifts.RcvPkg, {
        st: this.token,
        pt: ptid,
        id: id
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

          this._GetFestivalLst();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.fuli {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
}
.inFuli {
  width: 6.6rem;
  overflow: hidden;
  margin: 0 auto;
}

.giftsBoxFuli {
  width: 6.4rem;
  overflow: hidden;
  zoom: 1;
  padding-left: 0.2rem;
}
.giftsBoxFuli ul li {
  width: 6.15rem;
  overflow: hidden;
  zoom: 1;
  border-bottom: 0.02rem solid #eeeeee;
  padding-bottom: 0.15rem;
  padding-top: 0.15rem;
  margin-top: 0rem;
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
  border-radius: 0.1rem;
}
.giftsBoxRight {
  width: 4.4rem;
  min-height: 1.8rem;
  float: left;
  padding-left: 0.25rem;
}
.giftsName {
  color: #826532;
  font-size: 0.3rem;
  margin-bottom: 0.05rem;
}
.giftsInfor {
  color: #b9b9b9;
  margin-bottom: 0.05rem;
}
.btnBOx {
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
}
.btnBOx a.lq {
  width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 0.05rem;
  background-color: #d5b47e;
}
.btnBOx a.bklq {
  width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 0.05rem;
  background-color: #a5a4a4;
}
.btnBOx a.ylq {
  width: 1.3rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 0.05rem;
  background-color: #a5a4a4;
}
.btnBOx span {
  font-size: 0.18rem;
  color: #b9b9b9;
  margin-left: 0.1rem;
}
.infor {
  color: #ff0000;
}
.changeYhqCenter {
  background-color: #fff;
  width: 6.6rem;
  display: flex;
  height: 0.9rem;
  margin: 0 auto;
  position: fixed;
  top: 40px;
  z-index: 1;
}
.changeYhqCenter p {
  flex: 1;
  height: 0.77rem;
  line-height: 0.77rem;
  border-bottom: 0.02rem solid #fff;
  text-align: center;
  margin: 0 0.1rem;
  color: #b9b9b9;
  font-size: 0.25rem;
}
.changeYhqCenter p.current {
  border-bottom: 0.02rem solid #ffc257;
  color: #ffc257;
  font-weight: bold;
}
.page-tab-container {
  margin-top: 50px;
}
.noListbg {
  position: absolute;
  width: 6rem;
  height: 4.5rem;
  top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: -2.25rem;
}
.noListbg img {
  width: 6rem;
  height: 4.5rem;
}
</style>