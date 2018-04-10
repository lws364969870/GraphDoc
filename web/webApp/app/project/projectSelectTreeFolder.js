define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout', 'layerko','session','publicAjax','treeView','treeViewedit'], function (app, system, composition, $, ko,layerko) {
	var proj = {
		init : function(){
			//初始化组件
			composition.addBindingHandler("projectSelectTreeFolderHandler", { 
				init: function (dom){
					proj.clearviewModal();
					viewModal.projectsArr(viewModal._$_params);
				}
			});
        },
        selectProId:function(event,target){
        	if(event.type == 0){
        		$(target.currentTarget).addClass("red");
        		$("#projectID").val(event.id);
        		api.findArchived({serialNumber:event.serialNumber,parentId:event.id},function(res){
	        		if(res["code"] == 0){
	        			app.setRoot('project/projectSelectTreeFolder', null, event.id,res["result"]);
	        		}
	        	})
        	}else{
        		$("#projectID").val("");
        	}
        },
        //清除缓存数据
		clearviewModal:function(){
//			viewModal.projectsArr([]);
		}
	}

	
	//页面模型
    var viewModal = {
    	projectsArr:ko.observableArray(),		//table中的数据
    	selectProId:proj.selectProId
    }
	
	proj.init();
    return viewModal;
});