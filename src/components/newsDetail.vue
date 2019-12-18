<template>
  <div class="newsDetail">
    <h1 class="title">{{ News_Title}}</h1>
    <p class="timer">
      发布时间
      <em>{{AddDate | ChangeDateFormat}}</em>来源
      <em>{{Item_Name}}</em>
    </p>
    <div  class="contxt" v-html="News_Content"></div>
  </div>
</template>

<script>
export default {
  name: "newsDetail",
  data() {
    return {
      NewsApi: "//cmsapi.5211game.com/NewsService/YYService/YYNews.ashx",
      News_Title: "",
      AddDate: "",
      Item_Name: "",
      News_Content:''
    };
  },
  mounted() {
    this.$emit("getShopCode", "新闻详情", "首页", true);
    this.getNewsDetail();
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
  methods: {
    getNewsDetail() {
      $.getJSON(
        this.NewsApi +
          "?op=QueryNewsById&NewsId=" +
          this.$route.query.News_Id +
          " &Jsoncallback=?",
        data => {
          console.log(data);
          this.News_Title = data.News_Title;
          this.AddDate = data.AddDate;
          this.Item_Name = data.Item_Name;
          this.News_Content=data.News_Content
        }
      );
    }
  }
};
</script>

<style>
.newsDetail{
    padding-top: 0.3rem;
}
.newsDetail .title{
    font-size: 0.35rem;
    width:100%;
    text-align: center;
    height:0.8rem;
    line-height:0.8rem;
    color: #000;
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newsDetail .timer{
    font-size: 0.22rem;
    color: #999;
    text-align: center;
}
.contxt{
    width:6.6rem;
    margin:0 auto;
    overflow: hidden;
    zoom:1;
    font-size: 0.22rem !important;
    color: #333;
}
.contxt p{
    line-height:0.6rem !important;
}
.contxt img{
    width:5rem !important;
    height: 5rem !important;
    display: block;
    margin: 0.2rem auto;
    background-size: cover;
}
</style>