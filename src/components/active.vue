<template>
  <div class="active">
    <div class="inActive"  v-show="activeLists.length !=0 && activeLists != null">
      <ul>
        <li v-for="(item,index) in activeLists" :key="index">
          <div class="activeBanner">
            <a :href="item.show_detail" target="_blank" v-if="item.privilege_type == 10 && !$isWeiXin()">
              <img  v-lazy="item.img" alt />
            </a>

              <router-link
            :to="{'name':'modeContainer',params:{'mapUrl':item.show_detail,'pageName':'首页'}}"
            v-if="item.privilege_type == 10 && $isWeiXin()"
          >
            <img  v-lazy="item.img" alt />
          </router-link>

            <router-link
              :to="{'path':'/newsDetail',query:{'News_Id':item.show_detail}}"
              v-if="item.privilege_type == 11"
            >
              <img  v-lazy="item.img" alt />
            </router-link>
            <router-link
              :to="{'path':'/giftdetail',query:{'pt':item.privilege_type,'id':item.show_detail}}"
              v-if="item.privilege_type == 1 || item.privilege_type == 2 || item.privilege_type == 3"
            >
              <img  v-lazy="item.img" alt />
            </router-link>
          </div>
          <p class="activeTitle">{{item.show_name}}</p>
          <p class="dateTimeTitle">
            <em>结束时间: {{item.ed_time}}</em>
          </p>
        </li>
      </ul>
    </div>
       <div class="noListbg"  v-show="activeLists.length ==0 || activeLists == null">
        <img src="../assets/nolist.jpg" alt="">
    </div>
  </div>
</template>

<script>
import Header from "./header";
import TabBar from "./tabBar";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      token: window.localStorage.getItem("loginInfo"),
      activeLists: []
    };
  },
  mounted() {
    this.$emit("getShopCode", "热门活动", "首页", true);
    this._HotActive();
  },
  methods: {
    _HotActive: function() {
      this.$axios("post", this.$ports.active.HotActive, {
        st: this.token
      })
        .then(response => {
          console.log(response);
          this.activeLists = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.active {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
}
.inActive {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
}
.inActive ul li {
  width: 6.6rem;
  overflow: hidden;
  padding: 0.5rem 0.3rem 0.25rem 0.3rem;
  border-bottom: 0.1rem solid #eeeeee;
}
.activeBanner {
  width: 6.6rem;
  height: 3.48rem;
  background-color: #000;
  margin-bottom: 0.2rem;
  border-radius: 0.14rem;
}
.activeBanner img {
  width: 6.6rem;
  height: 3.48rem;
  border-radius: 0.14rem;
}
.activeTitle {
  color: #826532;
  font-size: 0.28rem;
  margin-bottom: 0.1rem;
}
.dateTimeTitle {
  font-size: 0.22rem;
  color: #b9b9b9;
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