<template>
    
</template>
<script>
export default {
      data () {
    return {
      msg: '',
        LoginUrl:'https://passport.9211.com/Login/IndexH5',
      SiteId:50008,
      ServerId:7,
    }
  },
    created (){
    if(this.$route.query.st){   
        window.localStorage.setItem('loginInfo',this.$route.query.st);  
        window.location=window.location.href.substring(0,window.location.href.indexOf("&"));
    
        if(window.localStorage.getItem('loginInfo')){
   

            return false;

        }else if(window.localStorage.getItem('loginInfo')  == null){
          
              //是否是强制登录
               window.location.href=this.stringFormat("{0}?siteid={1}&returnUrl={2}&srvid={3}",this.LoginUrl,this.SiteId,escape(window.location.href),this.ServerId);    
        }
      }else {
        if(window.localStorage.getItem('loginInfo') == null){
      
            //是否是强制登录
           window.location.href=this.stringFormat("{0}?siteid={1}&returnUrl={2}&srvid={3}",this.LoginUrl,this.SiteId,escape(window.location.href),this.ServerId);     
        }
      }
  },
  mounted(){
     this.$emit('getShopCode','我的','我的',false);
  },
  methods:{

          stringFormat:function(){
      if (arguments.length == 0)
          return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
          var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
          str = str.replace(re, arguments[i]);
        }
        return str;
    }
  }
}
</script>

