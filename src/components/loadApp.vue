<template>
    <div class="load">
        <iframe src="https://g.5211game.com/M/html5/index.html" frameborder="0" scrolling="auto" id="ctx"></iframe>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
      mounted() {
         this.$emit("getShopCode", "下载11APP", "我", true);
         
        }
}
</script>

<style>
.load{
    width:7.2rem;
    height: 15rem;
}
.load #ctx{
     width:7.2rem;
    height: 15rem;
}
#app{
    padding: 0px;
}
</style>