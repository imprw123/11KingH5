<template>
  <div class="yhqCenter">
    <div class="yhqCenterBox">
      <div class="tabFuliChange">
        <span class="sale" @click="changeTest('sale')"></span>
        <span class="mj" @click="changeTest('mj')"></span>
        <span class="td" @click="changeTest('td')"></span>
      </div>
      <!-- 折扣券 -->
      <div class="boxBig" v-show="saleFlag" >
        <saleBox></saleBox>
      </div>
      <!-- 折扣券 -->

      <!-- 满减券 -->
      <div class="boxBig" v-show="mjFlag" >
        <mjBox ref="mj"></mjBox>
      </div>
      <!-- 满减券 -->


       <!-- 特定券 -->
      <div class="boxBig" v-show="tdFlag" > 
        <tdBox ref="td"></tdBox>
      </div>
      <!-- 特定券 -->
    </div>
  </div>
</template>

<script>
import sale from "../components/sale";
import mj from "../components/mj";
import td from "../components/td";
export default {
  name: "dota",
  data() {
    return {
      msg: "",
      saleFlag: true,
      mjFlag: false,
      tdFlag: false
    };
  },
  mounted() {
    this.$emit("getShopCode", "优惠券", "首页", true);
  },
  methods: {
      changeTest:function(val){
          if(val =='sale'){
              this.saleFlag=true;
              this.mjFlag=false;
              this.tdFlag=false;
          }else if(val == 'mj'){
               this.saleFlag=false;
              this.mjFlag=true;
              this.tdFlag=false;
               this.$refs.mj._getLtpkg();
          }else if(val == 'td'){
               this.saleFlag=false;
              this.mjFlag=false;
              this.tdFlag=true;
               this.$refs.td._getLtpkg();
          }
      }
  },
  components: {
    saleBox: sale,
    mjBox: mj,
    tdBox:td
  }
};
</script>

<style>
.yhqCenterBox {
  width: 6.6rem;
  margin: 0 auto;
  overflow: hidden;
  zoom: 1;
  padding-top: 0.4rem;
}
.yhqCenterBox ul li {
  width: 6.32rem;
  height: 2.67rem;
  border-bottom: 0.02rem solid #eeeeee;
  padding: 0.22rem 0.14rem 0.28rem 0.14rem;
}

/* 优惠券详细 */
.tabFuliChange {
  width: 6.6rem;
  text-align: center;
  position: fixed;
  top: 40px;
  padding: 0.2rem 0;
  background-color: #fff;
  z-index: 1;
}
.tabFuliChange span {
  width: 1.8rem;
  height: 0.82rem;
  display: inline-block;
  margin: 0 0.1rem;
}
.tabFuliChange span.sale {
  background: url(../assets/sale.png);
  background-size: cover;
}
.tabFuliChange span.mj {
  background: url(../assets/mj.png);
  background-size: cover;
}
.tabFuliChange span.td {
  background: url(../assets/td.png);
  background-size: cover;
}
.boxBig {
  margin-top: 0.7rem;
}
/* 优惠券详细 */
</style>  