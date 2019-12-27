<template>
  <div class="rpg">
    <div class="rpgBox">
      <div class="rpgBoxTitle">今日推荐</div>
      <div class="rpgAdvance" v-if="TodayRecommand !=null">
        <a
          :href="TodayRecommand.desc"
          target="_blank"
          v-if="TodayRecommand.privilege_type == 10 && !$isWeiXin()"
        >
          <img v-lazy="TodayRecommand.b_img" alt />
        </a>

        <router-link
          :to="{'name':'modeContainer',params:{'mapUrl':TodayRecommand.desc,'pageName':'首页'}}"
          v-if="TodayRecommand.privilege_type == 10 && $isWeiXin()"
        >
          <img v-lazy="TodayRecommand.b_img" alt />
        </router-link>

        <router-link
          :to="{'path':'/newsDetail',query:{'News_Id':TodayRecommand.desc}}"
          v-if="TodayRecommand.privilege_type == 11"
        >
          <img v-lazy="TodayRecommand.b_img" alt />
        </router-link>

        <router-link
          :to="{'path':'/giftDetail',query:{'pt':TodayRecommand.privilege_type,'id':TodayRecommand.id,'pageTxt':'RPG'}}"
        >
          <img v-lazy="TodayRecommand.b_img" alt />
        </router-link>
      </div>
      <div class="rpgList">
        <ul>
          <li v-for="(item,index) in TodayLst" :key="index">
            <router-link
              :to="{'path':'/giftDetail',query:{'pt':item.privilege_type,'id':item.id,'pageTxt':'RPG'}}"
            >
              <div class="left">
                <img v-lazy="item.b_img" />
              </div>
              <div class="right">
                <p class="mapName">{{item.name}}</p>
                <p class="typeName">
                  <em>{{item.desc}}</em>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="xian"></div>
    <div class="rpgBox">
      <div class="rpgBoxTitle">本周热门</div>
      <div class="rpgAdvance" v-if="WeekRecomannd !=null">
        <a
          :href="WeekRecomannd.desc"
          target="_blank"
          v-if="WeekRecomannd.privilege_type == 10 && !$isWeiXin()"
        >
          <img v-lazy="WeekRecomannd.b_img" alt />
        </a>

        <router-link
          :to="{'name':'modeContainer',params:{'mapUrl':WeekRecomannd.desc,'pageName':'首页'}}"
          v-if="WeekRecomannd.privilege_type == 10 && $isWeiXin()"
        >
          <img v-lazy="WeekRecomannd.b_img" alt />
        </router-link>

        <router-link
          :to="{'path':'/newsDetail',query:{'News_Id':WeekRecomannd.desc}}"
          v-if="WeekRecomannd.privilege_type == 11"
        >
          <img v-lazy="WeekRecomannd.b_img" alt />
        </router-link>

        <router-link
          :to="{'path':'/giftDetail',query:{'pt':WeekRecomannd.privilege_type,'id':WeekRecomannd.id,'pageTxt':'RPG'}}"
        >
          <img v-lazy="WeekRecomannd.b_img" alt />
        </router-link>
      </div>
      <div class="rpgList">
        <ul>
          <li v-for="(item,index) in WeekLst" :key="index">
            <router-link
              :to="{'path':'/giftDetail',query:{'pt':item.privilege_type,'id':item.id,'pageTxt':'RPG'}}"
            >
              <div class="left">
                <img v-lazy="item.b_img" />
              </div>
              <div class="right">
                <p class="mapName">{{item.name}}</p>
                <p class="typeName">
                  <em>{{item.desc}}</em>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      msg: "",
      TodayRecommand: "",
      TodayLst: [],
      WeekRecomannd: "",
      WeekLst: [],
      token: window.localStorage.getItem("loginInfo")
    };
  },
  mounted() {
    this.$emit("getShopCode", "RPG", "RPG", false);
    this._GetRpgPkg();
  },
  methods: {
    _GetRpgPkg: function() {
      this.$axios("post", this.$ports.rpg.GetRpgPkg, {
        st: this.token,
        page_index: this.pageIndex,
        page_size: this.pageSize
      })
        .then(res => {
          console.log(res);
          this.TodayRecommand = res.data.TodayRecommand;
          this.WeekRecomannd = res.data.WeekRecomannd;
          this.TodayLst = res.data.TodayLst;
          this.WeekLst = res.data.WeekLst;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.rpg {
  width: 7.2rem;
  overflow: hidden;
  zoom: 1;
  margin-bottom: 0.5rem;
}
.rpgBox {
  padding: 0.3rem;
  overflow: hidden;
  zoom: 1;
}
.rpgBoxTitle {
  font-size: 0.35rem;
  margin-bottom: 0.2rem;
}
.rpgAdvance a {
  display: block;
  width: 100%;
  height: 100%;
}
.rpgAdvance {
  width: 6.6rem;
  height:  3.48rem;
  margin: 0 auto;
  margin-bottom: 0.25rem;
}
.rpgAdvance img {
  width: 6.6rem;
  height: 3.48rem;
  border-radius: 0.2rem;
}
.rpgList {
  width: 6.5rem;
  margin: 0 auto;
  padding-left: 0.1rem;
}
.rpgList ul li {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 0.25rem;
}
.rpgList ul li a {
  display: block;
  width: 100%;
  height: 100%;
}
.rpgList .left {
  width: 1.1rem;
  height: 1.1rem;
  float: left;
  border-radius: 0.1rem;
}
.rpgList .left img {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.1rem;
}
.right {
  width: 5.2rem;
  height: 1.1rem;
  border-bottom: 0.02rem solid #eeeeee;
  margin-left: 0.2rem;
  float: left;
}
.right .mapName {
  color: #826532;
  font-size: 0.22rem;
  margin-bottom: 0.3rem;
}
.typeName {
  color: #b9b9b9;
  font-size: 0.2rem;
}
.xian {
  width: 7.2rem;
  height: 0.2rem;
  background-color: #eeeeee;
}
</style>