define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax'], function (app, system, composition, $, ko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectProductQueryHandler", { 
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
		//导出
		exportCVS:function(event,target){
			window.location.href = urlAddress + "exportCVS?token="+$.session.get("token")+"&id="+viewModal._$_params.even.id+"&model=produce";
		}
	}
	
	
	//页面模型
    var viewModal = {
        arrList:ko.observableArray([]),
        workUser:ko.observable(""),
        exportCVS:proj.exportCVS
    }
	
	proj.init();
    return viewModal;
});