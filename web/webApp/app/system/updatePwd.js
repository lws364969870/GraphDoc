define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(doms){
			//初始化组件
			composition.addBindingHandler("updatePwdHandler", { 
				init: function (dom){
					proj.clearViewModal();
					viewModal.id(viewModal._$_params.user.id);
				}
			});
        },
        submitUpdatePwd:function(){
        	if(submitFun()){
	        	api.editPassWord({id:viewModal.id(),oldPassWord:viewModal.oldPassWord(),newPassWord:viewModal.newPassWord()},function (res) {
	        		if(res["code"] == 0){
	        			showAlert("修改该用户密码成功！",function(){
	        				window.location.href = 'index.html';
	        			});
	        		}
	            })
        	}
        },
        clearViewModal:function(){
        	viewModal.id("");
	    	viewModal.oldPassWord("");
			viewModal.newPassWord("");
			viewModal.newPassWord2("");
        }
	}
	
	
	//页面模型
    var viewModal = {
    	id:ko.observable(""),
    	oldPassWord:ko.observable(""),
		newPassWord:ko.observable(""),
		newPassWord2:ko.observable(""),
        submitUpdatePwd:proj.submitUpdatePwd,
    }
	
	proj.init();
    return viewModal;
});