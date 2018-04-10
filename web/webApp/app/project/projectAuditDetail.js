define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("projectAuditDetailHandler", { 
				init: function (dom){
					proj.clearViewModal();
					viewModal.opinion(viewModal._$_params.opinion);
					viewModal.type(viewModal._$_params.type);
					viewModal.userName(viewModal._$_params.userName);
					viewModal.beforeProjectType(proj.isType(viewModal._$_params.beforeProjectType));
					viewModal.afterProjectType(proj.isType(viewModal._$_params.afterProjectType));
					viewModal.time(conversionTime(viewModal._$_params.time));
				}
			});
        },
        isType:function(type){
			switch (viewModal._$_params.beforeProjectType){
				case "H001":
					type = "草稿";
					break;
				case "H002":
					type = "设计";
					break;
				case "H003":
					type = "审批";
					break;
				case "H004":
					type = "复审";
					break;
				case "H005":
					type = "生产";
					break;
				case "H006":
					type = "公告";
					break;
				case "H007":
					type = "归档";
					break;
			}
			return type;
        },
        //返回
      	returnAuidMenthod:function(){
      		layer.closeAll(); //疯狂模式，关闭所有层
      	},
       	//清除缓存
       	clearViewModal:function(){
       		viewModal.opinion("");
       		viewModal.type("");
       		viewModal.userName("");
       		viewModal.beforeProjectType("");
       		viewModal.afterProjectType("");
       		viewModal.time("");
       	}
	}
	
	
	//页面模型
    var viewModal = {
    	opinion:ko.observable(""),
       	type:ko.observable(""),
   		userName:ko.observable(""),
   		beforeProjectType:ko.observable(""),
   		afterProjectType:ko.observable(""),
   		time:ko.observable(""),
   		
    	returnAuidMenthod:proj.returnAuidMenthod,//返回
    }
	
	proj.init();
    return viewModal;
});