<template>
    <div class="tarBar">
        <div class="inTab" v-for= "(btn,key) in btns" :key="btn.id"  @click="changetype(key)">
            <img :class="{'hide':(btn.src1 && btn.selected)}" :src="btn.src1" />
            <img :class="{'hide':(btn.src2&&!btn.selected)}" :src="btn.src2" />
            <p>{{btn.tip}}</p>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'tabBar',
      data:function(){
      return {
      btns:[
        {selected:true,src1:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/home.png',src2:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/homeCurrent.png',tip:'首页'},
       {selected:false,src1:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/rpg.png',src2:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/rpgCurrent.png',tip:'RPG'},
       {selected:false,src1:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/yao.png',src2:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/yaoCurrent.png',tip:'妖豆'},
       {selected:false,src1:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/dota.png',src2:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/dotaCurrent.png',tip:'DOTA'},
       {selected:false,src1:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/my.png',src2:'https://img.5211game.com/5211/Act/2019/yaoyaoKing/images/myCurrent.png',tip:'我的'}
      ]
      }
    },
    mounted(){
             this.btns.forEach((e)=>{
               this.$set(e,'selected', false);
           });
           this.$set(this.btns[this.$route.query.id],'selected', true);
    },
     methods: {
        changetype:function(key) { 
         switch(key){
           case 0:
            this.$router.push({ path:'/',query:{id:0}});
            break;
            case 1:
            this.$router.push({ path:'/rpg',query:{id:1}});
            break;
            case 2:
             this.$router.push({ path:'/yao',query:{id:2}});
             break;
             case 3:
             this.$router.push({ path:'/dota',query:{id:3}});
             break;
             case 4:
             this.$router.push({ path:'/my',query:{id:4}});
             break;
         }
         }
       }
}
</script>

<style  scoped>
    .tarBar{
         width:7.2rem;
        height:0.8rem;
        background: #1d1d1d;
        color: #fff;
        font-size: 0.3rem;
        position: fixed;
        bottom:0px;
        z-index: 1;
        display: flex;
    }
    .inTab{
        flex: 1;
        height: 0.8rem;
        text-align: center;
      color: #fff;
          font-size:0.12rem;
          font-family:'微软雅黑';
    }
    .inTab img{
        display: inline-block;
        width:0.5rem;
        height: 0.5rem;
    }
       .inTab img.hide{
         display:none;
       }
</style>