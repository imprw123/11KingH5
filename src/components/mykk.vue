<template>
  <div class="myYaoDou">
    <div class="change">
      <h2>此处仅显示30天的妖豆变化</h2>

      <mt-loadmore
        @top-status-change="handleTopChange"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :auto-fill="false"
      >
        <ul>
          <li v-for="item in kklists" :key="item.key">
            <i class="timer">{{item.create_time | ChangeDateFormat(0)}}</i>
            <em class="rd"></em>
            <div class="listInfor">
              <b>{{item.change_val |isTrue}}</b>
              <p class="payName">{{item.desc}}</p>
              <p>{{item.create_time | ChangeDateFormat(1)}}</p>
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
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      msg: "",
      allLoaded: false,
      topStatus: "",
      kklists: [],
      pageCount: 0,
      pageIndex: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.$emit("getShopCode", "我的K值", "我的", true);
    this._MyKingHistory();
  },
  filters: {
    ChangeDateFormat: function(timestamp, val) {
      var date = new Date(
        parseInt(timestamp.replace("/Date(", "").replace(")/", ""), 10)
      );
      var Y = date.getFullYear() + "-";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var D =
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +" "
        "";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      if (val == 0) {
        return Y + M;
      } else if (val == 1) {
        return Y + M + D;
      }
    },
    isTrue: function(target) {
      if (target > 0) {
        return "+" + target;
      } else if (target < 0) {
        return "-" + target;
      } else {
        return target;
      }
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      // 加载更多数据
      this.pageIndex = 1;
      this._MyKingHistory();
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
        // this._MyKingHistory();
        Toast({
          message: "没有更多数据!",
          iconClass: "icon icon-success"
        });
      } else {
        this._MyKingHistory();
        this.allLoaded = false;
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    _MyKingHistory: function() {
      this.$axios("post", this.$ports.mykk.MyKingHistory, {
        st: window.localStorage.getItem("loginInfo"),
        page_index: this.pageIndex,
        page_size: this.pageSize
      })
        .then(response => {
             console.log(response);
          if (this.pageIndex == 1) {
            this.kklists = response.data;
          } else {
            this.kklists = this.kklists.concat(response.data);
          }
          this.pageCount = Math.ceil(
            Number(response.total) / this.pageSize
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#app {
  padding: 0px;
}
.mint-loadmore{
    padding: 0.2rem 0;
}
.myYaoDou {
  background: #eeeeee;
  padding-top: 0.26rem;
  padding-bottom: 0.5rem;
}

.change {
  width: 6.6rem;
  min-height:10.5rem;
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