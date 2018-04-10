define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session'], function (app, system, composition, $, ko) {
    var pro = {
        init: function (dom) {
            var that = this;
            //初始化组件
            composition.addBindingHandler("loginHandler", {
                init: function (dom) {
                	$.session.set("token","");
                	if($.session.get("loginName") != ""){
                		$(".loginName").val($.session.get("loginName"));
                	}
                }
            });
        },
        loginMenthod:function () {
            api.login({ loginName: $(".loginName").val(), passWord: $(".passWord").val()},function (res) {
                $.session.set("loginName",$(".loginName").val());
                if(res["code"] == 0){
                	res = res["result"];
                	$.session.set("token",res.token);
                	app.setRoot('desktop/shell', null, null, { user: res["user"],menu:res["menus"],result:res});
                }else{
                	showAlert(res["message"],function(){});
                }
            })
        }
    }

    var viewModal = {
        loginMenthod:pro.loginMenthod
    }

    pro.init();
    return viewModal;
})