<template>
  <div class="fuli">
    <div class="inFuli">
      <div class="changeYhqCenter">
        <p @click="test('tab-container1')" v-bind:class="{'current':active == 'tab-container1'}">精选</p>
        <p @click="test('tab-container2')" v-bind:class="{'current':active == 'tab-container2'}">节日</p>
        <p @click="test('tab-container3')" v-bind:class="{'current':active == 'tab-container3'}">生日</p>
      </div>
      <div class="page-tab-container">
        <mt-tab-container
          class="page-tabbar-tab-container"
          v-model="active"
          swipeable
          value="tab-container1"
        >
          <mt-tab-container-item id="tab-container1">
            <div class="giftsBoxFuli">
              <ul>
                <li v-for="item in 10" :key="item.id">
                  <div class="giftsBox-left">
                    <img
                      v-lazy="'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'"
                      alt
                    />
                  </div>
                  <div class="giftsBox-right">
                    <p class="giftsName">礼包名称</p>
                    <p class="giftsInfor">
                      领取条件:
                      <em></em>
                    </p>
                    <p class="giftsInfor">
                      有效期:
                      <em></em>
                    </p>
                    <div class="btnBOx">
                      <a href="javascript:;" class="lq">立即领取</a>
                      <span>已领：XXXX/总量</span>
                    </div>
                    <div class="infor">
                      <span>
                        每月限兑:
                        <em>0</em>/
                        <em>1</em>
                      </span>
                      <span>
                        每日限兑:
                        <em>0</em>/
                        <em>1</em>
                      </span>
                      <span>每个账号限兑1次</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <mt-cell :key="n" v-for="n in 5" title="tab-container 2"></mt-cell>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3">
            <mt-cell :key="n" v-for="n in 7" title="tab-container 3"></mt-cell>
          </mt-tab-container-item>
        </mt-tab-container>
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
      active: "tab-container1",
      swipeable: true
    };
  },
  mounted() {
    this.$emit("getShopCode", "会员福利", "首页", true);
  },
  methods: {
    test(id) {
      this.active = id;
      console.log(this.active);
    }
  }
};
</script>
<style>
#app{
  padding: 0px;
}
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
.giftsBox-right {
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
  background-color: #d5b47e;
  display: inline-block;
  border-radius: 0.1rem;
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
  width:6.6rem;
  display: flex;
  height: 0.9rem;
  margin:0 auto;
  position:fixed;
  top:40px;
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
.page-tab-container{
  margin-top:50px;
}
</style>