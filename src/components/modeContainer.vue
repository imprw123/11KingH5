<template>
    <div class="mainContainer">
        <iframe v-bind:src="url" frameborder="0" scrolling="auto" id="ctx"></iframe>
    </div>
</template>
<script>
export default {
    data(){
        return{
            url:''
        }
    },
      mounted() {
         this.$emit("getShopCode", "热门", " "+this.$route.params.pageName+" ",true);
         this.url=this.$route.params.mapUrl;
        }
}
</script>

<style>
.mainContainer{
    width:7.2rem;
    min-height: 15rem;
}
.mainContainer #ctx{
    width:7.2rem;
    min-height:15rem;
}
#app{
    padding: 0px;
}
</style>