define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectProductHandler", { 
				init: function (dom){
					proj.clearViewModal();
					proj.loadProject(viewModal._$_params.even.projectWork);
				}
			});
        },
        loadProject:function(projectWork){
        	if(projectWork != null){
        		viewModal.arrList(projectWork);
        	}
        },
		clearViewModal:function(){
			viewModal.arrList([]);
			viewModal.workUser("");
		},
		save:function(){
			if($("input[name=workUser]").val() != ""){
				var requeset = viewModal._$_params.even;
					requeset.workJson = JSON.stringify(viewModal.arrList());
				api.saveProject(requeset,function(res){
					if(res["code"] == 0){
	        			showAlert("保存成功！",function(){
//	        				app.setRoot('project/projectList', null, 'desktop-content', viewModal._$_params.params);
	        			});
	        		}else{
	                	showAlert(res["message"],function(){});
	                }
				})
			}else{
				layer.alert("选填写责任人！");
			}
		},
		addProduct:function(){
			//isSelect = 0 不选中  =1 选中
			viewModal.arrList.push({isSelect: "0",fileName: "", workUserId: "", workUser: "", workTime: "", workCount: ""});
		},
		//导出
		exportCVS:function(event,target){
			window.location.href = urlAddress + "exportCVS?token="+$.session.get("token")+"&id="+viewModal._$_params.even.id+"&model=produce";
		}
	}
	
	
	//页面模型
    var viewModal = {
        arrList:ko.observableArray([]),
        workUser:ko.observable(""),
        
        save:proj.save,
        addProduct:proj.addProduct,
        exportCVS:proj.exportCVS
    }
	
	proj.init();
    return viewModal;
});