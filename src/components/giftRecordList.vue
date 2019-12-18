<template>
  <div class="giftsRocord">
    <div class="inGiftsRocord">
      <div class="giftRecordTab">
        <span class="ptlb" @click="getTab(2)"></span>
        <span class="cdkCode" @click="getTab(1)"></span>
      </div>

      <div class="giftRecordBox" v-show="flag">
        <ul v-for="item in giftslist" :key="item.id">
          <li>
            <div class="giftRecordleft">
              <img
                src="https://act-1251844326.file.myqcloud.com/lottery_637105329539072157.jpg"
                alt
              />
            </div>
            <div class="giftRecordright">
              <p class="ptName">{{item.show_name}}</p>
              <div class="giftRow">
                <span class="ttName">领取时间:</span>
                <span class="ttContext">{{ item.rcv_time | ChangeDateFormat}}</span>
              </div>
              <div class="giftRow">
                <span class="ttName">礼包内容:</span>
                <span class="ttContext">{{item.show_desc}}</span>
              </div>
              <div class="giftRow">
                <span class="ttName">使用方法:</span>
                <span class="ttContext">领取成功后直接放入背包，请前往背包对应分类查看</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="giftRecordBox" v-show="!flag">
        <ul v-for="(item,index) in giftslist" :key="index">
          <li>
            <a href="javascript:;" class="cope" @click="COPE(index)">{{copyName}}</a>
            <div class="giftRecordleft">
              <img
                src="https://act-1251844326.file.myqcloud.com/lottery_637105329539072157.jpg"
                alt
              />
            </div>
            <div class="giftRecordright">
              <p class="ptName">{{item.show_name}}</p>
              <div class="giftRow">
                <span class="ttName">领取时间:</span>
                <span class="ttContext">{{ item.rcv_time | ChangeDateFormat}}</span>
              </div>
              <div class="giftRow">
                <span class="ttName">礼包内容:</span>
                <span class="ttContext"><input type="text" ref="codeCDK" disabled="true" v-bind:value="item.show_desc" ></span>
              </div>
              <div class="giftRow">
                <span class="ttName">使用方法:</span>
                <span class="ttContext">领取成功后，可在我——我的礼包查看，请前往平台背包兑换，点击左下角蓝色图标（背包）——CDKey兑换</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "giftRecordList",
  data() {
    return {
      flag: true,
      giftslist: [],
      pageIndex: 1,
      pageSize: 10,
      ptId: 2,
      copyName:'复制cdk码'
    };
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
      return Y + M + D + h + m + s;
    }
  },
  mounted() {
    this.$emit("getShopCode", "我的礼包", "我的", true);
    this._MyPkgLog();
  },
  methods: {
    _MyPkgLog: function() {
      this.$axios("post", this.$ports.my.MyPkgLog, {
        st: window.localStorage.getItem("loginInfo"),
        page_index: this.pageIndex,
        page_size: this.pageSize,
        pt: this.ptId
      })
        .then(response => {
          console.log(response);
          this.giftslist = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTab(val) {
      if (val == 2) {
        this.ptId = 2;
        this.flag = true;
        this._MyPkgLog();
      } else if (val == 1) {
        this.ptId = 1;
        this.flag = false;
        this._MyPkgLog();
      }
    },
    COPE:function(val){
      console.log(val);
     this._copyToClipboard(this.$refs.codeCDK[val]);
    },
     //复制cdk
    _copyToClipboard: function (elem) {
      //debugger;
        // create hidden text element, if it doesn't already exist
        var targetId = "_hiddenCopyText_";
        var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
        var origSelectionStart, origSelectionEnd;
        if (isInput) {
            // can just use the original source element for the selection and copy
            target = elem;
            origSelectionStart = elem.selectionStart;
            origSelectionEnd = elem.selectionEnd;
        } else {
            // must use a temporary form element for the selection and copy
            target = document.getElementById(targetId);
            if (!target) {
                var target = document.createElement("textarea");
                target.style.position = "absolute";
                target.style.left = "-9999px";
                target.style.top = "0";
                target.id = targetId;
                document.body.appendChild(target);
            }
            target.textContent = elem.textContent;
        }
        // select the content
        var currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
        // copy the selection
        var succeed;
        try {
            succeed = document.execCommand("copy");
        } catch (e) {
            succeed = false;
        }
        // restore original focus
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }
        if (isInput) {
            // restore prior selection
            elem.setSelectionRange(origSelectionStart, origSelectionEnd);
        } else {
            // clear temporary content
            target.textContent = "";
        }
        this.copyName="复制成功";
        return succeed;
    }
  }
};
</script>

<style scoped>
.inGiftsRocord {
  width: 6.1rem;
  margin: 0 auto;
}
.giftRecordTab {
  text-align: center;
  width: 100%;
  height: 1.15rem;
  border-bottom: 0.01rem solid #eeeeee;
  width: 6.1rem;
  position: fixed;
  top: 40px;
  background-color: #fff;
  padding-top: 0.2rem;
  z-index: 1;
}
.giftRecordTab span {
  width: 2.35rem;
  height: 0.8rem;
  display: inline-block;
  margin: 0 0.15rem;
}
.giftRecordTab span.ptlb {
  background: url(../assets/ptlb.png);
  background-size: cover;
}
.giftRecordTab span.cdkCode {
  background: url(../assets/cdk.png);
  background-size: cover;
}
.giftRecordBox {
  margin-top: 2.2rem;
}
.giftRecordBox ul li {
  overflow: hidden;
  zoom: 1;
  padding: 0.22rem 0 0.22rem 0.1rem;
  border-bottom: 0.01rem solid #eeeeee;
  position: relative;
}
.giftRecordBox ul li a.cope {
  width: 1.35rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  color: #fff;
  background-color: #d5b47e;
  border-radius: 0.1rem;
  position: absolute;
  top: 0.2rem;
  right: 0px;
}
.giftRecordleft {
  width: 1.5rem;
  overflow: hidden;
  zoom: 1;
  float: left;
}
.giftRecordleft img {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  border-radius: 0.2rem;
}
.giftRecordright {
  width: 4.3rem;
  overflow: hidden;
  zoom: 1;
  float: left;
  padding-left: 0.2rem;
}
.giftRecordright p.ptName {
  font-size: 0.25rem;
  color: #826532;
}
.giftRow {
  overflow: hidden;
  zoom: 1;
  margin-top: 0.2rem;
}
.giftRow span {
  float: left;
  color: #b9b9b9;
}
.giftRow span.ttName {
  width: 1.2rem;
  overflow: hidden;
  zoom: 1;
}
.giftRow span.ttContext {
  width: 3.1rem;
  overflow: hidden;
  zoom: 1;
}
.giftRow span.ttContext input{
  border:none;
  width:3.1rem;
   color: #b9b9b9;
   overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>