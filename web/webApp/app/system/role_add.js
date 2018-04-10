define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','treeView','treeViewedit','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(doms){
			//初始化组件
			composition.addBindingHandler("roleAddHandler", { 
				init: function (dom){
					proj.loadMenu();
					proj.clearViewMoadl();
					if(viewModal._$_params == null){
						viewModal.title("添加角色");
						viewModal.showsuccess("添加该角色成功！");
					}else{
						var jurisdiction = JSON.parse(viewModal._$_params.jurisdiction);//权限
						
						for(var i = 1 ; i < 6 ; i++){
							proj.isRole2(jurisdiction['BTN00'+i],"BTN00"+i)
						}
						
						
						
						viewModal.title("修改角色");
						viewModal.showsuccess("修改该角色成功！");
						viewModal.id(viewModal._$_params.id);
						viewModal.name(viewModal._$_params.name);
						viewModal.status(viewModal._$_params.status);
						viewModal.roleLevelStr(viewModal._$_params.level);
						
					}
				}
			});
        },
        loadMenu:function(){
        	api.findAllMenu(function (res) {
        		if(res["code"] == 0){
        			res = res["result"];
        			viewModal.arrLists(res);
	                $("#browser").treeview();
	                
	                if(viewModal._$_params == null){
		                var arr = [],
		                 	idx = viewModal.arrLists();
		                for(var i = 0 ; i < idx.length ; i++){
							arr.push(idx[i]["code"]);
							var idxChild = idx[i]["child"];
							if(idxChild.length > 0 ){
								for(var k = 0 ; k < idxChild.length ; k++){
									arr.push(idxChild[k]["code"]);
								}
							}
						}
						viewModal.projectIds(arr);
					}else{
						var menu = viewModal._$_params.menus.split(",");
						viewModal.projectIds(menu);
					}
        		}
            })
        },
        //判断是否拥有该权限
        isRole:function(id){
        	if($(id).is(":checked")){
        		return "Y";
        	}else{
        		return "N";
        	}
        },
        
        //判断是否拥有该权限
        isRole2:function(YN,id){
        	if(YN == "Y"){
        		$('#'+id).prop("checked",true);
        	}else{
        		$('#'+id).prop("checked",false);
        	}
        },
        
        submitRole:function(){
        	if(submitFun()){
        		var str = "";
        		$("input[type=checkbox]").each(function(){
	        		if($(this).is(":checked")){
	        			if(str.length>0){ str+=",";}
	        			str += $(this).val();
	        		}
	        	})
        		
        		//权限
        		var str2 = JSON.stringify({
        			BTN001:proj.isRole("#BTN001"),
        			BTN002:proj.isRole("#BTN002"),
        			BTN003:proj.isRole("#BTN003"),
        			BTN004:proj.isRole("#BTN004"),
        			BTN005:proj.isRole("#BTN005")
        		}) ;
        		
	        	var obj = {
	        		name:viewModal.name(),//账户名称
	        		status:viewModal.status(),
	        		menus:str,//菜单列表
	        		level:viewModal.roleLevelStr(),//密级
	        		jurisdiction:str2//角色菜单
	        	}
	        	
	        	if(viewModal.id() != 0){
	        		obj.id = viewModal.id();
	        	}
	        	api.saveRole(obj,function(res){
	        		if(res["code"] == 0){
	        			showAlert(viewModal.showsuccess(),function(){
	        				proj.returnRole();
	        			});
	        		}
	        	});
        	}
        },
        
        returnRole:function(){
        	app.setRoot('system/roleList', null, 'desktop-content',null);
        },
        
        clearViewMoadl:function(){
        	viewModal.title("");
	    	viewModal.arrLists([]);
	    	viewModal.roleLevelArr([1,2,3,4,5,6,7,8,9,10]);
	    	viewModal.roleLevelStr("");
	    	viewModal.id(0);
	    	viewModal.name("");
			viewModal.status("Y");
			viewModal.showsuccess("");
        }
	}
	
	
	//页面模型
    var viewModal = {
    	title:ko.observable(""),
    	arrLists:ko.observableArray([]),//集合
    	roleLevelArr:ko.observableArray([1,2,3,4,5,6,7,8,9,10]),//密级数组
    	roleLevelStr:ko.observable(""),//密级选中字符
    	id:ko.observable(0),
    	name:ko.observable(""),//角色名
		status:ko.observable("Y"),//状态
		showsuccess:ko.observable(""),//alert显示文字
		projectIds:ko.observableArray([]),//选中
		checkAll:ko.observable(true),//全选按钮 开始默认不选
		
        submitRole:proj.submitRole,//提交
        returnRole:proj.returnRole,//关闭
    }
   
	proj.init();
    return viewModal;
});