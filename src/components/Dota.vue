<template>
    <div class="dota">
        <div class="dotaBox">
        <div class="dotaTitle">
            本周试用
        </div>
        <div class="imgShow">
            <img src="../assets/guanggao.png" alt="">
        </div>
        <p class="FlName">皮肤名称/天数</p>
        <p class="FlBtn"><a href="javascript:;" class="lq">立即领取</a></p>
        <p class="FlXh">消耗50000妖豆</p>
        <p class="FlDh">每周限兑一次</p>
        </div>
        <div class="xian"></div>
        <div class="product">
            <div class="title">
                游戏道具<em>（每周限兑一次）</em>
            </div>
             <div class="rpgList">
                <ul>
                    <li v-for="item in 4" :key="item.id">
                        <div class="left">
                            <img src="../assets/icon.png" alt="">
                        </div>
                        <div class="rpgListRight">
                            <p class="mapName">地图名称</p>
                            <p class="typeName"><em>地图名称</em>/<em>类型</em> </p>
                            <p><a href="javascript:;" class="ljlq">立即兑换</a></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     name: 'dota',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
     this.$emit('getShopCode','DOTA','DOTA',false);
  }
}
</script>
<style scoped>
    .dota{
        width:7.2rem;
        overflow: hidden;
        zoom:1;
    }
    .dotaBox{
        width:6.6rem;
        margin:0 auto;
        margin-top: 0.25rem;
        padding-bottom:0.25rem;
    }
    .dotaTitle{
       width:6.6rem;
       text-align: left;
       margin-bottom: 0.2rem;
       font-size: 0.28rem;
       color: #000000;
    }
    .imgShow{
        width:2rem;
        height: 2rem;
        margin: 0 auto;
        margin-bottom:0.2rem;
    }
    .imgShow img{
         width:2rem;
        height: 2rem;
        border-radius: 0.2rem;
    }
    .FlName{
        width:6.6rem;
        text-align: center;
         margin-bottom:0.2rem;
    }
    .FlBtn{
         width:6.6rem;
        text-align: center;
         margin-bottom:0.2rem;
    }
    .FlBtn a{
        width:1.8rem;
        height: 0.5rem;
        line-height: 0.5rem;
        display: block;
        margin: 0 auto;
        background-color: #d5b47e;
        color: #fff;
        border-radius: 0.08rem;
    }
    .FlXh{
         width:6.6rem;
        text-align: center;
         margin-bottom:0.08rem;
    }
    .FlDh{
         width:6.6rem;
        text-align: center;
    }
    .xian{
        width:7.2rem;
        height: 0.2rem;
        background-color: #eeeeee;
    }
    .product{
        width:6.6rem;
        margin: 0 auto;
        padding-top: 0.2rem;
    }
    .product .title{
        font-size: 0.3rem;
        color: #000000;
        margin-bottom: 0.2rem;
    }
     .product .title em{
        font-size: 0.2rem;
    }
     .rpgList{
        width:6.5rem;
        margin: 0 auto;
        padding-left: 0.1rem;
    }
    .rpgList ul li{
        overflow: hidden;
        zoom:1;
        margin-bottom:0.25rem;
    }
    .rpgList .left{
        width:1.1rem;
        height: 1.1rem;
        float: left;
       border-radius:0.1rem;
       margin-top:0.1rem;
    }
    .rpgList .left img{
         width:1.1rem;
        height: 1.1rem;
        border-radius:0.1rem;
    }
    .rpgListRight{
        width:5.2rem;
        border-bottom: 0.02rem solid #eeeeee;
        margin-left: 0.2rem;
        float: left;
        padding-bottom: 0.2rem;
    }
    .rpgListRight p{
        overflow: hidden;
        zoom:1;
    }
    .rpgListRight .mapName{
        color: #826532;
        font-size: 0.22rem;
        margin-bottom: 0.15rem;
    }
    .typeName{
        color: #b9b9b9;
        font-size: 0.2rem;
        margin-bottom:0.15rem;
    }
    .ljlq{
        width:1.5rem;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: center;
        color: #fff;
        background-color: #d5b47e;
        display: block;
        border-radius: 0.08rem;
    }
</style>