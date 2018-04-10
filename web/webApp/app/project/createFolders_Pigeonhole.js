//归档管理-归档
define(['durandal/app', 'durandal/system', "durandal/composition", 'jquery', 'knockout','session','publicAjax','layer','public'], function (app, system, composition, $, ko) {
	var proj = {
		//初始化组件
		init : function(){
			composition.addBindingHandler("createFoldersPigeonholeHandler", { 
				init: function (dom){
					proj.clearViewModal();
				}
			});
        },
       	//保存文件夹
       	saveFolders:function(){
   			api.createTopFolders({name:viewModal.name()},function(res){
				if(res["code"] == 0){
        			showAlert("创建目录成功！",function(){
        				layer.closeAll(); //疯狂模式，关闭所有层
        			});
        		}else{
        			showAlert(res["message"],function(){
        				layer.closeAll(); //疯狂模式，关闭所有层
        			});
        		}
			})
       	},
       	returnFolders:function(){
       		layer.closeAll(); //疯狂模式，关闭所有层
       	},
       	//清除缓存
       	clearViewModal:function(){
       		viewModal.name("");
       	}
	}
	
	
	//页面模型
    var viewModal = {
    	saveFolders:proj.saveFolders,//保存
    	returnFolders:proj.returnFolders,//返回
    	name:ko.observable(""),//文件夹名称
    }
	
	proj.init();
    return viewModal;
});