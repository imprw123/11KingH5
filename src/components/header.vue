<template>
    <div class="header">
        <a href="javascript:;" v-show="Flag" class="back" v-on:click="_back"></a>
        <span>{{message}}</span>
    </div>
</template>

<script>
export default {
    props:["message","Flag"],
    data(){

        return {

        }
    },
    methods:{

      
    }
}
</script>

<style>
    .header{
        width:7.2rem;
        height:0.8rem;
        line-height: 0.8rem;
        background: #1d1d1d;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        position: fixed;
        top:0px;
        z-index: 1;
    }
    .back{
        width:0.32rem;
        height: 0.42rem;
        background: url(../assets/fanhui.png);
        background-size:cover;
        position: absolute;
        top:0.2rem;
        left: 0.2rem;
    }
</style>