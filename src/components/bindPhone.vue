<template>
  <div class="Phone">
    <div class="inPhone">
      <div class="row">
        <div class="phoneNumber">
          <span>手机号</span>
          <input type="tel" v-model="val" v-on:input="change" />
          <input
            class="code"
            v-bind:disabled="isDisable"
            v-bind:value="btnVal"
            type="button"
            @click="requestCode"
          />
        </div>
        <div
          class="titer"
          v-show="flagTitler"
          v-bind:style="{'color':colorY ==true? '#23D423':'red'}"
        >{{msg}}</div>
      </div>

      <div class="row">
        <div class="phoneNumber">
          <span>验证码</span>
          <input type="text" v-model="inCode" />
        </div>
      </div>
    </div>
    <a href="javascript:;" class="bindbtn" @click="_TelBindMobile">确定绑定</a>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      msg: "",
      val: "",
      flagTitler: false,
      colorY: false,
      countdown: 60,
      isDisable: false,
      btnVal: "获取验证码",
      inCode: ""
    };
  },
  mounted() {
    this.$emit("getShopCode", "绑定手机", "我的", true);
  },
  methods: {
    change: function() {
      this.flagTitler = true;
      if (this.val == "") {
        this.flagTitler = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.val)) {
        this.colorY = false;
        this.msg = "输入的手机号码有误!";
      } else {
        this.colorY = true;
        this.msg = "填写正确!";
      }
    },
    //获取验证码倒计时
    requestCode: function() {
      if (!this.colorY) {
        Toast({
          message: "请先输入正确的手机号!"
        });
        return;
      }
      this._TelSendCode();
    },
    _settime: function() {
      var _that = this;
      if (this.countdown == 0) {
        this.isDisable = false;
        this.btnVal = "获取验证码";
        this.countdown = 60;
        return;
      } else {
        this.isDisable = true;
        this.btnVal = "重新发送(" + this.countdown + ")";
        this.countdown--;
        setTimeout(
          function() {
            _that._settime();
          },

          1000
        );
      }
    },

    //获取验证码
    _TelSendCode: function() {
      var _that = this;
      this.$axios("post", "/YYKing/King/TelSendCode", {
        mobile: this.val,
        st: window.localStorage.getItem("loginInfo")
      })
        .then(function(response) {
          console.log(response);
          if (response.errCode == 1000) {
            Toast({
              message: response.msg
            });
          } else if (response.errCode < 0) {
            Toast({
              message: response.msg
            });
          } else {
            Toast({
              message: "获取成功!"
            });
            _that._settime();
          }
        })
        .catch(function(error) {});
    },
    _TelBindMobile: function() {
      if (!this.colorY) {
        Toast({
          message: "请先输入正确的手机号!"
        });
        return false;
      } else if (this.inCode == "") {
        Toast({
          message: "请输入验证码!"
        });
        return false;
      }
      var _that = this;
      this.$axios("post", "/YYKing/King/TelBindMobile", {
        mobile: this.val,
        st: window.localStorage.getItem("loginInfo"),
        code: this.inCode
      })
        .then(function(response) {
          console.log(response);
          if (response.errCode == 0) {
            Toast({
              message: "绑定成功!"
            });
            _that.$router.push({ path: "/my" });
          } else {
            Toast({
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style  scoped>
.Phone {
  width: 100%;
  overflow: hidden;
  zoom: 1;
}
.inPhone {
  width: 6.6rem;
  margin: 0 auto;
  padding-top: 0.42rem;
  height: 2.2rem;
}
.phoneNumber {
  width: 4.66rem;
  height: 0.6rem;
  border: 0.02rem solid #dadada;
  border-radius: 0.08rem;
  padding-right: 1.9rem;
  position: relative;
}
.titer {
  padding-left: 0.15rem;
  margin-top: 0.2rem;
}
.phoneNumber span {
  width: 1.43rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  float: left;
  border-right: 0.02rem solid #dadada;
  font-size: 0.26rem;
}
.phoneNumber input {
  width: 2.85rem;
  height: 0.5rem;
  line-height: 0.5rem;
  float: left;
  border: none;
  outline: none;
  padding: 0.03rem 0rem;
  padding-left: 0.15rem;
  -webkit-appearance: none;
}
.phoneNumber .code {
 width: 1.77rem;
    height: 0.44rem;
    line-height: 0.3rem;
    text-align: center;
    background-color: #aaaaaa;
    display: block;
    position: absolute;
    top: 0.08rem;
    right: 0.08rem;
    border-radius: 0.22rem;
    color: #fff;
    font-family: "微软雅黑";
    -webkit-appearance: none;
    font-size: 0.16rem;
    padding-left: 0px;
}
.phoneNumber .code:disabled {
  color: red;
  opacity: 1;
  -webkit-opacity: 1;
  -webkit-text-fill-color: #000;
}
.row {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 0.4rem;
}
.bindbtn {
  width: 2.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  margin: 0 auto;
  display: block;
  background-color: #d5b47e;
  color: #fff;
  border-radius: 0.3rem;
  font-family: "微软雅黑";
  margin: 0 auto;
  margin-top: 0.4rem;
}
</style>