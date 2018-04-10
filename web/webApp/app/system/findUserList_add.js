define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(doms){
			//初始化组件
			composition.addBindingHandler("findUserListAddHandler", { 
				init: function (dom){
					proj.clearViewModal();
					//部门
					api.findDepartmentByPage(null,null,{},function(res){
						if(res["code"] == 0){
							idx = res["result"]["result"];
							if(idx.length > 0){
								viewModal.departmentArr(idx);
								if(viewModal._$_params != null){
									viewModal.departmentStr(viewModal._$_params.departmentId);
								}
							}
						}
					})
					//角色
					api.findRoleByPage(null,null,{},function(res){
						if(res["code"] == 0){
							idx = res["result"]["result"];
							if(idx.length > 0){
								viewModal.roleArr(idx);
								if(viewModal._$_params != null){
									viewModal.roleStr(viewModal._$_params.roleId);
								}
							}
						}
						
					})
					if(viewModal._$_params == null){
						viewModal.title("添加用户信息");
						viewModal.showsuccess("添加该用户成功！");
					}else{
						viewModal.showPassWord(false);
						viewModal.title("修改用户信息");
						viewModal.showsuccess("修改该用户成功！");
						viewModal.id(viewModal._$_params.id);
						viewModal.level(viewModal._$_params.level),//密级
						viewModal.userName(viewModal._$_params.userName);
						viewModal.loginName(viewModal._$_params.loginName);
						viewModal.passWord(viewModal._$_params.passWord);
						viewModal.status(viewModal._$_params.status);
					}
				}
			});
        },
        retrunFindUserList:function(){
        	app.setRoot('system/findUserList', null, 'desktop-content',null);
        },
        submitUser:function(){
        	if(submitFun()){
        		var obj = {
	        		userName:viewModal.userName(),//账户名称
	        		loginName:viewModal.loginName(),//登陆名称
	        		passWord:viewModal.passWord(),//密码
	        		level:1,//密级
	        		status:viewModal.status(),
	        		roleId:viewModal.roleStr(),
	        		role:$(".roleArr").find("option:selected").text(),
	        		departmentId:viewModal.departmentStr(),
	        		department:$(".departmentArr").find("option:selected").text()
	        	}
	        	if(viewModal.id() != 0 ){
	        		obj.id =  viewModal.id();
	        	}
	        	api.saveUser(obj,function(res){
	        		if(res["code"] == 0){
	        			showAlert(viewModal.showsuccess(),function(){
	        				proj.retrunFindUserList();
	        			});
	        		}
	        	});
        	}
        },
        clearViewModal:function(){
        	viewModal.title("");
	    	viewModal.id(""),
	    	viewModal.userName("");
			viewModal.loginName("");
			viewModal.passWord("");
			viewModal.passWord2("");
			viewModal.showPassWord(true);
			viewModal.level("");
			viewModal.roleArr([]);
			viewModal.roleStr("");
			viewModal.departmentArr([]);
			viewModal.departmentStr("");
			viewModal.status("Y");
			viewModal.showsuccess("");
        }
	}
	
	
	//页面模型
    var viewModal = {
    	title:ko.observable(),
    	id:ko.observable(0),
    	userName:ko.observable(),//用户名
		loginName:ko.observable(),//登陆名称
		showPassWord:ko.observable(true),//密码
		passWord:ko.observable(),//密码
		passWord2:ko.observable(),//密码
		level:ko.observable(),//密级
		roleArr:ko.observableArray(),//角色数组
		roleStr:ko.observable(),//选中部门
		departmentArr:ko.observableArray(),//部门数组
		departmentStr:ko.observable(),//选中部门
		status:ko.observable(),//状态
		showsuccess:ko.observable(""),//alert显示文字
		
        submitUser:proj.submitUser,
		retrunFindUserList:proj.retrunFindUserList
    }
	
	proj.init();
    return viewModal;
});