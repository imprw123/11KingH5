<template>
    <div class="active">
        <div class="inActive">
            <ul>
                <li v-for="item in 6" :key="item.id">
                    <div class="activeBanner">
                        <img v-lazy="'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'" alt="">
                    </div>
                    <p class="activeTitle">活动标题</p>
                    <p class="dateTimeTitle"><em>2019-05-03</em></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from './header';
import TabBar from './tabBar';
export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){

      this.$emit('getShopCode','热门活动','首页',true);
  }
}
</script>

<style>
.active{
    width:7.2rem;
    overflow: hidden;
    zoom:1;
}
.inActive{
       width:7.2rem;
    overflow: hidden;
    zoom:1;
}
.inActive ul li{
    width:6.6rem;
    overflow: hidden;
    padding: 0.5rem 0.3rem 0.25rem 0.3rem;
 border-bottom: 0.1rem solid #eeeeee;
}
.activeBanner{
    width:6.6rem;
    height: 3rem;
    background-color: #000;
    margin-bottom: 0.2rem;
    border-radius: 0.14rem;
}
.activeBanner img{
     width:6.6rem;
    height: 3rem;
    border-radius: 0.14rem;
}
.activeTitle{
   color: #826532;
   font-size: 0.28rem;
   margin-bottom: 0.1rem;
}
.dateTimeTitle{
    font-size: 0.22rem;
    color: #b9b9b9;
}
</style>