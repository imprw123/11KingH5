<template>
  <div class="hello">
    <div class="banner">
      <swipe class="my-swipe">
        <swipe-item class="slide1" v-for="(item,index) in bannerLists" :key="index">
          <a
            :href="item.show_detail"
            target="_blank"
            v-if="item.privilege_type == 10 && !$isWeiXin()"
          >
            <img v-lazy="item.img" alt />
          </a>

          <router-link
            :to="{'name':'modeContainer',params:{'mapUrl':item.show_detail,'pageName':'首页'}}"
            v-if="item.privilege_type == 10 && $isWeiXin()"
          >
            <img v-lazy="item.img" alt />
          </router-link>

          <router-link
            :to="{'path':'/newsDetail',query:{'News_Id':item.show_detail}}"
            v-if="item.privilege_type == 11"
          >
            <img v-lazy="item.img" alt />
          </router-link>
          <router-link
            :to="{'path':'/giftdetail',query:{'pt':item.privilege_type,'id':item.show_detail}}"
            v-if="item.privilege_type == 1 || item.privilege_type == 2 || item.privilege_type == 3"
          >
            <img v-lazy="item.img" alt />
          </router-link>

          <router-link :to="{'path':item.url}" v-if="item.privilege_type == 'default' ">
            <img v-lazy="item.img" alt />
          </router-link>
        </swipe-item>
      </swipe>

      <!-- 默认 banner-->
      <!-- <swipe class="my-swipe" v-if="bannerLists == null  || bannerLists.length == 0">
        <swipe-item v-for="(obj,index) in defaultBanner" :key="index">
          <router-link :to="{'path':obj.url}">
            <img v-lazy="obj.img" alt />
          </router-link>
        </swipe-item>
      </swipe>-->
      <!-- 默认banner   -->
    </div>

    <div class="funProduct">
      <div class="in_funProduct">
        <router-link :to="{'path':'/gitfs'}">
          <img src="../assets/libao.png" />
          <p>游戏礼包</p>
        </router-link>
      </div>
      <div class="in_funProduct">
        <router-link :to="{'path':'/fuli'}">
          <img src="../assets/jierifuli.png" />
          <p>会员福利</p>
        </router-link>
      </div>
      <div class="in_funProduct"  @click="openYHQ">

          <img src="../assets/youhuiquan.png" />
          <p>优惠券</p>

      </div>
      <div class="in_funProduct">
        <router-link :to="{'path':'/active'}">
          <img src="../assets/huodong.png" />
          <p>热门活动</p>
        </router-link>
      </div>
    </div>

    <div class="newsTitle">
      <span>
        <em class="left"></em>新闻中心
        <em class="right"></em>
      </span>
    </div>

    <div class="newsLists">
      <ul>
        <!-- <a v-bind:href="item.News_RedirectUrl == ''? item.News_URL.replace('http:',''):item.News_RedirectUrl.replace('http:','')" target="_blank"> -->
        <li v-for="(item,index) in newsList" :key="index">
          <router-link :to="{'path':'/newsDetail',query:{'News_Id':item.News_Id}}">
            <em>{{item.Category_Name}}</em>
            <span>{{item.News_Title}}</span>
            <b>{{item.AddDate | ChangeDateFormat}}</b>
          </router-link>
        </li>
      </ul>
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
      newsList: [],
      defaultBanner: [
        {
          img: "https://img.5211game.com/Base/bg/banner01.png",
          url: "/yao",
          privilege_type: "default"
        },
        {
          img: "https://img.5211game.com/Base/bg/banner02.png",
          url: "/gitfs",
          privilege_type: "default"
        },
        {
          img: "https://img.5211game.com/Base/bg/banner03.png",
          url: "/fuli",
          privilege_type: "default"
        }
      ],
      pageIndex: 1,
      id: "1,2,3,4",
      NewsApi: "//cmsapi.5211game.com/NewsService/YYService/YYNews.ashx",
      token: window.localStorage.getItem("loginInfo"),
      bannerLists: [],
      isOpen:false
    };
  },
  mounted() {
    this.$emit("getShopCode", "首页", "首页", false);
    this.getlistNews();
    this._GetBanner();
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
      return Y + M + D;
    }
  },
  methods: {
    openYHQ:function(){
        if(!this.isOpen){
            Toast({
          message: "暂未开放，敬请期待!",
          iconClass: "icon icon-success"
        });
        }else{
          this.$router.push({'path':'/yhqCenter'})
        }
    },
    getlistNews: function() {
      $.getJSON(
        this.NewsApi +
          "?op=NewsListByPage&PageSize=5&PageIndex=" +
          this.pageIndex +
          "&CategoryIds=" +
          this.id +
          "&itemIds=4,12,71&Jsoncallback=?",
        data => {
          //  console.log(data);
          if (!data) return false;
          this.newsList = data.NewsList;
        }
      );
    },
    _GetBanner: function() {
      this.$axios("post", this.$ports.home.GetBanner, {
        st: this.token
      })
        .then(response => {
          console.log(response);
          if (response.data == null || response.data.length == 0) {
            this.bannerLists = this.defaultBanner;
          } else {
            this.bannerLists = response.data;
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
@import "vue-swipe/dist/vue-swipe.css";
#app {
  margin: 0;
  border: 0;
  padding: 0;
  list-style: none;
  margin-top: 40px;
  padding-bottom: 55px;
}
.hello {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}

.banner {
  width: 7.2rem;
  height: 3.8rem;
  background: #000;
}
.banner img {
  width: 7.2rem;
  height: 3.8rem;
  background-size: cover;
}
.banner a {
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
}
.my-swipe {
  height:  3.8rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
}

.slide1 {
  background-color: #000;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
.funProduct {
  width: 6.4rem;
  height: 2rem;
  display: flex;
  padding: 0 0.4rem;
  margin-top: 0.3rem;
}
.in_funProduct {
  flex: 1;
  height: 2rem;
  margin: 0 0.16rem;
}
.in_funProduct img {
  width: 1.2rem;
  height: 1.59rem;
  display: block;
  margin: 0 auto;
}
.in_funProduct p {
  font-size: 0.22rem;
  color: #826532;
  text-align: center;
}
.newsTitle {
  width: 7.2rem;
  text-align: center;
  font-size: 0.26rem;
  color: #333333;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-bottom: 0.3rem;
}
.newsTitle span {
  position: relative;
}
.newsTitle span em.left {
  position: absolute;
  width: 1.58rem;
  height: 0.02rem;
  background: #333333;
  left: -1.8rem;
  top: 0.18rem;
}
.newsTitle span em.right {
  position: absolute;
  width: 1.58rem;
  height: 0.02rem;
  background: #333333;
  right: -1.8rem;
  top: 0.18rem;
}
.newsLists {
  width: 6.3rem;
  margin: 0 auto;
}
.newsLists ul li {
  width: 6.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  padding-left: 0.1rem;
}
.newsLists ul li a {
  color: #333;
}
.newsLists ul li em {
  float: left;
  background: #f9d483;
  border-radius: 0.08rem;
  color: #343434;
  padding: 0 0.1rem;
  display: block;
}
.newsLists ul li span {
  width: 3.5rem;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
  margin: 0 0.2rem;
}
.newsLists ul li b {
  float: left;
  font-weight: normal;
}
</style>