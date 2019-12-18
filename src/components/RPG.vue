<template>
    <div class="rpg">
        <div class="rpgBox">
            <div class="rpgBoxTitle">
                今日推荐
            </div>
            <div class="rpgAdvance">
                <img src="../assets/guanggao.png" alt="">
            </div>
            <div class="rpgList">
                <ul>
                    <li v-for="item in 4" :key="item.id">
                        <div class="left">
                            <img src="../assets/icon.png" alt="">
                        </div>
                        <div class="right">
                            <p class="mapName">地图名称</p>
                            <p class="typeName"><em>地图名称</em>/<em>类型</em> </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="xian"></div>
          <div class="rpgBox">
            <div class="rpgBoxTitle">
                本周热门
            </div>
            <div class="rpgAdvance">
                <img src="../assets/guanggao.png" alt="">
            </div>
            <div class="rpgList">
                <ul>
                    <li v-for="item in 4" :key="item.id">
                        <div class="left">
                            <img src="../assets/icon.png" alt="">
                        </div>
                        <div class="right">
                            <p class="mapName">地图名称</p>
                            <p class="typeName"><em>地图名称</em>/<em>类型</em> </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
     this.$emit('getShopCode','RPG','RPG',false);
  }
}
</script>

<style>
    .rpg{
        width:7.2rem;
        overflow: hidden;
        zoom:1;
    }
    .rpgBox{
        padding:0.3rem;
        overflow: hidden;
        zoom:1;
    }
    .rpgBoxTitle{
        font-size:0.28rem;
        margin-bottom: 0.2rem;
    }
    .rpgAdvance{
        width:6.6rem;
        height: 1.9rem;
        margin: 0 auto;
          margin-bottom: 0.25rem;
    }
    .rpgAdvance img{
        width:6.6rem;
        height: 1.9rem;
        border-radius: 0.2rem;
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
    }
    .rpgList .left img{
         width:1.1rem;
        height: 1.1rem;
        border-radius:0.1rem;
    }
    .right{
        width:5.2rem;
        height: 1.1rem;
        border-bottom: 0.02rem solid #eeeeee;
        margin-left: 0.2rem;
        float: left;
    }
    .right .mapName{
        color: #826532;
        font-size: 0.22rem;
        margin-bottom: 0.3rem;
    }
    .typeName{
        color: #b9b9b9;
        font-size: 0.2rem;
    }
    .xian{
        width:7.2rem;
        height: 0.2rem;
        background-color: #eeeeee;
    }
</style>