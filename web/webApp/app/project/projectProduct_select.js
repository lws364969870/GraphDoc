define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectProductSelectHandler", { 
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
		saveProduct:function(){
			var requeset = viewModal._$_params.even;
			$("input[name=checkboxProduct]").each(function(index){
				if($(this).is(":checked")){
					viewModal.arrList()[index]["isSelect"] = 1
				}else{
					viewModal.arrList()[index]["isSelect"] = 0
				}
			})
			requeset.workJson = JSON.stringify(viewModal.arrList());
			api.saveProject(requeset,function(res){
				if(res["code"] == 0){
        			showAlert("保存成功！",function(){
        			});
        		}else{
                	showAlert(res["message"],function(){});
                }
			})
		},
		addProduct:function(){
			viewModal.arrList.push({fileName: "", workUserId: "", workUser: "", workTime: "", workCount: ""});
		},
		//导出
		exportCVS:function(event,target){
			window.location.href = urlAddress + "exportCVS?token="+$.session.get("token")+"&id="+viewModal._$_params.even.id+"&model=produce";
		},
	}
	
	
	//页面模型
    var viewModal = {
        arrList:ko.observableArray([]),
        workUser:ko.observable(""),
        saveProduct:proj.saveProduct,
        addProduct:proj.addProduct,
        exportCVS:proj.exportCVS
    }
	
	proj.init();
    return viewModal;
});