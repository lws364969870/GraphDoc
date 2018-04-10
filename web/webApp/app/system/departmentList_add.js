define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(doms){
			//初始化组件
			composition.addBindingHandler("departmentListAddHandler", { 
				init: function (dom){
					proj.clearViewModal();
					if(viewModal._$_params == null){
						viewModal.status("Y");
						viewModal.showsuccess("添加该部门成功！");
						viewModal.title("添加部门");
					}else{
						viewModal.showsuccess("修改该部门成功！");
						viewModal.title("编辑部门");
						viewModal.id(viewModal._$_params.id);
						viewModal.name(viewModal._$_params.name);
						viewModal.status(viewModal._$_params.status);
					}
				}
			});
        },
        submitDepartment:function(){
        	if(submitFun()){
        		var obj = {
	        		name:viewModal.name(),//账户名称
	        		status:viewModal.status(),
	        		parentId:"0",
	        	}
	        	if(viewModal.id() != 0 ){
	        		obj.id =  viewModal.id();
	        	}
	        	api.saveDepartment(obj,function(res){
	        		if(res["code"] == 0){
	        			showAlert(viewModal.showsuccess(),function(){
	        				proj.retrunDepartment();
	        			});
	        		}
	        	});
        	}
        },
        retrunDepartment:function(){
        	app.setRoot('system/departmentList', null, 'desktop-content',null);
        },
        clearViewModal:function(){
        	viewModal.title("");
	    	viewModal.id(""),
	    	viewModal.name("");
			viewModal.status("");
			viewModal.showsuccess("");
        }
	}
	
	
	//页面模型
    var viewModal = {
    	title:ko.observable(""),
    	id:ko.observable(0),
    	name:ko.observable(""),
		status:ko.observable(""),
		showsuccess:ko.observable(""),//alert显示文字
        submitDepartment:proj.submitDepartment,
        retrunDepartment:proj.retrunDepartment,
    }
	
	proj.init();
    return viewModal;
});